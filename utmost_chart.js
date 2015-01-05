	Ext.namespace('UTMOST');

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
				yField: ['crash_count', 'crash_count_fake'],
				title: ['Baseline Crash Count', 'Adjusted Crash Count']
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
				yField: ['crash_count', 'crash_count_fake'],
				title: ['Baseline Crash Count', 'Adjusted Crash Count']
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
	