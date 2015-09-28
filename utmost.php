<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<script type "text/javascript" src="lib/ext-all-debug.js"></script>
		<script type="text/javascript" src="utmost_model.js"></script>
		<script type="text/javascript" src="utmost_chart.js"></script>
		<script type="text/javascript" src="utmost_countermeasure.js"></script>
		<script type="text/javascript" src="utmost_world.js"></script>
		<script type="text/javascript" src="utmost_core.js"></script>
		<link rel="stylesheet" type="text/css" href="lib/resources/css/ext-all.css">

	</head>
	<body>
		<script type="text/javascript">
			Ext.onReady(function(){
				utmost_core(1);
				setTimeout(data_update(), 100);
			});
		</script>
	
	</body>
</html>