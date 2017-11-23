<?php
	session_start();

	// Get session user's userrole
	$sUserRole = $_SESSION['jUser']->role;

	// If the user is not a superadmin echo error and exit
	if(!$sUserRole == 'superadmin') {
		echo 	'{
					"status"	:"error",
					"message"	:"Access denied"
				}';
		exit;
	}

	// Update user

	// Get the data 
	$sId = $_POST['id'];
	$sUserName = $_POST['username'];
	$sFirstName = $_POST['firstname'];
	$sLastName = $_POST['lastname'];
	$sEmail = $_POST['email'];
	$sPassword = $_POST['password'];
	$sUserRole = $_POST['role'];

	// Txt file
	$sFileName = "data-users.txt";

	// Get file content. String
	$sajUsers = file_get_contents( $sFileName );

	// Convert to array of json
	$ajUsers = json_decode( $sajUsers );
	
	// If not array set to empty array
	if( !is_array($ajUsers ) ){
		$ajUsers = [];
	}

	// Edit the object

	// Loop through the users array
	for ($i=0; $i <count($ajUsers) ; $i++) { 

		// Check if ids match
		if($sId == $ajUsers[$i]->id){

			// Update json user and break
			$ajUsers[$i]->username 	= $sUserName;
			$ajUsers[$i]->firstname = $sFirstName;
			$ajUsers[$i]->lastname 	= $sLastName; 
			$ajUsers[$i]->email 	= $sEmail; 
			$ajUsers[$i]->password 	= $sPassword; 
			$ajUsers[$i]->role 		= $sUserRole;

			break;
		}
	}

	// Convert object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// Save the data in the file
	file_put_contents( $sFileName , $sajUsers );
	echo 	'{	
				"status"	:"ok",
				"message"	:"User updated"
			}';

?>