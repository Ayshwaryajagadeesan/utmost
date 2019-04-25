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
		res += data_library['average_driver_age'][driver_age]* data_library['estimate']['dr_age']
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
	if (crash_direction == 'Cyclist' or crash_direction == 'Pedestrian') : #pedestrian or cyclist
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
	if (crash_direction == 'Cyclist' or crash_direction == 'Pedestrian') : #pedestrian or cyclist
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

def generate_risk_unrestrained(coeff, intercept):
	if (float(coeff) == 0):
		return 1/(1+math.exp(-1 * float(intercept)));
	else:
		return "";

def generate_risk_belted(coeff, ave_age, intercept):
	if (float(coeff) == 0 and ave_age > 14):
		return 1/(1+math.exp(-1 * float(intercept)));
	else:
		return "";

def generate_risk_child_optimal(coeff, ave_age, intercept):
	if (float(coeff) == 0 and ave_age <= 14):
		return 1/(1+math.exp(-1 * float(intercept)));
	else:
		return "";

def generate_risk_child_suboptimal(coeff, ave_age, intercept):
	if (float(coeff) == 0 and ave_age <= 14):
		return 1/(1+math.exp(-1 * float(intercept)));
	else:
		return "";

def generate_risk_helmet(vehicle_type, intercept):
	if (vehicle_type == 'Motorcycle'):
		return 1/(1+math.exp(-1 * float(intercept)));
	else:
		return "";

with open('data_library.json', "r" ) as f:
	#Load JSON into data_library
	data_library = json.load(f)

#TODO: get datafile from arg
out_rows = []
datafile = 'utmost_base_injury.csv'
with open(datafile, "r") as df :
	#Load CSV
	raw_data = csv.reader(df)
	for data_row in raw_data:
		#print(data_row)
		new_row = []
		new_row.append(data_row[6]) #'crash_type',
		new_row.append(data_row[11]) #'crash_direction',
		new_row.append(data_row[13]) #'vehicle_type',
		new_row.append(data_library['translations']['age'][data_row[21]]) #'age',
		new_row.append(data_row[22]) #'driver_age',
		new_row.append(data_library['translations']['sex'][data_row[9]]) #'sex',
		new_row.append(data_library['translations']['sex'][data_row[8]]) #'driver_sex',
		new_row.append(data_library['translations']['alcohol_involvement'][data_row[18]]) #'alcohol_involvement',
		new_row.append(data_row[15]) #'light_condition',
		new_row.append(data_row[16]) #'ped_alc',
		new_row.append(data_row[12]) #'impactloc',
		new_row.append(data_library['translations']['urbanization'][data_row[20]]) #'urbanization',
		new_row.append(data_row[1])#'frequency',
		#Keys
		new_row.append(str(data_library['keys']['crash_type'][data_row[6]]) + str(data_library['keys']['crash_direction'][data_row[11]]) + str(data_row[18])) #'dv_key = crash_type + crash_direction + alcohol_involvement',
		new_row.append(str(data_library['keys']['age'][data_library['translations']['age'][data_row[21]]]) + str(data_library['keys']['vehicle_type'][data_row[13]]) + str(data_row[18])) #'restraint_key = age + vehicle_type + alcohol_involvement',
		new_row.append(str(data_library['keys']['crash_type'][data_row[6]]) + str(data_library['keys']['light_condition'][data_row[15]])) #'headlighting_key = crash_type + light_condition',
		new_row.append(str(data_library['keys']['crash_type'][data_row[6]]) + str(data_row[18])) #'cta_key = crash_type + alcohol_involvement',
		new_row.append(str(data_library['keys']['crash_type'][data_row[6]]) + str(data_library['keys']['crash_direction'][data_row[11]])) #'ctcd_key = crash_type + crash_direction',
		#Injury Risk Functions
		#coeff
		new_row.append(str(generate_coefficient(data_library, data_library['translations']['age'][data_row[21]], data_row[11])))  #'coefficient', 18
		#intercepts
		new_row.append(str(generate_unrestrained(data_library, 		data_row[11], data_library['translations']['sex'][data_row[9]], data_library['translations']['alcohol_involvement'][data_row[18]], data_row[15], data_row[16], data_library['translations']['age'][data_row[21]], data_row[22]))) #'unrestrained',
		new_row.append(str(generate_belted(data_library, 			data_row[11], data_library['translations']['sex'][data_row[9]], data_library['translations']['alcohol_involvement'][data_row[18]], data_row[15], data_row[16], data_library['translations']['age'][data_row[21]], data_row[22]))) #'belted',
		new_row.append(str(generate_child_optimal(data_library, 	data_row[11], data_library['translations']['sex'][data_row[9]], data_library['translations']['alcohol_involvement'][data_row[18]], data_row[15], data_row[16], data_library['translations']['age'][data_row[21]], data_row[22])))#'child_optimal',
		new_row.append(str(generate_child_suboptimal(data_library, 	data_row[11], data_library['translations']['sex'][data_row[9]], data_library['translations']['alcohol_involvement'][data_row[18]], data_row[15], data_row[16], data_library['translations']['age'][data_row[21]], data_row[22])))#'child_suboptimal',
		new_row.append(str(generate_helmet(data_library, 			data_row[11], data_library['translations']['sex'][data_row[9]], data_library['translations']['alcohol_involvement'][data_row[18]], data_row[15], data_row[16], data_library['translations']['age'][data_row[21]], data_row[22], data_row[13])))#'helmet',
		#risks
		new_row.append(str(generate_risk_unrestrained(new_row[18], new_row[19])))#'risk_unrestrained',
		new_row.append(str(generate_risk_belted(new_row[18], 				data_library['average_age'][data_library['translations']['age'][data_row[21]]], new_row[20])))#'risk_belted',
		new_row.append(str(generate_risk_child_optimal(new_row[18], 		data_library['average_age'][data_library['translations']['age'][data_row[21]]], new_row[21])))#'risk_child_optimal',
		new_row.append(str(generate_risk_child_suboptimal(new_row[18], 		data_library['average_age'][data_library['translations']['age'][data_row[21]]], new_row[22])))#'risk_child_suboptimal',
		new_row.append(str(generate_risk_helmet(data_row[4], new_row[23])))#'risk_helmet'
		
		
		
		
		out_rows.append(new_row)
		

#Write outfile as pipe-delimited table
delim = '|'
with open('pdl.out', "w") as wo :
	for row in out_rows :
		wo.write(delim.join(row))
		wo.write('\n')