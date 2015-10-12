//Data model

	Ext.namespace('UTMOST');
	
	Ext.define('Crash_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'}, 
				{name: 'crash_count', type: 'float'}, 
				{name: 'crash_count_adj', type: 'float'}]
	});
	
	
	/*var utmost_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count',
		data : [
			{crash_count: "100", crash_type: "Animal", crash_count_adj: "75"},
			{crash_count: "50", crash_type: "Avoidance", crash_count_adj: "15"},
			{crash_count: "45", crash_type: "Backing", crash_count_adj: "25"},
			{crash_count: "37", crash_type: "Change lanes", crash_count_adj: "13"},
			{crash_count: "64", crash_type: "Ctl Loss", crash_count_adj: "57"},
			{crash_count: "100", crash_type: "Drifting", crash_count_adj: "75"},
			{crash_count: "50", crash_type: "Object", crash_count_adj: "15"},
			{crash_count: "45", crash_type: "Opp direction", crash_count_adj: "25"},
			{crash_count: "37", crash_type: "Other", crash_count_adj: "13"},
			{crash_count: "64", crash_type: "Parking", crash_count_adj: "57"},
			{crash_count: "100", crash_type: "Pedicyclist", crash_count_adj: "75"},
			{crash_count: "50", crash_type: "Rear End", crash_count_adj: "15"},
			{crash_count: "45", crash_type: "Road Depart", crash_count_adj: "25"},
			{crash_count: "37", crash_type: "Road Depart/Backing", crash_count_adj: "13"},
			{crash_count: "64", crash_type: "Rollover", crash_count_adj: "57"},
			{crash_count: "50", crash_type: "Run light/stop", crash_count_adj: "15"},
			{crash_count: "45", crash_type: "Turning/same dir", crash_count_adj: "25"},
			{crash_count: "37", crash_type: "Veh Failure", crash_count_adj: "13"},
			{crash_count: "64", crash_type: "XPaths@Non-Signal", crash_count_adj: "57"},
			{crash_count: "50", crash_type: "XPaths@Signal", crash_count_adj: "15"}
		]
	});*/

	
	
	
	var utmost_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count',
		proxy: {
			type: 'ajax',
			url : 'utmost_data.php',
			reader: {
				type: 'json',
				model: 'Crash_Type_Count'
			}
		}
	});
	
	
	function data_update(){
		var cm_string = get_countermeasure_string();
		var cm_cf_string = get_coeffs_string();
		var data_categories = get_data_cateogories();
		utmost_chart_values.load({
			params: {
				filter_string: cm_string,
				coeffs_string: cm_cf_string,
				group_type: data_categories
			},
			callback: function(records, operation, success){
				var max = 0;
				var top_count = 0
				var total = 0;
				var adj_total = 0;
				var count = utmost_chart_values.count();
				for (i = 0; i < count; i++){
					top_count = parseInt(utmost_chart_values.getAt(i).get('crash_count'));
					if (max < top_count){
						max = top_count;
					}
					total += top_count;
					adj_total += parseInt(utmost_chart_values.getAt(i).get('crash_count_adj'));
				}
				utmost_totals_chart_values.getAt(0).set('crash_count', total);
				utmost_totals_chart_values.getAt(0).set('crash_count_adj', adj_total);
				utmost_chart.axes.get(0).maximum = max;
			}
		});
		
	}


