<?php

	// Begin session
	session_start();


	// Get the user role from the user saved in session
	$sUserRole = $_SESSION['jUser']->role;

	// Check if the user role is not superadmin or admin
	if(!$sUserRole == 'superadmin' || !$sUserRole == 'admin') {
		// If the user role doesn't match, they don't have permission
		// Echo error and exit
		echo '	{
					"status"	:"error",
					"message"	:"Access denied"
				}';
		exit;
	}



	if(count($_FILES) < 3 ){

		echo '	{
					"status"	:"error",
					"message"	:"To few images added"
				}';
		exit;
	}

	
	/************** CREATE THE PROPERTY ****************/ 


	// Path to txt file
	$sFileName = "data-properties.txt";

	// Get file content. A string
	$sajProperties = file_get_contents( $sFileName );

	// Decode the string to an array of json
	$ajProperties = json_decode( $sajProperties );

	if( !is_array($ajProperties ) ){
		// If it's not an array, set it to an empty array
		$ajProperties = [];
	}


	$iLastProperty 			= count($ajProperties)-1;
	$sId 					= $ajProperties[$iLastProperty]->id + 1;

	if($sId < 1000){
		$sId = 1001;
	}
	// Get the values from the post
	$sShortAddress 			= $_POST['address'];
	$iPrice 				= $_POST['price'];
	$iDeposit 				= $_POST['deposit'];
	$sType 					= $_POST['type'];
	$sStreetNumber			= $_POST['street_number'];
	$sStreetName			= $_POST['street_name'];
	$sCity					= $_POST['city'];
	$sState					= $_POST['state'];
	$sPostalCode			= $_POST['postal_code'];
	$sCountry				= $_POST['country'];
	$sLatLng				= $_POST['latlng'];

	require_once 'api-validate.php';

	// Saving the return from the function in as a boolean
	// Passing the value and the limitation parameters
	
	$bShortAddress 	= fnIsTextValid($sShortAddress, 6, 100);
	$bPrice 		= fnIsNumberValid($iPrice, 0, 9223372036854775807);
	$bDeposit		= fnIsNumberValid($iDeposit, 0, 9223372036854775807);
	$bStreetNumber	= fnIsTextValid($sStreetNumber, 0, 1000);
	$bStreetName	= fnIsTextValid($sStreetName, 2, 50);
	$bCity			= fnIsTextValid($sCity, 2, 40);
	$bPostalCode	= fnIsTextValid($sPostalCode, 2, 8);


	// Checking if any of the booleans are false

	if( !($bShortAddress && $bPrice && $bDeposit && $bStreetNumber && $bStreetName && $bCity && $bPostalCode) ) {
		echo 	'{
					"status"	:"error",
					"message"	:"Invalid inputs"
				}';
		exit;
	}





	/************** CREATE THE PROPERTY ****************/ 




	$jFullAddress 			= json_decode('{}');
	$jFullAddress->number 	= $sStreetNumber;
	$jFullAddress->street 	= $sStreetName;
	$jFullAddress->city 	= $sCity;
	$jFullAddress->state 	= $sState;
	$jFullAddress->postal 	= $sPostalCode;
	$jFullAddress->country 	= $sCountry;
	$jFullAddress->latlng 	= $sLatLng;



	$sPath = "uploads/property/".$sId;


	// If there's not a directory with the path, make it

	if(!is_dir($sPath)){ 
		mkdir($sPath);
	}

	// Loop through the passed files
	// Moved them to the created directory

	
	for($i=0 ; $i<count($_FILES) ; $i++){

		// $aPathParts = pathinfo($_FILES['image-'.$i]['name']);
		// $file = '/property-image-'.$i. '.'. $aPathParts['extension'];

		// move_uploaded_file( $_FILES['image-'.$i]['tmp_name'] ,__dir__."/".$sPath."/".$file );
		move_uploaded_file( $_FILES['image-'.$i]['tmp_name'] ,__dir__."/".$sPath."/".$_FILES['image-'.$i]['name'] );
	}



	// Json object
	$jProperty 				= json_decode('{}');
	$jProperty->id 			= $sId;
	$jProperty->address 	= $sShortAddress;
	$jProperty->price 		= $iPrice;
	$jProperty->deposit 	= $iDeposit;
	$jProperty->type 		= $sType;
	$jProperty->full_address= $jFullAddress;

	// push it to the array
	array_push( $ajProperties , $jProperty );

	// object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajProperties );

	$jProperty->boolean = true;

	$_SESSION['jProperty'] = $jProperty;

	
	echo '	{
				"status"	:"ok",
				"message"	:"Property added"
			}';

?>