//TODO: Convert library to onload

var data_library = {
	"keys" : {
		"crash_type" : {
			"Animal" : 1,
			"Avoidance" : 2,
			"Backing" : 3,
			"Change lanes" : 4,
			"Control Loss" : 5,
			"Drifting" : 6,
			"Object" : 7,
			"Opp direction" : 8,
			"Other" : 9,
			"Parking" : 10,
			"Pedestrian" : 11,
			"Cyclist" : 12,
			"Road Departure" : 14,
			"Rollover" : 15,
			"Run light/stop" : 16,
			"Turning/same dir" : 17,
			"Veh Failure" : 18,
			"XPaths@Non-Signal" : 19,
			"XPaths@Signal" : 20,
			"Rear End/LV Decel" : 21,
			"Rear End/LV Slower" : 22,
			"Rear End/LV Stopped" : 23,
			"Rear End/Other" : 24,
			"No Driver" : 31,
			"Non-collision" : 32
		},
		"crash_direction" : {
			"Far Side": 1,
			"Frontal": 2,
			"Motorcycle": 3,
			"Near Side": 4,
			"Other": 5,
			"Rear": 6,
			"Rollover": 7,
			"Pedestrian": 8,
			"Cyclist": 9
		},
		"vehicle_type" : {
			"Car" : 1,
			"Pickup" : 1,
			"SUV" : 1,
			"Van" : 1,
			"Other" : 2,
			"Motorcycle" : 6,
			"Pedestrian" : 7,
			"Cyclist" : 7,
			"Heavy Truck" : 2,
			"Large Bus" : 2,
			"Snowmobile/ATV": 6,
			"Golf cart/LSV": 6
		},
		"age":{
			"0-1": 1,
			"2-4": 2,
			"5-7": 3,
			"8-10": 4,
			"11-13": 5,
			"14-15": 6,
			"16-17": 7,
			"18-20": 8,
			"21-65": 9,
			"66+": 0
		},
		"age_fatality_dv":{
			"0-1": 1,
			"2-4": 1,
			"5-7": 1,
			"8-10": 1,
			"11-13": 1,
			"14-15": 1,
			"16-17": 1,
			"18-20": 1,
			"21-65": 2,
			"66+": 3
		},
		"restraint_fatality_dv":{
			"Unknown" : 1,
			"None" : 1,
			"Suboptimal": 2,
			"Optimal" : 3
		},
		"sex": {
			"Female" : 2,
			"Male":	1
		},
		"light_condition" :{
			"Dark": 1,
			"Light": 2,
			"Dark--Lighted": 3,
			"Other": 4
		},
		"alcohol_involvement" : {
			"Alcohol Involved" : 1,
			"No Alcohol Involved" : 2,
			"" : 2
		},
		"urbanization":{
			"3": "Urban",
			"2": "Suburban",
			"1": "Rural"
		}
		
	},
	"translations":{
		"urbanization":{
			"3": "Urban",
			"2": "Suburban",
			"1": "Rural"
		},
		"sex":{
			"1": "Male",
			"2": "Female",
			"" : "Unknown",
			"9" : "Unknown",
			"8" : "Unknown"
		},
		"alcohol_involvement": {
			"1": "Alcohol Involved",
			"2": "No Alcohol Involved",
			"" : "Unknown"
		},
		"age": {
			"0-1": "0-1",
			"'2-4": "2-4",
			"'5-7": "5-7",
			"'8-10": "8-10",
			"'11-13": "11-13",
			"14-15": "14-15",
			"16-17": "16-17",
			"18-20": "18-20",
			"21-65": "21-65",
			"66+": "66+"
		}
	},
	"colmap":{
		"ctype25": "crash_type",
		"crashdir": "crash_direction",
		"impactloc": "impactloc",
		"Distr3": "urbanization",
		"veh_type": "vehicle_type", 
		"AGE_IM": "age",
		"driver_age" : "driver_age",
		"SEX_IM" : "sex",
		"driver_sex" : "driver_sex",
		"ALCHL_IM":	"alcohol_involvement",
		"lighting": "light_condition",
		"ped_alc" :	"ped_alc",
		"annfrequency" : "frequency"

	},
	"field_order": [
		"crash_type",
		"crash_direction",
		"vehicle_type",
		"age",
		"driver_age",
		"sex",
		"driver_sex",
		"alcohol_involvement",
		"light_condition",
		"ped_alc",
		"impactloc",
		"urbanization",
		"frequency",
		"dv_key",
		"restraint_key",
		"headlighting_key",
		"cta_key",
		"ctcd_key",
		"coefficient",
		"unrestrained",
		"belted",
		"child_optimal",
		"child_suboptimal",
		"helmet",
		"risk_unrestrained",
		"risk_belted",
		"risk_child_optimal",
		"risk_child_suboptimal",
		"risk_helmet"
	],
	"average_driver_age":{
		"<16": 9.4938326,
		">65": 74.0229084,
		"16-17": 16.5882896,
		"18-20": 19.0133308,
		"21-65": 39.4919973,
		"" : 39.4919973
	},
	"average_age":{
		"0-1": 0.5557922,
		"11-13": 12.0243847,
		"14-15": 14.5795634,
		"16-17": 16.5586375,
		"18-20": 18.9991067,
		"2-4": 2.9963563,
		"21-65": 39.2304062,
		"5-7": 5.9917233,
		"66+": 74.2289516,
		"8-10": 8.9869283
	},
	"estimate" : {
		"intercept" : -3.1466,
		"dr_age" : -0.0101,
		"dr_alch" : -1.2102,
		"impact2" : {
			"Far Side" : -0.1457,
			"Frontal" : 0,
			"Near Side" : 1.2612,
			"Rear" : -0.5949,
			"Rollover" : 2.2147,
			"Other": 0,
			"Pedestrian": 0,
			"Motorcycle": 0,
			"Cyclist": 0
		},
		"driver2co" : -6.307,
		"vehicle_age" : 0.1301,
		"driver_rest" : -0.5701,
		"seat_front" : 1.4898,
		"age_im" : 0.2621,
		"opt_suboptimal" : 0.9317,
		"opt_unrestrained" : 5.4699,
		"age_im_seat_front" : -0.1438,
		"age_im_opt_suboptimal": -0.06045,
		"age_im_opt_unrestrained" : -0.3694
	},
	"mais3": {
		"ldvmph": {
			"Far Side": 3.1708,
			"Frontal": 3.1907,
			"Motorcycle": 0,
			"Near Side": 3.9403,
			"Other": 2.0335,
			"Rear": 3.6563,
			"Rollover": 0,
			"Pedestrian": 0,
			"Cyclist": 0
		},
		"intercept": {
			"Far Side": -12.4174,
			"Frontal": -13.3479,
			"Motorcycle": -1.369,
			"Near Side": -14.8151,
			"Other": -8.1894,
			"Rear": -15.899,
			"Rollover": -3.5176,
			"Pedestrian": -2.1196,
			"Cyclist": -2.1196
		},
		"age": { 
			"Far Side": 0.0438,
			"Frontal": 0.0368,
			"Motorcycle": 0.00711,
			"Near Side": 0.0324,
			"Other": 0.0322,
			"Rear": -0.0366,
			"Rollover": 0.029,
			"Pedestrian": 0.0115,
			"Cyclist": 0.0115
		},
		"Female": { 						
			"Far Side": -0.0291,
			"Frontal": -0.3483,
			"Motorcycle": 0,
			"Near Side": 0.4131,
			"Other": -0.405,
			"Rear": 0.071,
			"Rollover": 0.2214,
			"Pedestrian": 0,
			"Cyclist": 0
		},
		"Dark":  {
			"Far Side": 0,
			"Frontal": 0,
			"Motorcycle": 0.3605,
			"Near Side": 0,
			"Other": 0,
			"Rear": 0,
			"Rollover": 0,
			"Pedestrian": 1.1098,
			"Cyclist": 1.1098
		},
		"Dark--Lighted":  {
			"Far Side": 0,
			"Frontal": 0,
			"Motorcycle": 0.0607,
			"Near Side": 0,
			"Other": 0,
			"Rear": 0,
			"Rollover": 0,
			"Pedestrian": 0.6702,
			"Cyclist": 0.6702
		},
		"ped_alc":  {
			"Far Side": 0,
			"Frontal": 0,
			"Motorcycle": 0,
			"Near Side": 0,
			"Other": 0,
			"Rear": 0,
			"Rollover": 0,
			"Pedestrian": 0.7663,
			"Cyclist": 0.7663
		},
		"alcohol_involvement":  {
			"Far Side":  1.7781,
			"Frontal": 0.977,
			"Motorcycle": 0.5023,
			"Near Side": 0.1053,
			"Other": 0.331,
			"Rear": 0.0256,
			"Rollover": -1.4201,
			"Pedestrian": 0,
			"Cyclist": 0
		},
		"beltuse":  {
			"Far Side": -2.5032,
			"Frontal": -1.7729,
			"Motorcycle": 0,
			"Near Side": -0.9058,
			"Other": -1.7181,
			"Rear": -1.8565,
			"Rollover": -1.4651,
			"Pedestrian": 0,
			"Cyclist": 0
		}
		
	},
	"risk_swap" : {
		"side" : {
			"Far Side": "Frontal",
			"Frontal": "Far Side",
			"Motorcycle": "Motorcycle",
			"Near Side": "Rear",
			"Other": "Other",
			"Rear": "Far Side",
			"Rollover": "Rollover",
			"Pedestrian": "Pedestrian",
			"Cyclist": "Cyclist"
		},
		"rear" : {
			"Far Side": "Far Side",
			"Frontal": "Rear",
			"Motorcycle": "Motorcycle",
			"Near Side": "Near Side",
			"Other": "Other",
			"Rear": "Frontal",
			"Rollover": "Rollover",
			"Pedestrian": "Pedestrian",
			"Cyclist": "Cyclist"
		}
	}	
};

