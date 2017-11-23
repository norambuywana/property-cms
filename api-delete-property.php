<?php 

	session_start();

	// Get the session user's user role
	$sUserRole = $_SESSION['jUser']->role;

	// If the user is not a superadmin or admin exit and error
	if(!$sUserRole == 'superadmin' || !$sUserRole == 'admin') {
		echo '	{
					"status"	:"error",
					"message"	:"Access denied"
				}';
		exit;
	}
	
	// Delete property


	$sId = $_GET['id'];
	$sImageDirPath = __dir__."/uploads/property/".$sId;

	// Txt file
	$sFileName = "data-properties.txt";

	// Get file content. String
	$sajProperties = file_get_contents( $sFileName );

	// Decode string to an array of json
	$ajProperties = json_decode( $sajProperties );

	// If it's not an array echo error and exit
	if( !is_array($ajProperties ) ){

		echo 	'{
					"status"	:"error",
					"message"	:"File corrupted, not able to delete"
				}';
		exit;
	}

	// loop through the array
	for ($i=0; $i <count($ajProperties) ; $i++) { 

		// Match the ids
		if($sId == $ajProperties[$i]->id){

			// Splice the json object from the array and break
			array_splice($ajProperties, $i, 1);
			break;
		}

	}

	// If there's a directory matching the property id


	if ( is_dir($sImageDirPath) ) {
		// Open it
	     $dir_handle = opendir($sImageDirPath);

	     // Read all the files

		 while($file = readdir($dir_handle)) {
		       if ($file != "." && $file != "..") {
		       		// if it a directory break the link
		            if (!is_dir($sImageDirPath."/".$file)) {

		                 unlink($sImageDirPath."/".$file);
		            } else {
		            	// Delete the files
		                 delete_directory($sImageDirPath.'/'.$file);
		            }

		       }
		 }
		 // close the directory
		 closedir($dir_handle);

		 // Remove/delete directory
		 rmdir($sImageDirPath);
	}



	// object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	
	// save the data in the file
	file_put_contents( $sFileName , $sajProperties );

	echo '	{
				"status"	:"ok",
				"message"	:"Property deleted"
			}';

 ?>