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
				{name: 'selector_type', type: 'string'}
				]
	});
	
	
	var cm_types = Ext.create('Ext.data.Store', {
		//fields: ['val', 'name', 'active', 'effectiveness', 'fleet_pen', 'description'],
		model: 'Countermeasure_Type_Count',
		data : [
			{"val":"LDW", "name":"Lane Departure Warning","active":0,"effectiveness":25,"fleet_pen":100, "description":"Lane Departure Warning is a system that provides an alert to the driver when they are drifting out of their current lane. Lane Departure Warning is estimated to reduce 25% of head-on collisions and 25% of off-path crashes (Abele et al. 2005, Regan et al. 2001)", 'selector_type': "numeric"},
			{"val":"ACC", "name":"Adaptive Cruise Control","active":0,"effectiveness":29,"fleet_pen":100, "description":"Adaptive Cruise Control is an enhanced Cruise Control system that adjusts speed based on the speed of the vehicle ahead, decellerating automatically should the leading vehicle drop below the set cruise control speed. Adaptive cruise control is estimated to reduce 6-29% of rear-end crashes (Elvik 2006, Najm & Mironer 1998)", 'selector_type': "numeric"},
			{"val":"Alcohol_Interlock", "name":"Alcohol Interlock","active":0,"effectiveness":18,"fleet_pen":100, "description":"Alcohol Interlock is a system that checks the blood alcohol of the driver before allowing the vehicle to be turned on. Alcohol interlocks are estimated to reduce 18% of crashes where alcohol was a factor (eSafety Forum 2005)", 'selector_type': "numeric"},
			//{"val":"FCW", "name":"Forward Collision Warning","active":0,"effectiveness":50,"fleet_pen":100, "description":"Forward Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object in front of it at a dangerous rate. FCW is estimated to reduce 7-80% of rear end crashes (FWHA 1998, Kanianthra and Murtig 1997, Kullen 2005, NHTSA 2001, Regan et al. 2002, and 1Sugimoto 2005) and 50-80% of head-on and object crashes (Lee et al. 2002)", 'selector_type': "numeric"},
			{"val":"LCW", "name":"Lane Change Warning","active":0,"effectiveness":38,"fleet_pen":100, "description":"Lane Change Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object in a nearby lane. Lane change warning systems are estimated to reduce 37-40% of drifting and lane change crashes (FHWA 1998, Kaniantrha and Murtig 1997, McKeever 1998)", 'selector_type': "numeric"},
			{"val":"Lane_Keeping_Assist", "name":"Lane-Keeping Assist","active":0,"effectiveness":25,"fleet_pen":100, "description":"Lane-Keeping Assist is a system that scans the road and automatically keeps a vehicle within its own lane. Lane keeping assistance systems are estimated to reduce 17-25% of off-path crashes (eSafety Forum 2005, FHWA 1998, eImpact Project 2005), 24% of head-on collisions (eImpact Project 2005), and 60% of sideswipe collisions (eImpact Project 2005)", 'selector_type': "numeric"},
			{"val":"Pedestrian_Detection", "name":"Pedestrian Detection","active":0,"effectiveness":5,"fleet_pen":100, "description":"Pedestrian Detection provides an alert to the driver when a pedestrian is detected in the path of the vehicle, potentially out of sight of the driver. There are no currently published estimates on the effectiveness of pedestrian detection systems.", 'selector_type': "numeric"},
			{"val":"Backing_Collision_Warning", "name":"Reverse Collision Warning","active":0,"effectiveness":65,"fleet_pen":100, "description":"Reverse Collision Warning is a system that provides an alert to the driver in the event the vehicle is approaching an object behind it at a dangerous rate. Reverse collision warning systems are estimated to reduce 50-81% of backing crashes (Lee 2002)", 'selector_type': "numeric"},
			{"val":"ESC", "name":"Electronic Stability Control","active":0,"effectiveness":40,"fleet_pen":100, "description":"Electronic Stability Control is a system that automatically adjust the braking and/or engine power to multiple wheels in order to maintain vehicle stability in adverse conditions. Electronic stability control is estimated to reduce 40% of all single-vehicle crashes and 75% of rollovers (IIHS).", 'selector_type': "numeric"},
			{"val":"RDW", "name":"Road Departure Warning","active":0,"effectiveness":24,"fleet_pen":100, "description":"Road Departure Warning is a system that alerts the driver when the vehicle is detected to be departing the roadway. Road departure warning systems are estimated to reduce 24% of off-path crashes crashes (Kaniantrha and Murtig 1997)", 'selector_type': "numeric"},
			{"val":"FCW", "name":"Helmet Laws","active":0,"effectiveness":100,"fleet_pen":100, "description":"Michigan thought it was totally brilliant to defang it's motorcycle helmet law and has been collecting vegetables since. It's basically as good as no law.  Instead, choose proper laws.  ", 'selector_type': "category_unique"}
		]
	});
	
	Ext.define('Countermeasure_Box_Category', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'category_val', type: 'string'}, 
				{name: 'name', type: 'string'}, 
				{name: 'target_val', type: 'string'},
				{name: 'effectiveness', type: 'int'}, 
				{name: 'fleet_pen', type: 'int'}
				]
	});
	
	var cm_options = Ext.create('Ext.data.Store', {
		model: 'Countermeasure_Box_Category',
		data : [
			{"category_val":"FCW", 'name':"Real Law", 'target_val':"FCW", 'effectiveness':100, 'fleet_pen':100},
			{"category_val":"FCW", 'name':"Fake Law", 'target_val':"FCW", 'effectiveness':5, 'fleet_pen':5}
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
	var countermeasure_population_selector = Ext.create('Ext.panel.Panel',{
		width: "100%",
		name: 'cm_population',
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
			countermeasure_population_selector
		]
	});
	countermeasure_list.on('select', function(combo, record, index){
		var selected_cm_type = record[0].get('selector_type');
		if (selected_cm_type == "numeric"){
			effectiveness_slider.setVisible(true);
			penetration_slider.setVisible(true);
			countermeasure_category_singleselector.setVisible(false);
			countermeasure_category_multiselector.setVisible(false);
			countermeasure_population_selector.setVisible(false);
			
			cm_description.update(record[0].get('description'));
			effectiveness_slider.setValue(record[0].get('effectiveness'));
			penetration_slider.setValue(record[0].get('fleet_pen'));
			
			//clear child selectors
			countermeasure_category_singleselector.removeAll();
			countermeasure_category_multiselector.removeAll();
			countermeasure_population_selector.removeAll();
		} else if (selected_cm_type == "category_unique"){
			effectiveness_slider.setVisible(false);
			penetration_slider.setVisible(false);
			countermeasure_category_singleselector.setVisible(true);
			countermeasure_category_multiselector.setVisible(false);
			countermeasure_population_selector.setVisible(false);
			
			//clear child selectors
			countermeasure_category_singleselector.removeAll();
			countermeasure_category_multiselector.removeAll();
			countermeasure_population_selector.removeAll();
			
			//Set label
			countermeasure_category_singleselector.setFieldLabel(record[0].get('name'));
			
			//Set Description
			cm_description.update(record[0].get('description'));
			
			//add correct child selectors
			cm_options.clearFilter();
			cm_options.filter('category_val', record[0].get('val'));
			cm_options.each(function(record){
				//If slow change this to a single add of an array of boxes
				countermeasure_category_singleselector.add({boxLabel:record.get('name'), name:record.get('name'), inputValue:record.get('target_val')});
			});
			
		} else if (selected_cm_type == "category_multiple"){
			effectiveness_slider.setVisible(false);
			penetration_slider.setVisible(false);
			countermeasure_category_singleselector.setVisible(false);
			countermeasure_category_multiselector.setVisible(true);
			countermeasure_population_selector.setVisible(false);
			
			//clear child selectors
			countermeasure_category_singleselector.removeAll();
			countermeasure_category_multiselector.removeAll();
			countermeasure_population_selector.removeAll();
			
			//Set label
			countermeasure_category_multiselector.setFieldLabel(record[0].get('name'));
			
			//Set Description
			cm_description.update(record[0].get('description'));
			
			//add correct child selectors
			cm_options.clearFilter();
			cm_options.filter('category_val', record[0].get('val'));
			cm_options.each(function(record){
				//If slow change this to a single add of an array of boxes
				countermeasure_category_multiselector.add({boxLabel:record.get('name'), name:record.get('name'), inputValue:record.get('target_val')});
			});
		} else if (selected_cm_type == "population"){
			effectiveness_slider.setVisible(false);
			penetration_slider.setVisible(false);
			countermeasure_category_singleselector.setVisible(false);
			countermeasure_category_multiselector.setVisible(false);
			countermeasure_population_selector.setVisible(true);
			
			//clear child selectors
			countermeasure_category_singleselector.removeAll();
			countermeasure_category_multiselector.removeAll();
			countermeasure_population_selector.removeAll();
			
			//add correct child selectors
			cm_options.clearFilter();
			cm_options.filter('category_val', record[0].get('val'));
			cm_options.each(function(record){
				//create set of sliders at default value
				countermeasure_category_multiselector.add({boxLabel:record.get('name'), name:record.get('name'), inputValue:record.get('target_val')});
				
				//handle multislider function?
			});
		}
	});
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
					if (effectiveness_slider.isVisible()){
						countermeasure_edit_window.hide();
						cm_types.clearFilter();
						var form_values = countermeasure_edit_form.getValues();
						var rec = cm_types.findRecord('name', form_values['cm_name']);
						rec.set('active', 1);
						rec.set('effectiveness', form_values['cm_effect']);
						rec.set('fleet_pen', form_values['cm_pen']);
						active_countermeasure_panel.add(Ext.create('Ext.panel.Panel', {
							title: form_values['cm_name'],
							closable: true,
							bodyPadding: 5,
							margin: 5,
							html: "<p>Effectiveness: "+form_values['cm_effect']+"%</p>" + "<p>Fleet Penetration: "+form_values['cm_pen']+"%</p>",
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
						data_update();
					} else if(countermeasure_category_singleselector.isVisible()){
						countermeasure_edit_window.hide();
						cm_types.clearFilter();
						var form_values = countermeasure_category_singleselector.getValue();
						var cm_title = countermeasure_category_singleselector.getFieldLabel();
						var rec = cm_types.findRecord('name', cm_title);
						rec.set('active', 1);
						for (var item in form_values){
							var modifier_lookup = cm_options.findRecord('name', item);
							rec.set('effectiveness', modifier_lookup.get('effectiveness'));
							rec.set('fleet_pen', modifier_lookup.get('fleet_pen'));
							active_countermeasure_panel.add(Ext.create('Ext.panel.Panel', {
								title:cm_title,
								closable: true,
								bodyPadding: 5,
								margin: 5,
								html: "<p>Active Law: "+item,
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
						data_update();
					} else if(countermeasure_category_multiselector.isVisible()){
						/*Fix querying to support multiselect*/
					} else if(countermeasure_population_selector.isVisible()){
						countermeasure_edit_window.hide();
						cm_types.clearFilter();
						var form_values = countermeasure_category_singleselector.getValue();
						var cm_title = countermeasure_category_singleselector.getFieldLabel();
						var rec = cm_types.findRecord('name', cm_title);
						rec.set('active', 1);
						for (var item in form_values){
							var modifier_lookup = cm_options.findRecord('name', item);
							rec.set('effectiveness', modifier_lookup.get('effectiveness'));
							rec.set('fleet_pen', modifier_lookup.get('fleet_pen'));
							active_countermeasure_panel.add(Ext.create('Ext.panel.Panel', {
								title:cm_title,
								closable: true,
								bodyPadding: 5,
								margin: 5,
								html: "<p>Active Law: "+item,
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
						data_update();
					
					cm_options.clearFilter();
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