var new_coefficient = function(age, crash_direction) {
	if (age < 14) {
		return 0;
	}
	return data_library['mais3']['ldvmph'][crash_direction];
}

var generate_unrestrained = function(crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) {
	if (data_library['average_age'][age] > 14 || crash_direction == 'Cyclist' || crash_direction == 'Pedestrian') {
		//adult calcs
		var res = data_library['mais3']['intercept'][crash_direction];
		if (sex == 'Female') {
			res += data_library['mais3']['Female'][crash_direction];
		}
		res += data_library['average_age'][age] * data_library['mais3']['age'][crash_direction];
		if (light_condition == 'Dark') {
			res += data_library['mais3']['Dark'][crash_direction];
		}else if (light_condition == 'Dark--Lighted') {
			res += data_library['mais3']['Dark--Lighted'][crash_direction];
		}
		if (ped_alc == '1') {
			res += data_library['mais3']['ped_alc'][crash_direction];
		}
		if (alcohol_involvement == 'Alcohol Involved') {
			res += data_library['mais3']['alcohol_involvement'][crash_direction];
		}
		return res;
	} 
	else {
		//child calcs
		res = data_library['estimate']['intercept'];
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age'];
		if (alcohol_involvement == 'Alcohol Involved') {
			res += data_library['estimate']['dr_alch'];
		}
		res += data_library['estimate']['impact2'][crash_direction];
		res += data_library['estimate']['driver2co'] * .8;
		res += data_library['estimate']['vehicle_age'] * 9;
		res += data_library['estimate']['driver_rest'] * .83;
		res += data_library['estimate']['seat_front'] * .1;
		res += data_library['estimate']['age_im'] * data_library['average_age'][age];
		res += data_library['estimate']['opt_unrestrained'];
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1;
		res += data_library['estimate']['age_im_opt_unrestrained'] * data_library['average_age'][age];
		return res;
	}
}

