//Data model
	var out = "";
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
	
	Ext.define('Fatality_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'fatality_count', type: 'float'}, 
				{name: 'fatality_count_adj', type: 'float'},
				{name: 'sort', type: 'int'}
				
				]
	});

	Ext.define('Fatality_race_Type_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'q1', type: 'float'}, 
				{name: 'q2', type: 'float'},
				{name: 'q3', type: 'float'},
				{name: 'q4', type: 'float'},
				{name: 'q5', type: 'float'},
				{name: 'sort', type: 'int'}
				
				]
	});
	
	Ext.define('Person_Raw_Count',{
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'}, 
				{name: 'person_count', type: 'float'}, 
				{name: 'person_count_adj', type: 'float'},
				{name: 'driver_age', type: 'string'},
				{name: 'sort', type: 'int'}
				]
	});
	
	Ext.define('Injury_Raw_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'crash_direction', type: 'string'},
				{name: 'age', type: 'string'},
				{name: 'veh_age', type: 'string'},
				{name: 'driver_age', type: 'string'},
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
	
	Ext.define('Fatality_Raw_Count', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'crash_type', type: 'string'},
				{name: 'age', type: 'string'},
				{name: 'driver_age', type: 'string'},
				{name: 'veh_age', type: 'string'},
				{name: 'frequency', type: 'float'}, 
				{name: 'fatality_count', type: 'float'}, 
				{name: 'fatality_count_adj', type: 'float'},
				{name: 'mitigation_factor', type: 'float'}, 
				{name: 'mean_dv', type: 'float'}, 
				{name: 'sd_dv', type: 'float'}, 
				{name: 'dv_shift_relevance', type: 'float'},
				{name: 'dv_shift_value', type: 'float'},
				{name: 'risk_coefficient', type: 'float'},
				{name: 'i_unrestrained', type: 'float'},
				{name: 'i_belted', type: 'float'},
				{name: 'i_child_optimal', type: 'float'},
				{name: 'i_child_suboptimal', type: 'float'},
				{name: 'i_helmet', type: 'float'},
				{name: 'n_unrestrained', type: 'float'},
				{name:'wq1',type:'float'},
				{name:'wq2',type:'float'},
				{name:'wq3',type:'float'},
				{name:'wq4',type:'float'},
				{name:'wq5',type:'float'},
				{name: 'n_optimal', type: 'float'},
				{name: 'n_suboptimal', type: 'float'},
				{name: 'n_unknown', type: 'float'},
				{name: 'r_unrestrained', type: 'float'}, //precalc risk values
				{name: 'r_belted', type: 'float'},
				{name: 'r_child_optimal', type: 'float'},
				{name: 'r_child_suboptimal', type: 'float'},
				{name: 'r_helmet', type: 'float'},
				{name: 'sort', type: 'int'}
				]
	});
	
	var utmost_raw_values = Ext.create('Ext.data.Store', {
		model: 'Person_Raw_Count',
		proxy: {
			type: 'ajax',
			url : 'utmost_data.php',
			reader: {
				type: 'json',
				model: 'Person_Raw_Count'
			}
		}
	});
	
	
	var utmost_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count'
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
	
	var utmost_fatality_raw_values = Ext.create('Ext.data.Store', {
		model: 'Fatality_Raw_Count',
		proxy: {
			type: 'ajax',
			url : 'utmost_data.php',
			reader: {
				type: 'json',
				model: 'Fatality_Raw_Count'
			}
		}
	});
	
	var utmost_fatality_chart_values = Ext.create('Ext.data.Store', {
		model: 'Fatality_Type_Count'
	});

	var utmost_fatality_race_chart_values = Ext.create('Ext.data.Store', {
		model: 'Fatality_race_Type_Count'
	});
	
	
	
	
	var utmost_injury_trapezoidal_sum_shift = function(record, intercept, shift){
		var mean = record.get('mean_dv');
		var stdev = record.get('sd_dv');
		var coeff = record.get('risk_coefficient') + shift;
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
	
		
	function data_update(n){
		utmost_loadmask.show();
		
		
		var cm_string = get_countermeasure_string();
		var cm_cf_string = get_coeffs_string();
		var data_categories = get_data_cateogories();
		var data_subset_variable = get_data_subset_var();
		if(n==1){var data_subset_category = "Large Metro";}
		else if(n==2){var data_subset_category = "S/M Metro";}
		else if(n==3){var data_subset_category = "Nonmetro";}
		else if(n==4){var data_subset_category = "No Alcohol Involved";}
		else if(n==5){var data_subset_category = "Alcohol Involved";}
		else if(n==6){var data_subset_category = "0-1";}
		else if(n==7){var data_subset_category = "2-4";}
		else if(n==8){var data_subset_category = "5-7";}
		else if(n==9){var data_subset_category = "8-10";}
		else if(n==10){var data_subset_category = "11-13";}
		else if(n==11){var data_subset_category = "14-15";}
		else if(n==12){var data_subset_category = "16-17";}
		else if(n==13){var data_subset_category = "18-20";}
		else if(n==14){var data_subset_category = "21-30";}
		else if(n==15){var data_subset_category = "31-65";}
		else if(n==16){var data_subset_category = "66+";}
		else if(n==17){var data_subset_category = "<16";}
		else if(n==18){var data_subset_category = "16-17";}
		else if(n==19){var data_subset_category = "18-20";}
		else if(n==20){var data_subset_category = "21-30";}
		else if(n==21){var data_subset_category = "31-65";}
		else if(n==22){var data_subset_category = ">65";}
		else if(n==23){var data_subset_category = "56.7% and Below";}
		else if(n==24){var data_subset_category = "56.7%-74.2%";}
		else if(n==25){var data_subset_category = "74.2%-84.3%";}
		else if(n==26){var data_subset_category = "84.3%-92.1%";}
		else if(n==27){var data_subset_category = "92.1% and Above";}
		else if(n==28){var data_subset_category = "1.2% and Below";}
		else if(n==29){var data_subset_category = "1.2%-3.4%";}
		else if(n==30){var data_subset_category = "3.4%-7.8%";}
		else if(n==31){var data_subset_category = "7.8%-19.4%";}
		else if(n==32){var data_subset_category = "19.4% and Above";}
		else if(n==33){var data_subset_category = "4.1% and Below";}
		else if(n==34){var data_subset_category = "4.1%-7.3%";}
		else if(n==35){var data_subset_category = "7.3%-11.8%";}
		else if(n==36){var data_subset_category = "11.8%-21.6%";}
		else if(n==37){var data_subset_category = "21.6% and Above";}
		
		else{var data_subset_category = get_data_subset_cat();}
		var data_outcome_variable = get_outcome_var();
		if (data_outcome_variable == 'person_count'){
			utmost_raw_values.load({
				params: {
					filter_string: cm_string,
					coeffs_string: cm_cf_string,
					group_type: data_categories,
					subset_variable : data_subset_variable,
					subset_category : data_subset_category,
					outcome_variable : data_outcome_variable
				},
				callback: function(records, operation, success){
				
				
					//total rows by category
					utmost_chart_values.removeAll();
					utmost_raw_values.each(function(record){
						var category = record.get('crash_type');
						var index = utmost_chart_values.findExact('crash_type', category);
						var adjusted_count_temp = record.get('person_count_adj');
						if (check_countermeasure('teen_driver') ){
							adjusted_count_temp *= cm_teen_driver_get_value(record.get('driver_age'));
						}
						if (index == -1){
							//No record, create
							utmost_chart_values.add(
								{
									'crash_type': category,
									'person_count': record.get('person_count'),
									'person_count_adj': adjusted_count_temp,
									'sort': record.get('sort')
								}
							);
						} else {
							var target_record = utmost_chart_values.getAt(index);
							target_record.set('person_count', record.get('person_count')+target_record.get('person_count'));
							target_record.set('person_count_adj', adjusted_count_temp+target_record.get('person_count_adj'));
						}
						
						
					});
					utmost_chart_values.sort('sort', 'ASC');
					
				
					var max = 0;
					var top_count = 0
					var total = 0;
					var adj_total = 0;
					var count = utmost_chart_values.count();
					
					if (n==0)
					
					{//sum values for totals charts
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
					utmost_totals_chart.axes.getAt(0).maximum = (total > adj_total) ? Math.floor((total * 1.1) / 1000) * 1000 : Math.floor((adj_total * 1.1) / 1000) * 1000;
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);
					//utmost_totals_chart.axes.getAt(0).maximum = 15000000;
					
					
					//Adjust axis labels for chosen variables
					utmost_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//adjust chart max
					var chart_max = (parseInt(max / 10000) + 1) * 10000;
					utmost_chart.axes.getAt(0).maximum = chart_max;
					
					
					utmost_loadmask.hide();
					
					//Inform chart that the chart dataset has been updated (needed because secondary dataset gets network load);
					utmost_chart_values.fireEvent('refresh');
					//Redraw count chart
					utmost_chart.setVisible(true);
					utmost_totals_chart.setVisible(true);
					utmost_injury_chart.setVisible(false);
					utmost_totals_race_chart.setVisible(false);
					utmost_fatality_chart.setVisible(false);
					utmost_fatality_race_chart.setVisible(false);
					utmost_chart.redraw(true);
					
					}
					if(n==1){
						out +="\n Large Metro";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(2);
					}else if(n==2){
						out +="\n S/M Metro";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(3);
					
					} else if(n==3){
						out +="\n Non Metro";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==4){
						out +="\n No Alcohol Involved";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(5);
					
					}
					else if(n==5){
						out +="\n Alcohol Involved";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						}
							 
						else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==6){
						out +="\n Age 0-1";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(7);
					
					}
					else if(n==7){
						out +="\n Age 2-4";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(8);
					
					}
					else if(n==8){
						out +="\n Age 5-7";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(9);
					
					}
					else if(n==9){
						out +="\n Age 8-10";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(10);
					
					}
					else if(n==10){
						out +="\n Age 11-13";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(11);
					
					}
					else if(n==11){
						out +="\n Age 14-15";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(12);
					
					}
					else if(n==12){
						out +="\n Age 16-17";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(13);
					
					}
					else if(n==13){
						out +="\n Age 18-20";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(14);
					
					}
					else if(n==14){
						out +="\n Age 21-30";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(15);
					
					}
					else if(n==15){
						out +="\n Age 31-65";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(16);
					
					}
					else if(n==16){
						out +="\n Age 66+";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						}
							 
						else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==17){
						out +="\n Driver Age 0-15";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(18);
					
					}
					else if(n==18){
						out +="\n Driver Age 16-17";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(19);
					
					}
					else if(n==19){
						out +="\n Driver Age 18-20";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(20);
					
					}
					else if(n==20){
						out +="\n Driver Age 21-30";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(21);
					
					}
					else if(n==21){
						out +="\n Driver Age 31-65";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						data_update(22);
					
					}
					else if(n==22){
						out +="\n Driver Age 66+";
						out += "\n category,person_count,adjusted_person_count\n";
						var count = utmost_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						}
							 
						else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					
						
						
				
				
				}
			});
		} 
		else if (data_outcome_variable == 'injury_count'){
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
					//utmost_injury_raw_values.suspendEvents();
					
								
					
					utmost_injury_raw_values.each(function(record){
						
						if (!record.get('crash_type')){
							record.set('crash_type', 'Unknown or N/A');
						}
						
						
						var dv_calc_relevance = 1;
						var new_belted = record.get('p_belted');
						var new_unrestrained = record.get('p_unrestrained');
						var new_child_optimal = record.get('p_child_optimal');
						var new_child_suboptimal = record.get('p_child_suboptimal');
						var new_helmet = record.get('p_helmet');
						var age = record.get('age');
						//TODO: Get hardcoded values out
						var optimal_baselines = {
							'0-1': .65*.11+.54*.89,
							'2-4': .80*.13+.64*.87,
							'5-7': .62*.85+.40*.15,
							'8-10': .37*.01+.19*.99
						};
						
						if(check_countermeasure('teen_driver')){
							var teen_adjustment = cm_teen_driver_get_value(record.get('driver_age'));
							record.set('mitigation_factor', record.get('mitigation_factor') * teen_adjustment);
						}

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
						
						if (check_countermeasure('helmet')&& record.get('p_helmet') > 0){
							new_helmet = (record.get('p_helmet') * cm_helmet_get_value());
							new_unrestrained = 1-new_helmet;
						}
						
						if (check_countermeasure('restraint_override')){
							if (record.get('p_belted') > 0){
								new_belted = cm_restraint_override_get_value();
								new_unrestrained = 1-new_belted;
							} else if (record.get('p_child_optimal') > 0){
								new_child_suboptimal = 0;
								new_child_optimal = cm_restraint_override_get_value();
								new_unrestrained = 1-new_child_optimal;
							} else if (record.get('p_helmet') > 0){
								new_helmet = cm_restraint_override_get_value();
								new_unrestrained = 1-new_helmet;
							};
						}
						
						//Build population tree
						/*
						Operations:
						
						- Create row for Baseline (mitigation factor = 1, unchanged r_restraint/zero undefined, baseline p_restraint)
						
						
						- Create row for each separate adjusted sub-population
						
						- apply new p_restriant to each new row for restraint effects on DV crashes
						
						- apply new coefficients for crashworthiness shift
						
						- apply zero to all undefined r_ values 
						*/
						var subrows = []; //DEBUG: dump subrows to a separate array
						//Baseline Row at subrows(0)
						var base_row = {
							'frequency' : 			record.get('frequency'),
							'mean_dv' : 			record.get('mean_dv'),
							'sd_dv' : 				record.get('sd_dv'),
							'dv_shift' :			0, //Zero for Base Row,
							'dv_shift_relevance' :	0,
							'mitigation_factor':	1, //1 for Base Row
							'r_unrestrained' : 		(record.get('r_unrestrained') ? record.get('r_unrestrained') : 0), //precalculated base risk for test
							'r_belted' : 			(record.get('r_belted') ? record.get('r_belted') : 0),
							'r_child_optimal' : 	(record.get('r_child_optimal') ? record.get('r_child_optimal') : 0),
							'r_child_suboptimal' : 	(record.get('r_child_suboptimal') ? record.get('r_child_suboptimal') : 0),
							'r_helmet' : 			(record.get('r_helmet') ? record.get('r_helmet') : 0),
							'p_unrestrained' :		record.get('p_unrestrained'), //base proportions
							'p_belted' : 			record.get('p_belted'),
							'p_child_optimal' : 	record.get('p_child_optimal'),
							'p_child_suboptimal' : 	record.get('p_child_suboptimal'),
							'p_helmet' : 			record.get('p_helmet'),
							'coeff':				record.get('risk_coefficient'), //base coefficient
							'i_unrestrained' :		record.get('i_unrestrained'), //base intercepts
							'i_belted' : 			record.get('i_belted'),
							'i_child_optimal' : 	record.get('i_child_optimal'),
							'i_child_suboptimal' : 	record.get('i_child_suboptimal'),
							'i_helmet' : 			record.get('i_helmet')
						}
						
						subrows.push(base_row);
						/*
						//Build population proportions for adjusted rows
						if (check_countermeasure('vehicle_crashworthiness')){
							cw_effect = cm_crashworthiness_get_values();
						}
						
						if (check_countermeasure('seat_position')){
							//Adjust positions
							
							//Adjust risk
							
						}
						
						//Build Rows
						*/
						
						
						
						
						if (check_countermeasure('vehicle_crashworthiness')){
							var cw_effect = cm_crashworthiness_get_values();
							//calc sub-populations TODO: restraint
							
							
							//calc scale factors
							var cw_scale_factor = 1;
							cw_scale_factor *= cw_effect[record.get('crash_direction')];
							
							var new_coeff = record.get('risk_coefficient') + Math.log(1-(cw_effect.effectiveness * cw_scale_factor))/Math.log(cw_effect.target_dv);
							var row_unshifted = {
								'frequency' : 			(record.get('frequency') * (1- cw_effect.fleet_penetration)),
								'mean_dv' : 			record.get('mean_dv'),
								'sd_dv' : 				record.get('sd_dv'),
								'dv_shift' :			record.get('dv_shift_value'),
								'dv_shift_relevance' :	record.get('dv_shift_relevance'),
								'mitigation_factor':	record.get('mitigation_factor'), 
								'r_unrestrained' : 		(record.get('r_unrestrained') ? record.get('r_unrestrained') : 0), //precalculated base risk for test
								'r_belted' : 			(record.get('r_belted') ? record.get('r_belted') : 0),
								'r_child_optimal' : 	(record.get('r_child_optimal') ? record.get('r_child_optimal') : 0),
								'r_child_suboptimal' : 	(record.get('r_child_suboptimal') ? record.get('r_child_suboptimal') : 0),
								'r_helmet' : 			(record.get('r_helmet') ? record.get('r_helmet') : 0),
								'p_unrestrained' :		new_unrestrained, //New restraint proportions
								'p_belted' : 			new_belted,
								'p_child_optimal' : 	new_child_optimal,
								'p_child_suboptimal' : 	new_child_suboptimal,
								'p_helmet' : 			new_helmet,
								'coeff':				record.get('risk_coefficient'), //base coefficient
								'i_unrestrained' :		record.get('i_unrestrained'), //base intercepts
								'i_belted' : 			record.get('i_belted'),
								'i_child_optimal' : 	record.get('i_child_optimal'),
								'i_child_suboptimal' : 	record.get('i_child_suboptimal'),
								'i_helmet' : 			record.get('i_helmet')
							}
							var row_shifted = {
								'frequency' : 			(record.get('frequency') * (cw_effect.fleet_penetration)),
								'mean_dv' : 			record.get('mean_dv'),
								'sd_dv' : 				record.get('sd_dv'),
								'dv_shift' :			record.get('dv_shift_value'),
								'dv_shift_relevance' :	record.get('dv_shift_relevance'),
								'mitigation_factor':	record.get('mitigation_factor'), 
								'r_unrestrained' : 		(record.get('r_unrestrained') ? record.get('r_unrestrained') : 0), //precalculated base risk for test
								'r_belted' : 			(record.get('r_belted') ? record.get('r_belted') : 0),
								'r_child_optimal' : 	(record.get('r_child_optimal') ? record.get('r_child_optimal') : 0),
								'r_child_suboptimal' : 	(record.get('r_child_suboptimal') ? record.get('r_child_suboptimal') : 0),
								'r_helmet' : 			(record.get('r_helmet') ? record.get('r_helmet') : 0),
								'p_unrestrained' :		new_unrestrained, //New restraint proportions
								'p_belted' : 			new_belted,
								'p_child_optimal' : 	new_child_optimal,
								'p_child_suboptimal' : 	new_child_suboptimal,
								'p_helmet' : 			new_helmet,
								'coeff':				new_coeff, //new coefficient for this CM
								'i_unrestrained' :		record.get('i_unrestrained'), //base intercepts
								'i_belted' : 			record.get('i_belted'),
								'i_child_optimal' : 	record.get('i_child_optimal'),
								'i_child_suboptimal' : 	record.get('i_child_suboptimal'),
								'i_helmet' : 			record.get('i_helmet')
							}
							subrows.push(row_unshifted);
							subrows.push(row_shifted);
						} else {
							var adjusted_row = {
								'frequency' : 			record.get('frequency'),
								'mean_dv' : 			record.get('mean_dv'),
								'sd_dv' : 				record.get('sd_dv'),
								'dv_shift' :			record.get('dv_shift_value'),
								'dv_shift_relevance' :	record.get('dv_shift_relevance'),
								'mitigation_factor':	record.get('mitigation_factor'), 
								'r_unrestrained' : 		(record.get('r_unrestrained') ? record.get('r_unrestrained') : 0), //precalculated base risk for test
								'r_belted' : 			(record.get('r_belted') ? record.get('r_belted') : 0),
								'r_child_optimal' : 	(record.get('r_child_optimal') ? record.get('r_child_optimal') : 0),
								'r_child_suboptimal' : 	(record.get('r_child_suboptimal') ? record.get('r_child_suboptimal') : 0),
								'r_helmet' : 			(record.get('r_helmet') ? record.get('r_helmet') : 0),
								'p_unrestrained' :		new_unrestrained, //New restraint proportions
								'p_belted' : 			new_belted,
								'p_child_optimal' : 	new_child_optimal,
								'p_child_suboptimal' : 	new_child_suboptimal,
								'p_helmet' : 			new_helmet,
								'coeff':				record.get('risk_coefficient'), //base coefficient
								'i_unrestrained' :		record.get('i_unrestrained'), //base intercepts
								'i_belted' : 			record.get('i_belted'),
								'i_child_optimal' : 	record.get('i_child_optimal'),
								'i_child_suboptimal' : 	record.get('i_child_suboptimal'),
								'i_helmet' : 			record.get('i_helmet')
							}
							subrows.push(adjusted_row);
						}
					
						
						if (dv_calc_relevance != 0){
							//get base risk
							var base_risk = utmost_injury_risk_dv(subrows[0]);
							//add base to base total
							var total_base_injuries = subrows[0].frequency  *  base_risk;
							
							var adjusted_injuries = 0;
							//for each adjusted row, get risk and add adjusted risk to total
							for(i = 1; i< subrows.length; i++){
								adjusted_injuries += subrows[i].frequency * utmost_injury_risk_dv(subrows[i]);
							} 
							if (record.get('veh_age') == "12+" && record.get('crash_type')!="Pedestrian" && record.get('crash_type')!="Cyclist" && record.get('crash_type')!="Parked Car" && record.get('crash_type')!= "Motorcycle")
							{
								total_base_injuries=total_base_injuries*1.4;
								adjusted_injuries=adjusted_injuries*1.4;
								
							}
							if(check_countermeasure('vehicle_age') && record.get('veh_age') == "12+" && record.get('crash_type')!="Pedestrian" && record.get('crash_type')!="Cyclist" && record.get('crash_type')!="Parked Car" && record.get('crash_type')!= "Motorcycle")
								{ 	
									adjusted_injuries= adjusted_injuries*cm_vehicle_age_get_value(data_outcome_variable);
								}
							record.set('injury_count', total_base_injuries);
							record.set('injury_count_adj', adjusted_injuries)
						} else {
							//get base risk
							var base_risk = utmost_injury_risk_nondv(subrows[0]);
							//add base to base total
							var total_base_injuries = subrows[0].frequency  *  base_risk;
							
							var adjusted_injuries = 0;
							//for each adjusted row, get risk and add adjusted risk to total
							for(i = 1; i< subrows.length; i++){
								adjusted_injuries += subrows[i].frequency * utmost_injury_risk_nondv(subrows[i]);
							} 
							if (record.get('veh_age') == "12+" && record.get('crash_type')!="Pedestrian" && record.get('crash_type')!="Cyclist" && record.get('crash_type')!="Parked Car" && record.get('crash_type')!= "Motorcycle")
							{
								total_base_injuries=total_base_injuries*1.4;
								adjusted_injuries=adjusted_injuries*1.4;
								
							}
							if(check_countermeasure('vehicle_age') && record.get('veh_age') == "12+" && record.get('crash_type')!="Pedestrian" && record.get('crash_type')!="Cyclist" && record.get('crash_type')!="Parked Car" && record.get('crash_type')!= "Motorcycle")
								{
									adjusted_injuries= adjusted_injuries*cm_vehicle_age_get_value(data_outcome_variable);
								}
							record.set('injury_count', total_base_injuries);
							record.set('injury_count_adj', adjusted_injuries);
						}
					});
					
					
					
					//total rows by category
					utmost_injury_chart_values.removeAll();
					utmost_injury_chart_values.suspendEvents();
					
					utmost_injury_raw_values.each(function(record){
						var category = record.get('crash_type');
						var index = utmost_injury_chart_values.findExact('crash_type', category);
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
						if(utmost_injury_chart_values.getAt(i).get('injury_count_adj') > max){
							max = utmost_injury_chart_values.getAt(i).get('injury_count_adj');
						}
					}
					utmost_totals_chart.axes.getAt(0).maximum = (total >=  adj_total) ? Math.floor((total * 1.1) / 1000) * 1000 : Math.floor((adj_total * 1.1) / 1000) * 1000;
					//utmost_totals_chart.axes.getAt(0).maximum = (total >=  adj_total) ? Math.pow(10, Math.floor(Math.log10(total))-1) : Math.pow(10, Math.floor(Math.log10(adj_total))-1);
					/*if(utmost_totals_chart.axes.getAt(0).maximum < adj_total)
					{
						utmost_totals_chart.axes.getAt(0).maximum= Math.pow(10, Math.floor(Math.log10(adj_total))-1);
					}
					if(utmost_totals_chart.axes.getAt(0).maximum < total)
					{
						utmost_totals_chart.axes.getAt(0).maximum= Math.pow(10, Math.floor(Math.log10(total))-1);
					}*/
					if(utmost_totals_chart.axes.getAt(0).maximum < adj_total || utmost_totals_chart.axes.getAt(0).maximum > adj_total)
					{
						 var temp_max=adj_total/100;
						 utmost_totals_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*100;
					}
					if(utmost_totals_chart.axes.getAt(0).maximum < total || utmost_totals_chart.axes.getAt(0).maximum > total)
					{
						var temp_max=total/100;
						 utmost_totals_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*100;
					}
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);
					//utmost_totals_chart.axes.getAt(0).maximum = 170000;
					
					
					//Adjust axis labels for chosen variables
					utmost_injury_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//Adjust chart max values
					var chart_max = (parseInt(max / 100) + 1) * 100;
					utmost_injury_chart.axes.getAt(0).maximum = chart_max;
					
					//Inform chart that the chart dataset has been updated (needed because secondary dataset gets network load);
					//utmost_injury_raw_values.resumeEvents();
					utmost_injury_chart_values.resumeEvents();
					utmost_injury_chart_values.fireEvent('refresh');
					
					utmost_loadmask.hide();
					if(n==1){
						out +="\n Large Metro";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(2);
					}else if(n==2){
						out +="\n S/M Metro";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(3);
					
					} else if(n==3){
						out +="\n Non Metro";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==4){
						out +="\n No Alcohol Involved";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(5);
					
					}
					else if(n==5){
						out +="\n Alcohol Involved";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==6){
						out +="\n Age 0-1";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(7);
					
					}
					else if(n==7){
						out +="\n Age 2-4";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(8);
					
					}
					else if(n==8){
						out +="\n Age 5-7";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(9);
					
					}
					else if(n==9){
						out +="\n Age 8-10";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(10);
					
					}
					else if(n==10){
						out +="\n Age 11-13";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(11);
					
					}
					else if(n==11){
						out +="\n Age 14-15";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(12);
					
					}
					else if(n==12){
						out +="\n Age 16-17";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(13);
					
					}
					else if(n==13){
						out +="\n Age 18-20";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(14);
					
					}
					else if(n==14){
						out +="\n Age 21-30";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(15);
					
					}
					else if(n==15){
						out +="\n Age 31-65";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(16);
					
					}
					else if(n==16){
						out +="\n Age 66+";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==17){
						out +="\n Driver Age 0-15";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(18);
					
					}
					else if(n==18){
						out +="\n Driver Age 16-17";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(19);
					
					}
					else if(n==19){
						out +="\n Driver Age 18-20";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(20);
					
					}
					else if(n==20){
						out +="\n Driver Age 21-30";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(21);
					
					}
					else if(n==21){
						out +="\n Driver Age 31-65";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						data_update(22);
					
					}
					else if(n==22){
						out +="\n Driver Age 66+";
						out += "\n category,injury_count,adjusted_injury_count\n";
						var count = utmost_injury_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					
					
						
					else{
					
					//Set injury chart for use and redraw
					utmost_fatality_chart.setVisible(false);
					utmost_fatality_race_chart.setVisible(false);
					utmost_totals_race_chart.setVisible(false);
					utmost_totals_chart.setVisible(true);
					utmost_chart.setVisible(false);
					utmost_injury_chart.setVisible(true);
					utmost_injury_chart.redraw(true);
					}
				
				}
			
			});
		} 
		else if (data_outcome_variable == 'fatality_count'&& ((data_subset_variable=='white' && data_subset_category == "all")||(data_subset_variable=='black' && data_subset_category == "all")||(data_subset_variable=='other' && data_subset_category == "all")||(data_subset_variable=='hispanic' && data_subset_category == "all")||(data_subset_variable=='non_hispanic' && data_subset_category == "all")||(data_subset_variable=='education' && data_subset_category == "all")||(data_subset_variable=='income' && data_subset_category == "all"))){
			utmost_fatality_raw_values.load({
				params: {
					filter_string: cm_string,
					coeffs_string: cm_cf_string,
					group_type: data_categories,
					subset_variable : data_subset_variable,
					subset_category : data_subset_category,
					outcome_variable : data_outcome_variable
				},
				callback: function(records, operation, success){
				
					//total rows by category
					utmost_fatality_chart_values.removeAll();
					utmost_fatality_race_chart_values.removeAll();
					utmost_fatality_raw_values.each(function(record){
						var category = record.get('crash_type');
						    var index = utmost_fatality_race_chart_values.findExact('crash_type', category);
						    
						     if (index == -1){
							    utmost_fatality_race_chart_values.add(
							   	    {
									'crash_type': category,
									'q1':parseFloat(record.get('wq1')),
									'q2': parseFloat(record.get('wq2')),
									'q3':parseFloat(record.get('wq3')),
									'q4':parseFloat(record.get('wq4')),
									'q5':parseFloat(record.get('wq5')),
									'sort': record.get('sort')
									}
								);
								} else {
									var target_record = utmost_fatality_race_chart_values.getAt(index);
									target_record.set('q1', parseFloat(record.get('wq1'))+parseFloat(target_record.get('q1')));
									target_record.set('q2', parseFloat(record.get('wq2'))+parseFloat(target_record.get('q2')));
									target_record.set('q3', parseFloat(record.get('wq3'))+parseFloat(target_record.get('q3')));
									target_record.set('q4', parseFloat(record.get('wq4'))+parseFloat(target_record.get('q4')));
									target_record.set('q5', parseFloat(record.get('wq5'))+parseFloat(target_record.get('q5')));
									}
						});
				    utmost_fatality_race_chart_values.sort('sort', 'ASC');
					var max = 0;
					var top_count = 0
					var total_quintile1 = 0;
					var total_quintile2 = 0;
					var total_quintile3 = 0;
					var total_quintile4 = 0;
					var total_quintile5 = 0;
					//var adj_total = 0;
					var count = utmost_fatality_race_chart_values.count();
					
					
					
					//sum values for totals charts
					for (i = 0; i < count; i++){
						if (!utmost_fatality_race_chart_values.getAt(i).get('crash_type')){
							utmost_fatality_race_chart_values.getAt(i).set('crash_type', 'Unknown or N/A');
						}
						total_quintile1 += parseInt(utmost_fatality_race_chart_values.getAt(i).get('q1'));
						total_quintile2 += parseInt(utmost_fatality_race_chart_values.getAt(i).get('q2'));
						total_quintile3 += parseInt(utmost_fatality_race_chart_values.getAt(i).get('q3'));
						total_quintile4 += parseInt(utmost_fatality_race_chart_values.getAt(i).get('q4'));
						total_quintile5 += parseInt(utmost_fatality_race_chart_values.getAt(i).get('q5'));
						//total=total_quintile1+total_quintile2+total_quintile3+total_quintile4+total_quintile5;
						//adj_total += parseInt(utmost_fatality_chart_values.getAt(i).get('fatality_count_adj'));
						if(utmost_fatality_race_chart_values.getAt(i).get('q1') > utmost_fatality_race_chart_values.getAt(i).get('q2'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q1')>utmost_fatality_race_chart_values.getAt(i).get('q3'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q1')>utmost_fatality_race_chart_values.getAt(i).get('q4')){
						if(utmost_fatality_race_chart_values.getAt(i).get('q1')>utmost_fatality_race_chart_values.getAt(i).get('q5'))
						{
							if(utmost_fatality_race_chart_values.getAt(i).get('q1')>max)
							{
							max = utmost_fatality_race_chart_values.getAt(i).get('q1');
							}
						}}}}
					    if(utmost_fatality_race_chart_values.getAt(i).get('q2') > utmost_fatality_race_chart_values.getAt(i).get('q1'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q2')>utmost_fatality_race_chart_values.getAt(i).get('q3'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q2')>utmost_fatality_race_chart_values.getAt(i).get('q4')){
						if(utmost_fatality_race_chart_values.getAt(i).get('q2')>utmost_fatality_race_chart_values.getAt(i).get('q5'))
						{
							if(utmost_fatality_race_chart_values.getAt(i).get('q2')>max)
							{
							max = utmost_fatality_race_chart_values.getAt(i).get('q2');
							}
						}}}}
						if(utmost_fatality_race_chart_values.getAt(i).get('q3') > utmost_fatality_race_chart_values.getAt(i).get('q1'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q3')>utmost_fatality_race_chart_values.getAt(i).get('q2'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q3')>utmost_fatality_race_chart_values.getAt(i).get('q4')){
						if(utmost_fatality_race_chart_values.getAt(i).get('q3')>utmost_fatality_race_chart_values.getAt(i).get('q5'))
						{
							if(utmost_fatality_race_chart_values.getAt(i).get('q3')>max)
							{
							max = utmost_fatality_race_chart_values.getAt(i).get('q3');
							}
						}}}}
						if(utmost_fatality_race_chart_values.getAt(i).get('q4') > utmost_fatality_race_chart_values.getAt(i).get('q1'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q4')>utmost_fatality_race_chart_values.getAt(i).get('q2'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q4')>utmost_fatality_race_chart_values.getAt(i).get('q3')){
						if(utmost_fatality_race_chart_values.getAt(i).get('q4')>utmost_fatality_race_chart_values.getAt(i).get('q5'))
						{
							if(utmost_fatality_race_chart_values.getAt(i).get('q4')>max)
							{
							max = utmost_fatality_race_chart_values.getAt(i).get('q4');
							}
						}}}}
						if(utmost_fatality_race_chart_values.getAt(i).get('q5') > utmost_fatality_race_chart_values.getAt(i).get('q1'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q5')>utmost_fatality_race_chart_values.getAt(i).get('q2'))
						{
						if(utmost_fatality_race_chart_values.getAt(i).get('q5')>utmost_fatality_race_chart_values.getAt(i).get('q3')){
						if(utmost_fatality_race_chart_values.getAt(i).get('q5')>utmost_fatality_race_chart_values.getAt(i).get('q4'))
						{
							if(utmost_fatality_race_chart_values.getAt(i).get('q5')>max)
							{
							max = utmost_fatality_race_chart_values.getAt(i).get('q5');
							}
						}}}}
					}
					//utmost_totals_chart.axes.getAt(0).maximum = 40000;
					if(total_quintile1>total_quintile2 && total_quintile1>total_quintile3 && total_quintile1>total_quintile4 && total_quintile1>total_quintile5 )
					{
						utmost_totals_race_chart.axes.getAt(0).maximum=Math.floor((total_quintile1 * 1.1) / 100) * 100
						if(utmost_totals_race_chart.axes.getAt(0).maximum < total_quintile1 || utmost_totals_race_chart.axes.getAt(0).maximum > total_quintile1){
						var temp_max=total_quintile1/10;
						 utmost_totals_race_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;}
					}
					if(total_quintile2>total_quintile1 && total_quintile2>total_quintile3 && total_quintile2>total_quintile4 && total_quintile2>total_quintile5 )
					{
						utmost_totals_race_chart.axes.getAt(0).maximum=Math.floor((total_quintile2 * 1.1) / 100) * 100
						if(utmost_totals_race_chart.axes.getAt(0).maximum < total_quintile2 || utmost_totals_race_chart.axes.getAt(0).maximum > total_quintile2){
						var temp_max=total_quintile2/10;
						 utmost_totals_race_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;}
					}
					if(total_quintile3>total_quintile1 && total_quintile3>total_quintile2 && total_quintile3>total_quintile4 && total_quintile3>total_quintile5 )
					{
						utmost_totals_race_chart.axes.getAt(0).maximum=Math.floor((total_quintile3 * 1.1) / 100) * 100
						if(utmost_totals_race_chart.axes.getAt(0).maximum < total_quintile3 || utmost_totals_race_chart.axes.getAt(0).maximum > total_quintile3){
						var temp_max=total_quintile3/10;
						 utmost_totals_race_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;}
					}
					if(total_quintile4>total_quintile1 && total_quintile4>total_quintile2 && total_quintile4>total_quintile3 && total_quintile4>total_quintile5 )
					{
						utmost_totals_race_chart.axes.getAt(0).maximum=Math.floor((total_quintile4 * 1.1) / 100) * 100
						if(utmost_totals_race_chart.axes.getAt(0).maximum < total_quintile4 || utmost_totals_race_chart.axes.getAt(0).maximum > total_quintile4){
						var temp_max=total_quintile4/10;
						 utmost_totals_race_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;}
					}
					if(total_quintile5>total_quintile1 && total_quintile5>total_quintile2 && total_quintile5>total_quintile3 && total_quintile5>total_quintile4 )
					{
						utmost_totals_race_chart.axes.getAt(0).maximum=Math.floor((total_quintile5 * 1.1) / 100) * 100
						if(utmost_totals_race_chart.axes.getAt(0).maximum < total_quintile5 || utmost_totals_race_chart.axes.getAt(0).maximum > total_quintile5){
						var temp_max=total_quintile5/10;
						 utmost_totals_race_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;}
					}
					utmost_totals_race_chart_values.getAt(0).set('q1', total_quintile1);
					utmost_totals_race_chart_values.getAt(0).set('q2', total_quintile2);
					utmost_totals_race_chart_values.getAt(0).set('q3', total_quintile3);
					utmost_totals_race_chart_values.getAt(0).set('q4', total_quintile4);
					utmost_totals_race_chart_values.getAt(0).set('q5', total_quintile5);								
					utmost_totals_race_chart_values.commitChanges();
					utmost_fatality_race_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					
					//adjust chart max
					var chart_max = (parseInt(max / 100) + 1) * 100;
					utmost_fatality_race_chart.axes.getAt(0).maximum = 16000;
					//generate_chart_quintile_values(data_subset_variable);
					
					
					utmost_loadmask.hide();
					
					//Inform chart that the chart dataset has been updated (needed because secondary dataset gets network load);
					utmost_fatality_race_chart_values.fireEvent('refresh');
					utmost_totals_race_chart.fireEvent('refresh');
						
					
					
					//Redraw count chart
					utmost_fatality_race_chart.setVisible(true);
					utmost_fatality_chart.setVisible(false);
					utmost_totals_chart.setVisible(false);
					utmost_totals_race_chart.setVisible(true);
					utmost_chart.setVisible(false);
					utmost_injury_chart.setVisible(false);
					utmost_chart.redraw(true);
					
					
					
					
					  
					
					
					
					
					
					
				}
			});
		}
		else if (data_outcome_variable == 'fatality_count'){
			utmost_fatality_raw_values.load({
				params: {
					filter_string: cm_string,
					coeffs_string: cm_cf_string,
					group_type: data_categories,
					subset_variable : data_subset_variable,
					subset_category : data_subset_category,
					outcome_variable : data_outcome_variable
				},
				callback: function(records, operation, success){
				
					//total rows by category
					utmost_fatality_chart_values.removeAll();
					utmost_fatality_race_chart_values.removeAll();
					utmost_fatality_raw_values.each(function(record){
						
						if (!record.get('crash_type')){
							record.set('crash_type', 'Unknown or N/A');
						}
						
						
						var dv_calc_relevance = 1;
						
						var new_belted = record.get('p_belted');
						var new_unrestrained = record.get('p_unrestrained');
						var new_child_optimal = record.get('p_child_optimal');
						var new_child_suboptimal = record.get('p_child_suboptimal');
						var new_helmet = record.get('p_helmet');
						
						
						
						//TODO: Get hardcoded values out
						var optimal_baselines = {
							'0-1': .65*.11+.54*.89,
							'2-4': .80*.13+.64*.87,
							'5-7': .62*.85+.40*.15,
							'8-10': .37*.01+.19*.99
						};
						
						var age = record.get('age');
						
						if(check_countermeasure('teen_driver')){
							var teen_adjustment = cm_teen_driver_get_value(record.get('driver_age'));
							record.set('mitigation_factor', record.get('mitigation_factor') * teen_adjustment);
						}

						if ((record.get('mean_dv') == 0 && record.get('sd_dv') == 0 ) || record.get('dv_shift_relevance') == 0){
							var dv_calc_relevance = 0;
						}
						
						
						
						
						
						
						
						
						var RESTRAINT_FATALITY_PREVENTION_RATE = 1;
						if (record.get('r_unrestrained') > 0){
							if (record.get('r_helmet') > 0){
								RESTRAINT_FATALITY_PREVENTION_RATE = record.get('r_helmet')/record.get('r_unrestrained');
							} else if (age in optimal_baselines) {
								RESTRAINT_FATALITY_PREVENTION_RATE = record.get('r_child_optimal')/record.get('r_unrestrained');
							} else {
								RESTRAINT_FATALITY_PREVENTION_RATE = record.get('r_belted')/record.get('r_unrestrained');
							}
						} 
						
						// Child Restraint laws
						if (check_countermeasure('child_seat') && (age in optimal_baselines) ){
							var unbelted_baseline = optimal_baselines[age];
							var optimal_adjusted = cm_childseat_get_value(age);
							var new_unbelted = 1 - optimal_adjusted;
							var unbelt_ratio = new_unbelted / unbelted_baseline;
							var new_row_unbelted = record.get('n_unrestrained') * unbelt_ratio;
							var new_row_belted = record.get('n_optimal') + (record.get('n_unrestrained') - new_row_unbelted) * RESTRAINT_FATALITY_PREVENTION_RATE;
							record.set('n_unrestrained', new_row_unbelted);
							record.set('n_optimal', new_row_belted);
						}
						// Motorcycle Helmet law Fatalities
						if (check_countermeasure('helmet')&& record.get('r_helmet') > 0){
							var no_helmet_baseline_rate = (.89*.39 + (1-.39)*.49);
							new_unrestrained = (1 - cm_helmet_get_value());
							var unbelt_ratio = new_unrestrained / no_helmet_baseline_rate;
							var new_row_unbelted = record.get('n_unrestrained') * unbelt_ratio;
							var new_row_belted = record.get('n_optimal') + (record.get('n_unrestrained') - new_row_unbelted) * RESTRAINT_FATALITY_PREVENTION_RATE;
							record.set('n_unrestrained', new_row_unbelted);
							record.set('n_optimal', new_row_belted);
						}
						
						if (check_countermeasure('restraint_override')){ // Restraint Override, replaces child restraint laws
							var unbelted_baseline = 1-(.23*.82 + .01*.84 + .59*.91 + .17*.94);
							var new_unbelted = 1-cm_restraint_override_get_value();
							var unbelt_ratio = new_unbelted / unbelted_baseline;
							var new_row_unbelted = record.get('n_unrestrained') * unbelt_ratio;
							var new_row_belted = record.get('n_optimal') + (record.get('n_unrestrained') - new_row_unbelted) * RESTRAINT_FATALITY_PREVENTION_RATE;
							record.set('n_unrestrained', new_row_unbelted);
							record.set('n_optimal', new_row_belted);
						} else if (check_countermeasure('seatbelt') && !(age in optimal_baselines)){ //Seatbelt laws
							var unbelted_baseline = 1-(.23*.82 + .01*.84 + .59*.91 + .17*.94);
							var new_unbelted = 1-cm_seatbelt_get_value();
							var unbelt_ratio = new_unbelted / unbelted_baseline;
							var new_row_unbelted = record.get('n_unrestrained') * unbelt_ratio;
							var new_row_belted =  record.get('n_optimal') + (record.get('n_unrestrained') - new_row_unbelted) * RESTRAINT_FATALITY_PREVENTION_RATE;
							record.set('n_unrestrained', new_row_unbelted);
							record.set('n_optimal', new_row_belted);
						}
					
						
						if (dv_calc_relevance != 0){
							//dv is only shifted for countermeasures that effect delta-v in crashes.  
							var fatality_adjusted_rate = {};
							
							//trapezoidal sum for integration
							if (record.get('n_unrestrained') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_unrestrained'));
								fatality_adjusted_rate['unrestrained'] = result['adjusted']/result['base'];
							} else {
								fatality_adjusted_rate['unrestrained'] = 1;
							}
							if (record.get('n_optimal') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_belted'));
								fatality_adjusted_rate['optimal'] = result['adjusted']/result['base'];
							} else {
								fatality_adjusted_rate['optimal'] = 1;
							}
							if (record.get('n_suboptimal') > 0 ){
								var result = utmost_injury_trapezoidal_sum(record, record.get('i_child_suboptimal'));
								fatality_adjusted_rate['suboptimal'] = result['adjusted']/result['base'];
							} else {
								fatality_adjusted_rate['suboptimal'] = 1;
							}
							
							//Avoidance mitigation
							var avoidance = 1;
							if (record.get('dv_shift_relevance') > 0){
								var nonDV_mitigation_factor = (1 - (((1-record.get('mitigation_factor')) / record.get('dv_shift_relevance'))-1));
								var dv_correction_factor = (1 - record.get('dv_shift_relevance'));
								avoidance *= (nonDV_mitigation_factor / dv_correction_factor);
								avoidance *= record.get('mitigation_factor');
							} else {
								avoidance *= record.get('mitigation_factor');
							}
							
							//Multiply frequency to get count
							var adj_fatals = avoidance * (record.get('n_optimal') * fatality_adjusted_rate['optimal'] + record.get('n_suboptimal') * fatality_adjusted_rate['suboptimal']  + record.get('n_unrestrained') * fatality_adjusted_rate['unrestrained']  + record.get('n_unknown'));
							if (check_countermeasure('vehicle_age') && record.get('veh_age') == "12+" && record.get('crash_type')!= "Parked Car" && record.get('crash_type')!= "Motorcycle")
							{
								adj_fatals=adj_fatals*cm_vehicle_age_get_value(data_outcome_variable);
							}
							record.set('fatality_count_adj', adj_fatals);
						} else {
							var avoidance = record.get('mitigation_factor');
							var base_fatals = record.get('n_optimal') + record.get('n_suboptimal') + record.get('n_unrestrained') + record.get('n_unknown');
							var adj_fatals = avoidance * base_fatals;
							if (check_countermeasure('vehicle_age') && record.get('veh_age') == "12+" && record.get('crash_type')!= "Parked Car" && record.get('crash_type')!= "Motorcycle")
							{
								adj_fatals=adj_fatals*cm_vehicle_age_get_value(data_outcome_variable);
							}
							record.set('fatality_count_adj', adj_fatals);
						}
						    var category = record.get('crash_type');
						    var index = utmost_fatality_chart_values.findExact('crash_type', category);
						    var adjusted_count_temp = record.get('fatality_count_adj');
						    if (index == -1)
							{
							    utmost_fatality_chart_values.add(
							   	    {
									'crash_type': category,
									'fatality_count': record.get('fatality_count'),
									'fatality_count_adj': adjusted_count_temp,
									'sort': record.get('sort')
								    }
							    );
						     } else {
							        var target_record = utmost_fatality_chart_values.getAt(index);
							        target_record.set('fatality_count', record.get('fatality_count')+target_record.get('fatality_count'));
							        target_record.set('fatality_count_adj', adjusted_count_temp+target_record.get('fatality_count_adj'));
						        }
						//}
					});
				   
					
					
						
					
					    utmost_fatality_chart_values.sort('sort', 'ASC');
					    var max = 0;
					    var top_count = 0
					    var total = 0;
					    var adj_total = 0;
						var count = utmost_fatality_chart_values.count();
					
					
					
						//sum values for totals charts
					for (i = 0; i < count; i++){
						if (!utmost_fatality_chart_values.getAt(i).get('crash_type')){
							utmost_fatality_chart_values.getAt(i).set('crash_type', 'Unknown or N/A');
						}
						total += parseInt(utmost_fatality_chart_values.getAt(i).get('fatality_count'));
						adj_total += parseInt(utmost_fatality_chart_values.getAt(i).get('fatality_count_adj'));
						if(utmost_fatality_chart_values.getAt(i).get('fatality_count') > max){
							max = utmost_fatality_chart_values.getAt(i).get('fatality_count');
						}
					}
					//utmost_totals_chart.axes.getAt(0).maximum = 40000;
					utmost_totals_chart.axes.getAt(0).maximum = (total > adj_total) ? Math.floor((total * 1.1) / 100) * 100 : Math.floor((adj_total * 1.1) / 100) * 100;
					if(utmost_totals_chart.axes.getAt(0).maximum < adj_total || utmost_totals_chart.axes.getAt(0).maximum > adj_total)
					{
						 var temp_max=adj_total/10;
						 utmost_totals_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;
					}
					if(utmost_totals_chart.axes.getAt(0).maximum < total || utmost_totals_chart.axes.getAt(0).maximum > total)
					{
						var temp_max=total/10;
						 utmost_totals_chart.axes.getAt(0).maximum =Math.ceil(temp_max)*10;
					}
					utmost_totals_chart_values.getAt(0).set('person_count', total);
					utmost_totals_chart_values.getAt(0).set('person_count_adj', adj_total);					
					utmost_totals_chart_values.commitChanges();
					utmost_fatality_chart.axes.getAt(1).title = chart_vars.findRecord("val", chart_variable_selector.getValue()).get("name");
					if(data_subset_variable=='hispanic')
					{
					if(  data_categories=='crash_type' ||data_categories=='crash_direction'||data_categories=="income")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3000;
						}
						else if( data_categories=="education" || data_categories=="veh_type")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3800;
						} 
						else if( data_categories=="age" || data_categories=="driver_age"||data_categories=="veh_age"|| data_categories=="urbanization_soc"|| data_categories=="black" )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4600;
						}
						else if(data_categories=='white'|| data_categories=="light_condition")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=5300;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement"|| data_categories=="other")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=6700;
						} 
						else if( data_categories=="hispanic"|| data_categories=='non_hispanic')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=9200;
						}    	
					}
					else if(data_subset_variable=='non_hispanic')
					{
						if(  data_categories=='crash_type' ||data_categories=='crash_direction'||data_categories=="income")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=2900;
						}
						else if( data_categories=="education" || data_categories=="veh_type")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3700;
						} 
						else if( data_categories=="age" || data_categories=="driver_age"||data_categories=="veh_age"|| data_categories=="urbanization_soc"|| data_categories=="black" )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4500;
						}
						else if(data_categories=='white'|| data_categories=="light_condition")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=5100;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement"|| data_categories=="other")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=6500;
						} 
						else if( data_categories=="hispanic"|| data_categories=='non_hispanic')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=8900;
						}    		
					}
					else if(data_subset_variable=='other')
					{
						if(  data_categories=='crash_type' ||data_categories=='crash_direction'||data_categories=="income")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3300;
						}
						else if( data_categories=="education" || data_categories=="veh_type"||data_categories=="veh_age"|| data_categories=="urbanization_soc"|| data_categories=="black")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4800;
						} 
						else if( data_categories=="age" || data_categories=="driver_age"|| data_categories=="light_condition" )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=5800;
						}
						else if(data_categories=="hispanic"|| data_categories=='non_hispanic' || data_categories=='white')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=6700;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=7200;
						} 
						else if( data_categories=="other")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=10100;
						}    	
					}
					else if(data_subset_variable=='black')
					{
						if(  data_categories=='crash_type' ||data_categories=='crash_direction')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=2600;
						}
						else if( data_categories=="education"|| data_categories=="veh_type" ||data_categories=="income")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3800;
						} 
						else if( data_categories=="age" || data_categories=="driver_age"|| data_categories=='veh_age' ||data_categories=='urbanization_soc'|| data_categories=="hispanic"|| data_categories=='non_hispanic'|| data_categories=='other')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4500;
						}
						else if( data_categories=="light_condition" )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=5200;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement"|| data_categories=='white')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=6200;
						} 
						else if( data_categories=="black")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=8800;
						}    
					}
					else if(data_subset_variable=='white')
					{
						if(  data_categories=='education' ||data_categories=='income')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3300;
						}
						else if( data_categories=="crash_type"|| data_categories=="veh_type" ||data_categories=="crash_direction")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=2700;
						} 
						else if( data_categories=="age" || data_categories=="driver_age"|| data_categories=='veh_age' ||data_categories=='urbanization_soc')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4400;
						}
						else if( data_categories=="light_condition" || data_categories=="hispanic"|| data_categories=='non_hispanic')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=5300;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement"|| data_categories=='black'|| data_categories=='other')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=6400;
						} 
						else if( data_categories=="white")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=8800;
						}    
						
					}
					else if(data_subset_variable=='education')
					{
					if(  data_categories=='education' )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=10800;
						}
						else if( data_categories=="crash_type" ||data_categories=="crash_direction"||data_categories=="age"||data_categories=="white"|| data_categories=='black')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3300;
						} 
						else if(data_categories=="light_condition" ||  data_categories=="driver_age"|| data_categories=='veh_age' ||data_categories=='income')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=5900;
						}
						else if( data_categories=="hispanic"|| data_categories=='non_hispanic'|| data_categories=="veh_type"|| data_categories=='other'||data_categories=='urbanization_soc')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4400;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement")
						{
							utmost_fatality_chart.axes.getAt(0).maximum=7600;
						} 
						 	
					}
					else if(data_subset_variable=='income')
					{
						if(data_categories=='income' )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=8900;
						}
						else if( data_categories=="crash_type" ||data_categories=="crash_direction"|| data_categories=='non_hispanic')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=2900;
						} 
						else if(data_categories=="light_condition" ||  data_categories=="driver_age"||data_categories=="age"|| data_categories=='veh_age' )
						{
							utmost_fatality_chart.axes.getAt(0).maximum=4600;
						}
						else if( data_categories=="hispanic"|| data_categories=="veh_type"|| data_categories=='other'||data_categories=='urbanization_soc'||data_categories=="white"|| data_categories=='black')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=3800;
						}
						else if( data_categories=="sex" || data_categories=="alcohol_involvement"||data_categories=='education')
						{
							utmost_fatality_chart.axes.getAt(0).maximum=6300;
						} 	
					}
					else
					{
					//adjust chart max
						var chart_max = (parseInt(max / 100) + 1) * 100;
						utmost_fatality_chart.axes.getAt(0).maximum = chart_max;
					}
					
					utmost_loadmask.hide();
					
					//Inform chart that the chart dataset has been updated (needed because secondary dataset gets network load);
					utmost_fatality_chart_values.fireEvent('refresh');
					utmost_totals_chart.fireEvent('refresh');
					if(n==1){
						out +="\n Large Metro";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(2);
					}else if(n==2){
						out +="\n S/M Metro";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(3);
					
					} else if(n==3){
						out +="\n Non Metro";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}else if(n==4){
						out +="\n No Alcohol Involved";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(5);
					
					}else if(n==5){
						out +="\n Alcohol Involved";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
						else if(n==6){
						out +="\n Age 0-1";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(7);
					
					}
					else if(n==7){
						out +="\n Age 2-4";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(8);
					
					}
					else if(n==8){
						out +="\n Age 5-7";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(9);
					
					}
					else if(n==9){
						out +="\n Age 8-10";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(10);
					
					}
					else if(n==10){
						out +="\n Age 11-13";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(11);
					
					}
					else if(n==11){
						out +="\n Age 14-15";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(12);
					
					}
					else if(n==12){
						out +="\n Age 16-17";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(13);
					
					}
					else if(n==13){
						out +="\n Age 18-20";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(14);
					
					}
					else if(n==14){
						out +="\n Age 21-30";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(15);
					
					}
					else if(n==15){
						out +="\n Age 31-65";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(16);
					
					}
					else if(n==16){
						out +="\n Age 66+";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==17){
						out +="\n Driver Age 0-15";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(18);
					
					}
					else if(n==18){
						out +="\n Driver Age 16-17";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(19);
					
					}
					else if(n==19){
						out +="\n Driver Age 18-20";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(20);
					
					}
					else if(n==20){
						out +="\n Driver Age 21-30";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(21);
					
					}
					else if(n==21){
						out +="\n Driver Age 31-65";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(22);
					
					}
					else if(n==22){
						out +="\n Driver Age 66+";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==23){
						out +="\n 56.7% and Below";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(24);					
					}
					else if(n==24){
						out +="\n 56.7%-74.2%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(25);
					
					}
					else if(n==25){
						out +="\n 74.2%-84.3%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(26);
					
					}
					else if(n==26){
						out +="\n 84.3%-92.1%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(27);
					
					}
					else if(n==27){
						out +="\n 92.1% and Above";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==28){
						out +="\n 1.2% and Below";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(29);
					
					}
					else if(n==29){
						out +="\n 1.2%-3.4%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(30);
					
					}
					else if(n==30){
						out +="\n 3.4%-7.8%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(31);
					
					}
					else if(n==31){
						out +="\n 7.8%-19.4%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(32);
					
					}
					else if(n==32){
						out +="\n 19.4% and Above";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					else if(n==33){
						out +="\n 4.1% and Below";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(34);
					
					}
					else if(n==34){
						out +="\n 4.1%-7.3%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(35);
					
					}
					else if(n==35){
						out +="\n 7.3%-11.8%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(36);
					
					}
					else if(n==36){
						out +="\n 11.8%-21.6%";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						data_update(37);
					
					}
					else if(n==37){
						out +="\n 21.6% and Above";
						out += "\n category,fatality_count,adjusted_fatality_count\n";
						var count = utmost_fatality_chart_values.count();
						for (i = 0; i < count; i++){
							out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
						}
						// thanks stackoverflow
						var outFileBlob = new Blob([out], {type:'text/plain'});
						var outFileName = "utmost_chart_output.csv";
						var dl_link = document.createElement("a");
						dl_link.download = outFileName;
						dl_link.innerHTML = "Download File";
		 				if (window.webkitURL != null){
						// Chrome allows the link to be clicked
						// without actually adding it to the DOM.
						dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
						} else {
						// Firefox requires the link to be added to the DOM
						// before it can be clicked.
						dl_link.href = window.URL.createObjectURL(outFileBlob);
						dl_link.onclick = document.body.removeChild(event.target);
						dl_link.style.display = "none";
						document.body.appendChild(dl_link);
						}
						dl_link.click();
						data_update(0);
						out="";
					
					}
					
					else{
					
					//Redraw count chart
					utmost_fatality_chart.setVisible(true);
					utmost_totals_race_chart.setVisible(false);
					utmost_totals_chart.setVisible(true);
					utmost_chart.setVisible(false);
					utmost_fatality_race_chart.setVisible(false);
					utmost_injury_chart.setVisible(false);
					utmost_chart.redraw(true);
					
					}
					
				}
			});
		}
		//else if (data_outcome_variable == 'fatality_count' && data_subset_variable=='white' && data_subset_category == "all"){
	
			
		
	}
	
	
	var utmost_csv_export = function(){
		
		out += cm_status_export();
		var data_subset_variable = get_data_subset_var();
		var data_subset_category = get_data_subset_cat();

		if((data_subset_variable=='urbanization' && data_subset_category=='all')||(data_subset_variable=='urbanization_soc' && data_subset_category=='all'))
		{
				if (utmost_chart.isVisible()){
			out +="\n All"
			out += "\n category,person_count,adjusted_person_count\n";
			var count = utmost_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
			}
			data_update(1);
			
		} else if (utmost_injury_chart.isVisible()){
			//injury
			out +="\n All"
			out += "category,injury_count,adjusted_injury_count\n";
			var count = utmost_injury_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
			}
			data_update(1);
		} else if (utmost_fatality_chart.isVisible()) {
			//fatality
			out +="\n All"
			out += "category,fatality_count,adjusted_fatality_count\n";
			var count = utmost_fatality_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
			}
			data_update(1);
			}
			
		}
		else if((data_subset_variable=='alcohol_involvement' && data_subset_category=='all'))
		{
				if (utmost_chart.isVisible()){
			out +="\n All"
			out += "\n category,person_count,adjusted_person_count\n";
			var count = utmost_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
			}
			data_update(4);
			
		} else if (utmost_injury_chart.isVisible()){
			//injury
			out +="\n All"
			out += "\n category,injury_count,adjusted_injury_count\n";
			var count = utmost_injury_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
			}
			data_update(4);
		} else if (utmost_fatality_chart.isVisible()) {
			//fatality
			out +="\n All"
			out += "\n category,fatality_count,adjusted_fatality_count\n";
			var count = utmost_fatality_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
			}
			data_update(4);
			}
			
		}
		else if((data_subset_variable=='age' && data_subset_category=='all'))
		{
				if (utmost_chart.isVisible()){
			out +="\n All"
			out += "\n category,person_count,adjusted_person_count\n";
			var count = utmost_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
			}
			data_update(6);
			
		} else if (utmost_injury_chart.isVisible()){
			//injury
			out +="\n All"
			out += "\n category,injury_count,adjusted_injury_count\n";
			var count = utmost_injury_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
			}
			data_update(6);
		} else if (utmost_fatality_chart.isVisible()) {
			//fatality
			out +="\n All"
			out += "\n category,fatality_count,adjusted_fatality_count\n";
			var count = utmost_fatality_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
			}
			data_update(6);
			}
			
		}
		else if((data_subset_variable=='driver_age' && data_subset_category=='all'))
		{
				if (utmost_chart.isVisible()){
			out +="\n All"
			out += "\n category,person_count,adjusted_person_count\n";
			var count = utmost_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
			}
			data_update(17);
			
		} else if (utmost_injury_chart.isVisible()){
			//injury
			out +="\n All"
			out += "\n category,injury_count,adjusted_injury_count\n";
			var count = utmost_injury_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
			}
			data_update(17);
		} else if (utmost_fatality_chart.isVisible()) {
			//fatality
			out +="\n All"
			out += "\n category,fatality_count,adjusted_fatality_count\n";
			var count = utmost_fatality_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
			}
			data_update(17);
			}
			
		}
			else if((data_subset_variable=='white' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(23);
			}
		}
		else if((data_subset_variable=='black' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(28);
			}
		}
		else if((data_subset_variable=='other' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(33);
			}
		}
		else if((data_subset_variable=='hispanic' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(18);
			}
		}
		else if((data_subset_variable=='non_hispanic' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(18);
			}
		}
		else if((data_subset_variable=='education' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(18);
			}
		}
		else if((data_subset_variable=='income' && data_subset_category=='all'))
		{
			 if (utmost_fatality_race_chart.isVisible()) {
			//fatality
			out += "category,"+utmost_fatality_race_chart.series.get(0).title+"\n";
			var count = utmost_fatality_race_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_race_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_race_chart_values.getAt(i).get('q1')+','+utmost_fatality_race_chart_values.getAt(i).get('q2')+','+utmost_fatality_race_chart_values.getAt(i).get('q3')+','+utmost_fatality_race_chart_values.getAt(i).get('q4')+','+utmost_fatality_race_chart_values.getAt(i).get('q5')+'\n';
			}
			data_update(18);
			}
		}
		else {
		if (utmost_chart.isVisible()){
			out += "category,person_count,adjusted_person_count\n";
			var count = utmost_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_chart_values.getAt(i).get('crash_type')+','+utmost_chart_values.getAt(i).get('person_count')+','+utmost_chart_values.getAt(i).get('person_count_adj')+'\n';
			}
		} else if (utmost_injury_chart.isVisible()){
			//injury
			out += "category,injury_count,adjusted_injury_count\n";
			var count = utmost_injury_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_injury_chart_values.getAt(i).get('crash_type')+','+utmost_injury_chart_values.getAt(i).get('injury_count')+','+utmost_injury_chart_values.getAt(i).get('injury_count_adj')+'\n';
			}
		} else if (utmost_fatality_chart.isVisible()) {
			//fatality
			out += "category,fatality_count,adjusted_fatality_count\n";
			var count = utmost_fatality_chart_values.count();
			for (i = 0; i < count; i++){
				out += utmost_fatality_chart_values.getAt(i).get('crash_type')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count')+','+utmost_fatality_chart_values.getAt(i).get('fatality_count_adj')+'\n';
			}}
			
			// thanks stackoverflow
		var outFileBlob = new Blob([out], {type:'text/plain'});
		var outFileName = "utmost_chart_output.csv";
		var dl_link = document.createElement("a");
		dl_link.download = outFileName;
		dl_link.innerHTML = "Download File";
		 if (window.webkitURL != null){
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			dl_link.href = window.webkitURL.createObjectURL(outFileBlob);
		} else {
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			dl_link.href = window.URL.createObjectURL(outFileBlob);
			dl_link.onclick = document.body.removeChild(event.target);
			dl_link.style.display = "none";
			document.body.appendChild(dl_link);
		}
		dl_link.click();
		out="";
		}
		
	};
