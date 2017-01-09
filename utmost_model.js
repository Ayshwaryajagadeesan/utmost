//Data model

	Ext.namespace('UTMOST');
	
	Ext.define('Crash_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'}, 
				{name: 'person_count', type: 'float'}, 
				{name: 'person_count_adj', type: 'float'}]
	});
	
	
	Ext.define('Injury_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'injury_count', type: 'float'}, 
				{name: 'injury_count_adj', type: 'float'}
				
				]
	});
	
	Ext.define('Injury_Raw_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'frequency', type: 'float'}, 
				{name: 'injury_count', type: 'float'}, 
				{name: 'injury_count_adj', type: 'float'},
				{name: 'mitigation_factor', type: 'float'}, 
				{name: 'mean_dv', type: 'float'}, 
				{name: 'sd_dv', type: 'float'}, 
				{name: 'dv_shift_relevance', type: 'float'},
				{name: 'dv_shift_value', type: 'float'}
				{name: 'risk_coefficient', type: 'float'}, 
				{name: 'i_unrestrained', type: 'float'},
				{name: 'i_belted', type: 'float'},
				{name: 'i_child_optimal', type: 'float'},
				{name: 'i_child_suboptimal', type: 'float'},
				{name: 'i_helmet', type: 'float'},
				{name: 'r_unrestrained', type: 'float'}, //precalc risk values
				{name: 'r_belted', type: 'float'},
				{name: 'r_child_optimal', type: 'float'},
				{name: 'r_child_suboptimal', type: 'float'},
				{name: 'r_helmet', type: 'float'},
				]
	});
	
		
	
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
	
	var utmost_injury_raw_values = Ext.create('Ext.data.Store', {
		model: 'Injury_Type_Count',
		proxy: {
			type: 'ajax',
			url : 'utmost_data.php',
			reader: {
				type: 'json',
				model: 'Injury_Type_Count'
			}
		}
	});
	
	var utmost_injury_chart_values = Ext.create('Ext.data.Store', {
		model: 'Injury_Type_Count'
	});
	
	
	//Trapezoidal sum function for injury integration
	var utmost_injury_min_dv = 0.0;
	var utmost_injury_max_dv = 150.0;
	var utmost_injury_step_size = 0.1;
	
	var utmost_injury_trapezoidal_sum = function(record){
		var mean = record.get('mean_dv');
		var stdev = record.get('sd_dv');
		var coeff = record.get('injury_coeff');
		var intercept = record.get('injury_intercept');
		var step_count = 0;
		var sum = 0;
		for (var i = utmost_injury_min_dv; i =< utmost_injury_max_dv; i+= utmost_injury_step_size){
			sum += (utmost_lognormal_pdf(mean, stdev, i) * utmost_logistic_injury(coeff, intercept, i) + utmost_lognormal_pdf(mean, stdev, (i+ utmost_injury_step_size)) * utmost_logistic_injury(coeff, intercept, *i+utmost_injury_step_size));
			step_count++;
		}
		return ((utmost_injury_max_dv-utmost_injury_min_dv)/(2 * step_count)) * sum;
		
	}
	
	var pdf_root2PI = 2.5066282746;
	
	var utmost_lognormal_pdf = function(mean, stdev, dv){
		return (1/(dv * stdev * pdf_root2PI)) * Math.exp(-1*(((Math.log(dv)-mean)*(Math.log(dv)-mean))/(2 * stdev * stdev)));
	}
	
	var utmost_logistic_injury = function(coeff, intercept, dv){
		return 1/1+Math.exp(-1*(intercept + coeff * dv));
	}
	
	var utmost_lognormal_dv_shift = function(record){
	}
	
	function data_update(){
		var cm_string = get_countermeasure_string();
		var cm_cf_string = get_coeffs_string();
		var data_categories = get_data_cateogories();
		var data_subset_variable = get_data_subset_var();
		var data_subset_category = get_data_subset_cat();
		var data_outcome_variable = get_outcome_var();
		if (data_outcome_variable == 'person_count'){
			utmost_chart_values.load({
				params: {
					filter_string: cm_string,
					coeffs_string: cm_cf_string,
					group_type: data_categories,
					subset_variable : data_subset_variable,
					subset_category : data_subset_category,
					outcome_variable : data_outcome_variable
				},
				callback: function(records, operation, success){
				
					var max = 0;
					var top_count = 0
					var total = 0;
					var adj_total = 0;
					var count = utmost_chart_values.count();
					
					//sum values for totals charts
					for (i = 0; i < count; i++){
						total += parseInt(utmost_chart_values.getAt(i).get('person_count'));
						adj_total += parseInt(utmost_chart_values.getAt(i).get('person_count_adj'));
					}
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);
					
					
					//utmost_chart.axes.getAt(0).maximum = max * 1.25;
					
					//Adjust axis labels for chosen variables
					utmost_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//Redraw count chart
					utmost_chart.setVisible(true);
					utmost_injury_chart.setVisible(false);
					utmost_chart.redraw(true);
				
				}
			});
		} else if (data_outcome_variable == 'injury_count'){
			//Load injury values
			utmost_injury_raw_values.load({
				params: {
					filter_string: cm_string,
					coeffs_string: cm_cf_string,
					group_type: data_categories,
					subset_variable : data_subset_variable,
					subset_category : data_subset_category,
					outcome_variable : data_outcome_variable
				},
				callback: function(records, operation, success){
				
					var max = 0;
					var top_count = 0
					var total = 0;
					var adj_total = 0;
					
					
					//do injury calcs for each row
					utmost_injury_raw_values.each(function(record){
						
						var dv_shift_relevance = record.get('dv_shift_relevance');
						
						if (dv_shift_relevance != 0){
							//dv is only shifted for countermeasures that effect delta-v in crashes.  
							
							//calculate shift
							utmost_lognormal_dv_shift(record);
							
							
							//trapezoidal sum for integration
							var injury_row_total = utmost_injury_trapezoidal_sum(record);
							
							//Avoidance mitigation
							injury_row_total *= record.get('mitigation_factor');
							
							record.set('injury_count_adj', injury_row_total);
						} else {
							/*No DV or restraint impact on crashes*/
							var injury_row_total = record.get('injury_count');
							injury_row_total *= record.get('mitigation_factor');
							record.set('injury_count_adj', injury_row_total);
						}
					});
					
					//total rows by category
					utmost_injury_chart_values.removeAll();
					utmost_injury_raw_values.each(function(record){
						var category = record.get('crash_type');
						var index = utmost_injury_chart_values.find('crash_type', category);
						if (index = -1){
							//No record, create
							utmost_injury_chart_values.add(
								{
									'crash type': category,
									'injury_count': record.get('injury_count'),
									'injury_count_adj': record.get('injury_count_adj')
								}
							);
						} else {
							var target_record = utmost_injury_chart_values.getAt(index);
							target_record.set('injury_count', record.get('injury_count')+target_record.get('injury_count'));
							target_record.set('injury_count_adj', record.get('injury_count_adj')+target_record.get('injury_count_adj'));
						}
						
					});
					
					//sum values for totals charts
					var count = utmost_injury_chart_values.count();
					for (i = 0; i < count; i++){
						total += parseInt(utmost_injury_chart_values.getAt(i).get('person_count'));
						adj_total += parseInt(utmost_injury_chart_values.getAt(i).get('person_count_adj'));
					}
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);
					
					
					
					
					//Adjust axis labels for chosen variables
					utmost_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//Set injury chart for use and redraw
					utmost_chart.setVisible(false);
					utmost_injury_chart.setVisible(true);
					utmost_injury_chart.redraw(true);
				
				}
			
			});
		}
		
	}


