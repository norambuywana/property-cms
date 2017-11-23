<?php
	session_start();

	// Get session user's userrole
	$sUserRole = $_SESSION['jUser']->role;

	// If the user is not an admin og superadmin, error and exit
	if(!$sUserRole == 'superadmin' || !$sUserRole == 'admin') {
		echo 	'{
					"status"	:"error",
					"message"	:"Access denied"
				}';
		exit;
	}


	// Update property

	$sId 					= $_POST['id'];
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


	if( !($bShortAddress && $bPrice ) ) {

		echo 	'{
					"status"	:"error",
					"message"	:"Invalid inputs "'.$sStreetName.'
				}';
		exit;
	}

	// Path to txt file
	$sFileName = "data-properties.txt";

	// Get file content. String
	$sajProperties = file_get_contents( $sFileName );

	// Decode string to array of json objects
	$ajProperties = json_decode( $sajProperties );

	// If not array set to empty array
	if( !is_array($ajProperties ) ){
		$ajProperties = [];
	}

	$sPath = __dir__."/uploads/property/".$sId;
	// Edit the object

	// Loop through array
	for ($i=0; $i <count($ajProperties) ; $i++) { 

		// Check if ids match
		if($sId == $ajProperties[$i]->id){


			// $jFullAddress 			= json_decode('{}');
			// $jFullAddress->number 	= $sStreetNumber;
			// $jFullAddress->street 	= $sStreetName;
			// $jFullAddress->city 	= $sCity;
			// $jFullAddress->state 	= $sState;
			// $jFullAddress->postal 	= $sPostalCode;
			// $jFullAddress->country 	= $sCountry;
			// $jFullAddress->latlng 	= $sLatLng;
			// If ids match update the property and break
			$ajProperties[$i]->address 		= $sShortAddress;
			$ajProperties[$i]->price 		= $iPrice;
			$ajProperties[$i]->deposit 		= $iDeposit;
			$ajProperties[$i]->type 		= $sType;

			$ajProperties[$i]->full_address	= $jFullAddress;

			fnDeleteImages( $sPath );
			

			break;
		}
	}


	function fnDeleteImages( $sPath ){

		if(is_dir($sPath)){ 
				


			// // Loop through the passed files
			// // Moved them to the created directory

		     
			// closedir($aImagesDirectory);
			$aImagesToSave = [];

			for($i=0; $i<count($_FILES); $i++) {

				$sImageName = $_FILES['image-'.$i]['name'];
				$sFileNameToMatch = $_POST['image-edit-'.$i];

				if( !$sImageName ) {

					if ( !strrpos($sFileNameToMatch, '/') ) {
						$sImageName = $sFileNameToMatch;

					} else{

						$sImageName = substr($sFileNameToMatch, strrpos($sFileNameToMatch, '/') + 1);
					
					}

				}



				if( fnFileNameEndsWith( $sFileNameToMatch, $sImageName) ){
					array_push($aImagesToSave, $sImageName);
				}



			}


			// Open it
		    $aDirectory = opendir($sPath);



		     // Read all the files

			while($sImage = readdir($aDirectory)) {

				if ($sImage != "." && $sImage != ".." && $sImage != ".DS_Store") {

				   	if( !fnCheckIfImageNamesMatch( $sImage, $aImagesToSave ) ){


				   		if (!is_dir($sPath."/".$sImage)){

						    unlink($sPath."/".$sImage);
						} else{
							// Delete the sImage
						    delete_directory($sPath.'/'.$sImage);
						}
				   	}

				}
			}
			
			// close the directory
			closedir($aDirectory);

		}

		// If there's not a directory with the path, make it

		if(!is_dir($sPath)){ 

			mkdir($sPath);
				
		}

		fnUpdateImages( $sPath );

	}


	function fnCheckIfImageNamesMatch( $sImage, $aImagesToSave){

		for($i=0; $i<count($aImagesToSave); $i++){

			if ( $sImage == $aImagesToSave[$i] || fnFileNameEndsWith( $sImage, $aImagesToSave[$i] ) ){
				return true;
			}

		}
	}


	function fnFileNameEndsWith( $sFileNameToMatch, $sInputFileName ){

	    $iLengthOfStr = strlen($sInputFileName);

	    return (substr($sFileNameToMatch, -$iLengthOfStr) === $sInputFileName);
	}



	function fnUpdateImages( $sPath ){

	
			for($i=0 ; $i<count($_FILES) ; $i++){

				if(!$_FILES['image-'.$i]['size'] == 0){

					if( !file_exists( $sPath."/".$_FILES['image-'.$i]['name']) ) {
						
						move_uploaded_file( $_FILES['image-'.$i]['tmp_name'] ,$sPath."/".$_FILES['image-'.$i]['name'] );

					}
				}
			}

	}




	// Covert object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// Save the data in the file
	file_put_contents( $sFileName , $sajProperties );

	echo 	'{
				"status"	:"ok",
				"message"	:"Property updated"
			}';
?>