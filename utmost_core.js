//UI core

var utmost_references = "<h3>References</h3><br/><br/>Abele, J., Kerlen, C., Krueger, S., Baum, H., Geisler, T., Grawenhoff, S., Schneider, J., & Schulz, W.H. (2005). Exploratory study on the potential socio-economic impact of the introduction of intelligent safety systems in road vehicles. Tetlow, Germany: VDI/VDE Innovation.<br/><br/>Bayly, M., Fildes, B., Regan, M., and Young, K. (2007) Review of crash effectiveness of Intelligent Transport Systems, TRACE.<br/><br/>CRTAS (2010) China Road Traffic Accidents Statistics. Traffic Administration Bureau of China State Security Ministry, Beijing, China.<br/><br/>eSafety Forum (2001). Attempt to assess the impact of Telematics systems on the improvement of the accident situation.<br/><br/>eSafety Forum. (2005). Final report and recommendations of the implementation road map working group.<br/><br/>FHWA. (1998). The future of transportation starts here. Intelligent Transport Systems. Washington DC: U.S. Department of Transportation, Federal Highway Administration. <br/><br/>Kanianthra, J.N., & Mertig, A.A. (1997). Opportunities for collision countermeasures using intelligent technologies. Washington DC: National Highway Traffic Safety Administration. <br/><br/>Lee, J.D., McGehee, D.V., Brown, T.L., & Reyes, M.L. (2002). Collision warning timing, driver distraction, and driver response to imminent rear-end collisions in a high-fidelity driving  simulator. <i>Human Factors</i> 44:314-335.<br/><br/>McKeever, B.B. (1998). Working paper: Estimating the potential safety benefits of intelligent transport systems.  Washington DC: Mitretek Systems.<br/><br/>NHTSA (2001). Status of NHTSA�s rear-end crash prevention programme. National Highway Traffic Safety Administration. Available at: <a>http://www-nrd.nhtsa.dot.gov/pdf/nrd-01/esv/esv19/05-0282-O.pdf</a>. Accessed: 23/11/2006.<br/><br/>Regan, M.A., Mitsopoulos, E., Haworth, N., & Young, K. (2002). Acceptability of in-vehicle Intelligent Transport Systems to Victorian car drivers. Clayton, Australia: Monash University Accident Research Centre.<br/><br/>Regan, M.A., Oxley, J.A., Godley, S.T., & Tingvall, C. (2001). Intelligent Transport Systems: Safety and human factors issues. Clayton, Australia: Monash University Accident Research Centre.<br/><br/>Sugimoto, Y., & Sauer, C. (2005). Effectiveness estimation method for advanced driver assistance system and its application to collision mitigation brake system. <i>Proceedings of the 19th International Technical Conference on the Enhanced Safety of Vehicles.</i> Washington, DC.";
var utmost_instructions = "Welcome to UTMOST! <br/> <br/>UTMOST is a tool that demonstrates the impact of various crash avoidance technologies on the population of US crashes.  <br/> <br/> The population data are drawn from the National Automotive Sampling System General Estimate System (NASS GES) and Fatality data are drawn from Fatality Analysis Reporting System(FARS) , a representative sample of US crashes. The data includes crash years from 2011-2015.  The overall crash population can be seen in the <b>Total Change (2)</b> chart  and broken down by category in the main <b>Chart (4)</b>. Users can change the chart categories by adjusting the <b>World Configuration (1)</b>.  <br/> <img src = 'utmost_ui_guide.png' /><br/>Countermeasures can be applied to the data by selcting them from the <b>Countermeasure (3)</b> panel.  Users are then able to set a chosen <b>Effectiveness</b> of each system, as well as the degree of <b>Fleet Penetration</b> that system has within the greater population. The <b>Effectiveness</b> defaults to values expected in currently published research referenced in the description of the countermeasure. Once the countermeasure is added, the <b>Adjusted Crash Count</b> will be modified to reflect the impact of that countermeasure on the crash population given the chosen settings. "
var utmost_ui = {};
var utmost_loadmask = {};

function utmost_core(returning_user){

	//Ext.suspendLayouts();


	
	
	Ext.tip.QuickTipManager.init();
	
	
	//Core UI
	utmost_ui = Ext.create('Ext.container.Viewport', {
		layout: 'fit',
		renderTo: document.body,
		items: [{
			xtype: 'tabpanel',
			height: "100%",
			autoScroll: true,
			activeTab: returning_user,
			items: [{
				title: 'Instructions',
				tabConfig: {
					title: 'Instructions',
					tooltip: 'Instructions'
				},
				html: utmost_instructions
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
					width: "22%",
					layout: {
						type: 'border',
						align: 'stretch'
					},
					items:[world_panel, utmost_totals_panel, countermeasure_panel]
				},{
					xtype: 'panel',
					title: 'Chart',
					region: 'center',
					layout: 'anchor',
					items: [ subset_control, 
					{
						xtype: 'panel',
						bodyPadding: 50,
						anchor: '100% 100%',
						layout: 'fit',
						items: [utmost_chart, utmost_injury_chart, utmost_fatality_chart,utmost_fatality_race_chart]
					}]
				}]
			}, {
				title: 'Reference',
				tabConfig: {
					title: 'References',
					tooltip: 'UTMOST References and Documentation'
				},
				html: utmost_references
			}]
		}]
	});
	
	
	utmost_loadmask = new Ext.LoadMask({
		msg: 'Calculating...',
		target: utmost_ui
	});
	
	Ext.suspendLayouts();
               		Ext.getBody().mask("please wait..");
					data_update(0);
					Ext.resumeLayouts(true);
                	Ext.getBody().unmask();
	
	//Ext.resumeLayouts(true);
}
	
