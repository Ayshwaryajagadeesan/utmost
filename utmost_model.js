//Data model

	Ext.namespace('UTMOST');
	
	Ext.define('Crash_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'}, 
				{name: 'person_count', type: 'float'}, 
				{name: 'person_count_adj', type: 'float'},
				{name: 'sort', type: 'int'}
				]
	});
	
	
	Ext.define('Injury_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'injury_count', type: 'float'}, 
				{name: 'injury_count_adj', type: 'float'},
				{name: 'sort', type: 'int'}
				
				]
	});
	
	Ext.define('Injury_Raw_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'age', type: 'string'},
				{name: 'frequency', type: 'float'}, 
				{name: 'injury_count', type: 'float'}, 
				{name: 'injury_count_adj', type: 'float'},
				{name: 'mitigation_factor', type: 'float'}, 
				{name: 'mean_dv', type: 'float'}, 
				{name: 'sd_dv', type: 'float'}, 
				{name: 'dv_shift_relevance', type: 'float'},
				{name: 'dv_shift_value', type: 'float'},
				{name: 'risk_coefficient', type: 'float'},
				{name: 'p_unrestrained', type: 'float'},
				{name: 'p_belted', type: 'float'},
				{name: 'p_child_optimal', type: 'float'},
				{name: 'p_child_suboptimal', type: 'float'},
				{name: 'p_helmet', type: 'float'},
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
				{name: 'sort', type: 'int'}
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
		model: 'Injury_Raw_Count',
		proxy: {
			type: 'ajax',
			url : 'utmost_data.php',
			reader: {
				type: 'json',
				model: 'Injury_Raw_Count'
			}
		}
	});
	
	var utmost_injury_chart_values = Ext.create('Ext.data.Store', {
		model: 'Injury_Type_Count'
	});
	
	
	//Trapezoidal sum function for injury integration
	var utmost_injury_min_dv = 0.1;
	var utmost_injury_max_dv = 150.0;
	var utmost_injury_step_size = 0.1;
	
	var utmost_injury_trapezoidal_sum = function(record, intercept){
		var mean = record.get('mean_dv');
		var stdev = record.get('sd_dv');
		var coeff = record.get('risk_coefficient');
		var step_count = 0;
		var sum = 0;
		var sum_adjusted = 0;
		var dv_shift = 0;
		if (record.get('dv_shift_relevance')> 0){
			dv_shift = record.get('dv_shift_value');
		}
		var result = {base: 0, adjusted:0};
		for (var i = utmost_injury_min_dv; i <= utmost_injury_max_dv; i+= utmost_injury_step_size){
			sum += (utmost_lognormal_pdf(mean, stdev, i) * utmost_logistic_injury(coeff, intercept, i) + utmost_lognormal_pdf(mean, stdev, (i+ utmost_injury_step_size)) * utmost_logistic_injury(coeff, intercept, i+utmost_injury_step_size));
			sum_adjusted += (utmost_lognormal_pdf(mean, stdev, i+dv_shift) * utmost_logistic_injury(coeff, intercept, i) + utmost_lognormal_pdf(mean, stdev, (i+ dv_shift+utmost_injury_step_size)) * utmost_logistic_injury(coeff, intercept, i+utmost_injury_step_size));
			step_count++;
		}
		 result['base'] = ((utmost_injury_max_dv-utmost_injury_min_dv)/(2 * step_count)) * sum;
		 result['adjusted'] = ((utmost_injury_max_dv-utmost_injury_min_dv)/(2 * step_count)) * sum_adjusted;
		 return result;
		
	}
		
	
	var pdf_root2PI = 2.5066282746;
	
	var utmost_lognormal_pdf = function(mean, stdev, dv){
		return (1/(dv * stdev * pdf_root2PI)) * Math.exp(-1*(((Math.log(dv)-mean)*(Math.log(dv)-mean))/(2 * stdev * stdev)));
	}
	
	var utmost_logistic_injury = function(coeff, intercept, dv){
		return 1/(1+Math.exp(-1*(intercept + coeff * dv)));
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
						if (!utmost_chart_values.getAt(i).get('crash_type')){
							utmost_chart_values.getAt(i).set('crash_type', 'Unknown or N/A');
						}
						total += parseInt(utmost_chart_values.getAt(i).get('person_count'));
						adj_total += parseInt(utmost_chart_values.getAt(i).get('person_count_adj'));
						if(utmost_chart_values.getAt(i).get('person_count') > max){
							max = utmost_chart_values.getAt(i).get('person_count');
						}
					}
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);
					
					
					
					//Adjust axis labels for chosen variables
					utmost_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//adjust chart max
					var chart_max = (parseInt(max / 10000) + 1) * 10000;
					utmost_chart.axes.getAt(0).maximum = chart_max;
					
					
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
						
						if (!record.get('crash_type')){
							record.set('crash_type', 'Unknown or N/A');
						}
						
						
						var dv_calc_relevance = 1;
						var new_belted = record.get('p_belted');
						var new_unrestrained = record.get('p_unrestrained');
						var new_child_optimal = record.get('p_child_optimal');
						var new_child_suboptimal = record.get('p_child_suboptimal');
						var age = record.get('age');
						//TODO: Get hardcoded values out
						var optimal_baselines = {
							'0-1': .65*.11+.54*.89,
							'2-4': .80*.13+.64*.87,
							'5-7': .62*.85+.40*.15,
							'8-10': .37*.01+.19*.99
						};
						

						if (record.get('mean_dv') == 0 && record.get('sd_dv') == 0 ){
							var dv_calc_relevance = 0;
						}
						
						if (check_countermeasure('seatbelt') && record.get('p_belted') > 0){
							//TODO: Get hardcoded values out
							var belted_baseline = .23*.82 + .01*.84 + .59*.91 + .17*.94;
							var belted_adjusted = cm_seatbelt_get_value();
							new_belted = record.get('p_belted') * (belted_adjusted / belted_baseline);
							new_unrestrained = 1-new_belted;
						}
						
						if (check_countermeasure('child_seat') && (age in optimal_baselines) ){
							var optimal_adjusted = cm_childseat_get_value(age);
							var row_restrained = record.get('p_child_optimal') + record.get('p_child_suboptimal');
							new_child_optimal = (record.get('p_child_optimal') * (optimal_adjusted/optimal_baselines[age]));
							new_child_suboptimal = row_restrained - new_child_optimal;
						}

						if (dv_calc_relevance != 0){
							//dv is only shifted for countermeasures that effect delta-v in crashes.  
							
							
							
							
							var injury_row_total = {base: 0, adjusted:0};
							
							//trapezoidal sum for integration
							if (record.get('p_unrestrained') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_unrestrained'));
								injury_row_total['base'] += record.get('p_unrestrained') * result['base'];
								injury_row_total['adjusted'] += new_unrestrained * result['adjusted'];
							}
							if (record.get('p_belted') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_belted'));
								injury_row_total['base'] += record.get('p_belted') * result['base'];
								injury_row_total['adjusted'] += new_belted * result['adjusted'];
							}
							if (record.get('p_child_optimal') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_child_optimal'));
								injury_row_total['base'] += record.get('p_child_optimal') * result['base'];
								injury_row_total['adjusted'] += new_child_optimal * result['adjusted'];
							}
							if (record.get('p_child_suboptimal') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_child_suboptimal'));
								injury_row_total['base'] += record.get('p_child_suboptimal') * result['base'];
								injury_row_total['adjusted'] += new_child_suboptimal * result['adjusted'];
							}
							if (record.get('p_helmet') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_helmet'));
								injury_row_total['base'] += record.get('p_helmet') * result['base'];
								injury_row_total['adjusted'] += record.get('p_helmet') * result['adjusted'];
							}
							
							
							//Avoidance mitigation
							if (record.get('dv_shift_relevance') > 0){
								var nonDV_mitigation_factor = (1 - (((1-record.get('mitigation_factor')) / record.get('dv_shift_relevance'))-1));
								var dv_correction_factor = (1 - record.get('dv_shift_relevance'));
								injury_row_total['adjusted'] *= (nonDV_mitigation_factor / dv_correction_factor);
							} else {
								injury_row_total['adjusted'] *= record.get('mitigation_factor');
							}
							//Multiply frequency to get count
							injury_row_total['base'] *= record.get('frequency');
							injury_row_total['adjusted'] *= record.get('frequency');
							
							if (isNaN(injury_row_total['base'])){
								injury_row_total['base'] = 0;
								injury_row_total['adjusted'] = 0;
							}
							
							record.set('injury_count', injury_row_total['base']);
							record.set('injury_count_adj', injury_row_total['adjusted']);
						} else {
							/*No DV impact on crashes*/
							var injury_row_total = record.get('frequency');
							var injury_row_adj = record.get('frequency');
							
							var r_unrestrained = record.get('r_unrestrained') ? record.get('r_unrestrained') : 0;
							var r_belted = record.get('r_belted') ? record.get('r_belted') : 0;							
							var r_child_optimal = record.get('r_child_optimal') ? record.get('r_child_optimal') : 0;							
							var r_child_suboptimal = record.get('r_child_suboptimal') ? record.get('r_child_suboptimal') : 0;							
							var r_helmet = record.get('r_helmet') ? record.get('r_helmet') : 0;							
							
							injury_row_total *= (
												record.get('p_unrestrained') * r_unrestrained + 
												record.get('p_belted') * r_belted +
												record.get('p_child_optimal') * r_child_optimal +
												record.get('p_child_suboptimal') * r_child_suboptimal +
												record.get('p_helmet') * r_helmet
								);
							injury_row_adj *= (
												new_unrestrained* r_unrestrained + 
												new_belted * r_belted +
												new_child_optimal * r_child_optimal +
												new_child_suboptimal * r_child_suboptimal +
												record.get('p_helmet') * r_helmet
								);
							
							if (isNaN(injury_row_total)){
								injury_row_total = 0;
							}
							if (isNaN(injury_row_adj)){
								injury_row_adj = 0;
							}
							
							var adj_injury_total = injury_row_adj * record.get('mitigation_factor');
							
							record.set('injury_count', injury_row_total);
							record.set('injury_count_adj', adj_injury_total);
							
						}
					});
					
					//total rows by category
					utmost_injury_chart_values.removeAll();
					utmost_injury_raw_values.each(function(record){
						var category = record.get('crash_type');
						var index = utmost_injury_chart_values.find('crash_type', category);
						if (index == -1){
							//No record, create
							utmost_injury_chart_values.add(
								{
									'crash_type': category,
									'injury_count': record.get('injury_count'),
									'injury_count_adj': record.get('injury_count_adj'),
									'sort': record.get('sort')
								}
							);
						} else {
							var target_record = utmost_injury_chart_values.getAt(index);
							target_record.set('injury_count', record.get('injury_count')+target_record.get('injury_count'));
							target_record.set('injury_count_adj', record.get('injury_count_adj')+target_record.get('injury_count_adj'));
						}
						
					});
					utmost_injury_chart_values.sort('sort', 'ASC');
					
					//sum values for totals charts
					var count = utmost_injury_chart_values.count();
					var max = 0;
					for (i = 0; i < count; i++){
						total += parseInt(utmost_injury_chart_values.getAt(i).get('injury_count'));
						adj_total += parseInt(utmost_injury_chart_values.getAt(i).get('injury_count_adj'));
						if(utmost_injury_chart_values.getAt(i).get('injury_count') > max){
							max = utmost_injury_chart_values.getAt(i).get('injury_count');
						}
					}
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);
					
					
					
					//Adjust axis labels for chosen variables
					utmost_injury_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//Adjust chart max values
					var chart_max = (parseInt(max / 1000) + 1) * 1000;
					utmost_injury_chart.axes.getAt(0).maximum = chart_max;
					
					//Inform chart that the chart dataset has been updated (needed because secondary dataset gets network load);
					utmost_injury_chart_values.fireEvent('refresh');
					
					//Set injury chart for use and redraw
					utmost_chart.setVisible(false);
					utmost_injury_chart.setVisible(true);
					utmost_injury_chart.redraw(true);
				
				}
			
			});
		}
		
	}


