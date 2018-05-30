import csv
import json
import math

def generate_coefficient(data_library, age, crash_direction) :
	if (data_library['average_age'][age] < 14) :
		#if average age <=14 then 0
		return 0
	else:
		# else match crash direction, lvdmph
		return data_library['mais3']['ldvmph'][crash_direction]


def generate_unrestrained(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) : 
	if (data_library['average_age'][age] > 14 or crash_direction == 'Cyclist' or crash_direction == 'Pedestrian') :
		#adult calcs
		res = data_library['mais3']['intercept'][crash_direction]
		if (sex == 'Female') : 
			res += data_library['mais3']['Female'][crash_direction]
		res += data_library['average_age'][age] * data_library['mais3']['age'][crash_direction]
		if (light_condition == 'Dark') :
			res += data_library['mais3']['Dark'][crash_direction]
		elif (light_condition == 'Dark--Lighted') :
			res += data_library['mais3']['Dark--Lighted'][crash_direction]
		if (ped_alc == '1') :
			res += data_library['mais3']['ped_alc'][crash_direction]
		if (alcohol_involvement == 'Alcohol Involved') :
			res += data_library['mais3']['alcohol_involvement'][crash_direction]
		return res
	else :
		#child calcs
		res = data_library['estimate']['intercept']
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age']
		if (alcohol_involvement == 'Alcohol Involved') :
			res += data_library['estimate']['dr_alch']
		res += data_library['estimate']['impact2'][crash_direction]
		res += data_library['estimate']['driver2co'] * .8
		res += data_library['estimate']['vehicle_age'] * 9
		res += data_library['estimate']['driver_rest'] * .83
		res += data_library['estimate']['seat_front'] * .1
		res += data_library['estimate']['age_im'] * data_library['average_age'][age]
		res += data_library['estimate']['opt_unrestrained']
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1
		res += data_library['estimate']['age_im_opt_unrestrained'] * data_library['average_age'][age]
		return res
	


def generate_belted(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) : 
	if (data_library['average_age'][age] > 14 or crash_direction == 'Cyclist' or crash_direction == 'Pedestrian') :
		#adult calcs
		res = data_library['mais3']['intercept'][crash_direction]
		res += data_library['mais3']['beltuse'][crash_direction]
		if (sex == 'Female') : 
			res += data_library['mais3']['Female'][crash_direction]
		res += data_library['average_age'][age] * data_library['mais3']['age'][crash_direction]
		if (light_condition == 'Dark') :
			res += data_library['mais3']['Dark'][crash_direction]
		elif (light_condition == 'Dark--Lighted') :
			res += data_library['mais3']['Dark--Lighted'][crash_direction]
		if (ped_alc == '1') :
			res += data_library['mais3']['ped_alc'][crash_direction]
		if (alcohol_involvement == 'Alcohol Involved') :
			res += data_library['mais3']['alcohol_involvement'][crash_direction]
		return res;
	else :
		#child calcs
		res = data_library['estimate']['intercept']
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age']
		if (alcohol_involvement == 'Alcohol Involved') :
			res += data_library['estimate']['dr_alch']
		res += data_library['estimate']['impact2'][crash_direction]
		res += data_library['estimate']['driver2co'] * .8
		res += data_library['estimate']['vehicle_age'] * 9
		res += data_library['estimate']['driver_rest'] * .83
		res += data_library['estimate']['seat_front'] * .1
		res += data_library['estimate']['age_im'] * data_library['average_age'][age]
		res += data_library['estimate']['opt_unrestrained']
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1
		res += data_library['estimate']['age_im_opt_unrestrained'] * data_library['average_age'][age]
		return res

def generate_child_optimal(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) : 
	if () : #pedestrian or cyclist
		return 0
	else:
		res = data_library['estimate']['intercept']
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age']
		if (alcohol_involvement == 'Alcohol Involved') :
			res += data_library['estimate']['dr_alch']
		res += data_library['estimate']['impact2'][crash_direction]
		res += data_library['estimate']['driver2co'] * .8
		res += data_library['estimate']['vehicle_age'] * 9
		res += data_library['estimate']['driver_rest'] * .83
		res += data_library['estimate']['seat_front'] * .1
		res += data_library['estimate']['age_im'] * data_library['average_age'][age]
		#res += 0   #opt_optimal
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1
		# res += 0 #age_im_opt_optimal
		return res

def generate_child_suboptimal(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) : 
	if () : #pedestrian or cyclist
		return 0
	else:
		res = data_library['estimate']['intercept']
		res += data_library['average_driver_age'][driver_age] * data_library['estimate']['dr_age']
		if (alcohol_involvement == 'Alcohol Involved') :
			res += data_library['estimate']['dr_alch']
		res += data_library['estimate']['impact2'][crash_direction]
		res += data_library['estimate']['driver2co'] * .8
		res += data_library['estimate']['vehicle_age'] * 9
		res += data_library['estimate']['driver_rest'] * .83
		res += data_library['estimate']['seat_front'] * .1
		res += data_library['estimate']['age_im'] * data_library['average_age'][age]
		res += data_library['estimate']['opt_suboptimal']
		res += data_library['estimate']['age_im_seat_front'] * data_library['average_age'][age] * .1
		res += data_library['estimate']['age_im_opt_suboptimal'] * data_library['average_age'][age]
		return res

