//World Panel Code
	Ext.namespace('UTMOST');
	
	var outcome_vals = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"crash_count", "name":"Crash Count"}
		]
	});
	var chart_vars = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"crash_type", "name":"Crash Type" },
/*			{"val":"Vehicle_Type", "name":"Vehicle Type"},*/
			
			{"val":"crash_direction", "name":"Crash Direction"},
			{"val":"age", "name":"Age"}
			/*,
			{"val":"sex", "name":"Sex"},
			{"val":"alcohol_involvement", "name":"Alcohol Involvement"}*/
		]
	});
	
	var chart_variable_selector = Ext.create('Ext.form.ComboBox', {
			xtype: 'combobox',
			store: chart_vars,
			value: 'crash_type',
			queryMode: 'local',
			valueField: 'val',
			displayField: 'name',
			fieldLabel: 'Chart Variable',
			listeners: {
				select: function( combo, records, eOpts ){
					if (chart_variable_selector.getSubmitValue() == "crash_type"){
						utmost_chart.axes.getAt(0).maximum = 50000000;
					} else if (chart_variable_selector.getSubmitValue() == "crash_direction"){
						utmost_chart.axes.getAt(0).maximum = 60000000;
					} else if (chart_variable_selector.getSubmitValue() == "age"){
						utmost_chart.axes.getAt(0).maximum = 50000000;
					}
					data_update();
				}
			}
	});
	
	var world_panel = Ext.create('Ext.panel.Panel', {
		title: 'World Configuration',
		bodyPadding: 5,
		region: 'north',
		layout: 'form',
		items:[{
			xtype: 'combobox',
			store: outcome_vals,
			value: 'Crash Count',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'val',
			fieldLabel: 'Outcome Value'	
			
		}, chart_variable_selector
		]
	});
	
	var get_data_cateogories = function(){
		return chart_variable_selector.getSubmitValue();
	}