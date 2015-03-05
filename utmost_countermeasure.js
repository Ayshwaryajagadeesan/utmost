	Ext.namespace('UTMOST');
	
//CM Panel Code
	var cm_types = Ext.create('Ext.data.Store', {
		fields: ['val', 'name', 'active', 'effectiveness', 'fleet_pen'],
		data : [
			{"val":"LDW", "name":"Lane Departure Warning","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"ACC", "name":"Adaptive Cruise Control","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"Alcohol_Interlock", "name":"Alcohol Interlock","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"FCW", "name":"Forward Collision Warning","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"LCW", "name":"Lateral Collision Warning","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"Lane_Keeping_Assist", "name":"Lane-Keeping Assist","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"Pedestrian_Detection", "name":"Pedestrian Detection","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"Backing_Collision_Warning", "name":"Backing Collision Warning","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"ESC", "name":"Electronic Stability Control","active":0,"effectiveness":100,"fleet_pen":100},
			{"val":"RDW", "name":"Road Departure Warning","active":0,"effectiveness":100,"fleet_pen":100}
		]
	});
	var countermeasure_edit_form = Ext.create('Ext.form.Panel', {
		layout: "form",
		items: [
			{
				xtype: 'combobox',
				name: 'cm_name',
                width: "100%",
				store: cm_types,
				queryMode: 'local',
				displayField: 'name',
				valueField: 'name',
				fieldLabel: 'Select Countermeasure'
			}, {
				fieldLabel: "Countermeasure Effectiveness:",
				name: 'cm_effect',
				xtype: "sliderfield",
				width: "100%",
				value: 50,
				increment: 1,
				minValue: 0,
				maxValue: 100
			}, {
				fieldLabel: "Fleet Penetration:",
				xtype: "sliderfield",
				name: 'cm_pen',
				width: "100%",
				value: 50,
				increment: 1,
				minValue: 0,
				maxValue: 100
			}
		]
	});
	var countermeasure_edit_window = Ext.create('Ext.window.Window', {
		layout: "form",
		title: "Adjust Countermeasure",
        width: "50%",
		resizable: false,
		items: [
			countermeasure_edit_form,
			{
				xtype: "button",
				text: "Save",
                width: "100%",
				handler: function(){
					countermeasure_edit_window.hide();
					cm_types.clearFilter();
					var form_values = countermeasure_edit_form.getValues();
					var rec = cm_types.find(name, form_values['cm_name']);
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
									var rec = cm_types.find('name', targ_name);
									rec.set('active', 0);
								}
							}
						}
					}));
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
					countermeasure_edit_window.show();
				}
            }
			
		}]
	});