var generate_belted = function( crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) {
	if (data_library['average_age'][age] > 14 || crash_direction == 'Cyclist' || crash_direction == 'Pedestrian') {
		//adult calcs
		var res = data_library['mais3']['intercept'][crash_direction];
		res += data_library['mais3']['beltuse'][crash_direction];
		if (sex == 'Female') {
			res += data_library['mais3']['Female'][crash_direction];
		}
		res += data_library['average_age'][age] * data_library['mais3']['age'][crash_direction];
		if (light_condition == 'Dark') {
			res += data_library['mais3']['Dark'][crash_direction];
		}else if (light_condition == 'Dark--Lighted') {
			res += data_library['mais3']['Dark--Lighted'][crash_direction];
		}
		if (ped_alc == '1') {
			res += data_library['mais3']['ped_alc'][crash_direction];
		}
		if (alcohol_involvement == 'Alcohol Involved') {
			res += data_library['mais3']['alcohol_involvement'][crash_direction];
		}
		return res;
	} 
	else {
		//child calcs - a 'belted' child is considered unrestrained
		res = data_library['estimate']['intercept'];
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age'];
		if (alcohol_involvement == 'Alcohol Involved') {
			res += data_library['estimate']['dr_alch'];
		}
		res += data_library['estimate']['impact2'][crash_direction];
		res += data_library['estimate']['driver2co'] * .8;
		res += data_library['estimate']['vehicle_age'] * 9;
		res += data_library['estimate']['driver_rest'] * .83;
		res += data_library['estimate']['seat_front'] * .1;
		res += data_library['estimate']['age_im'] * data_library['average_age'][age];
		res += data_library['estimate']['opt_unrestrained'];
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1;
		res += data_library['estimate']['age_im_opt_unrestrained'] * data_library['average_age'][age];
		return res;
	}
}

