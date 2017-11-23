<?php 
	session_start();

	session_destroy();

	echo '	{
				"status"	:"ok",
				"message"	:"Logout"
			}';
 ?>