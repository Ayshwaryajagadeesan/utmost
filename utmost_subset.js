	Ext.namespace('UTMOST');
	var titleArray = new Array(5);
	Yaxistitle="Baseline Fatality Count (% by zipcode)";
	Ext.define('Subset_Group', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'group_var', type: 'string'}, 
				{name: 'title', type: 'string'}, 
				{name: 'category_value', type: 'string'},
				{name: 'chart_max', type: 'int'}
				]
	});
	
	var data_subsets = Ext.create('Ext.data.Store', {
		model: 'Subset_Group',
		data : [
			{group_var: 'all', title: 'All', category_value:'', chart_max: 5500000},
			{group_var: 'age', title: 'Age 0-1', category_value:'"0-1"', chart_max: 165000},
			{group_var: 'age', title: 'Age 2-4', category_value:'"2-4"', chart_max: 260000},
			{group_var: 'age', title: 'Age 5-7', category_value:'"5-7"', chart_max: 240000},
			{group_var: 'age', title: 'Age 8-10', category_value:'"8-10"', chart_max: 225000},
			{group_var: 'age', title: 'Age 11-13', category_value:'"11-13"', chart_max: 225000},
			{group_var: 'age', title: 'Age 14-15', category_value:'"14-15"', chart_max: 200000},
			{group_var: 'age', title: 'Age 16-17', category_value:'"16-17"', chart_max: 640000},
			{group_var: 'age', title: 'Age 18-20', category_value:'"18-20"', chart_max: 1250000},
			{group_var: 'age', title: 'Age 21-30', category_value:'"21-30"', chart_max: 10100000},
			{group_var: 'age', title: 'Age 31-65', category_value:'"31-65"', chart_max: 10100000},
			{group_var: 'age', title: 'Age 66+', category_value:'"66+"', chart_max: 1150000},
			{group_var: 'alcohol_involvement', title: 'No Alcohol Involved', category_value:'"No Alcohol Involved"', chart_max: 14000000},
			{group_var: 'alcohol_involvement', title: 'Alcohol Involved', category_value:'"Alcohol Involved"', chart_max: 550000},
			{group_var: 'driver_age', title: 'Driver Age 0-15', category_value:'"<16"', chart_max: 110000},
			{group_var: 'driver_age', title: 'Driver Age 16-17', category_value:'"16-17"', chart_max: 600000},
			{group_var: 'driver_age', title: 'Driver Age 18-20', category_value:'"18-20"', chart_max: 1250000},
			{group_var: 'driver_age', title: 'Driver Age 21-30', category_value:'"21-30"', chart_max: 12000000},
			{group_var: 'driver_age', title: 'Driver Age 31-65', category_value:'"31-65"', chart_max: 12000000},
			{group_var: 'driver_age', title: 'Driver Age 66+', category_value:'">65"', chart_max: 1200000},
			{group_var: 'urbanization', title: 'Large Metro', category_value:'"Large Metro"', chart_max: 5500000},
			{group_var: 'urbanization', title: 'S/M Metro', category_value:'"S/M Metro"', chart_max: 5500000},
			{group_var: 'urbanization', title: 'Nonmetro', category_value:'"Nonmetro"', chart_max: 5500000},
			{group_var: 'urbanization_soc', title: 'Large Metro', category_value:'"Large Metro"', chart_max: 5500000},
			{group_var: 'urbanization_soc', title: 'S/M Metro', category_value:'"S/M Metro"', chart_max: 5500000},
			{group_var: 'urbanization_soc', title: 'Nonmetro', category_value:'"Nonmetro"', chart_max: 5500000},
			{group_var: 'white', title: '56.7% and Below ', category_value:'"56.7% and Below"', chart_max: 5500000},
			{group_var: 'white', title: '56.7%-74.2%', category_value:'"56.7%-74.2%"', chart_max: 5500000},
			{group_var: 'white', title: '74.2%-84.3% ', category_value:'"74.2%-84.3%"', chart_max: 5500000},
			{group_var: 'white', title: '84.3%-92.1% ', category_value:'"84.3%-92.1%"', chart_max: 5500000},
			{group_var: 'white', title: '92.1% and Above', category_value:'"92.1% and Above"', chart_max: 5500000},
			{group_var: 'whitetitle', title: 'Baseline Fatality Count % white by zipcode', category_value:'', chart_max: 5500000},
			{group_var: 'black', title: '1.2% and Below', category_value:'"1.2% and Below"', chart_max: 5500000},
			{group_var: 'black', title: '1.2%-3.4%', category_value:'"1.2%-3.4%"', chart_max: 5500000},
			{group_var: 'black', title: '3.4%-7.8%', category_value:'"3.4%-7.8%"', chart_max: 5500000},
			{group_var: 'black', title: '7.8%-19.4%', category_value:'"7.8%-19.4%"', chart_max: 5500000},
			{group_var: 'black', title: '19.4% and Above', category_value:'"19.4% and Above"', chart_max: 5500000},
			{group_var: 'blacktitle', title: 'Baseline Fatality Count % black by zipcode', category_value:'', chart_max: 5500000},
			{group_var: 'other', title: '4.1% and Below', category_value:'"4.1% and Below"', chart_max: 5500000},
			{group_var: 'other', title: '4.1%-7.3%', category_value:'"4.1%-7.3%"', chart_max: 5500000},
			{group_var: 'other', title: '7.3%-11.8%', category_value:'"7.3%-11.8%"', chart_max: 5500000},
			{group_var: 'other', title: '11.8%-21.6%', category_value:'"11.8%-21.6%"', chart_max: 5500000},
			{group_var: 'other', title: '21.6% and Above', category_value:'"21.6% and Above"', chart_max: 5500000},
			{group_var: 'othertitle', title: 'Baseline Fatality Count % other by zipcode', category_value:'', chart_max: 5500000},
			{group_var: 'hispanic', title: '2.8% and Below', category_value:'"2.8% and Below"', chart_max: 5500000},
			{group_var: 'hispanic', title: '2.8%-6.1%', category_value:'"2.8%-6.1%"', chart_max: 5500000},
			{group_var: 'hispanic', title: '6.1%-12.6%', category_value:'"6.1%-12.6%"', chart_max: 5500000},
			{group_var: 'hispanic', title: '12.6%-29.5%', category_value:'"12.6%-29.5%"', chart_max: 5500000},
			{group_var: 'hispanic', title: '29.5% and Above', category_value:'"29.5% and Above"', chart_max: 5500000},
			{group_var: 'hispanictitle', title: 'Baseline Fatality Count % hispanic by zipcode', category_value:'', chart_max: 5500000},
			{group_var: 'non_hispanic', title: '70.5% and Below', category_value:'"70.5% and Below"', chart_max: 5500000},
			{group_var: 'non_hispanic', title: '70.5%-87.4%', category_value:'"70.5%-87.4%"', chart_max: 5500000},
			{group_var: 'non_hispanic', title: '87.4%-93.9%', category_value:'"87.4%-93.9%"', chart_max: 5500000},
			{group_var: 'non_hispanic', title: '93.9%-97.2%', category_value:'"93.9%-97.2%"', chart_max: 5500000},
			{group_var: 'non_hispanic', title: '97.2% and Above', category_value:'"97.2% and Above"', chart_max: 5500000},
			{group_var: 'non_hispanictitle', title: 'Baseline Fatality Count % non hispanic by zipcode', category_value:'', chart_max: 5500000},
			{group_var: 'education', title: '15.6% and Below', category_value:'"15.6% and Below"', chart_max: 5500000},
			{group_var: 'education', title: '15.6%-22.0%', category_value:'"15.6%-22.0%"', chart_max: 5500000},
			{group_var: 'education', title: '22.0%-30.4%', category_value:'"22.0%-30.4%"', chart_max: 5500000},
			{group_var: 'education', title: '30.4%-43.8%', category_value:'"30.4%-43.8%"', chart_max: 5500000},
			{group_var: 'education', title: '43.8% and Above', category_value:'"43.8% and Above"', chart_max: 5500000},
			{group_var: 'educationtitle', title: 'Baseline Fatality Count % Bachelor degree and higher by zip code', category_value:'', chart_max: 5500000},
			{group_var: 'income', title: 'Less than $40,179', category_value:'"Less than $40,179"', chart_max: 5500000},
			{group_var: 'income', title: '$40,179 to $49,190', category_value:'"$40,179 to $49,190"', chart_max: 5500000},
			{group_var: 'income', title: '$49,190 to $60,224', category_value:'"$49,190 to $60,224"', chart_max: 5500000},
			{group_var: 'income', title: '$60,224 to $77,298', category_value:'"$60,224 to $77,298"', chart_max: 5500000},
			{group_var: 'income', title: 'Greater than $77,298', category_value:'"Greater than $77,298"', chart_max: 5500000},
			{group_var: 'incometitle', title: 'Baseline Fatality Count % Median Household Income by Zip Code', category_value:'', chart_max: 5500000}
		]
	});
	
	
	var subset_control = Ext.create('Ext.tab.Panel', {
		items:[{
			title: 'All'
		}],
		activeTab: 0,
		anchor: '100%',
		listeners: {
			/* beforetabchange: function (tabpanel, newtab, oldtab, eOpts) {
            Ext.suspendLayouts();
            Ext.getBody().mask("please wait..");
        },*/
			tabChange: function( tabpanel, newtab, oldtab, eOpts ){
				data_subsets.clearFilter();
				var target_record = data_subsets.findRecord('title', newtab.title);
				//Preset max above data values
				//utmost_fatality_race_chart.getAt(0).maximum=target_record.get('chart_max');
				//utmost_fatality_chart.get(0).maximum=target_record.get('chart_max');
				utmost_chart.axes.getAt(0).maximum = target_record.get('chart_max');
				utmost_injury_chart.axes.getAt(0).maximum = target_record.get('chart_max');
				data_subsets.filter('group_var', chart_subset_selector.getSubmitValue());
				Ext.suspendLayouts();
               		Ext.getBody().mask("please wait..");
					data_update(0);
					Ext.resumeLayouts(true);
                	Ext.getBody().unmask();
			/*	Ext.defer(function () {
                Ext.resumeLayouts(true);
                Ext.getBody().unmask();
            }, 1000)*/
			}
		}
	});
	
	var add_tab = function(record){
		subset_control.add({title: record.get('title')});
	}
	
	var generate_subset_tabs = function(group_var){
		subset_control.removeAll();
		//add "All" tab
		subset_control.add({title: 'All'});
		data_subsets.clearFilter();
		Ext.suspendLayouts();
        Ext.getBody().mask("please wait..");
		data_subsets.filter('group_var', new RegExp('^' + Ext.escapeRe(group_var) + '$'));
		data_subsets.each(add_tab);
		subset_control.setActiveTab(0);
		Ext.resumeLayouts(true);
        Ext.getBody().unmask();
	}
	var generate_chart_quintile_values = function(group_var)
	{    
		data_subsets.clearFilter();
		data_subsets.filter('group_var', new RegExp('^' + Ext.escapeRe(group_var) + '$'));
		 //return titleArray;
		data_subsets.each(add_title);
		// titleArray.add(record.get('title'));
	}
	var generate_chart_yaxis_title = function(group_var)
	{    
		data_subsets.clearFilter();
		if(group_var=="white"){group_var = "whitetitle"; }
		if(group_var=="black"){group_var = "blacktitle"; }
		if(group_var=="other"){group_var = "othertitle"; }
		if(group_var=="hispanic"){group_var = "hispanictitle"; }
		if(group_var=="non_hispanic"){group_var = "non_hispanictitle"; }
		if(group_var=="education"){group_var = "educationtitle"; }
		if(group_var=="income"){group_var = "incometitle"; }
		data_subsets.filter('group_var', new RegExp('^' + Ext.escapeRe(group_var) + '$'));
		 //return titleArray;
		data_subsets.each(add_ytitle);
		// titleArray.add(record.get('title'));
	}
	 add_ytitle = function(record){

		utmost_fatality_race_chart.axes.getAt(0).title=record.get('title');
		utmost_fatality_race_chart.redraw();
		//titleArray.push(record.get('title'));
		//titleArray.shift();


	//	print_r(titleArray);
		//subset_control.add({title: record.get('title')});
	}
    add_title = function(record){

		titleArray.push(record.get('title'));
		titleArray.shift();


	//	print_r(titleArray);
		//subset_control.add({title: record.get('title')});
	}
	
	
	var get_data_subset_cat = function(){
		var active = subset_control.getActiveTab();
		if (active.title == "All"){
			return 'all';
		} else {
			data_subsets.clearFilter();
			var target_record = data_subsets.findRecord('title', active.title);
			var res = target_record.get('category_value');
			data_subsets.filter('group_var', chart_subset_selector.getSubmitValue());
			return res.replace(/\"/g, '');
		}
	}