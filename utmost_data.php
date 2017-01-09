<?php

//	SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0))) as crash_count_adj FROM `crash_frequency` WHERE 1  GROUP BY crash_type

// Variable Set Constants
		//Restraint Vars
		$restraint_select_vars = "restraint.unrestrained as p_unrestrained, restraint.belted as p_belted, restraint.child_optimal as p_child_optimal, restraint.child_suboptimal as p_child_suboptimal, restraint.helmet as p_helmet";
		
		//Injury vars
		$injury_select_vars = "injury.coefficient as risk_coefficient, injury.unrestrained as i_unrestrained, injury.belted as i_belted, injury.child_optimal as  i_child_optimal, injury.child_suboptimal as i_child_suboptimal, injury.helmet as i_helmet"; 
		//risk base vars
		$risk_select_vars = "injury.risk_unrestrained r_unrestrained, injury.risk_belted as r_belted, injury.risk_child_optimal as r_child_optimal, injury.risk_child_suboptimal as r_child_suboptimal, injury.risk_helmet as r_helmet";
		
		//DV Vars
		$dv_select_vars = "dv.mean_dv as mean_dv, dv.sd_dv as sd_dv";

		
// (0 value replaced by set of cms enabled)
		$data = array();
		$outcome_variable = $_GET["outcome_variable"];
		$filters = $_GET["filter_string"];
		$group_type =  $_GET["group_type"];
		$subset_variable = $_GET["subset_variable"];
		$subset_category = $_GET["subset_category"];
		$subset_string = 'WHERE 1';
		if ($_GET["subset_category"] != "all"){
			$subset_string = "WHERE (".$subset_variable." = ".$subset_category.")";
		}
		
		$dv_relevance = '0';
		$utmost_link= mysql_connect('cmisst-live-db.miserver.it.umich.edu', 'cmisst', 'a1s2d3f4');
		mysql_select_db('utmost_dev', $utmost_link);
		if ($_GET["filter_string"] != ""){
			$coeffs = $_GET["coeffs_string"];
			$filter_array = explode('~', $filters);
			$coeff_array = explode('~', $coeffs);
			
			//Retrieve intervention joins
			$intervention_query = "select intervention, target_column from intervention_master where intervention in (".implode(',', $filter_array).");";
			$intervention_result = mysql_query($intervention_query ,$utmost_link);
			$interventions = array();
			while ($intervention_row = mysql_fetch_assoc($intervention_result)){
                 if (array_key_exists ($row[], $interventions)){
					  $interventions[$row['intervention']][] = $row['target_column'];
				 } else {
					 $interventions[$row['intervention']] = array();
					 $interventions[$row['intervention']][] = $row['target_column'];
				 }
			}
			
			//Build intervention joins on target_column = target_column
			$joins = "";
			foreach ($interventions as $intervention_type -> $colset){
				$joinbloc = array();
				foreach ($colset as $col){
					$joinbloc = "(crash_frequency.".$col." = ".$intervention.".".$col.")";
				}
				$joins.= " LEFT JOIN $intervention_type ON (".implode(" AND ", $joinbloc).") ";
			}
			
			//pick relevance column for each countermeasure, apply coefficient
			$counter = 0;
			$builder_array = array();
			while ($counter < count($filter_array)){
				$builder_array[] = "(". $filter_array[$counter]."relevance * ".$coeff_array[$counter].")";
				if ($filter_array[$counter] == 'FCW'){
					//FCW shifts DV - TODO expand to include future DV shifting countermeasures
					$dv_relevance = $filter_array[$counter]."relevance";
				}
				$counter++;
			}
			
			if (count($filter_array) > 0){
				$filter_query_string = implode(" + ", $builder_array);
				if ($outcome_variable == 'person_count'){
					$query = "SELECT distinct ".$group_type." as crash_type, sum(frequency) as person_count, sum(frequency *(1-(0 + ".$filter_query_string."))) as person_count_adj FROM `crash_frequency` ".$joins.$subset_string." GROUP BY ".$group_type;
				} else if ($outcome_variable == 'injury_count'){
					$query = "SELECT ".$group_type." as crash_type, frequency, injury_frequency as injury_count, injury_frequency as injury_count_adj, (1-(0 + ".$filter_query_string.")) as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", ".$dv_relevance." as dv_shift_relevance, 0 as dv_shift_value FROM `crash_frequency` ".$joins." LEFT JOIN dv ON crash_frequency.dv_id = dv.dv_id LEFT JOIN injury_coeffs on crash_frequency.injury_id = injury_coeffs.injury_id LEFT JOIN restraint on restraint.restraint_id = crash_frequency.restraint_id ".$subset_string;
				}
				error_log($query);
			}
		} else {
			if ($outcome_variable == 'person_count'){
				$query =  "SELECT distinct ".$group_type." as crash_type, sum(frequency) as person_count, sum(frequency) as person_count_adj FROM `crash_frequency` ".$subset_string." GROUP BY ".$group_type;
			} else if ($outcome_variable == 'injury_count'){
				$query =  $query = "SELECT ".$group_type." as crash_type, frequency, injury_frequency as injury_count, injury_frequency as injury_count_adj, 1 as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", 0 as dv_shift_relevance, 0 as dv_shift_value  FROM `crash_frequency` "." LEFT JOIN dv ON crash_frequency.dv_id = dv.dv_id LEFT JOIN injury_coeffs on crash_frequency.injury_id = injury_coeffs.injury_id LEFT JOIN restraint on restraint.restraint_id = crash_frequency.restraint_id"..$subset_string;
			}
		}
		error_log($query);
        $rs=mysql_query($query ,$utmost_link);
        while ($row = mysql_fetch_assoc($rs)){
                $data[] = $row;
        }
		
		echo json_encode($data);

?>
