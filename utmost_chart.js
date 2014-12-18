	// Chart Code
	Ext.define('Crash_Type_Count', {
		extend: 'Ext.data.Model',
		fields: ['crash_count', 'crash_type']
	});
	
	
	var utmost_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count',
		data : [
			{crash_count: "100", crash_type: "Rear End"},
			{crash_count: "50", crash_type: "Frontal"},
			{crash_count: "45", crash_type: "Rollover"},
			{crash_count: "37", crash_type: "Side Impact"},
			{crash_count: "64", crash_type: "Pedestrian"},
		]
	});
	
	var utmost_chart = Ext.create('Ext.chart.Chart', {
		store: utmost_chart_values,
		animate: true,
		theme: 'Blue',
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
				label: {
				  display: 'insideEnd',
				  'text-anchor': 'middle',
					field: 'data',
					renderer: Ext.util.Format.numberRenderer('0'),
					orientation: 'vertical',
					color: '#333'
				},
				xField: 'crash_type',
				yField: 'crash_count'
			}
		]
	});