<?php

//	SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0))) as crash_count_adj FROM `utmost_data` WHERE 1  GROUP BY crash_type

// (0 value replaced by set of cms enabled)
		$data = array();
		$filters = $_GET["filter_string"];
		//$group_type = "crash_type";
		$group_type =  $_GET["group_type"];
		$subset_variable = $_GET["subset_variable"];
		$subset_category = $_GET["subset_category"];
		$subset_string = 'WHERE 1';
		if ($_GET["subset_category"] != "all"){
			$subset_string = "WHERE (".$subset_variable." = ".$subset_category.")";
		}
		$utmost_link= mysql_connect('cmisst-live-db.miserver.it.umich.edu', 'mtcf-sys', 'a1s2d3f4');
		mysql_select_db('UTMOST', $utmost_link);
		if ($_GET["filter_string"] != ""){
			$coeffs = $_GET["coeffs_string"];
			$filter_array = explode('~', $filters);
			$coeff_array = explode('~', $coeffs);
			//$query = "SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0))) as crash_count_adj FROM `utmost_data` GROUP BY crash_type";
			
			$counter = 0;
			$builder_array = array();
			while ($counter < count($filter_array)){
				$builder_array[] = "(".$filter_array[$counter]." * ".$coeff_array[$counter].")";
				$counter++;
			}
			
			if (count($filter_array) > 0){
				$filter_query_string = implode(" + ", $builder_array);
				$query = "SELECT distinct ".$group_type." as crash_type, sum(Frequency) as person_count, sum(Frequency *(1-(0 + ".$filter_query_string."))) as person_count_adj FROM `utmost_data` ".$subset_string." GROUP BY ".$group_type;
				error_log($query);
			}
		} else {
			$query = "SELECT distinct ".$group_type." as crash_type, sum(Frequency) as person_count, sum(Frequency) as person_count_adj FROM `utmost_data` ".$subset_string." GROUP BY ".$group_type;
		}
		error_log($query);
        $rs=mysql_query($query ,$utmost_link);
        while ($row = mysql_fetch_assoc($rs)){
                $data[] = $row;
        }
		
		echo json_encode($data);

?>
