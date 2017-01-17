//World Panel Code
	Ext.namespace('UTMOST');
	
	var outcome_vals = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"person_count", "name":"Person Count"},
			{"val":"injury_count", "name":"Injury Count"}
		]
	});
	var chart_vars = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"crash_type", "name":"Crash Type" },
			{"val":"crash_direction", "name":"Crash Direction"},
			{"val":"vehicle_type", "name":"Vehicle Type"},
			{"val":"age", "name":"Person Age"},
			{"val":"driver_age", "name":"Driver Age"},
			{"val":"sex", "name":"Sex"},
			{"val":"alcohol_involvement", "name":"Alcohol Involvement"},
			{"val":"light_condition", "name":"Light Condition"}
		]
	});
	
	var chart_subsets = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"none", "name":"None"},
			{"val":"alcohol_involvement", "name":"Alcohol Involvement"},
			{"val":"age", "name":"Person Age"},
			{"val":"driver_age", "name":"Driver Age"}
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
						utmost_chart.axes.getAt(0).maximum = 5500000;
						utmost_injury_chart.axes.getAt(0).maximum = 5500000;
					} else if (chart_variable_selector.getSubmitValue() == "crash_direction"){
						utmost_chart.axes.getAt(0).maximum = 7000000;
						utmost_injury_chart.axes.getAt(0).maximum = 7000000;
					} else if (chart_variable_selector.getSubmitValue() == "vehicle_type"){
						utmost_chart.axes.getAt(0).maximum = 7600000; // probably not valuable
						utmost_injury_chart.axes.getAt(0).maximum = 7600000;
					} else if (chart_variable_selector.getSubmitValue() == "age"){
						utmost_chart.axes.getAt(0).maximum = 11000000;
						utmost_injury_chart.axes.getAt(0).maximum = 11000000;
					} else if (chart_variable_selector.getSubmitValue() == "driver_age"){
						utmost_chart.axes.getAt(0).maximum = 12000000; //probably not valuable
						utmost_injury_chart.axes.getAt(0).maximum = 12000000;
					} else if (chart_variable_selector.getSubmitValue() == "sex"){
						utmost_chart.axes.getAt(0).maximum = 7800000;
						utmost_injury_chart.axes.getAt(0).maximum = 7800000;
					} else if (chart_variable_selector.getSubmitValue() == "alcohol_involvement"){
						utmost_chart.axes.getAt(0).maximum = 14000000; //probably not valuable
						utmost_injury_chart.axes.getAt(0).maximum = 14000000;
					} else if (chart_variable_selector.getSubmitValue() == "light_condition"){
						utmost_chart.axes.getAt(0).maximum = 10850000;
						utmost_injury_chart.axes.getAt(0).maximum = 10850000;
					}
					
					data_subsets.clearFilter();
					var target_record = data_subsets.findRecord('title', 'All');
					target_record.set('chart_max', utmost_chart.axes.getAt(0).maximum);
					data_subsets.filter('group_var', chart_subset_selector.getSubmitValue());
					
					data_update();
				}
			}
	});

	
	var chart_subset_selector = Ext.create('Ext.form.ComboBox', {
			xtype: 'combobox',
			store: chart_subsets,
			value: 'none',
			queryMode: 'local',
			valueField: 'val',
			displayField: 'name',
			fieldLabel: 'Chart Subset',
			listeners: {
				select: function( combo, records, eOpts ){
					data_update();
					generate_subset_tabs(chart_subset_selector.getSubmitValue());
				}
			}
	});
	
	var chart_outcome_selector = Ext.create('Ext.form.ComboBox', {
			xtype: 'combobox',
			store: outcome_vals,
			value: 'person_count',
			queryMode: 'local',
			valueField: 'val',
			displayField: 'name',
			fieldLabel: 'Outcome Value',
			listeners: {
				select: function( combo, records, eOpts ){
					data_update();
				}
			}
	});
	
	
	var world_panel = Ext.create('Ext.panel.Panel', {
		title: 'World Configuration',
		bodyPadding: 5,
		region: 'north',
		layout: 'form',
		items:[chart_outcome_selector, chart_variable_selector, chart_subset_selector]
	});
	
	var get_data_cateogories = function(){
		return chart_variable_selector.getSubmitValue();
	}
	
	var get_data_subset_var = function(){
		return chart_subset_selector.getSubmitValue();
	}
	
	var get_outcome_var = function(){
		return chart_outcome_selector.getSubmitValue();
	}
