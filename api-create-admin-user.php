<?php

	session_start();

	$sUserRole = $_SESSION['jUser']->role;

	// Check if the user role is not superadmin or admin
	if(!$sUserRole == 'superadmin') {
		// If the user role doesn't match, they don't have permission
		// Echo error and exit
		echo '	{	
					"status"	:"error",
					"message"	:"Action denied"
				}';
		exit;
	}
	// Create user
	
	// Get values from ajax POST

	$sFirstName 	= $_POST['firstname'];
	$sLastName 		= $_POST['lastname'];
	$sEmail 		= $_POST['email'];
	$sPassword 		= $_POST['password'];
	$sRole 			= $_POST['role'];


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


	// File path
	$sFileName = "data-users.txt";

	// Get file content. A string
	$sajUsers = file_get_contents( $sFileName );

	// Decode string to an array of json
	$ajUsers = json_decode( $sajUsers );

	if( !is_array($ajUsers ) ){
		// If it's not an array, set it to an empty array
		$ajUsers = [];
	}

	$iLastProperty 			= count($ajUsers)-1;
	$sId 					= $ajUsers[$iLastProperty]->id + 1;



	// Decode a json object jUser
	// Populate it with the data
	$jUser 				= json_decode('{}');
	$jUser->id 			= $sId;
	$jUser->firstname 	= $sFirstName;
	$jUser->lastname 	= $sLastName;
	$jUser->email 		= $sEmail;
	$jUser->password 	= $sPassword;
	$jUser->role 		= $sRole;

	

	// push it to the array
	array_push( $ajUsers , $jUser );

	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	echo 	'{
				"status"	:"ok",
				"message"	:"User created"
			}';

?>