var generate_child_optimal = function(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) {
	if (crash_direction == 'Cyclist' || crash_direction == 'Pedestrian'){
		return 0;
	}
	else {
		res = data_library['estimate']['intercept'];
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age'];
		if (alcohol_involvement == 'Alcohol Involved') {
			res += data_library['estimate']['dr_alch'];
		}
		res += data_library['estimate']['impact2'][crash_direction];
		res += data_library['estimate']['driver2co'] * .8;
		res += data_library['estimate']['vehicle_age'] * 9;
		res += data_library['estimate']['driver_rest'] * .83;
		res += data_library['estimate']['seat_front'] * .1;
		res += data_library['estimate']['age_im'] * data_library['average_age'][age];
		//res += 0   #opt_optimal
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1
		// res += 0 #age_im_opt_optimal
		return res;
	}
}

var generate_child_suboptimal = function(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) {
	if (crash_direction == 'Cyclist' || crash_direction == 'Pedestrian') { //pedestrian or cyclist
		return 0;
	}
	else{
		res = data_library['estimate']['intercept'];
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age'];
		if (alcohol_involvement == 'Alcohol Involved') {
			res += data_library['estimate']['dr_alch'];
		}
		res += data_library['estimate']['impact2'][crash_direction];
		res += data_library['estimate']['driver2co'] * .8;
		res += data_library['estimate']['vehicle_age'] * 9;
		res += data_library['estimate']['driver_rest'] * .83;
		res += data_library['estimate']['seat_front'] * .1;
		res += data_library['estimate']['age_im'] * data_library['average_age'][age];
		res += data_library['estimate']['opt_suboptimal'];
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1;
		res += data_library['estimate']['age_im_opt_suboptimal'] * data_library['average_age'][age];
		return res;
	}
}

var generate_helmet = function(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age, vehicle_type) {
	if (vehicle_type == 'Motorcycle') {
		return (generate_unrestrained(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) -.14);
	}
	else {
		return 0;
	}
}

