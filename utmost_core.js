//UI core



function utmost_core(returning_user){

	//Ext.suspendLayouts();


	//var returning_user = 1;
	
	
	Ext.tip.QuickTipManager.init();
	
	data_update();
	
	//Core UI
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
	
