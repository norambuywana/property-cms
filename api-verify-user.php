<?php 

	$sKey = $_GET['key'];

	$sFileName = "data-users.txt";

	// Get file content. String
	$sajUsers = file_get_contents( $sFileName );

	// Convert to array of json
	$ajUsers = json_decode( $sajUsers );
	
	// If not array set to empty array
	if( !is_array($ajUsers ) ){
		echo '{
				"status"	:"error",
				"message"	:"Sorry, something went wrong"
			}';

		exit;
	}


	// Loop through the users array
	for ($i=0; $i <count($ajUsers) ; $i++) { 

		// Check if ids match
		if($sKey == $ajUsers[$i]->key){

			if( $ajUsers[$i]->verify ){

				echo '{
						"status"	:"error",
						"message"	:"Profile already verified"
					}';
				exit;

			} else {

				$ajUsers[$i]->verify = true;

				break;
			}

		}

	}

	// Convert object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// Save the data in the file
	file_put_contents( $sFileName , $sajUsers );


	echo '{
			"status"	:"ok",
			"message"	:"Profile Verified!"
		}';

 ?>