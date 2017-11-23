<?php
	// Define the path for the file
	$sFileName = "data-users.txt";

	// Get the file content as a string that looks like an array of json
	$sajUsers = file_get_contents( $sFileName );

	// Decode the string to an array of json
	$ajUsers = json_decode( $sajUsers );

	// Check if the array of json is not an array and if it is empty
	if( !is_array($ajUsers ) || empty($ajUsers) ){

		// If it's empty or not an array we echo an error
		echo 	'{	
					"status"	:"error",
					"message"	:"Please create superadmin"
				}';
		exit;
	}

	// Else there is an array containing at least one user
	echo 	'{
				"status"	:"ok",
				"message"	:"Users found"
			}';
?>