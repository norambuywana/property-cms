<?php

// Begin session
session_start();

// Get the user role save in session
$sUserRole = $_SESSION['jUser']->role;

// Echo user role
echo '{"role":"'.$sUserRole.'"}';

?>