<?php

	session_start();

	// Get session user's role
	$sUserRole = $_SESSION['jUser']->role;

	// If not superadmin error and break
	if(!$sUserRole == 'superadmin') {
		echo 	'{
					"status"	:"error",
					"message"	:"Access denied"
				}';
		exit;
	}

	// File to access
	$sFileName 	= "data-users.txt";

	// Get file content. String
	$sajUsers 	= file_get_contents( $sFileName );

	// Decode string to array of json objects
	$ajUsers 	= json_decode( $sajUsers );

	// If not array error and exit
	if( !is_array($ajUsers ) ){
		echo 	'{
					"status"	:"error", 
					"message"	:"could not work with the database"
				}';
		exit;
	}

	// Encode to string
	$sajUsers = json_encode( $ajUsers , JSON_UNESCAPED_UNICODE );

	// Echo encoded json
	echo $sajUsers;


?>