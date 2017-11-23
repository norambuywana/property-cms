<?php 

// Begin session
session_start();

// Get the email and password passed with ajax using post
$sEmail = $_POST['email'];
$sPassword = $_POST['password'];

// Path to the txt file
$sFileName = 'data-users.txt';

// Get the txt file content as a string
$sajUsers = file_get_contents($sFileName);

// Decode the string to an array of json objects
$ajUsers = json_decode($sajUsers);

// Check if it's an array
if( !is_array($ajUsers) ){

	$ajUsers = [];
	echo '	{
					"status"	:"error",
					"message"	:"File corrupted"
				}';
	exit;
}

// Declare a variable with an empty json object
$jUser = json_decode('{}');

// Loop through the array of json users
for($i=0; $i<count($ajUsers);$i++){

	// Check if the user email and password matches
	if ($ajUsers[$i]->email == $sEmail && $ajUsers[$i]->password == $sPassword){

		if(!$ajUsers[$i]->verify){

			echo '	{
						"status"	:"error",
						"message"	:"Profile not verified, please check your email"
					}';
			exit;
		}

		// If there's a match save the information from user in the empty json object
		$jUser->firstname = $ajUsers[$i]->firstname;
		$jUser->lastname = $ajUsers[$i]->lastname;
		$jUser->role = $ajUsers[$i]->role;

		// Save the user json in a session
		$_SESSION['jUser'] = $jUser;
		
		// Echo an ok, the name and userrole
		echo '	{
					"status":"ok",
					"firstname":"'.$_SESSION['jUser']->firstname.'",
					"lastname":"'.$_SESSION['jUser']->lastname.'",
					"role":"'.$_SESSION['jUser']->role.'"
				}';
		exit;
	}
}

// Else echo error
echo '	{
			"status":"error",
			"message":"No user found"
		}';

?>