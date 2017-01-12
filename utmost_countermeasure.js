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
		//fields: ['val', 'name', 'active', 'effectiveness', 'fleet_pen', 'description'],
		model: 'Countermeasure_Type_Count',
		data : [
			//Old Countermeasures
			/* 
			{"val":"LDW", "name":"Lane Departure Warning","active":0,"effectiveness":25,"fleet_pen":100, "description":"Lane Departure Warning is a system that provides an alert to the driver when they are drifting out of their current lane. Lane Departure Warning is estimated to reduce 25% of head-on collisions and 25% of off-path crashes (Abele et al. 2005, Regan et al. 2001)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"ACC", "name":"Adaptive Cruise Control","active":0,"effectiveness":29,"fleet_pen":100, "description":"Adaptive Cruise Control is an enhanced Cruise Control system that adjusts speed based on the speed of the vehicle ahead, decellerating automatically should the leading vehicle drop below the set cruise control speed. Adaptive cruise control is estimated to reduce 6-29% of rear-end crashes (Elvik 2006, Najm & Mironer 1998)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"Alcohol_Interlock", "name":"Alcohol Interlock","active":0,"effectiveness":18,"fleet_pen":100, "description":"Alcohol Interlock is a system that checks the blood alcohol of the driver before allowing the vehicle to be turned on. Alcohol interlocks are estimated to reduce 18% of crashes where alcohol was a factor (eSafety Forum 2005)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"FCW", "name":"Forward Collision Warning","active":0,"effectiveness":50,"fleet_pen":100, "description":"Forward Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object in front of it at a dangerous rate. FCW is estimated to reduce 7-80% of rear end crashes (FWHA 1998, Kanianthra and Murtig 1997, Kullen 2005, NHTSA 2001, Regan et al. 2002, and 1Sugimoto 2005) and 50-80% of head-on and object crashes (Lee et al. 2002)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"LCW", "name":"Lane Change Warning","active":0,"effectiveness":38,"fleet_pen":100, "description":"Lane Change Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object in a nearby lane. Lane change warning systems are estimated to reduce 37-40% of drifting and lane change crashes (FHWA 1998, Kaniantrha and Murtig 1997, McKeever 1998)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"Lane_Keeping_Assist", "name":"Lane-Keeping Assist","active":0,"effectiveness":25,"fleet_pen":100, "description":"Lane-Keeping Assist is a system that scans the road and automatically keeps a vehicle within its own lane. Lane keeping assistance systems are estimated to reduce 17-25% of off-path crashes (eSafety Forum 2005, FHWA 1998, eImpact Project 2005), 24% of head-on collisions (eImpact Project 2005), and 60% of sideswipe collisions (eImpact Project 2005)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"Pedestrian_Detection", "name":"Pedestrian Detection","active":0,"effectiveness":5,"fleet_pen":100, "description":"Pedestrian Detection provides an alert to the driver when a pedestrian is detected in the path of the vehicle, potentially out of sight of the driver. There are no currently published estimates on the effectiveness of pedestrian detection systems.", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"Backing_Collision_Warning", "name":"Reverse Collision Warning","active":0,"effectiveness":65,"fleet_pen":100, "description":"Reverse Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object behind it at a dangerous rate. Reverse collision warning systems are estimated to reduce 50-81% of backing crashes (Lee 2002)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"ESC", "name":"Electronic Stability Control","active":0,"effectiveness":40,"fleet_pen":100, "description":"Electronic Stability Control is a system that automatically adjust the braking and/or engine power to multiple wheels in order to maintain vehicle stability in adverse conditions. Electronic stability control is estimated to reduce 40% of all single-vehicle crashes and 75% of rollovers (IIHS).", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"RDW", "name":"Road Departure Warning","active":0,"effectiveness":24,"fleet_pen":100, "description":"Road Departure Warning is a system that alerts the driver when the vehicle is detected to be departing the roadway. Road departure warning systems are estimated to reduce 24% of off-path crashes crashes (Kaniantrha and Murtig 1997)", 'selector_type': ["numeric"], 'selector_desc': []},
			{"val":"RDW", "name":"Independent Selector","active":0,"effectiveness":24,"fleet_pen":100, "description":"Independent set of sliders", 'selector_type': ["independent", "category_unique"], 'selector_desc': ["Sliders", "Two Choices"]},
			{"val":"CHILDSEATLAW", "name":"Child Seat Laws","active":0,"effectiveness":100,"fleet_pen":100, "description":"Laws for child seats tend to impact the proportion of children who are properly restraines vs sub-optimally restrained.", 'selector_type': ["independent"], 'selector_desc': ["Restraint Categories"]},
			{"val":"SEATBELTLAW", "name":"Seatbelt Enforcement","active":0,"effectiveness":100,"fleet_pen":100, "description":"Seatbelt enforcement practice encourages drivers to wear their seatbelts and have a demonstrable effect on the rate of belted occupants in crashes", 'selector_type': ["independent"], 'selector_desc': ["Enforcement Categories"]},
			{"val":"HELMETLAW", "name":"Motorcycle Helmet Law","active":0,"effectiveness":100,"fleet_pen":100, "description":"Motorcycle Helmet Laws require motorcyclists to wear helmets.  Laws that do not require this may as well not exist", 'selector_type': ["independent"], 'selector_desc': ["Law Type"]},
			{"val":"GDL", "name":"Graduated Drivers Licensing","active":0,"effectiveness":100,"fleet_pen":100, "description":"I need to change how I handle grouping to make multiple age minimum categories work properly", 'selector_type': ["population", "independent"], 'selector_desc': ["Minimum Age", "Restrictions"]}
			*/
			// New Countermeasures
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
				"val":"adaptive_headlighting",
				"name":"Adaptive Headlighting",
				"active":0,
				"effectiveness":65,
				"fleet_pen":100, 
				"description":"Description Here and defaults for Adaptive Headlighting", 
				'selector_type': ["numeric"], 
				'selector_desc': []
			},
			
		]
	});
	
	Ext.define('Countermeasure_Detail', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'category_val', type: 'string'}, 
				{name: 'name', type: 'string'}, 
				{name: 'target_val', type: 'string'},
				{name: 'effectiveness', type: 'int'}, 
				{name: 'proportion', type: 'int'},
				{name: 'detail_type', type: 'string'},
				{name: 'lock', type: 'int'}
				]
	});
	
	var cm_options = Ext.create('Ext.data.Store', {
		model: 'Countermeasure_Detail',
		data : [
			{"category_val":"HELMETLAW", 'name':"Full Helmet Law", 'target_val':"HELMETLAW", 'effectiveness':100, 'proportion':35, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"SEATBELTLAW", 'name':"Primary Enforcement", 'target_val':"SEATBELTLAW", 'effectiveness':5, 'proportion':76, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"SEATBELTLAW", 'name':"Points or Secondary Fines", 'target_val':"SEATBELTLAW", 'effectiveness':25, 'proportion':17, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"CHILDSEATLAW", 'name':"0-1 Year Old Rear-Facing Seat", 'target_val':"CHILDSEATLAW", 'effectiveness':100, 'proportion':11, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"CHILDSEATLAW", 'name':"2-4 Year Old Harnessed Child Seat", 'target_val':"CHILDSEATLAW", 'effectiveness':100, 'proportion':13, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"CHILDSEATLAW", 'name':"5-7 Year Old Booster Seat", 'target_val':"CHILDSEATLAW", 'effectiveness':100, 'proportion':85, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"CHILDSEATLAW", 'name':"8-10 Year Old Booster Seat", 'target_val':"CHILDSEATLAW", 'effectiveness':100, 'proportion':1, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"GDL", 'name':"Age 14", 'target_val':"GDL", 'effectiveness':5, 'proportion':20, 'detail_type': 'population', 'lock': 0},
			{"category_val":"GDL", 'name':"Age 15", 'target_val':"GDL", 'effectiveness':5, 'proportion':50, 'detail_type': 'population', 'lock': 0},
			{"category_val":"GDL", 'name':"Age 16", 'target_val':"GDL", 'effectiveness':5, 'proportion':30, 'detail_type': 'population', 'lock': 0},
			{"category_val":"GDL", 'name':"Supervised Driving Hours", 'target_val':"GDL", 'effectiveness':5, 'proportion':25, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"GDL", 'name':"Passenger Restritcions", 'target_val':"GDL", 'effectiveness':5, 'proportion':25, 'detail_type': 'independent', 'lock': 0},
			{"category_val":"GDL", 'name':"Nighttime Restrictions", 'target_val':"GDL", 'effectiveness':100, 'proportion':50, 'detail_type': 'independent', 'lock': 0}
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
	var countermeasure_population_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		name: 'cm_population',
		hidden: true
	});
	var countermeasure_independent_selector = Ext.create('Ext.form.FieldSet',{
		width: "100%",
		name: 'cm_independent',
		hidden: true
	});
	
	var countermeasure_edit_form = Ext.create('Ext.form.Panel', {
		layout: "form",
		title: "Parameters",
		flex: 1,
		bodyPadding: 5,
		items: [
			countermeasure_list,
			effectiveness_slider, 
			penetration_slider,
			countermeasure_category_multiselector,
			countermeasure_category_singleselector,
			countermeasure_population_selector,
			countermeasure_independent_selector
		]
	});
	
	var clear_cm_form = function(){
		effectiveness_slider.setVisible(false);
		penetration_slider.setVisible(false);
		countermeasure_category_singleselector.setVisible(false);
		countermeasure_category_multiselector.setVisible(false);
		countermeasure_population_selector.setVisible(false);
		countermeasure_independent_selector.setVisible(false);
			
		countermeasure_category_singleselector.removeAll();
		countermeasure_category_multiselector.removeAll();
		countermeasure_population_selector.removeAll();
		countermeasure_independent_selector.removeAll();
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
				
				
			} else if (selected_cm_type == "category_unique"){
							
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
				
			} else if (selected_cm_type == "category_multiple"){
				
				
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
			} else if (selected_cm_type == "population"){
				
				
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
			} else if (selected_cm_type == "independent"){
				
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
				close:{
					fn: function(){
						//clear filter activity
						var targ_name = this.title;
						var rec = cm_types.findRecord('name', targ_name);
						rec.set('active', 0);
						data_update();
					}
				}
			}
		}));
		
	}
	
	var countermeasure_edit_window = Ext.create('Ext.window.Window', {
		layout: "form",
		title: "Adjust Countermeasure",
        width: "50%",
		closeable: false,
		resizable: false,
		items: [
			{
				xtype: 'panel',
				layout: 'hbox',
				items: [countermeasure_edit_form, cm_description]
			},
			{
				xtype: "button",
				text: "Save",
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
							cm_detail = "<p>Active Law: "+item;
						}
						data_update();
					}  
					if(countermeasure_category_multiselector.isVisible()){
						/*Fix querying to support multiselect*/	
					} 
					
					if(countermeasure_population_selector.isVisible() || countermeasure_independent_selector.isVisible()){
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
						
						cm_detail = "<p>Active Law: "+item;
						
						data_update();
					}
					
					generate_countermeasure_output(cm_title, cm_detail);
					cm_options.clearFilter();
					clear_cm_form();
				}
				
			}
		],
		hidden: true
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
            layout: 'fit',
            items: {
                xtype: 'button',
                text: "Add New Countermeasure",
				handler: function(){
					cm_types.filter('active',0);
					countermeasure_list.clearValue();
					countermeasure_edit_window.show();
				}
            }
			
		}]
	});
	
	function get_countermeasure_string () {
		var index = 0;
		var res = [];
		while (index < cm_types.count()){
			var test = cm_types.getAt(index);
			if (test.get('active') == 1){
				res.push(test.get('val'));
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
			if (test.get('active') == 1){
				res.push((test.get('effectiveness')/100) * (test.get('fleet_pen')/100));
			}
			index++;
		}
		return res.join('~');
	}