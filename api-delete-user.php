<?php 

	session_start();

	$sUserRole = $_SESSION['jUser']->role;

	// If the user is not an superadmin error and exit
	if(!$sUserRole == 'superadmin') {

		echo 	'{
					"status"	:"error",
					"message"	:"Access denied"
				}';
		exit;
	}
	
	// Get id of user to be deleted
	$sId = $_GET['id'];

	$sFileName = "data-users.txt";

	// Get file content. String
	$sajUsers = file_get_contents( $sFileName );

	// Decode to json array
	$ajUsers = json_decode( $sajUsers );

	// Not an array : error
	if( !is_array($ajUsers ) ){

		echo 	'{
					"status"	:"error",
					"message"	:"File corrupted, not able to delete"
				}';
		exit;
	}

	// Loop through array
	for ($i=0; $i <count($ajUsers) ; $i++) { 

		// Match ids
		if($sId == $ajUsers[$i]->id){

			// Splice the matched json and break
			array_splice($ajUsers, $i, 1);
			break;
		}
	}


	// Object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// Save the data in the file
	file_put_contents( $sFileName , $sajUsers );
	echo 	'{
				"status"	:"ok",
				"message"	:"User deleted"
			}';

 ?>