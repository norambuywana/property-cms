<?php 

	session_start();
	
	header('Content-Type: text/event-stream');
	header('Cache-Control: no-cache');
	header("Connection: keep-alive");


	if ( $_SESSION['jProperty']->boolean ){

		fnGetPropertyImages();
	}

	function fnGetPropertyImages() {

		$sId 		= $_SESSION['jProperty']->id;
		$sImageDir	= __dir__."/uploads/property/".$sId;
		$aImages	= array();

		if(is_dir($sImageDir)){

			if($aImageDir = opendir($sImageDir)){
		        while(($file = readdir($aImageDir)) != false){

		            if($file == "." or $file == ".."){

		            } else {
		                $aImages[] = $sId."/".$file; // Add the file to the array
		            }
		        }
		    }

	    	$_SESSION['jProperty']->images = $aImages;
		}

		$data = json_encode($_SESSION['jProperty']);
		sendMessage($data);
		unset($_SESSION['jProperty']);
	}

	function sendMessage($data) {
	    // echo "id: $id\n";
	    echo "data: $data\n\n";
	    ob_flush();
	    flush();
	}

 ?>