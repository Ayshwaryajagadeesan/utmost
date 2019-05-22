<?php

	//DB connect
	$utmost_link = new mysqli('cmisst-db.miserver.it.umich.edu', 'cmisst', 'cmisst-a1s2d3f4', 'utmost_dev');
	$path_filename="/var/log/apache2/query.log";
	//$myfile = fopen($path_filename, "")
	// Variable Set Constants
	//Restraint Vars
	$restraint_select_vars = "restraint.unrestrained as p_unrestrained, restraint.belted as p_belted, restraint.child_optimal as p_child_optimal, restraint.child_suboptimal as p_child_suboptimal, restraint.helmet as p_helmet";
	
	//Injury vars
	$injury_select_vars = "crash_injury_dev.coefficient as risk_coefficient, crash_injury_dev.unrestrained as i_unrestrained, crash_injury_dev.belted as i_belted, crash_injury_dev.child_optimal as  i_child_optimal, crash_injury_dev.child_suboptimal as i_child_suboptimal, crash_injury_dev.helmet as i_helmet"; 
	//Fatal injury vars
	$fatal_injury_select_vars = "crash_fatality_dev.coefficient as risk_coefficient, crash_fatality_dev.child_suboptimal as i_child_suboptimal, crash_fatality_dev.helmet as i_helmet"; 
	
	
	//risk base vars
	$risk_select_vars = "crash_injury_dev.risk_unrestrained as r_unrestrained, crash_injury_dev.risk_belted as r_belted, crash_injury_dev.risk_child_optimal as r_child_optimal, crash_injury_dev.risk_child_suboptimal as r_child_suboptimal, crash_injury_dev.risk_helmet as r_helmet";
	//fatal risk select vars
	$fatal_risk_select_vars = "crash_fatality_dev.risk_unrestrained as r_unrestrained, crash_fatality_dev.risk_belted as r_belted, crash_fatality_dev.risk_child_optimal as r_child_optimal, crash_fatality_dev.risk_child_suboptimal as r_child_suboptimal, crash_fatality_dev.risk_helmet as r_helmet";
	$fatal_risk_groups  = ", r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet, ";
	
	//DV Vars
	$dv_select_vars = "dv.mean_dv as mean_dv, dv.sd_dv as sd_dv";
	$fatal_dv_select_vars = "fatality_dv.mean_dv as mean_dv, fatality_dv.sd_dv as sd_dv";
	$dv_shift_key = "";
	$injury_calc_groups = ", crash_direction, age, driver_age, veh_age, p_unrestrained, p_belted, p_child_optimal, p_child_suboptimal, p_helmet, risk_coefficient, r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet, i_unrestrained, i_belted, i_child_optimal, i_child_suboptimal, i_helmet,  mean_dv, sd_dv";
	$fatal_injury_calc_groups = ", crash_direction, age, driver_age,risk_coefficient, r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet, mean_dv, sd_dv";
	
	$full_injury_selects = "crash_type, crash_direction, age, driver_age, frequency, injury_count, injury_count_adj, mitigation_factor, mean_dv, sd_dv, dv_shift_relevance, risk_coefficient, p_unrestrained, p_belted, p_child_optimal, p_child_suboptimal, p_helmet, i_unrestrained, i_belted, i_child_optimal, i_child_suboptimal, i_helmet, r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet";
	$full_fatality_selects = "crash_type,wq1,wq2,wq3,wq4,wq5, crash_direction, age, driver_age, frequency, fatality_count, fatality_count_adj, mitigation_factor, mean_dv, sd_dv, dv_shift_relevance, risk_coefficient, n_unrestrained, n_optimal, n_suboptimal, n_unknown, r_unrestrained, r_belted, r_child_optimal, r_child_suboptimal, r_helmet";
		
	$fatality_restraint_groups = " sum(CASE WHEN restraint = 'None' THEN .2 ELSE 0 END) as n_unrestrained, sum(CASE WHEN restraint = 'Optimal' THEN .2 ELSE 0 END) as n_optimal,  sum(CASE WHEN restraint = 'Suboptimal' THEN .2 ELSE 0 END) as n_suboptimal,  sum(CASE WHEN restraint = 'Unknown' THEN .2 ELSE 0 END) as n_unknown, ";
	$fatality_white_quintile_groups="sum(CASE WHEN white = '56.7% and Below' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN white = '56.7%-74.2%' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN white = '74.2%-84.3%' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN white = '84.3%-92.1%' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN white = '92.1% and Above' THEN .2 ELSE 0 END) as wq5,";
	$fatality_black_quintile_groups="sum(CASE WHEN black = '1.2% and Below' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN black = '1.2%-3.4%' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN black = '3.4%-7.8%' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN black = '7.8%-19.4%' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN black = '19.4% and Above' THEN .2 ELSE 0 END) as wq5,";
	$fatality_other_quintile_groups="sum(CASE WHEN other = '4.1% and Below' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN other = '4.1%-7.3%' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN other = '7.3%-11.8%' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN other = '11.8%-21.6%' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN other = '21.6% and Above' THEN .2 ELSE 0 END) as wq5,";
	$fatality_hispanic_quintile_groups="sum(CASE WHEN hispanic = '2.8% and Below' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN hispanic = '2.8%-6.1%' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN hispanic = '6.1%-12.6%' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN hispanic = '12.6%-29.5%' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN hispanic = '29.5% and Above' THEN .2 ELSE 0 END) as wq5,";
	$fatality_nonhispanic_quintile_groups="sum(CASE WHEN non_hispanic = '70.5% and Below' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN non_hispanic = '70.5%-87.4%' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN non_hispanic = '87.4%-93.9%' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN non_hispanic = '93.9%-97.2%' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN non_hispanic = '97.2% and Above' THEN .2 ELSE 0 END) as wq5,";
	$fatality_education_quintile_groups="sum(CASE WHEN education = '15.6% and Below' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN education = '15.6%-22.0%' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN education = '22.0%-30.4%' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN education = '30.4%-43.8%' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN education = '43.8% and Above' THEN .2 ELSE 0 END) as wq5,";
	$fatality_income_quintile_groups="sum(CASE WHEN income = 'Less than $40,179' THEN .2 ELSE 0 END) as wq1,sum(CASE WHEN income = '$40,179 to $49,190' THEN .2 ELSE 0 END) as wq2,sum(CASE WHEN income = '$49,190 to $60,224' THEN .2 ELSE 0 END) as wq3,sum(CASE WHEN income = '$60,224 to $77,298' THEN .2 ELSE 0 END) as wq4,sum(CASE WHEN income = 'Greater than $77,298' THEN .2 ELSE 0 END) as wq5,";
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
	$sort_dv['veh_type'] = 'FIELD(crash_type, "Car", "Motorcycle", "Pedicyclist", "Pickup", "SUV", "Van", "Other") as sort';
	$sort_dv['age'] = 'FIELD(crash_type, "0-1", "2-4", "5-7", "8-10", "11-13", "14-15", "16-17", "18-20", "21-65", "66+") as sort';
	$sort_dv['driver_age'] = 'FIELD(crash_type, "<16", "16-17 ", "18-20", "21-65", ">65") as sort';
	$sort_dv['sex'] = 'FIELD(crash_type, "Male", "Female") as sort';
	$sort_dv['alcohol_involvement'] = 'FIELD(crash_type, "Alcohol Involved", "No Alcohol Involved") as sort';
	$sort_dv['light_condition'] = 'FIELD(crash_type, "Light", "Dark--Lighted", "Dark", "Other") as sort';
	$sort_dv['urbanization'] = 'FIELD(crash_type, "Urban", "Suburban", "Rural") as sort';
	$sort_dv['urbanization_soc'] = 'FIELD(crash_type, "Large Metro", "S/M Metro", "Nonmetro") as sort';
	$sort_dv['veh_age'] = 'FIELD(crash_type, "Unknown or N/A", "0-11", "12+") as sort';
	$sort_dv['white'] = 'FIELD(crash_type, "56.7% and Below", "56.7%-74.2%", "74.2%-84.3%", "84.3%-92.1%", "92.1% and Above", "unknown") as sort';
	$sort_dv['black'] = 'FIELD(crash_type, "1.2% and Below", "1.2%-3.4%", "3.4%-7.8%", "7.8%-19.4%", "19.4% and Above", "unknown") as sort';
	$sort_dv['other'] = 'FIELD(crash_type, "4.1% and Below", "4.1%-7.3%", "7.3%-11.8%", "11.8%-21.6%", "21.6% and Above", "unknown") as sort';
	$sort_dv['hispanic'] = 'FIELD(crash_type, "2.8% and Below", "2.8%-6.1%", "6.1%-12.6%", "12.6%-29.5%", "29.5% and Above", "unknown") as sort';
	$sort_dv['non_hispanic'] = 'FIELD(crash_type, "70.5% and Below", "70.5%-87.4%", "87.4%-93.9%", "93.9%-97.2%", "97.2% and Above", "unknown") as sort';
	$sort_dv['education'] = 'FIELD(crash_type, "15.6% and Below", "15.6%-22.0%", "22.0%-30.4%", "30.4%-43.8%", "43.8% and Above", "unknown") as sort';
	$sort_dv['income'] = 'FIELD(crash_type, "Less than $40,179", "$40,179 to $49,190", "$49,190 to $60,224", "$60,224 to $77,298", "Greater than $77,298", "unknown") as sort';
	
	//fatality
	$sort_fatality = array();
	$sort_fatality['crash_type'] = 'FIELD(crash_fatality_dev.crash_type, "Animal", "Avoidance", "Backing", "Change lanes", "Control Loss", "Cyclist", "Drifting", "No Driver", "Non-collision", "Object", "Opp direction", "Parking", "Pedestrian", "Rear End/LV Decel", "Rear End/LV Slower", "Rear End/LV Stopped", "Rear End/Other", "Road Departure", "Rollover", "Run light/stop", "Turning/same dir",  "Veh Failure", "XPaths@Non-Signal", "XPaths@Signal", "Other") as sort';
	//$sort_fatality['crash_direction'] = 'FIELD(crash_fatality_dev.crash_direction, "Rear", "Front", "Farside", "Nearside") as sort'; //alias to crash type
	$sort_fatality['crash_direction'] = 'FIELD(crash_fatality_dev.crash_direction, "Far Side", "Frontal", "Motorcycle", "Near Side", "Rear", "Rollover", "Cyclist", "Pedestrian", "Other") as sort';
	$sort_fatality['veh_type'] = 'FIELD(crash_fatality_dev.veh_type, "Car", "Pickup", "SUV", "Van", "Large Bus", "Heavy Truck", "Motorcycle", "Cyclist", "Pedestrian", "Snowmobile/ATV", "Golf Cart/LSV", "Other") as sort';
	//$sort_fatality['age'] = 'FIELD(crash_fatality_dev.age, "14-30", "30-60", "31-60", "61+") as sort';
	$sort_fatality['age'] = 'FIELD(crash_fatality_dev.age, "0-1", "2-4", "5-7", "8-10", "11-13", "14-15", "16-17", "18-20", "21-65", "66+") as sort';
	$sort_fatality['driver_age'] = 'FIELD(crash_fatality_dev.driver_age, "<16", "16-17 ", "18-20", "21-65", ">65") as sort';
	$sort_fatality['sex'] = 'FIELD(crash_fatality_dev.sex, "M", "F") as sort';
	$sort_fatality['alcohol_involvement'] = 'FIELD(crash_fatality_dev.alcohol_involvement, "Alcohol Involved", "No Alcohol Involved") as sort';
	$sort_fatality['light_condition'] = 'FIELD(crash_fatality_dev.light_condition, "Light", "Dark--Lighted", "Dark", "Other") as sort';
	$sort_fatality['veh_age'] = 'crash_fatality_dev.veh_age as sort';
	$sort_fatality['restraint'] = 'FIELD(crash_fatality_dev.restraint, "Unrestrained", "Suboptimal", "Optimal") as sort';
	$sort_fatality['urbanization_soc'] = 'FIELD(urbanization_soc, "Large Metro", "S/M Metro", "Nonmetro") as sort';
	$sort_fatality['urbanization_acc'] = 'FIELD(urbanization_acc, "Large Metro", "S/M Metro", "Nonmetro") as sort';
	$sort_fatality['education'] = 'crash_fatality_dev.education as sort';
	$sort_fatality['income'] = 'crash_fatality_dev.income as sort';
	$sort_fatality['white'] = 'crash_fatality_dev.white as sort';
	$sort_fatality['black'] = 'crash_fatality_dev.black as sort';
	$sort_fatality['other'] = 'crash_fatality_dev.other as sort';
	$sort_fatality['hispanic'] = 'crash_fatality_dev.hispanic as sort';
	$sort_fatality['non_hispanic'] = 'crash_fatality_dev.non_hispanic as sort';
	$sort_fatality['education'] = 'crash_fatality_dev.education as sort';
	$sort_fatality['income'] = 'crash_fatality_dev.income as sort';
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
		if($group_type=="model_year")
			{
				$group_type="veh_age";
			}
		$race=$fatality_white_quintile_groups;
			if($subset_variable=='black')
				{
					$race=$fatality_black_quintile_groups;
				}
			if($subset_variable=='other')
				{
				$race=$fatality_other_quintile_groups;
				}
			if($subset_variable=='hispanic')
				{
				$race=$fatality_hispanic_quintile_groups;
				}
			if($subset_variable=='nonhispanic')
				{
				$race=$fatality_nonhispanic_quintile_groups;
				}
			if($subset_variable=='education')
				{
				$race=$fatality_education_quintile_groups;
				}
			if($subset_variable=='income')
				{
				$race=$fatality_income_quintile_groups;
				}
	
		if ($subset_category != "all"){
			if($subset_category=='white')
			{
				$subset_string = "WHERE (crash_fatality_dev.white)";
			}
			else if($subset_category=='black')
			{
				$subset_string = "WHERE (crash_fatality_dev.black)";
			}
			else if($subset_category=='other')
			{
				$subset_string = "WHERE (crash_fatality_dev.black)";
			}
			else if($subset_category=='first'&& $subset_variable=='white')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '56.7% and Below')";
			}
			else if($subset_category=='second'&& $subset_variable=='white')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '56.7%-74.2%')";
			}
			else if($subset_category=='third'&& $subset_variable=='white')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '74.2%-84.3%')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='white')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '84.3%-92.1%')";
			}else if($subset_category=='fifth'&& $subset_variable=='white')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '92.1% and Above')";
			}
			else if($subset_category=='first'&& $subset_variable=='black')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '1.2% and Below')";
			}
			else if($subset_category=='second'&& $subset_variable=='black')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '1.2%-3.4%')";
			}
			else if($subset_category=='third'&& $subset_variable=='black')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '3.4%-7.8%')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='black')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '7.8%-19.4%')";
			}
			else if($subset_category=='fifth'&& $subset_variable=='black')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '19.4% and Above')";
			}
			else if($subset_category=='first'&& $subset_variable=='other')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '4.1% and Below')";
			}
			else if($subset_category=='second'&& $subset_variable=='other')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '4.1%-7.3%')";
			}
			else if($subset_category=='third'&& $subset_variable=='other')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '7.3%-11.8%')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='other')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '11.8%-21.6%')";
			}
			else if($subset_category=='fifth'&& $subset_variable=='other')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '21.6% and Above')";
			}
			else if($subset_category=='first'&& $subset_variable=='hispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '2.8% and Below')";
			}
			else if($subset_category=='second'&& $subset_variable=='hispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '2.8%-6.1%')";
			}
			else if($subset_category=='third'&& $subset_variable=='hispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '6.1%-12.6%')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='hispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '12.6%-29.5%')";
			}
			else if($subset_category=='fifth'&& $subset_variable=='hispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '29.5% and Above')";
			}
			else if($subset_category=='first'&& $subset_variable=='nonhispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.non_hispanic = '70.5% and Below')";
			}
			else if($subset_category=='second'&& $subset_variable=='nonhispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.non_hispanic= '70.5%-87.4%')";
			}
			else if($subset_category=='third'&& $subset_variable=='nonhispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.non_hispanic = '87.4%-93.9%')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='nonhispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.non_hispanic = '93.9%-97.2%')";
			}
			else if($subset_category=='fifth'&& $subset_variable=='nonhispanic')
			{
				$subset_string ="WHERE (crash_fatality_dev.non_hispanic = '97.2% and Above')";
			}
			else if($subset_category=='first'&& $subset_variable=='education')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '15.6% and Below')";
			}
			else if($subset_category=='second'&& $subset_variable=='education')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '15.6%-22.0%')";
			}
			else if($subset_category=='third'&& $subset_variable=='education')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '22.0%-30.4%')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='education')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '30.4%-43.8%')";
			}
			else if($subset_category=='fifth'&& $subset_variable=='education')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '43.8% and Above')";
			}
			else if($subset_category=='first'&& $subset_variable=='income')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = 'Less than $40,179')";
			}
			else if($subset_category=='second'&& $subset_variable=='income')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '$40,179 to $49,190')";
			}
			else if($subset_category=='third'&& $subset_variable=='income')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '$49,190 to $60,224')";
			}
			else if($subset_category=='fourth'&& $subset_variable=='income')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = '$60,224 to $77,298')";
			}
			else if($subset_category=='fifth'&& $subset_variable=='income')
			{
				$subset_string ="WHERE (crash_fatality_dev.".$subset_variable." = 'Greater than $77,298')";
			}													
			else
			{
			$subset_string = "WHERE (crash_fatality_dev.".$subset_variable." = '".$subset_category."')";
	    	}
	    }
		$dv_relevance = '0';
		$dv_interventions = array();
		
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
					$joinbloc[] = "(crash_fatality_dev.".$col." = ".$intervention_type.".".$col.")";
				}
				$joins.= " LEFT JOIN $intervention_type ON (".implode(" AND ", $joinbloc).") ";
			}
			
			//pick relevance column for each countermeasure, apply coefficient
			$counter = 0;
			$builder_array = array();
			while ($counter < count($filter_array)){
				$builder_array[] = "(1 - IFNULL(". $filter_array[$counter].".relevance, 0) * ".$coeff_array[$counter].")";
				if ($filter_array[$counter] == 'fcw'){
					//FCW shifts DV - TODO expand to include future DV shifting countermeasures
					//$dv_interventions[] = $filter_array[$counter].".relevance * ".$coeff_array[$counter];
					$dv_interventions[] = "IFNULL(fcw.relevance, IFNULL(fcw_lv_decel.relevance, IFNULL(fcw_lv_slower.relevance, fcw_lv_stopped.relevance))) * ".$coeff_array[$counter];
				}
				if ($filter_array[$counter] == 'aeb'){
					//FCW shifts DV - TODO expand to include future DV shifting countermeasures
					//$dv_interventions[] = $filter_array[$counter].".relevance * ".$coeff_array[$counter];
					$dv_interventions[] = "IFNULL(aeb.relevance, IFNULL(aeb_lv_decel.relevance, IFNULL(aeb_lv_slower.relevance, aeb_lv_stopped.relevance))) * ".$coeff_array[$counter];
				}
				$counter++;
			}
			
			
			
			
			if (count($filter_array) > 0){
				$filter_query_string = implode(" * ", $builder_array);
				if (count($dv_interventions)> 0){
					$dv_relevance = '('.implode(' * ', $dv_interventions).')';
					//$dv_relevance = "IFNULL(fcw.relevance, IFNULL(fcw_lv_decel.relevance, IFNULL(fcw_lv_slower.relevance, fcw_lv_stopped.relevance)))";
					$dv_shift_key = "concat(CAST((".$dv_relevance."*10) AS SIGNED)*10, '-', CAST(fatality_dv.mean_dv*10 AS SIGNED)*10, '-',CAST(fatality_dv.sd_dv*10 AS SIGNED)*10) as temp_key";
					$query = "SELECT logninv.res AS dv_shift_value, ".$full_fatality_selects.", ".$sort_dv[$group_type]." FROM (SELECT crash_fatality_dev.".$group_type." as crash_type, ".$race." crash_fatality_dev.crash_direction as crash_direction, crash_fatality_dev.age as age, crash_fatality_dev.driver_age as driver_age, sum(frequency) as frequency, sum(frequency) as fatality_count, sum(frequency) as fatality_count_adj, (0 + ".$filter_query_string.") as mitigation_factor, ".$fatality_restraint_groups.$fatal_injury_select_vars.", ".$fatal_risk_select_vars.", ".$fatal_dv_select_vars.", ".$dv_relevance." as dv_shift_relevance, 0 as dv_shift_value, ".$dv_shift_key." FROM `crash_fatality_dev` ".$joins." LEFT JOIN fatality_dv ON crash_fatality_dev.fatality_dv_key = fatality_dv.fatality_dv_key  ".$subset_string." GROUP BY crash_fatality_dev.".$group_type.$fatal_injury_calc_groups.", mitigation_factor, dv_shift_relevance, temp_key) AS A LEFT JOIN logninv ON temp_key = logninv.logninv_key ORDER BY sort";
				} else {
					$query = "SELECT distinct crash_fatality_dev.".$group_type." as crash_type, crash_fatality_dev.driver_age as driver_age,".$race." sum(frequency) as fatality_count, sum(frequency *(0 + ".$filter_query_string.")) as fatality_count_adj, (0 + ".$filter_query_string.") as mitigation_factor, ".$fatality_restraint_groups.$fatal_risk_select_vars.", ".$sort_fatality[$group_type]." FROM `crash_fatality_dev` ".$joins.$subset_string." GROUP BY crash_fatality_dev.".$group_type.$fatal_risk_groups." driver_age, mitigation_factor ORDER BY sort";
				}					
			}
		} else {
			
			
			
			
			$query =  "SELECT distinct crash_fatality_dev.".$group_type." as crash_type, sum(frequency) as fatality_count, sum(frequency) as fatality_count_adj, crash_fatality_dev.veh_age as veh_age, crash_fatality_dev.driver_age as driver_age, 1 as mitigation_factor, ".$fatality_restraint_groups.$race.$fatal_risk_select_vars.", ".$sort_fatality[$group_type]." FROM `crash_fatality_dev` ".$subset_string." GROUP BY crash_fatality_dev.".$group_type.$fatal_risk_groups." driver_age, veh_age, mitigation_factor ORDER BY sort";
		}
	} else {
		
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
					//$dv_interventions[] = $filter_array[$counter].".relevance * ".$coeff_array[$counter];
					$dv_interventions[] = "IFNULL(fcw.relevance, IFNULL(fcw_lv_decel.relevance, IFNULL(fcw_lv_slower.relevance, fcw_lv_stopped.relevance))) * ".$coeff_array[$counter];
				}
				if ($filter_array[$counter] == 'aeb' && $outcome_variable == 'injury_count'){
					//FCW shifts DV - TODO expand to include future DV shifting countermeasures
					//$dv_interventions[] = $filter_array[$counter].".relevance * ".$coeff_array[$counter];
					$dv_interventions[] = "IFNULL(aeb.relevance, IFNULL(aeb_lv_decel.relevance, IFNULL(aeb_lv_slower.relevance, aeb_lv_stopped.relevance))) * ".$coeff_array[$counter];
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
						$dv_shift_key = "concat(CAST((".$dv_relevance."*10) AS SIGNED)*10, '-', CAST(dv.mean_dv*10 AS SIGNED)*10, '-',CAST(dv.sd_dv*10 AS SIGNED)*10) as temp_key";
						$query = "SELECT logninv.res AS dv_shift_value, ".$full_injury_selects.", ".$sort_dv[$group_type]." FROM (SELECT crash_injury_dev.".$group_type." as crash_type, crash_injury_dev.crash_direction as crash_direction, crash_injury_dev.age as age, crash_injury_dev.driver_age as driver_age, sum(frequency) as frequency, sum(frequency) as injury_count, sum(frequency) as injury_count_adj, (0 + ".$filter_query_string.") as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", ".$dv_relevance." as dv_shift_relevance, 0 as dv_shift_value, ".$dv_shift_key." FROM `crash_injury_dev` ".$joins." LEFT JOIN dv ON crash_injury_dev.dv_key = dv.dv_key LEFT JOIN restraint on restraint.restraint_key = crash_injury_dev.restraint_key ".$subset_string." GROUP BY crash_injury_dev.".$group_type.$injury_calc_groups.", mitigation_factor, dv_shift_relevance, temp_key) AS A LEFT JOIN logninv ON temp_key = logninv.logninv_key ORDER BY sort";
					} else {
						$query = "SELECT crash_injury_dev.".$group_type." as crash_type,  crash_injury_dev.crash_direction as crash_direction, crash_injury_dev.age as age, crash_injury_dev.driver_age as driver_age, sum(frequency) as frequency, sum(frequency) as injury_count, sum(frequency) as injury_count_adj, (0 + ".$filter_query_string.") as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", ".$dv_relevance." as dv_shift_relevance, 0 as dv_shift_value, ".$sort[$group_type]." FROM `crash_injury_dev` ".$joins." LEFT JOIN dv ON crash_injury_dev.dv_key = dv.dv_key LEFT JOIN restraint on restraint.restraint_key = crash_injury_dev.restraint_key ".$subset_string." GROUP BY crash_injury_dev.".$group_type.$injury_calc_groups.", mitigation_factor ORDER BY sort";
					}
				}
				error_log(print_r($query,true));
				//print_r($query);
				//error_log($query,3,$path_filename);
				//header($query);
				//file_put_contents($path_filename, $query, FILE_APPEND);
				
			}
		} else {
			if ($outcome_variable == 'person_count'){
				$query =  "SELECT distinct ".$group_type." as crash_type, crash_injury_dev.driver_age as driver_age, sum(frequency) as person_count, sum(frequency) as person_count_adj, ".$sort[$group_type]." FROM `crash_injury_dev` ".$subset_string." GROUP BY crash_injury_dev.".$group_type.", driver_age ORDER BY sort";
			} else if ($outcome_variable == 'injury_count'){
				$query =  "SELECT ".$group_type." as crash_type, crash_injury_dev.crash_direction as crash_direction, crash_injury_dev.age as age, crash_injury_dev.driver_age as driver_age, crash_injury_dev.veh_age as veh_age , sum(frequency) as frequency, sum(frequency)  as injury_count, sum(frequency) as injury_count_adj, 1 as mitigation_factor, ".$restraint_select_vars.", ".$injury_select_vars.", ".$risk_select_vars.", ".$dv_select_vars.", 0 as dv_shift_relevance, 0 as dv_shift_value, ".$sort[$group_type]."  FROM `crash_injury_dev` "." LEFT JOIN dv ON crash_injury_dev.dv_key = dv.dv_key  LEFT JOIN restraint on restraint.restraint_key = crash_injury_dev.restraint_key ".$subset_string." GROUP BY crash_injury_dev.".$group_type.$injury_calc_groups." ORDER BY sort";
			}
		}
	}
	error_log(print_r($query,true));
	//print_r($query);
	//error_log($query,3,$path_filename);
	//header($query);
	//file_put_contents($path_filename, $query, FILE_APPEND);
	$res=$utmost_link->query($query);
	
	while ($row = mysqli_fetch_assoc($res)){
			$data[] = $row;
	}
	$res = null;
	
	echo json_encode($data);

?>
