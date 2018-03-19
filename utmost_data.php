<?php

		//DB connect
		$utmost_link = new mysqli('cmisst-db.miserver.it.umich.edu', 'cmisst', 'cmisst-a1s2d3f4', 'utmost_dev');

		// Variable Set Constants
		//Restraint Vars
		$restraint_select_vars = "restraint.unrestrained as p_unrestrained, restraint.belted as p_belted, restraint.child_optimal as p_child_optimal, restraint.child_suboptimal as p_child_suboptimal, restraint.helmet as p_helmet";
		
		//Injury vars
		$injury_select_vars = "crash_injury_dev.coefficient as risk_coefficient, crash_injury_dev.unrestrained as i_unrestrained, crash_injury_dev.belted as i_belted, crash_injury_dev.child_optimal as  i_child_optimal, crash_injury_dev.child_suboptimal as i_child_suboptimal, crash_injury_dev.helmet as i_helmet"; 
		//risk base vars
		$risk_select_vars = "crash_injury_dev.risk_unrestrained as r_unrestrained, crash_injury_dev.risk_belted as r_belted, crash_injury_dev.risk_child_optimal as r_child_optimal, crash_injury_dev.risk_child_suboptimal as r_child_suboptimal, crash_injury_dev.risk_helmet as r_helmet";
		
		//DV Vars
		$dv_select_vars = "dv.mean_dv as mean_dv, dv.sd_dv as sd_dv";
		$dv_shift_key = "";
		$injury_calc_groups = ", age, driver_age, p_unrestrained, p_belted, p_child_optimal, p_child_suboptimal, p_helmet, risk_coefficient, r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet, i_unrestrained, i_belted, i_child_optimal, i_child_suboptimal, i_helmet,  mean_dv, sd_dv";

		$full_injury_selects = "crash_type, age, driver_age, frequency, injury_count, injury_count_adj, mitigation_factor, mean_dv, sd_dv, dv_shift_relevance, risk_coefficient, p_unrestrained, p_belted, p_child_optimal, p_child_suboptimal, p_helmet, i_unrestrained, i_belted, i_child_optimal, i_child_suboptimal, i_helmet, r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet";
		
		//Sort Strings
		$sort = array();
		$sort_dv = array();
		$sort['crash_type'] = 'FIELD(crash_injury_dev.crash_type, "Animal", "Avoidance", "Backing", "Change lanes", "Control Loss", "Cyclist", "Drifting", "No Driver", "Non-collision", "Object", "Opp direction", "Parking", "Pedestrian", "Rear End/LV Decel", "Rear End/LV Slower", "Rear End/LV Stopped", "Rear End/Other", "Road Departure", "Rollover", "Run light/stop", "Turning/same dir",  "Veh Failure", "XPaths@Non-Signal", "XPaths@Signal", "Other") as sort';
		$sort['crash_direction'] = 'FIELD(crash_injury_dev.crash_direction, "Far Side", "Frontal", "Motorcycle", "Near Side", "Pedicyclist", "Rear", "Rollover", "Other") as sort';
		$sort['vehicle_type'] = 'FIELD(crash_injury_dev.vehicle_type, "Car", "Motorcycle", "Pedicyclist", "Pickup", "SUV", "Van", "Other") as sort';
		$sort['age'] = 'FIELD(crash_injury_dev.age, "0-1", "2-4", "5-7", "8-10", "11-13", "14-15", "16-17", "18-20", "21-65", "66+") as sort';
		$sort['driver_age'] = 'FIELD(crash_injury_dev.driver_age, "<16", "16-17 ", "18-20", "21-65", ">65") as sort';
		$sort['sex'] = 'FIELD(crash_injury_dev.sex, "Male", "Female") as sort';
		$sort['alcohol_involvement'] = 'FIELD(crash_injury_dev.alcohol_involvement, "Alcohol Involved", "No Alcohol Involved") as sort';
		$sort['light_condition'] = 'FIELD(crash_injury_dev.light_condition, "Light", "Dark--Lighted", "Dark", "Other") as sort';
		$sort['urbanization'] = 'FIELD(crash_injury_dev.urbanization, "Urban", "Suburban", "Rural") as sort';
		$sort_dv['crash_type'] = 'FIELD(crash_type, "Animal", "Avoidance", "Backing", "Change lanes", "Control Loss", "Cyclist", "Drifting", "No Driver", "Non-collision", "Object", "Opp direction", "Parking", "Pedestrian", "Rear End/LV Decel", "Rear End/LV Slower", "Rear End/LV Stopped", "Rear End/Other", "Road Departure", "Rollover", "Run light/stop", "Turning/same dir",  "Veh Failure", "XPaths@Non-Signal", "XPaths@Signal", "Other") as sort';
		$sort_dv['crash_direction'] = 'FIELD(crash_type, "Far Side", "Frontal", "Motorcycle", "Near Side", "Pedicyclist", "Rear", "Rollover", "Other") as sort';
		$sort_dv['vehicle_type'] = 'FIELD(crash_type, "Car", "Motorcycle", "Pedicyclist", "Pickup", "SUV", "Van", "Other") as sort';
		$sort_dv['age'] = 'FIELD(crash_type, "0-1", "2-4", "5-7", "8-10", "11-13", "14-15", "16-17", "18-20", "21-65", "66+") as sort';
		$sort_dv['driver_age'] = 'FIELD(crash_type, "<16", "16-17 ", "18-20", "21-65", ">65") as sort';
		$sort_dv['sex'] = 'FIELD(crash_type, "Male", "Female") as sort';
		$sort_dv['alcohol_involvement'] = 'FIELD(crash_type, "Alcohol Involved", "No Alcohol Involved") as sort';
		$sort_dv['light_condition'] = 'FIELD(crash_type, "Light", "Dark--Lighted", "Dark", "Other") as sort';
		$sort_dv['urbanization'] = 'FIELD(crash_type, "Urban", "Suburban", "Rural") as sort';
		
		//fatality
		$sort_fatality = array();
		$sort_fatality['crash_direction'] = 'FIELD(crash_fatality.crash_direction, "Rear", "Front", "Farside", "Nearside") as sort'; //alias to crash type
		$sort_fatality['age'] = 'FIELD(crash_fatality.age, "14-30", "30-60", "31-60", "61+") as sort';
		$sort_fatality['sex'] = 'FIELD(crash_fatality.sex, "M", "F") as sort';
		$sort_fatality['alcohol_involvement'] = 'FIELD(crash_fatality.alcohol_involvement, "No", "Yes") as sort';
		$sort_fatality['veh_my'] = 'FIELD(crash_fatality.veh_my, "<2000", "2000+") as sort';
		$sort_fatality['restraint'] = 'FIELD(crash_fatality.restraint, "Unrestrained", "Suboptimal", "Optimal") as sort';
		
		$fatality_selects = ""; //no idea
  
		
