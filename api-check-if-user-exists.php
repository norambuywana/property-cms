<?php
	
	// We extract the email from the get and save it in a variable
	$sNewUserEmail = $_GET['email'];

	// Save the pathe to the file
	$sFileName = "data-users.txt";
	// Get the file content as a string
	$sajUsers = file_get_contents( $sFileName );
	// Decode the string to an array of json
	$ajUsers = json_decode( $sajUsers );
	
	if( !is_array($ajUsers) ){
		// If the decoded string is not an array echo an error and exit
		echo '	{
					"status"	:"error",
					"message"	:"File corrupted"
				}';
		exit;
	}


	// Loop through the array of json users
	for($i=0; $i< count($ajUsers); $i++) {
		// Check if the email passed through ajax matches the user email from the txt file
		if($sNewUserEmail == $ajUsers[$i]->email){
			// If there's a match echo an error and exit
			echo '	{
						"status"	:"error",
						"message"	:"User already exists"
					}';
			exit;
		}
	}
	
	// Else echo status ok
	echo '	{	
				"status"	:"ok",
				"message"	:"No user found"
			}';

?>