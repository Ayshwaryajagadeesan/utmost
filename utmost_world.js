//World Panel Code
	
	var outcome_vals = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"crash_count", "name":"Crash Count"}
		]
	});
	var chart_vars = Ext.create('Ext.data.Store', {
		fields: ['val', 'name'],
		data : [
			{"val":"crash_type", "name":"Crash Type"}
		]
	});
	
	var world_panel = Ext.create('Ext.panel.Panel', {
		title: 'World Configuration',
		bodyPadding: 5,
		region: 'north',
		layout: 'form',
		items:[{
			xtype: 'combobox',
			store: outcome_vals,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'val',
			fieldLabel: 'Outcome Value'	
			
		}, {
			xtype: 'combobox',
			store: chart_vars,
			queryMode: 'local',
			valueField: 'val',
			displayField: 'name',
			fieldLabel: 'Chart Variable'	
		}]
	});
	