// (0 value replaced by set of cms enabled)
		$data = array();
		$outcome_variable = mysqli_real_escape_string($utmost_link, $_GET["outcome_variable"]);
		$filters = mysqli_real_escape_string($utmost_link, $_GET["filter_string"]);
		$group_type =  mysqli_real_escape_string($utmost_link, $_GET["group_type"]);
		$subset_variable = mysqli_real_escape_string($utmost_link, $_GET["subset_variable"]);
		$subset_category = mysqli_real_escape_string($utmost_link, $_GET["subset_category"]);
		$subset_string = 'WHERE 1';
		
		$query = "";
		
		if ($outcome_variable == 'fatality_count'){
			//fatality subsets
			if ($subset_category != "all"){
				$subset_string = "WHERE (crash_fatality.".$subset_variable." = '".$subset_category."')";
			}
			$query =  "SELECT distinct ".$group_type." as crash_type, sum(fars_n) as fatality_count, sum(fars_n) as fatality_count_adj, ".$sort_fatality[$group_type]." FROM `crash_fatality` ".$subset_string." GROUP BY crash_fatality.".$group_type." ORDER BY sort";
			
		}else{
			if ($subset_category != "all"){
				$subset_string = "WHERE (crash_injury_dev.".$subset_variable." = '".$subset_category."')";
			}
			
			$dv_relevance = '0';
			$dv_interventions = array();
			//mysql_select_db('utmost_dev', $utmost_link);
			if ($filters != ""){
				$coeffs = mysqli_real_escape_string($utmost_link, $_GET["coeffs_string"]);
				$filter_array = explode('~', $filters);
				$coeff_array = explode('~', $coeffs);
				
				$filter_array_quote = array();
				foreach($filter_array as $filter_text){
					$filter_array_quote[] = "'".$filter_text."'";
				}
				
				//Retrieve intervention joins
				$intervention_query = "select intervention, target_column from intervention_master where intervention in (".implode(',', $filter_array_quote).");";
				$intervention_result = $utmost_link->query($intervention_query);
				$interventions = array();
				while ($intervention_row = mysqli_fetch_assoc($intervention_result)){
					 if (array_key_exists ($intervention_row['intervention'], $interventions)){
						  $interventions[$intervention_row['intervention']][] = $intervention_row['target_column'];
					 } else {
						 $interventions[$intervention_row['intervention']] = array();
						 $interventions[$intervention_row['intervention']][] = $intervention_row['target_column'];
					 }
				}
				
				//Build intervention joins on target_column = target_column
				$joins = "";
				foreach ($interventions as $intervention_type => $colset){
					$joinbloc = array();
					foreach ($colset as $col){
						$joinbloc[] = "(crash_injury_dev.".$col." = ".$intervention_type.".".$col.")";
					}
					$joins.= " LEFT JOIN $intervention_type ON (".implode(" AND ", $joinbloc).") ";
				}
				
				//pick relevance column for each countermeasure, apply coefficient
				$counter = 0;
				$builder_array = array();
				while ($counter < count($filter_array)){
					$builder_array[] = "(1 - IFNULL(". $filter_array[$counter].".relevance, 0) * ".$coeff_array[$counter].")";
					if ($filter_array[$counter] == 'fcw' && $outcome_variable == 'injury_count'){
						//FCW shifts DV - TODO expand to include future DV shifting countermeasures
						$dv_interventions[] = $filter_array[$counter].".relevance * ".$coeff_array[$counter];
					}
					$counter++;
				}
				
				
				
				
				if (count($filter_array) > 0){
					$filter_query_string = implode(" * ", $builder_array);
					if ($outcome_variable == 'person_count'){
						$query = "SELECT distinct crash_injury_dev.".$group_type." as crash_type, crash_injury_dev.driver_age as driver_age, sum(frequency) as person_count, sum(frequency *(0 + ".$filter_query_string.")) as person_count_adj,  ".$sort[$group_type]." FROM `crash_injury_dev` ".$joins.$subset_string." GROUP BY crash_injury_dev.".$group_type.", driver_age ORDER BY sort";
					} else if ($outcome_variable == 'injury_count'){
						if (count($dv_interventions)> 0){
							$dv_relevance = '('.implode(' * ', $dv_interventions).')';
							$dv_shift_key = "concat(CAST((".$dv_relevance."*100) AS SIGNED), '-', CAST(dv.mean_dv*100 AS SIGNED), '-',CAST(dv.sd_dv*100 AS SIGNED)) as temp_key";
							$query = "SELECT logninv.res AS dv_shift_value, ".$full_injury_selects.", ".$sort_dv[$group_type]." FROM (SELECT crash_injury_dev.".$group_type." as crash_type, crash_injury_dev.age as age, crash_injury_dev.driver_age as driver_age, sum(frequency) as frequency, sum(frequency) as injury_count, sum(frequency) as injury_count_adj, (0 + ".$filter_query_string.") as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", ".$dv_relevance." as dv_shift_relevance, 0 as dv_shift_value, ".$dv_shift_key." FROM `crash_injury_dev` ".$joins." LEFT JOIN dv ON crash_injury_dev.dv_key = dv.dv_key LEFT JOIN restraint on restraint.restraint_key = crash_injury_dev.restraint_key ".$subset_string." GROUP BY crash_injury_dev.".$group_type.$injury_calc_groups.", mitigation_factor, dv_shift_relevance, temp_key) AS A LEFT JOIN logninv ON temp_key = logninv.logninv_key ORDER BY sort";
						} else {
							$query = "SELECT crash_injury_dev.".$group_type." as crash_type, crash_injury_dev.age as age, crash_injury_dev.driver_age as driver_age, sum(frequency) as frequency, sum(frequency) as injury_count, sum(frequency) as injury_count_adj, (0 + ".$filter_query_string.") as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", ".$dv_relevance." as dv_shift_relevance, 0 as dv_shift_value, ".$sort[$group_type]." FROM `crash_injury_dev` ".$joins." LEFT JOIN dv ON crash_injury_dev.dv_key = dv.dv_key LEFT JOIN restraint on restraint.restraint_key = crash_injury_dev.restraint_key ".$subset_string." GROUP BY crash_injury_dev.".$group_type.$injury_calc_groups.", mitigation_factor ORDER BY sort";
						}
					}
					error_log($query);
				}
			} else {
				if ($outcome_variable == 'person_count'){
					$query =  "SELECT distinct ".$group_type." as crash_type, crash_injury_dev.driver_age as driver_age, sum(frequency) as person_count, sum(frequency) as person_count_adj, ".$sort[$group_type]." FROM `crash_injury_dev` ".$subset_string." GROUP BY crash_injury_dev.".$group_type.", driver_age ORDER BY sort";
				} else if ($outcome_variable == 'injury_count'){
					$query =  "SELECT ".$group_type." as crash_type, crash_injury_dev.age as age, crash_injury_dev.driver_age as driver_age, sum(frequency) as frequency, sum(frequency)  as injury_count, sum(frequency) as injury_count_adj, 1 as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", 0 as dv_shift_relevance, 0 as dv_shift_value, ".$sort[$group_type]."  FROM `crash_injury_dev` "." LEFT JOIN dv ON crash_injury_dev.dv_key = dv.dv_key  LEFT JOIN restraint on restraint.restraint_key = crash_injury_dev.restraint_key ".$subset_string." GROUP BY crash_injury_dev.".$group_type.$injury_calc_groups." ORDER BY sort";
				}
			}
		}
		error_log($query);
        $res=$utmost_link->query($query);
        while ($row = mysqli_fetch_assoc($res)){
                $data[] = $row;
        }
		$res = null;
		
		echo json_encode($data);

?>