//Trapezoidal sum function for injury integration
var utmost_injury_min_dv = 1;
var utmost_injury_max_dv = 150;
var utmost_injury_step_size = 1;
var pdf_root2PI = 2.5066282746;

var utmost_injury_trapezoidal_sum_row = function(mean, stdev,  coeff, intercept, dv_shift){
	var step_count = 0;
	var sum = 0;
	var result = 0;
	for (var i = utmost_injury_min_dv; i <= utmost_injury_max_dv; i+= utmost_injury_step_size){
		sum += (utmost_lognormal_pdf(mean, stdev, i+dv_shift) * utmost_logistic_injury(coeff, intercept, i) + utmost_lognormal_pdf(mean, stdev, (i+ dv_shift+utmost_injury_step_size)) * utmost_logistic_injury(coeff, intercept, i+utmost_injury_step_size));
		step_count++;
	}
	result = ((utmost_injury_max_dv-utmost_injury_min_dv)/(2 * step_count)) * sum;
	return result;
}	



var utmost_lognormal_pdf = function(mean, stdev, dv){
	return (1/(dv * stdev * pdf_root2PI)) * Math.exp(-1*(((Math.log(dv)-mean)*(Math.log(dv)-mean))/(2 * stdev * stdev)));
}

var utmost_logistic_injury = function(coeff, intercept, dv){
	return 1/(1+Math.exp(-1*(intercept + coeff * Math.log(dv))));
}

var utmost_injury_risk_dv = function(row){
	var risk_total = 0;
	
	//trapezoidal sum for integration
	if (row.p_unrestrained > 0 ){
		risk_total += row.p_unrestrained * utmost_injury_trapezoidal_sum_row(row.mean_dv, row.sd_dv, row.coeff, row.i_unrestrained, row.dv_shift);
	}
	if (row.p_belted > 0 ){
		risk_total += row.p_belted * utmost_injury_trapezoidal_sum_row(row.mean_dv, row.sd_dv, row.coeff, row.i_belted, row.dv_shift);
	}
	if (row.p_child_optimal > 0 ){
		risk_total += row.p_child_optimal * utmost_injury_trapezoidal_sum_row(row.mean_dv, row.sd_dv, row.coeff, row.i_child_optimal, row.dv_shift);
	}
	if (row.p_child_suboptimal > 0 ){
		risk_total += row.p_child_suboptimal * utmost_injury_trapezoidal_sum_row(row.mean_dv, row.sd_dv, row.coeff, row.i_child_suboptimal, row.dv_shift);
	}
	if (row.p_helmet > 0 ){
		risk_total += row.p_helmet * utmost_injury_trapezoidal_sum_row(row.mean_dv, row.sd_dv, row.coeff, row.i_helmet, row.dv_shift);
	}
	
	
	//Avoidance mitigation
	if (row.dv_shift > 0){
		var nonDV_mitigation_factor = (1 - (((1-row.mitigation_factor) / row.dv_shift_relevance)-1));
		var dv_correction_factor = (1 - row.dv_shift_relevance);
		risk_total *= (nonDV_mitigation_factor / dv_correction_factor);
	} else {
		risk_total *= row.mitigation_factor;  //rename to Avoidance factor?
	}
	
	
	
	//TODO: non-suppressive error handling
	if (isNaN(risk_total)){
		risk_total = 0;
	}
	
	return risk_total;
	
}
	
var utmost_injury_risk_nondv = function (row){
	/*No DV impact on crashes*/						
	var injury_risk = (	row.p_unrestrained * row.r_unrestrained + 
						row.p_belted * row.r_belted +
						row.r_child_optimal * row.r_child_optimal +
						row.p_child_suboptimal * row.r_child_suboptimal +
						row.p_helmet * row.r_helmet
						);
	var total_risk = injury_risk * row.mitigation_factor;
	
	return total_risk;
	
}