def generate_helmet(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age, vehicle_type) : 
	if (vehicle_type == 'Motorcycle') :
		return (generate_unrestrained(data_library, crash_direction, sex, alcohol_involvement, light_condition, ped_alc, age, driver_age) -.14)
	else :
		return 0

def generate_risk_unrestrained(coeff, intercept, vehicle_type):
	#if (float(coeff) != 0):
	#	return 1/(1+math.exp(-1 * float(intercept)));
	#else:
	#	return "";
	
	if ((vehicle_type == 'Pedestrian') or (vehicle_type == 'Golf cart/LSV') or (vehicle_type == 'Snowmobile/ATV') or (vehicle_type == 'Cyclist')):
		return 1;
	else:
		return 1/(1+math.exp(-1 * float(intercept)));

def generate_risk_belted(coeff, ave_age, intercept, vehicle_type):
	if ((vehicle_type == 'Pedestrian') or (vehicle_type == 'Golf cart/LSV') or (vehicle_type == 'Snowmobile/ATV') or (vehicle_type == 'Cyclist')):
		return 1;
	#elif (float(coeff) != 0 and ave_age > 14):
	#	return 1/(1+math.exp(-1 * float(intercept)));
	else:
	#	return "";
		return 1/(1+math.exp(-1 * float(intercept)));

def generate_risk_child_optimal(coeff, ave_age, intercept, vehicle_type):
	if ((vehicle_type == 'Pedestrian') or (vehicle_type == 'Golf cart/LSV') or (vehicle_type == 'Snowmobile/ATV') or (vehicle_type == 'Cyclist')):
		return 1;
	#elif (float(coeff) != 0 and ave_age <= 14):
	#	return 1/(1+math.exp(-1 * float(intercept)));
	else:
	#	return "";
		return 1/(1+math.exp(-1 * float(intercept)));

def generate_risk_child_suboptimal(coeff, ave_age, intercept, vehicle_type):
	if ((vehicle_type == 'Pedestrian') or (vehicle_type == 'Golf cart/LSV') or (vehicle_type == 'Snowmobile/ATV') or (vehicle_type == 'Cyclist')):
		return 1;
	#elif (float(coeff) != 0 and ave_age <= 14):
	#	return 1/(1+math.exp(-1 * float(intercept)));
	else:
	#	return "";
		return 1/(1+math.exp(-1 * float(intercept)));

def generate_risk_helmet(vehicle_type, intercept):
	if ((vehicle_type == 'Pedestrian') or (vehicle_type == 'Golf cart/LSV') or (vehicle_type == 'Snowmobile/ATV') or (vehicle_type == 'Cyclist')):
		return 1;
	elif (vehicle_type == 'Motorcycle'):
		return 1/(1+math.exp(-1 * float(intercept)));
	else:
		return "";
		
	
def utmost_lognormal_pdf(mean, stdev, dv):
	pdf_root2PI = 2.5066282746;
	return (1/(dv * stdev * pdf_root2PI)) * math.exp(-1*(((math.log(dv)-mean)*(math.log(dv)-mean))/(2 * stdev * stdev)));

	
def utmost_logistic_injury(coeff, intercept, dv):
	return 1/(1+math.exp(-1*(intercept + coeff * math.log(dv))))


def fatality_trap_sum(coeff, intercept, mean_dv, sd_dv):
	utmost_injury_min_dv = 1;
	utmost_injury_max_dv = 150;
	utmost_injury_step_size = 1;
	step_count = 0;
	sum = 0;
	dv_shift = 0;
	
	for i in range(utmost_injury_min_dv, utmost_injury_max_dv):
		sum += (utmost_lognormal_pdf(mean, stdev, i) * utmost_logistic_injury(coeff, intercept, i) + utmost_lognormal_pdf(mean, stdev, (i+ utmost_injury_step_size)) * utmost_logistic_injury(coeff, intercept, i+utmost_injury_step_size));

	
	result = ((utmost_injury_max_dv-utmost_injury_min_dv)/(2 * (utmost_injury_max_dv-1))) * sum
	return result




with open('data_library.json', "r" ) as f:
	#Load JSON into data_library
	data_library = json.load(f)

