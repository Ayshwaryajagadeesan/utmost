<?php

//	SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0))) as crash_count_adj FROM `crash_frequency` WHERE 1  GROUP BY crash_type

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
		$utmost_link= mysql_connect('cmisst-live-db.miserver.it.umich.edu', 'cmisst', 'a1s2d3f4');
		mysql_select_db('utmost_dev', $utmost_link);
		if ($_GET["filter_string"] != ""){
			$coeffs = $_GET["coeffs_string"];
			$filter_array = explode('~', $filters);
			$coeff_array = explode('~', $coeffs);
			
			//Retrieve intervention joins
			$intervention_query = "select intervention, target_column from intervention_master where intervention in (".implode(',',filter_array).");";
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
			foreach ($intervention as $intervention_type -> $colset){
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
				$counter++;
			}
			
			if (count($filter_array) > 0){
				$filter_query_string = implode(" + ", $builder_array);
				if ($outcome_variable == 'person_count'){
					$query = "SELECT distinct ".$group_type." as crash_type, sum(frequency) as person_count, sum(frequency *(1-(0 + ".$filter_query_string."))) as person_count_adj FROM `crash_frequency` ".$joins.$subset_string." GROUP BY ".$group_type;
				} else if ($outcome_variable == 'injury_count'){
					$query = "SELECT ".$group_type." as crash_type, frequency, injury_frequency as injury_count, injury_frequency as injury_count_adj, (1-(0 + ".$filter_query_string.")) as mitigation_factor, dv.mean_dv as mean_dv, dv.sd_dv as sd_dv, injury_coeff, injury_intercept FROM `crash_frequency` ".$joins." LEFT JOIN dv ON ((dv.crash_type = crash_frequency.crash_type) AND (dv.crash_direction = crash_frequency.crash_direction) AND (dv.alcohol_involvement = crash_frequency.alcohol_involvement)) ".$subset_string;
				}
				error_log($query);
			}
		} else {
			if ($outcome_variable == 'person_count'){
				$query =  "SELECT distinct ".$group_type." as crash_type, sum(frequency) as person_count, sum(frequency) as person_count_adj FROM `crash_frequency` ".$subset_string." GROUP BY ".$group_type;
			} else if ($outcome_variable == 'injury_count'){
				$query =  $query = "SELECT ".$group_type." as crash_type, frequency, injury_frequency as injury_count, injury_frequency as injury_count_adj, 1 as mitigation_factor, dv.mean_dv as mean_dv, dv.sd_dv as sd_dv, injury_coeff, injury_intercept  FROM `crash_frequency` "." LEFT JOIN dv ON ((dv.crash_type = crash_frequency.crash_type) AND (dv.crash_direction = crash_frequency.crash_direction) AND (dv.alcohol_involvement = crash_frequency.alcohol_involvement)) "..$subset_string;
			}
		}
		error_log($query);
        $rs=mysql_query($query ,$utmost_link);
        while ($row = mysql_fetch_assoc($rs)){
                $data[] = $row;
        }
		
		echo json_encode($data);

?>
