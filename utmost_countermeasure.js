Ext.namespace('UTMOST');
	
//CM Panel Code

	Ext.define('Countermeasure_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'val', type: 'string'}, 
				{name: 'name', type: 'string'}, 
				{name: 'active', type: 'int'},
				{name: 'effectiveness', type: 'int'}, 
				{name: 'fleet_pen', type: 'int'}, 
				{name: 'description', type: 'string'},
				{name: 'selector_type', type: 'array'},
				{name: 'selector_desc', type: 'array'}
				]
	});
	
	
	var cm_types = Ext.create('Ext.data.Store', {
		model: 'Countermeasure_Type_Count',
		data : [
			{
				"val":"ldw", 
				"name":"Lane Departure Warning",
				"active":0,
				"effectiveness":25,
				"fleet_pen":100, 
				//"description":"Lane Departure Warning is a system that provides an alert to the driver when they are drifting out of their current lane. Lane Departure Warning is estimated to reduce 25% of head-on collisions and 25% of off-path crashes (Abele et al. 2005, Regan et al. 2001)", 
				"description" : "Lane-departure warning alerts the driver when the vehicle crosses a lane boundary (including the road boundary) and the turn signal is not being used. LeBlanc et al. (2017) found that all drifting crashes and 61% of road-departure crashes not involving alcohol could be affected by LDW. They also found that LDW was estimated to be 69.9% effective at reducing rollovers associated with drifting and run-off- road crashes, but only 3.8% effective at reducing crashes into objects and vehicles out of the driver's lane.",
				'selector_type': ["independent"], 
				'selector_desc': ["Countermeasure Settings"]
			},
			{
				"val":"ldp", 
				"name":"Lane Centering",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"Lane-centering systems maintain a set position within the lane boundaries until the driver actively changes lanes. In simulations by LeBlanc et al. (2017) this system eliminated 100% of simulated out-of- lane crashes. However, as this is unrealistically high, the default values for UTMOST match the values for Lane-Keeping Assist, which was estimated to be 90.9% effective at reducing rollovers associated with drifting and run-off- road crashes, and 34.7% effective at reducing crashes into objects and vehicles out of the driver's lane.", 
				'selector_type': ["independent", "ordered_population"], 
				'selector_desc': ["Countermeasure Settings", "Fleet Penetration"]
				//'selector_type': ["independent"], 
				//'selector_desc': ["Countermeasure Settings"]
			},
			{
				"val":"bsw", 
				"name":"Blind-Spot Warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"Lane change warning systems are estimated to reduce 37-40% of drifting and lane change crashes (FHWA 1998, Kaniantrha and Murtig 1997, McKeever 1998)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"csw", 
				"name":"Curve Speed Warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"[NEED DESC + DEFUALTS]", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"acc", 
				"name":"Adaptive Cruise Control",
				"active":0,
				"effectiveness":29,
				"fleet_pen":100, 
				"description":"Adaptive Cruise Control is an enhanced Cruise Control system that adjusts speed based on the speed of the vehicle ahead, decellerating automatically should the leading vehicle drop below the set cruise control speed. Adaptive cruise control is estimated to reduce 6-29% of rear-end crashes (Elvik 2006, Najm & Mironer 1998)",
				'selector_type': ["independent", "ordered_population"], 
				'selector_desc': ["Countermeasure Settings", "Fleet Penetration"]
				//'selector_type': ["numeric"], 
				//'selector_desc': []
			},
			{
				"val":"alcohol_interlock", 
				"name":"Alcohol Interlock",
				"active":0,
				"effectiveness":18,
				"fleet_pen":100, 
				"description":"Alcohol Interlock is a system that checks the blood alcohol of the driver before allowing the vehicle to be turned on. Alcohol interlocks are estimated to reduce 18% of crashes where alcohol was a factor (eSafety Forum 2005)", 
				'selector_type': ["numeric"], 'selector_desc': []
			},
			{
				"val":"esc", 
				"name":"Electronic Stability Control",
				"active":0,
				"effectiveness":40,
				"fleet_pen":100, 
				"description":"Electronic stability control is estimated to reduce 40% of all single-vehicle crashes and 75% of rollovers (IIHS).", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"fcw", 
				"name":"Forward Collision Warning",
				"active":0,
				"effectiveness":50,
				"fleet_pen":100, 
				//"description":"Forward Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object in front of it at a dangerous rate. FCW is estimated to reduce 7-80% of rear end crashes (FWHA 1998, Kanianthra and Murtig 1997, Kullen 2005, NHTSA 2001, Regan et al. 2002, and 1Sugimoto 2005) and 50-80% of head-on and object crashes (Lee et al. 2002)", 
				"description":"Forward Collision Warning (FCW) alerts the driver when the vehicle is approaching a lead vehicle too fast. LeBlanc et al. (2017) found that four types of rear-end crashes can be addressed by FCW: lead-vehicle braking, lead-vehicle stopped, lead-vehicle slower and other rear-end crashes, all where alcohol is not involved. They also found that FCW was estimated to be 74.6% effective at reducing lead-vehicle braking crashes, 77.5% effective in lead-vehicle stopped crashes, 73.1% effective in lead-vehicle slower crashes, and 67.5% effective in other rear-end crashes. These estimates are higher than previous work and may represent an ideal effectiveness in which drivers respond reliably to the warning and do not turn the system off.",
				'selector_type': ["independent"], 
				'selector_desc': ["Countermeasure Settings"]
			},
			{
				"val":"lka", 
				"name":"Lane Keeping Assistance",
				"active":0,
				"effectiveness":25,
				"fleet_pen":100, 
				//"description":"Lane keeping assistance systems are estimated to reduce 17-25% of off-path crashes (eSafety Forum 2005, FHWA 1998, eImpact Project 2005), 24% of head-on collisions (eImpact Project 2005), and 60% of sideswipe collisions (eImpact Project 2005)", 
				"description": "Lane-keep assist steers the vehicle back towards the lane when the vehicle crosses a lane boundary (including the road boundary) and the turn signal is not being used. LKA is generally combined with LDW. LeBlanc et al. (2017) found that all drifting crashes and 61% of road departure crashes could be affected by LKA+LDW. They also found that LKA+LDW was estimated to be 90.9% effective at reducing rollovers associated with drifting and run-off-road crashes, and 34.7% effective at reducing crashes into objects and vehicles out of the driver's lane.",
				'selector_type': ["independent"], 
				'selector_desc': ["Countermeasure Settings"]
			},
			{
				"val":"pedestrian_detection", 
				"name":"Pedestrian Detection",
				"active":0,
				"effectiveness":5,
				"fleet_pen":100, 
				"description":"Pedestrian Detection provides an alert to the driver when a pedestrian is detected in the path of the vehicle, potentially out of sight of the driver. There are no currently published estimates on the effectiveness of pedestrian detection systems.",
				'selector_type': ["numeric"],
				'selector_desc': []
			},
			{
				"val":"backing", 
				"name":"Reverse Collision Warning",
				"active":0,"effectiveness":65,
				"fleet_pen":100, 
				"description":"Reverse Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object behind it at a dangerous rate. Reverse collision warning systems are estimated to reduce 50-81% of backing crashes (Lee 2002)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"arb", 
				"name":"Automatic Rear Braking",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"[NEED DESC + DEFUALTS]",
				'selector_type': ["independent", "ordered_population"], 
				'selector_desc': ["Countermeasure Settings", "Fleet Penetration"]
				//'selector_type': ["numeric"], 
				//'selector_desc': []
			},			
			{
				"val":"aeb", 
				"name":"Frontal crash warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"Automatic Emergency Braking (AEB) applies the brakes to stop the vehicle when it is approaching a lead vehicle too fast. It is generally always equipped with FCW. LeBlanc et al. (2017) found that four types of rear-end crashes can be addressed by AEB+FCW: lead-vehicle braking, lead-vehicle stopped, lead-vehicle slower and other rear-end crashes. They also found that AEB+FCW was estimated to be 87% effective at reducing lead-vehicle braking crashes, 94.6% effective in lead-vehicle stopped crashes, 86% effective in lead-vehicle slower crashes, and 82.6% effective in other rear-end crashes. These estimates are higher than previous work and may represent an ideal effectiveness in which drivers respond reliably to the warning and do not turn the system off.", 
				'selector_type': ["independent1","independent2","independent3","independent4","ordered_population"], 
				'selector_desc': ["AEB Countermeasure Settings","FCW Countermeasure Settings","ACC Countermeasure Settings","FCW and ACC Countermeasure Settings", "Fleet Penetration"]
			},
			{
				"val":"rdw", 
				"name":"Road Departure Warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"Road departure warning systems are estimated to reduce 24% of off-path crashes crashes (Kaniantrha and Murtig 1997)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"adaptive_headlighting",
				"name":"Intelligent Headlighting",
				"active":0,
				"effectiveness":18,
				"fleet_pen":100, 
				"description":"Intelligent lighting systems are estimated to reduce 18% of pedestrian/cyclist low-visiblity crashes (eSafetyForum 2005).", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"teen_driver",
				"name":"Graduated Driver Licensing",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Graduated driver licensing (GDL) laws allow new drivers to acquire driving skills over time in stages. Ten elements of GDL laws were assessed (learner age, learner duration, supervised hours, more challenging hours, driver's education requirements, intermediate age, nighttime restrictions, passenger restrictions, length of nighttime and passenger restrictions). Each element was coded as being stronger or weaker among the range of laws. States that had a higher number of strong GDL law elements had lower teen crash rates than states with fewer strong GDL law elements. Changing the number of GDL laws will affect both person and injury count.", 
				'selector_type': ["population"], 
				'selector_desc': ['Population Proportion']
			},
			{
				"val":"child_seat",
				"name":"Child Passenger Safety Laws",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"The wording used in child passenger safety laws is correlated to the proportion of child occupants using recommended restraint systems (Benedetti et al. 2017, Klinich et al. 2016). States that include language associated with best practice recommendations in child restraint (rear-facing to age 2, harnessed child restraint for 2 to 4YO, and booster seats for 5 to 10YO) have higher rates of optimal restraint use. Changing the population proportion for each age group with a �best practice� law changes the distribution of optimal and suboptimal restraint, which changes injury count but not person count.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Law Population Proportion"]
			},
			{
				"val":"seatbelt",
				"name":"Seatbelt Use Laws",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"All states except New Hampshire require seatbelt use by front seat occupants. In 2017, 19 states have secondary enforcement of seatbelt laws while the rest have primary enforcement. Analysis of restraint patterns and strength of laws indicated that having a primary law increases belt use by 6%. States with increased fines for a second violation also have higher belt rates (3%). Changing the population proportion covered by different types of seatbelt laws changes the proportion of belted occupants, which changes injury count but not person count.", 
				'selector_type': ["population"], 
				'selector_desc': ["Law Population Proportion"]
			},
			{
				"val":"helmet",
				"name":"Motorcycle Helmet Law",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Motorcycle helmet use is higher in states that require universal helmet use compared to states that do not (89% vs. 49%, Pickrell and Choi [2015]). In 2017, 39% of motorcycle registrations are in states with universal helmet laws, while 61% are not. In UTMOST, changing the percentage of the motor-cycle riding population (based on registrations) that are covered by universal helmet laws will affect the injury count but not the person count.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Law Population Proportion"]
			},
			{
				"val":"restraint_override",
				"name":"Restraint Override",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"This allows the user to control the percentage of occupants who are optimally restrained, overriding changes that would occur resulting from law changes. Optimal restraint is defined as seatbelt use for ages 11 and up, booster use for 5-10YO, harnessed child restraints for 2-4YO, and rear-facing restraints for 0-1YO. Changing restraint distribution will change injury count but not person count.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Restraint Proportion"]
			},
			{
				"val":"seat_position",
				"name":"Seat Position Population",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Autonomous Vehicles are anticipated to potentially change the proportion of where passengers are seated in crashing vehicles.", 
				'selector_type': ["category_unique", "category_unique_secondary", "population"], 
				'selector_desc': ["Front Seat Face", "Rear Seats Face", "Seat Location Proportions"]
			},
			{
				"val":"vehicle_crashworthiness",
				"name":"Vehicle Crashworthiness",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Changes in the future may make future vehicles more crashworthy, better protecting occupants from injury in the event of a crash.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Settings"]
			},
			{
				"val":"vehicle_age", 
				"name":"Vehicle Age",
				"active":0,
				"effectiveness":0,
				"fleet_pen":100, 
				"description":"How the age of a vehicle affects at protecting occupants from injury in the event of a crash. ", 
				'selector_type': ["independent5"], 'selector_desc': ["Fleet Penetration"]
			},
			{
				"val":"lawful_intersection_behaviour", 
				"name":"Lawful Intersection Behaviour",
				"active":0,
				"effectiveness":0,
				"fleet_pen":100, 
				"description":"How the age of a vehicle affects the at protecting occupants from injury in the event of a crash. ", 
				'selector_type': ["numeric"], 'selector_desc': []
			}
			
		]
	});
	
	var cm_type_defaults = Ext.create('Ext.data.Store', {
		model: 'Countermeasure_Type_Count',
		data : [
			{
				"val":"ldw", 
				"name":"Lane Departure Warning",
				"active":0,
				"effectiveness":25,
				"fleet_pen":100, 
				"description":"Lane Departure Warning is a system that provides an alert to the driver when they are drifting out of their current lane. Lane Departure Warning is estimated to reduce 25% of head-on collisions and 25% of off-path crashes (Abele et al. 2005, Regan et al. 2001)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"ldp", 
				"name":"Lane Departure Prevention",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"[NEED DESC + DEFUALTS]", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"bsw", 
				"name":"Blind-Spot Warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"Lane change warning systems are estimated to reduce 37-40% of drifting and lane change crashes (FHWA 1998, Kaniantrha and Murtig 1997, McKeever 1998)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"csw", 
				"name":"Curve Speed Warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"[NEED DESC + DEFUALTS]", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"acc", 
				"name":"Adaptive Cruise Control",
				"active":0,
				"effectiveness":29,
				"fleet_pen":100, 
				"description":"Adaptive Cruise Control is an enhanced Cruise Control system that adjusts speed based on the speed of the vehicle ahead, decellerating automatically should the leading vehicle drop below the set cruise control speed. Adaptive cruise control is estimated to reduce 6-29% of rear-end crashes (Elvik 2006, Najm & Mironer 1998)",
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"alcohol_interlock", 
				"name":"Alcohol Interlock",
				"active":0,
				"effectiveness":18,
				"fleet_pen":100, 
				"description":"Alcohol Interlock is a system that checks the blood alcohol of the driver before allowing the vehicle to be turned on. Alcohol interlocks are estimated to reduce 18% of crashes where alcohol was a factor (eSafety Forum 2005)", 
				'selector_type': ["numeric"], 'selector_desc': []
			},
			{
				"val":"esc", 
				"name":"Electronic Stability Control",
				"active":0,
				"effectiveness":40,
				"fleet_pen":100, 
				"description":"Electronic stability control is estimated to reduce 40% of all single-vehicle crashes and 75% of rollovers (IIHS).", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"fcw", 
				"name":"Forward Collision Warning",
				"active":0,
				"effectiveness":50,
				"fleet_pen":100, 
				"description":"Forward Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object in front of it at a dangerous rate. FCW is estimated to reduce 7-80% of rear end crashes (FWHA 1998, Kanianthra and Murtig 1997, Kullen 2005, NHTSA 2001, Regan et al. 2002, and 1Sugimoto 2005) and 50-80% of head-on and object crashes (Lee et al. 2002)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"lka", 
				"name":"Lane Keeping Assistance",
				"active":0,
				"effectiveness":25,
				"fleet_pen":100, 
				"description":"Lane keeping assistance systems are estimated to reduce 17-25% of off-path crashes (eSafety Forum 2005, FHWA 1998, eImpact Project 2005), 24% of head-on collisions (eImpact Project 2005), and 60% of sideswipe collisions (eImpact Project 2005)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"pedestrian_detection", 
				"name":"Pedestrian Detection",
				"active":0,
				"effectiveness":5,
				"fleet_pen":100, 
				"description":"Pedestrian Detection provides an alert to the driver when a pedestrian is detected in the path of the vehicle, potentially out of sight of the driver. There are no currently published estimates on the effectiveness of pedestrian detection systems.",
				'selector_type': ["numeric"],
				'selector_desc': []
			},
			{
				"val":"backing", 
				"name":"Reverse Collision Warning",
				"active":0,"effectiveness":65,
				"fleet_pen":100, 
				"description":"Reverse Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object behind it at a dangerous rate. Reverse collision warning systems are estimated to reduce 50-81% of backing crashes (Lee 2002)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"arb", 
				"name":"Automatic Rear Braking",
				"active":0,
				"effectiveness":65,
				"fleet_pen":100, 
				"description":"Automatic Rear Braking breaks the vehicle automatically upon detecting an object behind it while backing. ", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"rdw", 
				"name":"Road Departure Warning",
				"active":0,
				"effectiveness":24,
				"fleet_pen":100, 
				"description":"Road departure warning systems are estimated to reduce 24% of off-path crashes crashes (Kaniantrha and Murtig 1997)", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"adaptive_headlighting",
				"name":"Intelligent Headlighting",
				"active":0,
				"effectiveness":18,
				"fleet_pen":100, 
				"description":"Intelligent lighting systems are estimated to reduce 18% of pedestrian/cyclist low-visiblity crashes (eSafetyForum 2005).", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			{
				"val":"teen_driver",
				"name":"Graduated Driver Licensing",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Graduated driver licensing (GDL) laws allow new drivers to acquire driving skills over time in stages. Ten elements of GDL laws were assessed (learner age, learner duration, supervised hours, more challenging hours, driver's education requirements, intermediate age, nighttime restrictions, passenger restrictions, length of nighttime and passenger restrictions). Each element was coded as being stronger or weaker among the range of laws. States that had a higher number of strong GDL law elements had lower teen crash rates than states with fewer strong GDL law elements. Changing the number of GDL laws will affect both person and injury count.", 
				'selector_type': ["population"], 
				'selector_desc': ['Population Proportion']
			},
			{
				"val":"child_seat",
				"name":"Child Passenger Safety Laws",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"The wording used in child passenger safety laws is correlated to the proportion of child occupants using recommended restraint systems (Benedetti et al. 2017, Klinich et al. 2016). States that include language associated with best practice recommendations in child restraint (rear-facing to age 2, harnessed child restraint for 2 to 4YO, and booster seats for 5 to 10YO) have higher rates of optimal restraint use. Changing the population proportion for each age group with a 'best practice' law changes the distribution of optimal and suboptimal restraint, which changes injury count but not person count.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Law Population Proportion"]
			},
			{
				"val":"seatbelt",
				"name":"Seatbelt Use Laws",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"All states except New Hampshire require seatbelt use by front seat occupants. In 2017, 19 states have secondary enforcement of seatbelt laws while the rest have primary enforcement. Analysis of restraint patterns and strength of laws indicated that having a primary law increases belt use by 6%. States with increased fines for a second violation also have higher belt rates (3%). Changing the population proportion covered by different types of seatbelt laws changes the proportion of belted occupants, which changes injury count but not person count.", 
				'selector_type': ["population"], 
				'selector_desc': ["Law Population Proportion"]
			},
			{
				"val":"helmet",
				"name":"Motorcycle Helmet Law",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Motorcycle helmet use is higher in states that require universal helmet use compared to states that do not (89% vs. 49%, Pickrell and Choi [2015]). In 2017, 39% of motorcycle registrations are in states with universal helmet laws, while 61% are not. In UTMOST, changing the percentage of the motor-cycle riding population (based on registrations) that are covered by universal helmet laws will affect the injury count but not the person count.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Law Population Proportion"]
			},
			{
				"val":"restraint_override",
				"name":"Restraint Override",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"This allows the user to control the percentage of occupants who are optimally restrained, overriding changes that would occur resulting from law changes. Optimal restraint is defined as seatbelt use for ages 11 and up, booster use for 5-10YO, harnessed child restraints for 2-4YO, and rear-facing restraints for 0-1YO. Changing restraint distribution will change injury count but not person count.", 
				'selector_type': ["independent"], 
				'selector_desc': ["Restraint Proportion"]
			},
			{
				"val":"seat_position",
				"name":"Seat Position Population",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Autonomous Vehicles are anticipated to potentially change the proportion of where passengers are seated in crashing vehicles.", 
				'selector_type': ["category_unique", "category_unique_secondary", "population"], 
				'selector_desc': ["Front Seats Face", "Rear Seats Face", "Seat Location Proportions"]
			},
			{
				"val":"vehicle_crashworthiness",
				"name":"Vehicle Crashworthiness",
				"active":0,
				"effectiveness":0,
				"fleet_pen":0, 
				"description":"Changes in the future may make future vehicles more crashworthy, better protecting occupants from injury in the event of a crash.", 
				'selector_type': ["numeric", "independent"], 
				'selector_desc': ["Settings"]
			},
			{
				"val":"vehicle_age", 
				"name":"Vehicle Age",
				"active":0,
				"effectiveness":0,
				"fleet_pen":100, 
				"description":"How the age of a vehicle affects at protecting occupants from injury in the event of a crash. ", 
				'selector_type': ["independent5"], 'selector_desc': ["Fleet Penetration"]
			},
			{
				"val":"lawful_intersection_behaviour", 
				"name":"Lawful Intersection Behaviour",
				"active":0,
				"effectiveness":0,
				"fleet_pen":100, 
				"description":"How the age of a vehicle affects the at protecting occupants from injury in the event of a crash. ", 
				'selector_type': ["numeric"], 'selector_desc': []
			}
			
		]
	});
	
	Ext.define('Countermeasure_Detail', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'category_val', type: 'string'}, 
				{name: 'name', type: 'string'}, 
				{name: 'target_val', type: 'string'},
				{name: 'base_rate', type: 'int'}, 
				{name: 'law_rate', type: 'int'}, 
				{name: 'proportion', type: 'int'},
				{name: 'detail_type', type: 'string'},
				{name: 'lock', type: 'int'}
				]
	});
	
	var cm_options = Ext.create('Ext.data.Store', {
		model: 'Countermeasure_Detail',
		data : [
			{"category_val":"helmet", 'name':"Full Motorcyle Helmet Law", 							'target_val':"HELMETLAW", 'base_rate':49, 'law_rate':89, 'proportion':39, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"restraint_override", 'name':"Override Restraint Values", 							'target_val':"OVERRIDE", 'base_rate':0, 'law_rate':0, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Secondary Enforcement", 							'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':82, 'proportion':23, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Secondary Enforcement with Points or Secondary Fines", 'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':84, 'proportion':1, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Primary Enforcement", 								'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':91, 'proportion':59, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Primary Enforcement with Points or Secondary Fines", 'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':94, 'proportion':17, 'detail_type': 'population', 'lock': 0},
			{"category_val":"child_seat", 'name':"0-1 Year Old Rear-Facing Seat", 'target_val':"0-1", 'base_rate':54, 'law_rate':65, 'proportion':11, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"child_seat", 'name':"2-4 Year Old Harnessed Child Seat", 'target_val':"2-4", 'base_rate':64, 'law_rate':80, 'proportion':13, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"child_seat", 'name':"5-7 Year Old Booster Seat", 'target_val':"5-7", 'base_rate':40, 'law_rate':62, 'proportion':85, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"child_seat", 'name':"8-10 Year Old Booster Seat", 'target_val':"8-10", 'base_rate':19, 'law_rate':37, 'proportion':1, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_age", 'name':"Fleet Penetration", 'target_val':"VEH_AGE", 'base_rate':0, 'law_rate':0, 'proportion':100, 'detail_type': 'independent5', 'lock': 0},
			{"category_val":"teen_driver", 'name':"3 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':3, 'proportion':5, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"4 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':4, 'proportion':2, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"5 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':5, 'proportion':4, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"6 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':6, 'proportion':12, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"7 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':7, 'proportion':30, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"8 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':8, 'proportion':17, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"9 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':9, 'proportion':30, 'detail_type': 'population', 'lock': 0},
			{"category_val":"lka", 'name':"Rollover Effectiveness", 'target_val':"lka_rollover", 'base_rate':0, 'law_rate':9, 'proportion':91, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"lka", 'name':"Other Crash Effectiveness", 'target_val':"lka", 'base_rate':0, 'law_rate':9, 'proportion':35, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"lka", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldw", 'name':"Rollover Effectiveness", 'target_val':"ldw_rollover", 'base_rate':0, 'law_rate':9, 'proportion':70, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldw", 'name':"Other Crash Effectiveness", 'target_val':"ldw", 'base_rate':0, 'law_rate':9, 'proportion':9, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldw", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LDP Rollover Effectiveness", 'target_val':"ldp", 'base_rate':0, 'law_rate':9, 'proportion':70, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LDP Other Crash Effectiveness", 'target_val':"ldp_rollover", 'base_rate':0, 'law_rate':9, 'proportion':9, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LKA Rollover Effectiveness", 'target_val':"lkp_rollover", 'base_rate':0, 'law_rate':9, 'proportion':91, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LKA Other Crash Effectiveness", 'target_val':"lkp", 'base_rate':0, 'law_rate':9, 'proportion':35, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LDW Rollover Effectiveness", 'target_val':"lkp_rollover", 'base_rate':0, 'law_rate':9, 'proportion':91, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LDW Other Crash Effectiveness", 'target_val':"lkp", 'base_rate':0, 'law_rate':9, 'proportion':35, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"LDP Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 0},
			{"category_val":"ldp", 'name':"LKA Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':1, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 1},
			{"category_val":"ldp", 'name':"LDW Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':2, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 2},
			//{"category_val":"ldp", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"fcw_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':75, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"fcw_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':78, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"fcw_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':73, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Other Rear End Effectiveness", 'target_val':"fcw", 'base_rate':0, 'law_rate':9, 'proportion':68, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"aeb_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':87, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"aeb_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':95, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"aeb_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':86, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Other Rear End Effectiveness", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Animal Detection", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Cross Traffic Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Turning Same Direction Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"aeb_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':87, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"aeb_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':95, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"aeb_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':86, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Other Rear End Effectiveness", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Animal Detection", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Cross Traffic Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Turning Same Direction Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent2', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"aeb_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':87, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"aeb_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':95, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"aeb_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':86, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Other Rear End Effectiveness", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Animal Detection", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Cross Traffic Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Turning Same Direction Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent3', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"aeb_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':87, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"aeb_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':95, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"aeb_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':86, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"Other Rear End Effectiveness", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"Animal Detection", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"Cross Traffic Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"Turning Same Direction Crashes", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent4', 'lock': 0},
			{"category_val":"aeb", 'name':"ACC Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 0},
			{"category_val":"aeb", 'name':"AEB Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':1, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 1},
			{"category_val":"aeb", 'name':"FCW Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':2, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 2},
			{"category_val":"arb", 'name':"Counter Measure Effectiveness", 'target_val':"arb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"arb", 'name':"ARB Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 0},
			{"category_val":"arb", 'name':"RCW Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':1, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 1},
			{"category_val":"acc", 'name':"Counter Measure Effectiveness", 'target_val':"acc", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"acc", 'name':"ACC Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 0},
			{"category_val":"acc", 'name':"AEB Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':1, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 1},
			{"category_val":"acc", 'name':"FCW Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':2, 'law_rate':9, 'proportion':100, 'detail_type': 'ordered_population', 'lock': 2},
			{"category_val":"seat_position", 'name':"Forward", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique', 'lock': 0},
			{"category_val":"seat_position", 'name':"Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique', 'lock': 0},
			{"category_val":"seat_position", 'name':"Forward", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique_secondary', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique_secondary', 'lock': 0},
			{"category_val":"seat_position", 'name':"Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique_secondary', 'lock': 0},
			{"category_val":"seat_position", 'name':"Front Driver Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':75, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seat_position", 'name':"Front Passenger Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':15, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear Driver Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':5, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear Passenger Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':5, 'detail_type': 'population', 'lock': 0},
			//{"category_val":"vehicle_crashworthiness", 'name':"Effectiveness", 'target_val':"effectiveness", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			//{"category_val":"vehicle_crashworthiness", 'name':"Target DV", 'target_val':"target_dv", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Injury Risk Reduction", 'target_val':"effectiveness", 'base_rate':100, 'law_rate':100, 'proportion':30, 'detail_type': 'independent_text', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Target DV (MPH)", 'target_val':"target_dv", 'base_rate':100, 'law_rate':100, 'proportion':35, 'detail_type': 'independent_text', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Fleet Penetration", 'target_val':"fleet_penetration", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Fatality Scale Factor", 'target_val':"fatality", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent_scalar', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Unrestrained Occupant Scale Factor", 'target_val':"unrestrained", 'base_rate':100, 'law_rate':100, 'proportion':0, 'detail_type': 'independent_scalar', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Frontal Crash Scale Factor", 'target_val':"Frontal", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent_scalar', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Rear Crash Scale Factor", 'target_val':"Rear", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent_scalar', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Near Side Crash Scale Factor", 'target_val':"Near Side", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent_scalar', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Far Side Crash Scale Factor", 'target_val':"Far Side", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent_scalar', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Rollover Crash Scale Factor", 'target_val':"Rollover", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent_scalar', 'lock': 0}
		]
	});
	
	var cm_option_defaults = Ext.create('Ext.data.Store', {
		model: 'Countermeasure_Detail',
		data : [
			{"category_val":"helmet", 'name':"Full Motorcyle Helmet Law", 							'target_val':"HELMETLAW", 'base_rate':49, 'law_rate':89, 'proportion':39, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"restraint_override", 'name':"Override Restraint Values", 							'target_val':"OVERRIDE", 'base_rate':0, 'law_rate':0, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Secondary Enforcement", 							'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':82, 'proportion':23, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Secondary Enforcement with Points or Secondary Fines", 'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':84, 'proportion':1, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Primary Enforcement", 								'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':91, 'proportion':59, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seatbelt", 'name':"Primary Enforcement with Points or Secondary Fines", 'target_val':"SEATBELTLAW", 'base_rate':70, 'law_rate':94, 'proportion':17, 'detail_type': 'population', 'lock': 0},
			{"category_val":"child_seat", 'name':"0-1 Year Old Rear-Facing Seat", 'target_val':"0-1", 'base_rate':54, 'law_rate':65, 'proportion':11, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"child_seat", 'name':"2-4 Year Old Harnessed Child Seat", 'target_val':"2-4", 'base_rate':64, 'law_rate':80, 'proportion':13, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"child_seat", 'name':"5-7 Year Old Booster Seat", 'target_val':"5-7", 'base_rate':40, 'law_rate':62, 'proportion':85, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"child_seat", 'name':"8-10 Year Old Booster Seat", 'target_val':"8-10", 'base_rate':19, 'law_rate':37, 'proportion':1, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"teen_driver", 'name':"3 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':3, 'proportion':5, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"4 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':4, 'proportion':2, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"5 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':5, 'proportion':4, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"6 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':6, 'proportion':12, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"7 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':7, 'proportion':30, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"8 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':8, 'proportion':17, 'detail_type': 'population', 'lock': 0},
			{"category_val":"teen_driver", 'name':"9 Laws", 'target_val':"GDL", 'base_rate':0, 'law_rate':9, 'proportion':30, 'detail_type': 'population', 'lock': 0},
			{"category_val":"lka", 'name':"Rollover Effectiveness", 'target_val':"lka_rollover", 'base_rate':0, 'law_rate':9, 'proportion':91, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"lka", 'name':"Other Crash Effectiveness", 'target_val':"lka", 'base_rate':0, 'law_rate':9, 'proportion':35, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"lka", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldw", 'name':"Rollover Effectiveness", 'target_val':"ldw_rollover", 'base_rate':0, 'law_rate':9, 'proportion':70, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldw", 'name':"Other Crash Effectiveness", 'target_val':"ldw", 'base_rate':0, 'law_rate':9, 'proportion':9, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldw", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"Rollover Effectiveness", 'target_val':"ldp", 'base_rate':0, 'law_rate':9, 'proportion':70, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"Other Crash Effectiveness", 'target_val':"ldp_rollover", 'base_rate':0, 'law_rate':9, 'proportion':9, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"ldp", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"fcw_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':75, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"fcw_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':78, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"fcw_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':73, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Other Rear End Effectiveness", 'target_val':"fcw", 'base_rate':0, 'law_rate':9, 'proportion':68, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"fcw", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"aeb_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':87, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"aeb_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':95, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"aeb_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':86, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"aeb", 'name':"Other Rear End Effectiveness", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Braking Effectiveness", 'target_val':"aeb_lv_decel", 'base_rate':0, 'law_rate':9, 'proportion':87, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Stopped Effectiveness", 'target_val':"aeb_lv_stopped", 'base_rate':0, 'law_rate':9, 'proportion':95, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Rear End/LV Slower Effectiveness", 'target_val':"aeb_lv_slower", 'base_rate':0, 'law_rate':9, 'proportion':86, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Other Rear End Effectiveness", 'target_val':"aeb", 'base_rate':0, 'law_rate':9, 'proportion':83, 'detail_type': 'independent1', 'lock': 0},
			{"category_val":"aeb", 'name':"Fleet Penetration", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"seat_position", 'name':"Forward", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique', 'lock': 0},
			{"category_val":"seat_position", 'name':"Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique', 'lock': 0},
			{"category_val":"seat_position", 'name':"Forward", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique_secondary', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique_secondary', 'lock': 0},
			{"category_val":"seat_position", 'name':"Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':100, 'detail_type': 'category_unique_secondary', 'lock': 0},
			{"category_val":"seat_position", 'name':"Front Driver Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':75, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seat_position", 'name':"Front Passenger Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':15, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear Driver Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':5, 'detail_type': 'population', 'lock': 0},
			{"category_val":"seat_position", 'name':"Rear Passenger Side", 'target_val':"PENETRATION", 'base_rate':0, 'law_rate':9, 'proportion':5, 'detail_type': 'population', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Effectiveness", 'target_val':"effectiveness", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Fleet Penetration", 'target_val':"fleet_penetration", 'base_rate':100, 'law_rate':100, 'proportion':100, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Fatality Scale Factor", 'target_val':"fatality", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Unrestrained Occupant Scale Factor", 'target_val':"unrestrained", 'base_rate':100, 'law_rate':100, 'proportion':0, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Frontal Crash Scale Factor", 'target_val':"Frontal", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Rear Crash Scale Factor", 'target_val':"Rear", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Near Side Crash Scale Factor", 'target_val':"Near Side", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Far Side Crash Scale Factor", 'target_val':"Far Side", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"vehicle_crashworthiness", 'name':"Rollover Crash Scale Factor", 'target_val':"Rollover", 'base_rate':100, 'law_rate':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0}
		]
	});
	
	var countermeasure_list = Ext.create('Ext.form.field.ComboBox', {
		xtype: 'combobox',
		name: 'cm_name',
		width: "100%",
		store: cm_types,
		queryMode: 'local',
		displayField: 'name',
		valueField: 'name',
		fieldLabel: 'Select Countermeasure'
	});
	var cm_description = Ext.create('Ext.panel.Panel',{
		name: 'cm_desc',
		title: "Description",
		resizable:"true",
		bodyPadding: 5,
		height: "100%",
		flex: 1
	});
	var effectiveness_slider = Ext.create('Ext.slider.Single', {
		fieldLabel: "Countermeasure Effectiveness:",
		name: 'cm_effect',
		//xtype: "sliderfield",
		width: "100%",
		value: 50,
		increment: 1,
		minValue: 0,
		maxValue: 100
	});
	var penetration_slider = Ext.create('Ext.slider.Single', {
		fieldLabel: "Fleet Penetration:",
		//xtype: "sliderfield",
		name: 'cm_pen',
		width: "100%",
		value: 50,
		increment: 1,
		minValue: 0,
		maxValue: 100
	});
	var countermeasure_category_multiselector = Ext.create('Ext.form.CheckboxGroup',{
		columns: 2,
		width: "100%",
		name: 'cm_cbox',
		hidden: true
	});
	var countermeasure_category_singleselector = Ext.create('Ext.form.RadioGroup',{
		columns: 2,
		width: "100%",
		name: 'cm_radio',
		hidden: true
	});
	var countermeasure_category_singleselector_secondary = Ext.create('Ext.form.RadioGroup',{
		columns: 2,
		width: "100%",
		name: 'cm_radio_2',
		hidden: true
	});
	var countermeasure_population_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		name: 'cm_population',
		hidden: true
	});
	var countermeasure_ordered_population_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		name: 'cm_ordered_population',
		hidden: true
	});
	var countermeasure_independent_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		name: 'cm_independent',
		hidden: true
	});
	var countermeasure_independent1_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		collapsible: true,
		collapsed: true,
		name: 'cm_independent1',
		hidden: true
	});
	var countermeasure_independent2_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		collapsible: true,
		collapsed: true,
		name: 'cm_independent2',
		hidden: true
	});
	var countermeasure_independent3_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		collapsible: true,
		collapsed: true,
		name: 'cm_independent3',
		hidden: true
	});
	var countermeasure_independent4_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		collapsible: true,
		collapsed: true,
		name: 'cm_independent4',
		hidden: true
	});
	var countermeasure_independent5_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		name: 'cm_independent5',
		hidden: true
	});
	
	var countermeasure_edit_form = Ext.create('Ext.form.Panel', {
		layout: "form",
		title: "Parameters",
		flex: 1,
		resizable:"true",
		bodyPadding: 5,
		items: [
			countermeasure_list,
			effectiveness_slider, 
			penetration_slider,
			countermeasure_category_multiselector,
			countermeasure_category_singleselector,
			countermeasure_category_singleselector_secondary,
			countermeasure_population_selector,
			countermeasure_independent_selector,
			countermeasure_independent1_selector,
			countermeasure_independent2_selector,
			countermeasure_independent3_selector,
			countermeasure_independent4_selector,
			countermeasure_independent5_selector,
			countermeasure_ordered_population_selector
		]
	});
	
	var clear_cm_form = function(){
		effectiveness_slider.setVisible(false);
		penetration_slider.setVisible(false);
		countermeasure_category_singleselector.setVisible(false);
		countermeasure_category_singleselector_secondary.setVisible(false);
		countermeasure_category_multiselector.setVisible(false);
		countermeasure_population_selector.setVisible(false);
		countermeasure_ordered_population_selector.setVisible(false);
		countermeasure_independent_selector.setVisible(false);
		countermeasure_independent1_selector.setVisible(false);
		countermeasure_independent2_selector.setVisible(false);
		countermeasure_independent3_selector.setVisible(false);
		countermeasure_independent4_selector.setVisible(false);
		countermeasure_independent5_selector.setVisible(false);
		
		countermeasure_category_singleselector.removeAll();
		countermeasure_category_singleselector_secondary.removeAll();
		countermeasure_category_multiselector.removeAll();
		countermeasure_population_selector.removeAll();
		countermeasure_ordered_population_selector.removeAll();
		countermeasure_independent_selector.removeAll();
		countermeasure_independent1_selector.removeAll();
		countermeasure_independent2_selector.removeAll();
		countermeasure_independent3_selector.removeAll();
		countermeasure_independent4_selector.removeAll();
		countermeasure_independent5_selector.removeAll();
		countermeasure_independent1_selector.setVisible(false);
		countermeasure_independent2_selector.setVisible(false);
		countermeasure_independent3_selector.setVisible(false);
		countermeasure_independent4_selector.setVisible(false);
		countermeasure_independent5_selector.setVisible(false);
		cm_description.update("");
	}
	
	countermeasure_list.on('select', function(combo, record, index){
		var selected_cm_type_array = record[0].get('selector_type');
		var selected_cm_desc_array = record[0].get('selector_desc');
		//clear form
		clear_cm_form();
		for (var index in selected_cm_type_array){
			var selected_cm_type = selected_cm_type_array[index];
			if (selected_cm_type == "numeric"){
				
				
				effectiveness_slider.setVisible(true);
				penetration_slider.setVisible(true);
				
				//Set Description
				cm_description.update(record[0].get('description'));
				
				effectiveness_slider.setValue(record[0].get('effectiveness'));
				penetration_slider.setValue(record[0].get('fleet_pen'));
				
				
			} 
			else if (selected_cm_type == "category_unique"){
							
				countermeasure_category_singleselector.setVisible(true);
				
				
				//Set label
				countermeasure_category_singleselector.setFieldLabel(selected_cm_desc_array[index]);
				
				//Set Description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "category_unique"){
						countermeasure_category_singleselector.add({boxLabel:record.get('name'), name:record.get('name'), inputValue:record.get('target_val')});
					}
				});
				
			} 
			else if (selected_cm_type == "category_unique_secondary"){
							
				countermeasure_category_singleselector_secondary.setVisible(true);
				
				
				//Set label
				countermeasure_category_singleselector_secondary.setFieldLabel(selected_cm_desc_array[index]);
				
				//Set Description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "category_unique"){
						countermeasure_category_singleselector_secondary.add({boxLabel:record.get('name'), name:record.get('name'), inputValue:record.get('target_val')});
					}
				});
				
			} 
			else if (selected_cm_type == "category_multiple"){
				
				
				countermeasure_category_multiselector.setVisible(true);
				
				//Set label
				countermeasure_category_multiselector.setFieldLabel(selected_cm_desc_array[index]);
				
				//Set Description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "category_multiple"){
						countermeasure_category_multiselector.add({boxLabel:record.get('name'), name:record.get('name'), inputValue:record.get('target_val')});
					}
				});
			} 
			else if (selected_cm_type == "population"){
				
				
				countermeasure_population_selector.setVisible(true);
				countermeasure_population_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "population"){
						//create set of sliders at default value
						countermeasure_population_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										var delta = newValue - rec.get('proportion');
										rec.set('proportion', newValue);
										var total_count = countermeasure_population_selector.items.getCount();
										var index = 0;
										var unlocked_indexes = [];
										while (index < total_count){
											var targeted_slider = countermeasure_population_selector.items.getAt(index);
											var rec_lookup = cm_options.findRecord('name', targeted_slider.getFieldLabel());
											if (rec_lookup.get('lock') == 0 && rec_lookup.get('name') != slider.getFieldLabel()){
												unlocked_indexes.push(index);
											}
											index +=2;
										}
										index = 0;
										while (index < unlocked_indexes.length){
											var selected_slider = countermeasure_population_selector.items.getAt(unlocked_indexes[index]);
											selected_slider.suspendEvents();
											var shifted_value = selected_slider.getValue() - delta;
											if (shifted_value > 100){
												delta = 100 - shifted_value;
												shifted_value = 100;
											} else if (shifted_value < 0){
												delta = 0 - shifted_value;
												shifted_value = 0;
											} else{
												delta = 0;
											}
											selected_slider.setValue(shifted_value);
											selected_slider.resumeEvents();
											index++;
										}
										if (delta != 0){
											//change not used up by unlocked sliders, re-set sliders to match record values
											index = 0;
											while (index < unlocked_indexes.length){
												var selected_slider = countermeasure_population_selector.items.getAt(unlocked_indexes[index]);
												var selected_record = cm_options.findRecord('name', selected_slider.getFieldLabel());
												selected_slider.setValue(selected_record.get('proportion'));
												index++;
											}
											return false;
										} else {
											//commit change and return true if change value is used up
											index = 0;
											while (index < unlocked_indexes.length){
												var selected_slider = countermeasure_population_selector.items.getAt(unlocked_indexes[index]);
												var selected_record = cm_options.findRecord('name', selected_slider.getFieldLabel());
												selected_record.set('proportion', selected_slider.getValue());
												index++;
											}
										}
									}
								}
							}
						});
						countermeasure_population_selector.add({
							xtype:'checkbox', 
							width:'100%',
							fieldLabel: 'Lock',
							name: record.get('name'),
							listeners: {
								change: {
									fn: function(box, newValue, oldValue){
										var rec = cm_options.findRecord('name', box.getName());
										var val = newValue ? 1 : 0;
										rec.set('lock', val);
									}
								}
							}
						});
						record.set('lock', 0);
					}
					
					
				});
			} 
			else if (selected_cm_type == "ordered_population"){
				
				
				countermeasure_ordered_population_selector.setVisible(true);
				countermeasure_ordered_population_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "ordered_population"){
						//create set of sliders at default value
						countermeasure_ordered_population_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								change: {
									fn: function(slider, newValue, thumb, eOpts){
										//Find record
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										var this_index = rec.get('lock');
										var recValue = newValue;
										
										//check vs other items - minimize to parent and bump up children
										var total_count = countermeasure_ordered_population_selector.items.getCount();
										var targeted_index = 0;
										while (targeted_index < total_count){
											var targeted_slider = countermeasure_ordered_population_selector.items.getAt(targeted_index);
											var rec_lookup = cm_options.findRecord('name', targeted_slider.getFieldLabel());
												
											if(targeted_index<this_index){
												//Set minimum
												if(newValue < targeted_slider.getValue()){
													recValue = targeted_slider.getValue();
													newValue = targeted_slider.getValue();
												}
											} else if (targeted_index> this_index){
												//update values to be at MINIMUM
												if(newValue > targeted_slider.getValue()){
													targeted_slider.suspendEvents();
													targeted_slider.setValue(newValue);
													rec_lookup.set('proportion', newValue);
													targeted_slider.resumeEvents();
												}
											}
											targeted_index++;
										}
										
										//Commit new record
										slider.suspendEvents();
										slider.setValue(recValue);
										slider.resumeEvents();
										rec.set('proportion', recValue);
									}
								}
							}
						});
					}
					
					
				});
			} 
			else if (selected_cm_type == "independent"){
				
				countermeasure_independent_selector.setVisible(true);
				countermeasure_independent_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "independent"){
						//create set of sliders at default value
						countermeasure_independent_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
					else if (record.get('detail_type') == "independent_text"){
						//create set of sliders at default value
						countermeasure_independent_selector.add({
							xtype:'textfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							listeners: {
								change: {
									fn: function(target, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', target.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
					else if (record.get('detail_type') == "independent_scalar"){
						countermeasure_independent_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 200,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					}

				});
			}
			else if (selected_cm_type == "independent1"){
				
				countermeasure_independent1_selector.setVisible(true);
				countermeasure_independent1_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "independent1"){
						//create set of sliders at default value
						countermeasure_independent1_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
				

				});
			}
			else if (selected_cm_type == "independent2"){
				
				countermeasure_independent2_selector.setVisible(true);
				countermeasure_independent2_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "independent2"){
						//create set of sliders at default value
						countermeasure_independent2_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
				

				});
			}
			else if (selected_cm_type == "independent3"){
				
				countermeasure_independent3_selector.setVisible(true);
				countermeasure_independent3_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "independent3"){
						//create set of sliders at default value
						countermeasure_independent3_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
				

				});
			}
			else if (selected_cm_type == "independent4"){
				
				countermeasure_independent4_selector.setVisible(true);
				countermeasure_independent4_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "independent4"){
						//create set of sliders at default value
						countermeasure_independent4_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
				

				});
			}
			else if (selected_cm_type == "independent5"){
				
				countermeasure_independent5_selector.setVisible(true);
				countermeasure_independent5_selector.setTitle(selected_cm_desc_array[index]);
				
				//group description
				cm_description.update(record[0].get('description'));
				
				//add correct child selectors
				cm_options.clearFilter();
				cm_options.filter('category_val', record[0].get('val'));
				cm_options.each(function(record){
					if (record.get('detail_type') == "independent5"){
						//create set of sliders at default value
						countermeasure_independent5_selector.add({
							xtype:'sliderfield', 
							width:'100%',
							fieldLabel: record.get('name'), 
							name: record.get('name'), 
							value: record.get('proportion'),
							increment: 1,
							minValue: 0,
							maxValue: 100,
							listeners: {
								beforechange: {
									fn: function(slider, newValue, oldValue){
										// add error check of any type?
										var rec = cm_options.findRecord('name', slider.getFieldLabel());
										rec.set('proportion', newValue);
									}
								}
							}
						});
					} 
				

				});
			}
		}
	});
	
	var generate_countermeasure_output = function(name, detail){
		active_countermeasure_panel.add(Ext.create('Ext.panel.Panel', {
			title: name,
			closable: true,
			bodyPadding: 5,
			margin: 5,
			html: detail,
			listeners:{
				beforeclose:{
					fn: function(){
						if(countermeasure_edit_window.isVisible()){
							return false;
						}
						//clear filter activity
						var targ_name = this.title;
						var rec = cm_types.findRecord('name', targ_name);
						rec.set('active', 0);
						data_update();
						return true;
					}
				}
			}
		}));
		
	}
	
	var countermeasure_edit_window = Ext.create('Ext.window.Window', {
		layout: "form",
		title: "Adjust Countermeasure",
        width: "50%",
		closeAction: 'hide',
		resizable: true,
		items: [
			{
				xtype: 'panel',
				layout: 'hbox',
				resizable: true,
				items: [countermeasure_edit_form, cm_description]
			},
			{
				xtype: 'button',
				text: 'Restore Default Values',
				width: '100%',
				handler: function(){
					var selected = countermeasure_list.getValue();
					cm_types.each(function(record){
							var default_record = cm_type_defaults.findRecord('val', record.get('val'), 0, false, false, true);
							record.set('effectiveness', default_record.get('effectiveness'));
							record.set('fleet_pen', default_record.get('fleet_pen'));
							cm_option_defaults.filter('category_val', record.get('val'));
							cm_option_defaults.each(function(record){
								var clear_target = cm_options.findRecord('name', record.get('name'), 0, false, false, true);
								if(clear_target){
									clear_target.set('proportion', record.get('proportion'));
									clear_target.set('lock', 0);
								}
							});
							cm_option_defaults.clearFilter();
					});
					
					
					countermeasure_list.fireEvent('select', countermeasure_list, [countermeasure_list.findRecord('name', selected)], cm_types.findExact('name', selected));
				}
			},
			{
				xtype: "button",
				text: "Save and Apply Countermeasure",
                width: "100%",
				handler: function(){
					var cm_detail = "";
					var cm_title = "";
					
					
					if (effectiveness_slider.isVisible()){
						countermeasure_edit_window.hide();
						cm_types.clearFilter();
						var form_values = countermeasure_edit_form.getValues();
						var rec = cm_types.findRecord('name', form_values['cm_name']);
						rec.set('active', 1);
						rec.set('effectiveness', form_values['cm_effect']);
						rec.set('fleet_pen', form_values['cm_pen']);
						cm_detail = "<p>Effectiveness: "+form_values['cm_effect']+"%</p>" + "<p>Fleet Penetration: "+form_values['cm_pen']+"%</p>";
						cm_title = form_values['cm_name'];
						data_update();
						
					}  
					
					if(countermeasure_category_singleselector.isVisible()){
						countermeasure_edit_window.hide();
						cm_types.clearFilter();
						var form_values = countermeasure_category_singleselector.getValue();
						cm_title = countermeasure_category_singleselector.getFieldLabel();
						var rec = cm_types.findRecord('name', cm_title);
						rec.set('active', 1);
						for (var item in form_values){
							var modifier_lookup = cm_options.findRecord('name', item);
							rec.set('effectiveness', modifier_lookup.get('effectiveness'));
							rec.set('fleet_pen', modifier_lookup.get('fleet_pen'));
							cm_detail = "<p>Active Item: "+rec.get('name') + "<br/>(Effectiveness Varies)";
						}
						data_update();
					}  
					if(countermeasure_category_multiselector.isVisible()){
						/*Fix querying to support multiselect*/	
					} 
					
					if(countermeasure_population_selector.isVisible() || countermeasure_independent_selector.isVisible() ||countermeasure_independent1_selector.isVisible()|| countermeasure_ordered_population_selector.isVisible()||countermeasure_independent2_selector.isVisible()||countermeasure_independent3_selector.isVisible()||countermeasure_independent4_selector.isVisible()||countermeasure_independent5_selector.isVisible()){
						countermeasure_edit_window.hide();
						cm_title = countermeasure_list.getValue();
						
						//Get main record value
						var rec = cm_types.findRecord('name', cm_title);
						rec.set('active', 1);
						rec.set('effectiveness', 0);
						rec.set('fleet_pen', 100);
						
						cm_options.each(function(item){
							var rec = cm_types.findRecord('name', cm_title);
							var prev = rec.get('effectiveness');
							prev += (item.get('effectiveness') * item.get('proportion'))/(100);
							if(prev >= 100){
								prev = 100;
							} 
							rec.set('effectiveness', prev);
						});
						cm_types.clearFilter();
						
						cm_detail = "<p>Active Item: "+cm_title + "<br/><br/>(Effectiveness Varies)";
						
						data_update();
					}
					
					generate_countermeasure_output(cm_title, cm_detail);
					cm_options.clearFilter();
					clear_cm_form();
				}
				
			}
		],
		hidden: true,
		listeners:{
			close: function(){
				cm_types.clearFilter();
			}
		}
	});
	
	var active_countermeasure_panel = Ext.create('Ext.panel.Panel', {
        title: 'Active Countermeasures',
        bodyPadding: 5,
        autoScroll: true,
        region: 'center'
	});
	var countermeasure_panel = Ext.create('Ext.panel.Panel', {
		region: 'center',
		layout: 'border',
		items: [active_countermeasure_panel, {
			xtype: 'panel',
            region: 'south',
            layout: 'vbox',
            items: [{
                xtype: 'button',
                text: "Add New Countermeasure",
				width: '100%',
				handler: function(){
					cm_types.filter('active',0);
					countermeasure_list.clearValue();
					countermeasure_edit_window.show();
				}
            },
			{
				xtype: 'button',
				text: "Export to CSV",
				width: '100%',
				handler: utmost_csv_export
			}]
			
		}]
	});
	
	function get_countermeasure_string () {
		var index = 0;
		var res = [];
		while (index < cm_types.count()){
			var test = cm_types.getAt(index);
			var val = test.get('val');
			if (test.get('active') == 1 && val != 'child_seat' && val != 'teen_driver' && val != 'seatbelt' && val != 'helmet'&& val != 'restraint_override' && val != 'vehicle_crashworthiness'&& val != 'vehicle_age'){ 
				if ((val == 'TOYOTA') || (val == 'fcw') || (val == 'aeb') || (val == 'lka') || (val == 'ldw') || (val == 'ldp')){
					cm_options.clearFilter();
					var toyota_index = 0;
					cm_options.filter('category_val', val);
					while (toyota_index < cm_options.count()){
						var test = cm_options.getAt(toyota_index);
						if (test.get('target_val') != 'PENETRATION'){
							res.push(test.get('target_val'));
						}
						toyota_index++;
					}
					cm_options.clearFilter();
				}else{
					res.push(val);
				}
			}
			index++;
		}
		return res.join('~');
	}
	
	function get_coeffs_string () {
		var index = 0;
		var res = [];
		while (index < cm_types.count()){
			var test = cm_types.getAt(index);
			var val = test.get('val');
			if (test.get('active') == 1 && val != 'child_seat' && val != 'teen_driver' && val != 'seatbelt' && val != 'helmet'&& val != 'restraint_override'&& val != 'vehicle_crashworthiness'){
				if ((val == 'TOYOTA') || (val == 'fcw') || (val == 'aeb') || (val == 'lka') || (val == 'ldw') || (val == 'ldp')){
					var toyota_index = 0;
					cm_options.clearFilter();
					cm_options.filter('category_val', val);
					var penetration_record = cm_options.findRecord('target_val', 'PENETRATION');
					var fleet_penetration = penetration_record.get('proportion')/100;
					while (toyota_index < cm_options.count()){
						var test = cm_options.getAt(toyota_index);
						if (test.get('target_val') != 'PENETRATION'){
							res.push((test.get('proportion')/100)*fleet_penetration);
						}
						toyota_index++;
					}
					cm_options.clearFilter();
				}else if(val == 'vehicle_age'){
                    res.push((test.get('fleet_pen')/100));
				}
				else{
					res.push((test.get('effectiveness')/100) * (test.get('fleet_pen')/100));
				}
				
			}
			index++;
		}
		return res.join('~');
	}

		
	function check_countermeasure(cm_in){
		var cm_target_index = cm_types.find('val', cm_in);
		var cm_target = cm_types.getAt(cm_target_index);
		if(cm_target.get('active') == 1){
			return true;
		}
		return false;
	}

	function cm_seatbelt_get_value(){
		var res = 0;
		var index = 0;
		cm_options.filter('category_val', 'seatbelt');
		while (index < cm_options.count()){
			var test = cm_options.getAt(index);
			res += ((test.get('proportion')/100)*(test.get('law_rate')/100));
			index++;
		}
		cm_options.clearFilter();
		return res;
	}

	function cm_childseat_get_value(category){
		var res = 0;
		var index = 0;
		cm_options.filter('category_val', 'child_seat');
		while (index < cm_options.count()){
			var test = cm_options.getAt(index);
			if (test.get('target_val') == category){
				res = (test.get('law_rate')/100) * (test.get('proportion')/100) + (1-(test.get('proportion')/100)) * (test.get('base_rate')/100);
			}
			index++;
		}
		cm_options.clearFilter();
		return res;
	}
	
	function cm_crashworthiness_get_values(){
		var res = {};
		var index = 0;
		cm_options.filter('category_val', 'vehicle_crashworthiness');
		while (index < cm_options.count()){
			var test = cm_options.getAt(index);
			res[test.get('target_val')] = test.get('proportion')/100;
			index++;
		}
		cm_options.clearFilter();
		res['Pedestrian'] = 1;
		res['Cyclist'] = 1;
		res['Other'] = 1;
		
		return res;
	}
	
	function cm_helmet_get_value(){
		var res = 0;
		var index = 0;
		var baseline = (.89*.39 + (1-.39)*.49);
		cm_options.filter('category_val', 'helmet');
		while (index < cm_options.count()){
			var test = cm_options.getAt(index);
			res += (test.get('law_rate')/100) * (test.get('proportion')/100) + (1-(test.get('proportion')/100)) * (test.get('base_rate')/100);
			index++;
		}
		cm_options.clearFilter();
		return (res/baseline);
	}
	
	function cm_restraint_override_get_value() {
		cm_options.filter('category_val', 'restraint_override');
		var test = cm_options.getAt(0);
		var res = (test.get('proportion')/100);
		cm_options.clearFilter();
		return res;
	}
	function cm_vehicle_age_get_value(outcome_variable) {
		if(outcome_variable=='fatality_count')
		{
			cm_options.filter('category_val', 'vehicle_age');
			var test = cm_options.getAt(0);
			var res = (test.get('proportion')/100);
			res=1-(res*.375);
			cm_options.clearFilter();
			return res;
		}else if(outcome_variable=='injury_count')
		{
			cm_options.filter('category_val', 'vehicle_age');
			var test = cm_options.getAt(0);
			var res = (test.get('proportion')/100);
			res=(1-res);
			cm_options.clearFilter();
			return res;
		}
	}
	
	function cm_teen_driver_get_value(driver_age) {
		if (driver_age != '14-15' && driver_age != '16-17' && driver_age != '18-20'){
			return 1;
		}
		var baseline_2014 = {'14-15': 0.602629208, '16-17': 0.467030855, '18-20':0.875076822};
		var coeff = {'14-15': -0.0701, '16-17':-0.1061, '18-20':-0.0183};
		cm_options.filter('category_val', 'teen_driver');
		var index = 0;
		var res = 0;
		while (index < cm_options.count()){
			var test = cm_options.getAt(index);
			res += (test.get('proportion')/100) * Math.exp(test.get('law_rate') * coeff[driver_age]);
			index++;
		}
		cm_options.clearFilter();
		return (res/baseline_2014[driver_age]);
	}
	
	function cm_status_export(){
		var res = "Countermeasure Status:\n";
		
		//Countermeasures - Simple
		
		//Countermeasures - Complex
		var index = 0;
		while (index < cm_types.count()){
			var test = cm_types.getAt(index);
			var val = test.get('val');
			if (test.get('active') == 1){
				if ((val == 'TOYOTA') || (val == 'fcw') || (val == 'aeb') || (val == 'lka') || (val == 'ldw') || (val == 'ldp')){
					//advanced countermeasure, toyota benefits
					var toyota_index = 0;
					cm_options.clearFilter();
					cm_options.filter('category_val', val);
					var penetration_record = cm_options.findRecord('target_val', 'PENETRATION');
					var fleet_penetration = penetration_record.get('proportion')/100;
					while (toyota_index < cm_options.count()){
						var toyota_test = cm_options.getAt(toyota_index);
						if (toyota_test.get('target_val') != 'PENETRATION'){
							res +=  test.get('name') + ',' + toyota_test.get('name') + ',' + ((toyota_test.get('proportion')/100)*fleet_penetration) + '\n';
						}
						toyota_index++;
					}
					cm_options.clearFilter();
				} else if (val == 'child_seat' || val == 'teen_driver' || val == 'helmet' || val == 'restraint_override'|| val == 'seatbelt' || val == "vehicle_crashworthiness"){
					//law countermeasure  TODO: add TYPE to countermeasure model 
					var details_index = 0;
					cm_options.clearFilter();
					cm_options.filter('category_val', val);
					while (details_index < cm_options.count()){
						var details_test = cm_options.getAt(details_index);
						res +=  test.get('name') + ',' + details_test.get('name') + ',' + (details_test.get('proportion')/100) + '\n';
						details_index++;
					}
					cm_options.clearFilter();
				}else{
					//Standard Countermeasure
					res += test.get('name') + ',' + ((test.get('effectiveness')/100) * (test.get('fleet_pen')/100)) + '\n';
				}
				
			}
			index++;
		}
		
		return res;
	}