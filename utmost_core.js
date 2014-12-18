//UI core

function utmost_core(returning_user){

	//Ext.suspendLayouts();


	//var returning_user = 1;
	
	
	Ext.tip.QuickTipManager.init();
	
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
						html: "<p>Effectiveness: "+form_values['cm_effect']+"%</p>" + "<p>Fleet Penetration: "+form_values['cm_pen']+"%</p>"
					}));
				}
			}
		],
		hidden: true
	});
	
	var active_countermeasure_panel = Ext.create('Ext.panel.Panel', {
        title: 'Active Countermeasures',
        bodyPadding: 10,
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
	
	
	
	
	// Chart Code
	Ext.define('Crash_Type_Count', {
		extend: 'Ext.data.Model',
		fields: ['crash_count', 'crash_type', 'crash_count_fake']
	});
	
	
	var utmost_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count',
		data : [
			{crash_count: "100", crash_type: "Rear End", crash_count_fake: "75"},
			{crash_count: "50", crash_type: "Frontal", crash_count_fake: "15"},
			{crash_count: "45", crash_type: "Rollover", crash_count_fake: "25"},
			{crash_count: "37", crash_type: "Side Impact", crash_count_fake: "13"},
			{crash_count: "64", crash_type: "Pedestrian", crash_count_fake: "57"}
		]
	});
	
	var utmost_chart = Ext.create('Ext.chart.Chart', {
		store: utmost_chart_values,
		animate: true,
		theme: 'Blue',		
		legend: {
			position: 'top'
		},
		axes: [
			{
				title: 'Crash Count',
				type: 'Numeric',
				position: 'left',
				grid: true,
				fields: ['crash_count'],
				minimum: 0,
				maximum: 150
			}, {
				title: 'Crash Type',
				type: 'Category',
				position: 'bottom',
				fields: ['crash_type']
			}
		],
		series: [
			{
				type: 'column',
				axis: 'left',
				highlight: true,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('crash_type') + ': ' + storeItem.get('crash_count'));
				  }
				},
				style: {
                    align: "left"
                },
				label: {
				  display: 'insideEnd',
				  'text-anchor': 'middle',
					field: 'data',
					renderer: Ext.util.Format.numberRenderer('0'),
					orientation: 'vertical',
					color: '#333'
				},
				xField: 'crash_type',
				yField: ['crash_count', 'crash_count_fake']
			}]
	});
	//totals chart code
	var utmost__totals_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count',
		data : [
			{crash_count: "150", crash_type: "Total", crash_count_fake: "115"}
		]
	});
	
	var utmost_totals_chart = Ext.create('Ext.chart.Chart', {
		store: utmost__totals_chart_values,
		animate: true,
		theme: 'Green',		
		legend: {
			position: 'top'
		},
		axes: [
			{
				type: 'Numeric',
				position: 'bottom',
				grid: true,
				fields: ['crash_count'],
				minimum: 0,
				maximum: 200
			}, {
				type: 'Category',
				position: 'left',
				fields: ['crash_type']
			}
		],
		series: [
			{
				type: 'bar',
				axis: 'left',
				highlight: true,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('crash_type') + ': ' + storeItem.get('crash_count'));
				  }
				},
				style: {
                    align: "left"
                },
				label: {
				  display: 'insideEnd',
				  'text-anchor': 'middle',
					field: 'data',
					renderer: Ext.util.Format.numberRenderer('0'),
					orientation: 'vertical',
					color: '#333'
				},
				xField: 'crash_type',
				yField: ['crash_count', 'crash_count_fake']
			}]
	});
	var utmost_totals_panel = Ext.create('Ext.panel.Panel', {
		title: 'Total Change',
		bodyPadding: 5,
		minHeight: 150,
		region: 'north',
		layout: 'fit',
		items:[utmost_totals_chart]
	});
	
	
	//Core
	Ext.create('Ext.container.Viewport', {
		layout: 'fit',
		renderTo: document.body,
		items: [{
			xtype: 'tabpanel',
			height: "100%",
			autoScroll: true,
			activeTab: returning_user,
			items: [{
				title: 'Instructions'
			}, {
				title: 'Data Tool',
				tabConfig: {
					title: 'Data Tool',
					tooltip: 'Primary Data Tool'
				},
				xtype: 'panel',
				layout: {
					type: 'border',
					align: 'stretch'
				},
				items: [{
					xtype: 'panel',
					title: 'Data Setup',
					region: 'west',
					collapsible: true,
					width: "20%",
					layout: {
						type: 'border',
						align: 'stretch'
					},
					items:[world_panel, utmost_totals_panel, countermeasure_panel]
				},{
					xtype: 'panel',
					title: 'Chart',
					region: 'center',
					layout: 'fit',
					bodyPadding: 20,
					items: [utmost_chart]
				}]
			}, {
				title: 'Reference',
				tabConfig: {
					title: 'References',
					tooltip: 'UTMOST References and Documentation'
				}
			}]
		}]
	});
	
	
	//Ext.resumeLayouts(true);
}
	
