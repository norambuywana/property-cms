<?php

	// Create user
	
	// Get values from ajax POST

	$sFirstName 	= $_POST['firstname'];
	$sLastName 		= $_POST['lastname'];
	$sEmail 		= $_POST['email'];
	$sPassword 		= $_POST['password'];
	$sKey 			= uniqid();


	// Check if there isn't a user role and if it's an empty array
	
	require_once 'api-validate.php';


	$bFirstName 	= fnIsTextValid($sFirstName, 2, 15);
	$bLastName 		= fnIsTextValid($sFirstName, 2, 15);
	$bEmail			= fnIsEmailValid($sEmail);
	$bPassword		= fnIsPasswordValid($sPassword);




	if( !($bFirstName && $bLastName && $bEmail && $bPassword) ) {
		echo 	'{
					"status"	:"error",
					"message"	:"Invalid inputs"
				}';
		exit;
	}


	require_once 'api-mail-verify-user.php';



	// File path
	$sFileName 	= "data-users.txt";

	// Get file content. A string
	$sajUsers 	= file_get_contents( $sFileName );

	// Decode string to an array of json
	$ajUsers 	= json_decode( $sajUsers );

	if( !is_array($ajUsers ) ){
		// If it's not an array, set it to an empty array
		$ajUsers = [];
	}

	if( empty($ajUsers) ) {
		// The set the role to superadmin
		$sRole 	= 'superadmin';
	} else {
		$sRole 	= 'normal';
	}

	$iLastProperty 				= count($ajUsers)-1;

	if($iLastProperty < 0){
		$sId 					= $ajUsers[$iLastProperty]->id + 1000;
	} else {
		$sId 					= $ajUsers[$iLastProperty]->id + 1;

	}


	// Decode a json object jUser
	// Populate it with the data
	$jUser 				= json_decode('{}');
	$jUser->id 			= $sId;
	$jUser->firstname 	= $sFirstName;
	$jUser->lastname 	= $sLastName;
	$jUser->email 		= $sEmail;
	$jUser->password 	= $sPassword;
	$jUser->role 		= $sRole;
	$jUser->key 		= $sKey;
	$jUser->verify 		= false;

	

	// push it to the array
	array_push( $ajUsers , $jUser );

	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	echo 	'{
				"status"	:"ok",
				"message"	:"User created. Please check your email"
			}';

?>