#TODO: get datafile from arg
out_rows = []
datafile = 'crash_fatality_new.csv'
with open(datafile, "r") as df :
	#Load CSV
	raw_data = csv.reader(df)
	for data_row in raw_data:
		print(data_row)
		new_row = []
		new_row.append(data_row[0]) #'crash_type',
		new_row.append(data_row[1]) #'crash_direction',
		new_row.append(data_row[2]) #'vehicle_type',
		new_row.append(data_library['translations']['age'][data_row[3]]) #'age',
		new_row.append(data_row[4]) #'driver_age',
		new_row.append(data_library['translations']['sex'][data_row[5]]) #'sex',
		new_row.append(data_library['translations']['sex'][data_row[6]]) #'driver_sex',
		new_row.append(data_row[7]) #'alcohol_involvement',
		new_row.append(data_row[8]) #'light_condition',
		new_row.append(data_row[9]) #'ped_alc',
		new_row.append(data_row[10]) #'impactloc',
		new_row.append(data_row[11]) #'restraint_opt'
		new_row.append(data_row[13]) #'model_year',
		#new_row.append(data_library['translations']['urbanization'][data_row[14]]) #'urbanization',
		new_row.append(data_row[12])#'frequency',
		#Keys
		new_row.append(str(data_library['keys']['crash_type'][data_row[0]]) + str(data_library['keys']['crash_direction'][data_row[1]]) + str(data_library['keys']['alcohol_involvement'][data_row[7]])) #'dv_key = crash_type + crash_direction + alcohol_involvement',
		new_row.append(str(data_library['keys']['age'][data_library['translations']['age'][data_row[3]]]) + str(data_library['keys']['vehicle_type'][data_row[2]]) + str(data_library['keys']['alcohol_involvement'][data_row[7]])) #'restraint_key = age + vehicle_type + alcohol_involvement',
		new_row.append(str(data_library['keys']['crash_type'][data_row[0]]) + str(data_library['keys']['light_condition'][data_row[8]])) #'headlighting_key = crash_type + light_condition',
		new_row.append(str(data_library['keys']['crash_type'][data_row[0]]) + str(data_library['keys']['alcohol_involvement'][data_row[7]])) #'cta_key = crash_type + alcohol_involvement',
		new_row.append(str(data_library['keys']['crash_type'][data_row[0]]) + str(data_library['keys']['crash_direction'][data_row[1]])) #'ctcd_key = crash_type + crash_direction',
		new_row.append(str(data_library['keys']['crash_direction'][data_row[1]]) + str(data_library['keys']['age_fatality_dv'][data_library['translations']['age'][data_row[3]]]) + str(data_row[5]) + str(data_library['keys']['alcohol_involvement'][data_row[7]]) + str(data_library['keys']['restraint_fatality_dv'][data_row[11]])) #'fatality_dv_key = crash_direction + age + sex + alcohol + restraint',
		#Injury Risk Functions
		#coeff
		new_row.append(str(generate_coefficient(data_library, data_library['translations']['age'][data_row[3]], data_row[1])))  #'coefficient', 20
		#intercepts
		new_row.append(str(generate_unrestrained(data_library, data_row[1], data_library['translations']['sex'][data_row[5]], data_row[7], data_row[8], data_row[9], data_library['translations']['age'][data_row[3]], data_row[4]))) #'unrestrained',
		new_row.append(str(generate_belted(data_library, data_row[1], data_library['translations']['sex'][data_row[5]], data_row[7], data_row[8], data_row[9], data_library['translations']['age'][data_row[3]], data_row[4]))) #'belted',
		new_row.append(str(generate_child_optimal(data_library, data_row[1], data_library['translations']['sex'][data_row[5]], data_row[7], data_row[8], data_row[9], data_library['translations']['age'][data_row[3]], data_row[4])))#'child_optimal',
		new_row.append(str(generate_child_suboptimal(data_library, data_row[1], data_library['translations']['sex'][data_row[5]], data_row[7], data_row[8], data_row[9], data_library['translations']['age'][data_row[3]], data_row[4])))#'child_suboptimal',
		new_row.append(str(generate_helmet(data_library, data_row[1], data_library['translations']['sex'][data_row[5]], data_row[7], data_row[8], data_row[9], data_library['translations']['age'][data_row[3]], data_row[4], data_row[2])))#'helmet',
		#risks
		new_row.append(str(generate_risk_unrestrained(new_row[20], new_row[21], data_row[2])))#'risk_unrestrained',
		new_row.append(str(generate_risk_belted(new_row[20], data_library['average_age'][data_library['translations']['age'][data_row[3]]], new_row[22], data_row[2])))#'risk_belted',
		new_row.append(str(generate_risk_child_optimal(new_row[20], data_library['average_age'][data_library['translations']['age'][data_row[3]]], new_row[23], data_row[2])))#'risk_child_optimal',
		new_row.append(str(generate_risk_child_suboptimal(new_row[20], data_library['average_age'][data_library['translations']['age'][data_row[3]]], new_row[24], data_row[2])))#'risk_child_suboptimal',
		new_row.append(str(generate_risk_helmet(data_row[2], new_row[25])))#'risk_helmet'
		
		
		out_rows.append(new_row)
		

#Write outfile as pipe-delimited table
delim = '|'
with open('pdl_fatality.out', "w") as wo :
	for row in out_rows :
		wo.write(delim.join(row))
		wo.write('\n')