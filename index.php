<?php session_start(); ?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>DREAMHOME</title>
	<style type="text/css">
		<?php require_once "style-app.css"; ?>
	</style>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700,700i" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
</head>
<body>



<!-- ******************* -->
<!-- ******************* -->

<?php


require_once 'view-top-navigation.php';
require_once 'view-landing-page.php';
require_once 'view-signup-login.php';
require_once 'view-main-menu.php';
require_once 'view-properties.php';
require_once 'view-properties-map.php';
require_once "view-create-property.php";
require_once "view-users.php";
require_once "view-create-user.php";
require_once "view-single-property.php";

?>

<!-- ******************* -->
<!-- ******************* -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLVgS9RGsgxChTpjuz6OV8mw35EVoOoXA&libraries=places&callback=initMap"></script>
<!-- <script src="js-app.js"></script> -->
<script>
	<?php 

	require_once 'js-app.js';
	require_once 'js-maps-auto-complete.js'; 
	require_once 'js-maps-geocode-marker.js'; 
	require_once 'js-maps-geocoder.js'; 
	require_once 'js-maps-property-info-marker.js'; 
	require_once "js-create-properties.js"; 	
	


	?>
	
</script>


</body>
</html>