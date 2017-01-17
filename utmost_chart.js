	Ext.namespace('UTMOST');

// Chart Code
	
	var utmost_chart = Ext.create('Ext.chart.Chart', {
		store: utmost_chart_values,
		animate: true,
		theme: 'Purple',
		legend: {
			position: 'top'
		},
		axes: [
			{
				title: 'Person Count',
				type: 'Numeric',
				position: 'left',
				grid: true,
				fields: ['person_count'],
				minimum: 0,
				maximum: 5500000
			}, {
				title: 'Type',
				type: 'Category',
				position: 'bottom',
				fields: ['crash_type'],
				to: 20,
				label: {
					rotate: {
						degrees: 270
					}
				}
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
				  height: 45,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('crash_type') + ' <br/>Baseline: ' + storeItem.get('person_count')+ '  <br/>Adjusted: ' +storeItem.get('person_count_adj'));
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
				groupGutter: 0,
				yField: ['person_count', 'person_count_adj'],
				title: ['Baseline Person Count', 'Adjusted Person Count']
			}]
	});
	
	var utmost_injury_chart = Ext.create('Ext.chart.Chart', {
		store: utmost_injury_chart_values,
		animate: true,
		hidden: true,
		theme: 'Yellow',
		legend: {
			position: 'top'
		},
		axes: [
			{
				title: 'Injury Count',
				type: 'Numeric',
				position: 'left',
				grid: true,
				fields: ['injury_count'],
				minimum: 0,
				maximum: 5500000
			}, {
				title: 'Type',
				type: 'Category',
				position: 'bottom',
				fields: ['crash_type'],
				to: 20,
				label: {
					rotate: {
						degrees: 270
					}
				}
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
				  height: 45,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('crash_type') + ' <br/>Baseline: ' + storeItem.get('injury_count')+ '  <br/>Adjusted: ' +storeItem.get('injury_count_adj'));
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
				groupGutter: 0,
				yField: ['injury_count', 'injury_count_adj'],
				title: ['Baseline Injury Count', 'Adjusted Injury Count']
			}]
	});
	
	
		//totals chart code
	var utmost_totals_chart_values = Ext.create('Ext.data.Store', {
		model: 'Crash_Type_Count',
		data : [
			{person_count: 12000000, crash_type: "Total", person_count_adj: 12000000}
		]
	});
	
	var utmost_totals_chart = Ext.create('Ext.chart.Chart', {
		store: utmost_totals_chart_values,
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
				fields: ['person_count'],
				minimum: 0,
				maximum: 15000000
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
				  height: 45,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('crash_type') + ' <br/>Baseline: ' + storeItem.get('person_count')+ '  <br/>Adjusted: ' +storeItem.get('person_count_adj'));
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
				yField: ['person_count', 'person_count_adj'],
				title: ['Baseline', 'Adjusted']
			}]
	});
	var utmost_totals_panel = Ext.create('Ext.panel.Panel', {
		title: 'Total Change',
		bodyPadding: 5,
		minHeight: 200,
		region: 'north',
		layout: 'fit',
		items:[utmost_totals_chart]
	});
	
