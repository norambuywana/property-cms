<?php 
	$sMailFrom 		= "From:";
	$sMailTo 		= $sEmail;
	$sSubject 		= "Verify your DreamHome profile";
	$sRoot 			= (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
	$sLink			= $sRoot."/api-verify-user.php?key=".$sKey;
	// $sLink			= __dir__."/api-verify-user.php?key=".$sKey;

	$sMessage 	= '
					<html>
					<head>
						<title>'.$sSubject.'</title>
					</head>
					<body>
						<h2>Welcome to DreamHome Reak Estate</h2>
						<p>Please follow the link to verify your profile</p>
						<a href="'.$sLink.'" target="blank">VERIFY</a>
					</body>
					</html>
				';


	// Always set content-type when sending HTML email
	$sHeaders = "MIME-Version: 1.0" . "\r\n";
	$sHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More sHeaders
	$sHeaders .= $sMailFrom. "\r\n";

	mail($sMailTo, $sSubject, $sMessage, $sHeaders);




 ?>