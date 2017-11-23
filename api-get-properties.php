<?php

	// Txt file
	$sFileName = "data-properties.txt";

	// File content. String
	$sajProperties = file_get_contents( $sFileName );

	// Decode string to array of json
	$ajProperties = json_decode( $sajProperties );

	// Not array : error and break
	if( !is_array($ajProperties ) ){
		echo '	{
					"status"	:"error", 
					"message"	:"File corrupted. Not able to retrieve properties"
				}';
		exit;
	}

	for ($i=0; $i <count($ajProperties) ; $i++) { 

		// Check if ids match
		$sId = $ajProperties[$i]->id;

		$sImageDir	= __dir__."/uploads/property/".$sId;

		$aImages	= array();

		// If there's a image folder with the property id
		
		if(is_dir($sImageDir)){

			if($aImageDir = opendir($sImageDir)){

		        while(($file = readdir($aImageDir)) != false){

		            if($file == "." or $file == ".." or $file == '.DS_Store' or $file == 'Thumbs.db'){

		            } else {
		            	
		                $aImages[] = $sId."/".$file; // Add the file to the array
		            }
		        }
		    }

	    	$ajProperties[$i]->images = $aImages;
		}

		
	}


	

	// Encode array to be echoed
	$sajProperties = json_encode( $ajProperties , JSON_UNESCAPED_UNICODE );

	// Echo string
	echo $sajProperties;

?>