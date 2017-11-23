<?php 

function fnIsTextValid( $sText, $iMin, $iMax  ){

	if(  strlen($sText) < $iMin || strlen($sText) > $iMax ){
		return false;
	}

	return true;
}

function fnIsNumberValid( $iNumber, $iMin, $iMax  ){

	if(  $iNumber < $iMin || $iNumber > $iMax || !is_numeric($iNumber) ){
		return false;
	}

	return true;
}


function fnIsEmailValid( $sEmail ) {

	return filter_var(  $sEmail , FILTER_VALIDATE_EMAIL) && preg_match('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $sEmail);
}

function fnIsPasswordValid( $sPassword ) {
	return preg_match( '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/', $sPassword);
}

 ?>