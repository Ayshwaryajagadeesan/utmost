	Ext.namespace('UTMOST');
	
	Ext.define('Subset_Group', {
		extend: 'Ext.data.Model',
		fields: [ 
				{name: 'group_var', type: 'string'}, 
				{name: 'title', type: 'string'}, 
				{name: 'category_value', type: 'string'}]
	});
	
	var data_subsets = Ext.create('Ext.data.Store', {
		model: 'Subset_Group',
		data : [
			{group_var: 'all', title: 'All', category_value:''},
			{group_var: 'alcohol_involvement', title: 'No Alcohol Involved', category_value:'0'},
			{group_var: 'alcohol_involvement', title: 'Alcohol Involved', category_value:'1'},
			{group_var: 'age', title: 'Age 0-14', category_value:'"0-14"'},
			{group_var: 'age', title: 'Age 15-29', category_value:'"15-29"'},
			{group_var: 'age', title: 'Age 30-44', category_value:'"30-44"'},
			{group_var: 'age', title: 'Age 45-59', category_value:'"45-59"'},
			{group_var: 'age', title: 'Age 60-74', category_value:'"60-74"'},
			{group_var: 'age', title: 'Age 75+', category_value:'"75+"'}			
		]
	});
	
	
	var subset_control = Ext.create('Ext.tab.Panel', {
		items:[{
			title: 'All'
		}],
		activeTab: 0,
		anchor: '100%',
		listeners: {
			tabChange: function( tabpanel, newtab, oldtab, eOpts ){
				data_update();
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
		data_subsets.filter('group_var', group_var);
		data_subsets.each(add_tab);
		subset_control.setActiveTab(0);
	}
	
	var get_data_subset_cat = function(){
		var active = subset_control.getActiveTab();
		if (active.title == "All"){
			return 'all';
		} else {
			var target_record = data_subsets.findRecord('title', active.title);
			return target_record.get('category_value');
		}
	}