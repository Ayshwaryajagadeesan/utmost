<?php

//	SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0))) as crash_count_adj FROM `utmost_data` WHERE 1  GROUP BY crash_type

// (0 value replaced by set of cms enabled)
		$filters = $_GET["filter_string"];
		if ($_GET["filter_string"] != ""){
			$coeffs = $_GET["coeffs_string"];
			$filter_array = explode('~', $filters);
			$coeff_array = explode('~', $filters);
			$utmost_link= mysql_connect('cmisst-live-db.miserver.it.umich.edu', 'mtcf-sys', 'a1s2d3f4');
			mysql_select_db('UTMOST', $utmost_link);
			$data = array();
			$query = "SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0))) as crash_count_adj FROM `utmost_data` GROUP BY crash_type";
			
			$counter = 0;
			$builder_array = array();
			while ($counter < count($filter_array)){
				$builder_array[] = "(".$filter_array[$counter]." * ".$coeff_array[$counter].")";
				$counter++;
			}
			
			if (count($filter_array) > 0){
				$filter_query_string = implode(" + ", $builder_array);
				$query = "SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency *(1-(0 + ".$filter_query_string."))) as crash_count_adj FROM `utmost_data` GROUP BY crash_type";
			}
		} else {
			$query = "SELECT distinct crash_type, sum(Frequency) as crash_count, sum(Frequency) as crash_count_adj FROM `utmost_data` GROUP BY crash_type";
		}
       
        $rs=mysql_query($query ,$utmost_link);
        while ($row = mysql_fetch_assoc($rs)){
                $data[] = $row;
        }
		
		echo json_encode($data);

?>