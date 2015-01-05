//CM Panel Code
	var cm_types = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"cm_fcw", "name":"Forward Collision Warning"},
			{"val":"cm_ldw", "name":"Lane Departure Warning"},
			{"val":"cm_esc", "name":"Electronic Stability Control"}
			
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
					var form_values = countermeasure_edit_form.getValues();
					active_countermeasure_panel.add(Ext.create('Ext.panel.Panel', {
						title: form_values['cm_name'],
						closable: true,
						bodyPadding: 5,
						margin: 5,
						html: "<p>Effectiveness: "+form_values['cm_effect']+"%</p>" + "<p>Fleet Penetration: "+form_values['cm_pen']+"%</p>"
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
					countermeasure_edit_window.show();
				}
            }
			
		}]
	});