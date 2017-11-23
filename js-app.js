
// On pageload run the function CheckForUsers
fnCheckForUsers();


// Set global variables
var oPropertySoundAlert = new Audio('uploads/sound/new_property_sound.mp3');
var iElementNumber 	= 0;
var agMap;
var agSinglePropertyMap;
var iSlideIndex = 1;

// Set up server sent events

if(typeof(EventSource) !== "undefined") {

    // Define the url for the eventsource

    var source = new EventSource("api-sse-new-property.php");

    // Let's do something when we get a message
	source.onmessage = function(event) {

		// Convert the passed string to json
		var jProperty = jQuery.parseJSON(event.data);

		// Pass the address to the notifation
    	fnNotifyNewPropertyAdded(jProperty.address);
    	// Pass property to append
    	fnAppendProperty( jProperty );
	};

} else {

    console.log("Sorry! No server-sent events support..");
}





function fnAppendProperty( jProperty ){

	fnCheckUserRole( function( sUserRole ) {

		if(sUserRole == "superadmin" || sUserRole == "admin") {
			var sPropertyBluePrint = fnCreateAdminPropertyBlueprint();

		} else {
			var sPropertyBluePrint = fnCreateNormalPropertyBlueprint();
		}


		var sMapAddress 	= jProperty.address;
		var sLatlng			= jProperty.full_address.latlng;
		var sTempProperty 	= sPropertyBluePrint;
		var sId 			= jProperty.id;
		sTempProperty = sTempProperty.replace("{{id}}", jProperty.id);
		sTempProperty = sTempProperty.replace("{{address}}", jProperty.address);
		sTempProperty = sTempProperty.replace("{{id}}", jProperty.id);
		sTempProperty = sTempProperty.replace("{{id}}", jProperty.id);
		sTempProperty = sTempProperty.replace("{{type-icon}}", jProperty.type);
		sTempProperty = sTempProperty.replace("{{type}}", jProperty.type);
		sTempProperty = sTempProperty.replace("{{street}}", jProperty.full_address.street);
		sTempProperty = sTempProperty.replace("{{number}}", jProperty.full_address.number);
		sTempProperty = sTempProperty.replace("{{postal-code}}", jProperty.full_address.postal);
		sTempProperty = sTempProperty.replace("{{city}}", jProperty.full_address.city);
		sTempProperty = sTempProperty.replace("{{price}}", jProperty.price);
		sTempProperty = sTempProperty.replace("{{deposit}}", jProperty.deposit);

		
		$("#lbl-properties-table").append( sTempProperty );

		for(var i=0; i<jProperty.images.length; i++){
			// console.log(jProperty.images[i]);
			var sImgTemp= '<img class="lbl-property-image-'+i+' lbl-property-image image-slide fade" src="'+window.location.pathname+'uploads/property/{{image}}">';
			
			var sImgProperty 	= sImgTemp;
			sImgProperty 		= sImgTemp.replace("{{image}}", jProperty.images[i]);
			
			$("#lbl-image-map-wrap-"+sId).append(sImgProperty);
		}



		fnGeocodeAddressForPropertiesMap( sLatlng, agMap, jProperty );
		
		fnCreateSinglePropertyMapMarker( sId, sLatlng, sMapAddress );
	
	})
}




function fnShowSinglePropertyWindow( sPropertyButton ){


	$("#wdw-single-property").css("display","flex");
	$("#wdw-single-property").animate({"right": 0}, "slow");

}



function fnGetSinglePropertyValues( sPropertyButton ){

	var sParentDiv = $(sPropertyButton).parent();

	// Get the text from the clicked link's siblings with a certain class 
	// and save it in a variable
	var sPropertyToEditId 					= $(sParentDiv).siblings(".lbl-property-id").text();
	var sPropertyToEditAddress 				= $(sParentDiv).siblings(".lbl-property-address").text();
	
	var sPropertyToEditAddressStreet		= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-street").text();

	var sPropertyToEditAddressNumber 		= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-number").text();
	var sPropertyToEditAddressPostalCode 	= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-postal-code").text();
	var sPropertyToEditAddressCity 			= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-city").text();

	var sPropertyToEditPrice 				= $(sParentDiv).siblings(".lbl-property-price-wrap").children(".lbl-property-price").text();
	var sPropertyToEditDeposit 				= $(sParentDiv).siblings(".lbl-property-price-wrap").children(".lbl-property-deposit").text();

	var aImages								= $(sParentDiv).siblings(".lbl-image-map-wrap").children(".lbl-property-image");
	

	fnGetImagesToSingleProperty( aImages );

	$("#lbl-single-property-id").text(sPropertyToEditId);
	$("#lbl-single-property-address").text(sPropertyToEditAddress);

	$("#lbl-single-property-address-street").html('<h1>'+sPropertyToEditAddressStreet+'</h1>');
	$("#lbl-single-property-address-number").html('<h1>'+sPropertyToEditAddressNumber+'</h1>');
	$("#lbl-single-property-postal-code").html('<h4>'+sPropertyToEditAddressPostalCode+'</h4>');
	$("#lbl-single-property-city").html('<h4>'+sPropertyToEditAddressCity+'</h4>');
	$("#lbl-single-property-price").html('<h1>'+sPropertyToEditPrice+'</h1>');
	$("#lbl-single-property-deposit").html('<h4>'+sPropertyToEditDeposit+'</h4>');
	

	fnGeocodeAddressMarker( agSinglePropertyMap, sPropertyToEditAddress);
}



function fnNotifyNewPropertyAdded( sAddress ) {

	var message = 	'New property added: '+sAddress;
	var sOldTitle = document.title;
	var sNewTitle = "NEW PROPERTY ADDED";
	var bIsOldTitle = true;
    var i = 0;

	if (Notification.permission === "granted") {
		console.log("notify new property");
		oPropertySoundAlert.play();
    	var notification = new Notification(message);

		var timer = setInterval(function() {

		   	i++;
			document.title = bIsOldTitle ? sOldTitle : sNewTitle;
		 	bIsOldTitle = !bIsOldTitle;

		    if(i == 7){
		    	clearInterval(timer);
		    }
		}, 800);
    }




}


function fnCheckForUsers() {

	// To check for users we will connnect to the api using ajax

	// The url ajax will connect to
	var sUrl = "api-check-for-users.php";

	
	$.ajax({
		"url":sUrl,
		"method":"GET", // no data is passed, so we'll use the get method
		"data":{},
		"cache":false,
		"dataType":"json" // we know the data being return is json, so we set a data type
	}).done( function( jData ) {

		// In the done function we check the returned json data

		if(jData.status == "error"){

			// If the data matches our condition and there are no users we ask the user to create a superadmin
			// Create a message
			var sSuperAdminMessage = '<p>Please create a super admin profile</p>';

			// append the message
			$("#lbl-signup-login-txt").append(sSuperAdminMessage);
			console.log("Please create super admin");
		}

		// if there users nothing happens

	}).fail( function( jData ) {

		// if it fails we console log
		console.log("fail");
	});

}


function initMap() {
	
  	var latlng = new google.maps.LatLng(56.26392,9.501785);
    var mapOptions = {
    	mapTypeId: "roadmap",
      	zoom: 6,
      	center: latlng
    }

  	agMap = new google.maps.Map(document.getElementById('lbl-properties-map'), mapOptions);
  	$('#lbl-properties-map').attr('data-map',+agMap);

  
  
	initAutocomplete();
}








function fnValidateInputs( oClickedForm ) {

	// To check inputfields declare a variable containing an array by selecting
	// the passed form's childern inputs with the class .validate 

	var aoChildren = oClickedForm.children('input.validate');

	// A variable containing an object of the password input
	var oPasswordInput = oClickedForm.children("#txt-signup-password");

	// A variable containing an object of the password check input
	var oPasswordCheckInput = oClickedForm.children("#txt-signup-password-check");

   	var sPasswordErrorMessage = '<p style="color: #C62828">Passwords don\'t match or fulfill the requirements, please try again</p>';
	
   	console.log(oPasswordInput.val() +" "+ oPasswordCheckInput.val());
    // Check if the value of the two password inputs doesn't match
    if( !(oPasswordInput.val() == oPasswordCheckInput.val()) ){
    	
    	// Add the invalid class and append an the error messsage variable to a div
    	oPasswordCheckInput.addClass("invalid-input");
    	oPasswordInput.addClass("invalid-input");
		$("#lbl-signup-login-txt").append(sPasswordErrorMessage); 
		return false;
    
    }
    

    // loop through the array of inputfields

	for( var i = 0; i < aoChildren.length; i++ ) {
		
        var oInput = $( aoChildren[i] ); // convert it into object
        oInput.removeClass('invalid-input'); // remove any previous added invalid classes

        var sText = oInput.val(); // Get the input value
        var iMin = oInput.attr('data-min'); // The mininmal number of characters allow set i data-min
        var iMax = oInput.attr('data-max'); // The maximum number of characters allow set i data-max


        // check if the input value is within the allow amount of characters
        if( sText.length < iMin || sText.length > iMax ) {
        	oInput.addClass('invalid-input'); // add the class invalid-input to the input
        }


        if( oInput.hasClass("validate-number") ) {
        	
	    	if (!$.isNumeric(sText) ) {
	    		oInput.addClass('invalid-input');
	    	}
        }

        if( oInput.hasClass("validate-email") ) {
        	
	    	if( !isValidEmailAddress(sText) ){
	            oInput.addClass('invalid-input');
				
	        }
        }


        if(oInput.hasClass("validate-password")){
        	console.log("validate password");
        	if( !isValidPassword(sText) ){
	            oInput.addClass('invalid-input');
				$("#lbl-signup-login-txt").append(sPasswordErrorMessage);
	        }

        }
        
    }	

    // Check if any of the form children has the class invalid
	if(!$(oClickedForm).children().hasClass("invalid-input") ) {

		return true;

    } else{

    	return false;
    }
};






function isValidEmailAddress(emailAddress) {
    var regex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return regex.test(emailAddress);
};


function isValidPassword(password) {
	var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return regex.test(password);
}






function fnCheckUserLoginInfo( oClickedForm ) {


	// Serialize the form to be passed through the url in ajax
	var sData = $(oClickedForm).serialize();
	var sUrl = "api-check-user-login-info.php";

	$.ajax({
			"type":"POST", // Use the method post, safer and able to pass more data
			"url": sUrl,
			"data": sData,
			"cache":false,
			"dataType":"json", // return data as json
		success:function(jData){
			console.log(jData);
			// if ajax success check the returned json data status
			if(jData.status == "ok") {
				console.log(jData.firstname);

				$(oClickedForm).children('input').val(''); //empty the inputfields
				var sFirstname = jData.firstname; // Get the firstname from the returned data
				var sLastname = jData.lastname; // Get lastname from the returned data
				var sUserRole = jData.role; // Get the userrole from the returned data

				// pass the userrole to a function creating the menu
				
				// pass firstname, lastname and role to a function
				fnCreateMenu(sUserRole);
				fnGoToWelcomePage( sFirstname, sLastname);
				fnGetProperties();
			        

				if(jData.role == "superadmin") {
					fnGetUsers();
				}

			} else {
				// if the status isn't ok 
				// Forms input get class invalid
				$(oClickedForm).children("input").addClass('invalid-input');
				// Append error message
				$("#lbl-signup-login-txt").append('<p>'+jData.message+'</p>');
			}
		},
		error: function(jData){
			// if there's an error console log the data
			console.log(jData);
		}
    });

}








function fnCreateMenu( sUserRole ) {

	//create the menu depending on userrole
	$("#lbl-menu").empty();

	if( sUserRole == "superadmin") {

		// superadmin menu blueprint with all menu links
		var sMenu ='	<div data-go-to="wdw-landing" class="link">Welcome</div>\
						<div data-go-to="wdw-view-properties" class="link">View properties</div>\
						<div data-go-to="wdw-properties-map" class="link">Property map</div>\
						<div data-go-to="wdw-create-property" class="link">Create property</div>\
						<div data-go-to="wdw-view-users" class="link">Show users</div>\
						<div data-go-to="wdw-create-user" class="link">Create user</div>\
						<div data-go-to="wdw-signup-login" id="btn-logout" class="link">Logout</div>\
					';

	} else if (sUserRole == "admin") {

		var sMenu ='	<div data-go-to="wdw-landing" class="link">Welcome</div>\
						<div data-go-to="wdw-view-properties" class="link">View properties</div>\
						<div data-go-to="wdw-properties-map" class="link">Property map</div>\
						<div data-go-to="wdw-create-property" class="link">Create property</div>\
						<div data-go-to="wdw-signup-login" id="btn-logout" class="link">Logout</div>\
					';
	} else {

		var sMenu ='	<div data-go-to="wdw-landing" class="link">Welcome</div>\
						<div data-go-to="wdw-view-properties" class="link">View properties</div>\
						<div data-go-to="wdw-properties-map" class="link">Property map</div>\
						<div data-go-to="wdw-signup-login" id="btn-logout" class="link">Logout</div>\
					';
	}

	// append the blueprint depending on user to a div on the menu page
	$("#lbl-menu").append(sMenu);

	// run the function that loads the properties

}



function fnGoToWelcomePage( sFirstname, sLastname) {


	$("#wdw-landing h1").empty();
	var sWelcomeTextBlueprint = 'Welcome {{firstname}} {{lastname}}';

	var sTempWelcomeText = sWelcomeTextBlueprint;
	sTempWelcomeText = sTempWelcomeText.replace("{{firstname}}", sFirstname);
	sTempWelcomeText = sTempWelcomeText.replace("{{lastname}}", sLastname);

	$("body").addClass("logged-in");
	$("#wdw-landing h1").html(sTempWelcomeText);
	$("#wdw-signup-login").hide();

	$("#lbl-top-navigation").css("display","flex");
	// Show the menu window

	$("#wdw-landing").css("display","flex");

	fnCreateSinglePropertyMap();

	setTimeout( function(){ 
		fnAskNotifyPermission();
	} , 10000);

}


function fnCreateSinglePropertyMap() {

	var latlng = new google.maps.LatLng(56.26392,9.501785);
    var mapOptions = {
    	mapTypeId: "roadmap",
      	zoom: 13,
      	center: latlng
    }

  	agSinglePropertyMap = new google.maps.Map(document.getElementById('lbl-single-property-map'), mapOptions);

}




function fnAskNotifyPermission() {

	// Let's check if the browser supports notifications
    if (!("Notification" in window)) {
	    alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    	var notification = new Notification("Welcome!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
    	Notification.requestPermission(function (permission) {
    		console.log("ask permission");
          // If the user accepts, let's create a notification
        	if (permission === "granted") {
            	var notification = new Notification("Welcome!");
          	}
        });
    }

}






function fnCheckIfEmailExists( oClickedForm ) {

	var sEmailExitsMessage = '<p>User already exits, please login</p>';

	// A string variable containing the value from the email input field
	var sSignupEmail = $(oClickedForm).children("#txt-signup-email").val();
	
	var sUrl = "api-check-if-user-exists.php";

	$.ajax({
		"url":sUrl,
		"method":"GET", // Not sending a lot of data, so we're able to use GET 
		"data":{"email":sSignupEmail}, // Passing the email as  jSON 
		"cache":false, 
		"dataType":"json"
	}).done( function( jData ){
		if(jData.status == "ok") {
			console.log(jData.message);
			// If the email doesn't exist
			// Pass the form object to a function creating the user 

			fnCreateLoginUser( oClickedForm );
			
		} else{
			// If the email already exits in the textfile append the error message.
			$("#lbl-signup-login-txt").append(sEmailExitsMessage);
			console.log(jData.message);
		}
	}).fail( function(){
		console.log("fail");
		console.log(jData.message);
	});
}




function fnGetPropertyToEditValue( clickedItem ) {

	$("#lbl-create-images-wrap").empty();
	$(".img-preview").attr("src","");
	iElementNumber = 0;

	var sParentDiv = $(clickedItem).parent();
	// Get the text from the clicked link's siblings with a certain class 
	// and save it in a variable
	var sPropertyToEditId 					= $(sParentDiv).siblings(".lbl-property-id").text();
	var sPropertyToEditAddress 				= $(sParentDiv).siblings(".lbl-property-address").text();
	var sPropertyToEditAddressType 			= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-property-type").text();
	var sPropertyToEditAddressStreet		= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-street").text();

	var sPropertyToEditAddressNumber 		= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-number").text();
	var sPropertyToEditAddressPostalCode 	= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-postal-code").text();
	var sPropertyToEditAddressCity 			= $(sParentDiv).siblings(".lbl-property-full-address").children(".lbl-full-address-inner-wrap").children(".lbl-property-address-city").text();

	var sPropertyToEditPrice 				= $(sParentDiv).siblings(".lbl-property-price-wrap").children(".lbl-property-price").text();
	var sPropertyToEditDeposit 				= $(sParentDiv).siblings(".lbl-property-price-wrap").children(".lbl-property-deposit").text();

	var aImagesToEdit						= $(sParentDiv).siblings(".lbl-image-map-wrap").children(".lbl-property-image");
	
	fnGetImagesToEdit(aImagesToEdit);

	

	// Place the text from the variable as Value in the inputfield matching the class lbl
	$("#txt-create-property-id").val(sPropertyToEditId);
	$("#txt-create-property-address").val(sPropertyToEditAddress);
	$("#txt-create-property-price").val(sPropertyToEditPrice);
	$("#txt-create-property-deposit").val(sPropertyToEditDeposit);
	$("#txt-create-property-type").val(sPropertyToEditAddressType);
	$("#street_number").val(sPropertyToEditAddressNumber);
	$("#route").val(sPropertyToEditAddressStreet);
	$("#locality").val(sPropertyToEditAddressCity);
	$("#postal_code").val(sPropertyToEditAddressPostalCode);

}




function fnGetUserToEditValue( clickedItem ) {


	// Get the text from the clicked link's siblings with a certain class 
	// and save it in a variable
	var sUserToEditId 			= $(clickedItem).siblings(".lbl-user-id").text();
	var sUserToEditFirstname 	= $(clickedItem).siblings(".lbl-user-firstname").text();
	var sUserToEditLastname 	= $(clickedItem).siblings(".lbl-user-lastname").text();
	var sUserToEditEmail	 	= $(clickedItem).siblings(".lbl-user-email").text();
	var sUserToEditPassword		= $(clickedItem).siblings(".lbl-user-password").text();
	var sUserToEditRole			= $(clickedItem).siblings(".lbl-user-role").text();


	// Place the text from the variable as Value in the inputfield matching the class lbl
	$("#txt-create-user-id").val(sUserToEditId);
	$("#txt-create-user-firstname").val(sUserToEditFirstname);
	$("#txt-create-user-lastname").val(sUserToEditLastname);
	$("#txt-create-user-email").val(sUserToEditEmail);
	$("#txt-create-user-password").val(sUserToEditPassword);
	$("#txt-create-user-role").val(sUserToEditRole);
}




/************************************************************************/
/************************************************************************/
/************************************************************************/





function fnGetImagesToSingleProperty( aImages ) {

	console.log(aImages.length);

	var sImageBlueprint = '<img class="lbl-single-property-image" src="{{src}}">';
	var sSliderButtons 	= 	'<button id="btn-single-property-slider-left">&#10094;</button>\
							<button id="btn-single-property-slider-right">&#10095;</button>'

	for(var i=0; i<aImages.length; i++){

		var sImageSrc = $(aImages[i]).attr("src");
		var sTempImage = sImageBlueprint;
		sTempImage = sTempImage.replace("{{src}}", sImageSrc);

		$("#lbl-single-property-image-wrap").append(sTempImage);

		console.log(sImageSrc);
	}

	$("#lbl-single-property-image-wrap").append(sSliderButtons);

	fnCreateImageSlider();
}


function fnCreateImageSlider() {

	fnMoveImageSlider( iSlideIndex);

	$(document).on("click", "#btn-single-property-slider-left", function() {
		iSlideIndex -=1;
		fnMoveImageSlider(iSlideIndex);
	})

	$(document).on("click", "#btn-single-property-slider-right", function() {
		iSlideIndex +=1;
		fnMoveImageSlider(iSlideIndex);
	})


	function fnMoveImageSlider() {

    	var aSliderImages = $(".lbl-single-property-image");

    	console.log(aSliderImages.length);
	    if (iSlideIndex > aSliderImages.length) {
	    	iSlideIndex = 1;
	    } 

	    if (iSlideIndex < 1) {
	    	iSlideIndex = aSliderImages.length;
	    }

	    for (var i = 0; i < aSliderImages.length; i++) {

	        $(aSliderImages[i]).css("display","none"); 
	    }

	    $(aSliderImages[iSlideIndex-1]).css("display","flex");
    	
    }

}



function fnGetImagesToEdit( aImagesToEdit ){


	for(var i=0; i<aImagesToEdit.length; i++){

		var sImageSrc = $(aImagesToEdit[i]).attr("src");
		var sFileInputParent = "#lbl-image-"+i;

		if( $(sFileInputParent).length == 0 ) {
			fnCreateImageInput();
		}

		$(sFileInputParent).children(".img-preview").attr("src", sImageSrc).css({"height": "300px", "max-width":"300px"});
		$(sFileInputParent).children(".lbl-image-to-edit").val(sImageSrc);

		
	}

	fnCreateImageInput();
}




function fnCreateImageInput(){

    iElementNumber++;
	console.log("Here and elementnr: "+iElementNumber);
    var sDiv = '<div id="lbl-image-'+iElementNumber+'" class="lbl-create-image-wrap">\
    				<input class="lbl-image-to-edit" type="text" name="image-edit-'+iElementNumber+'" hidden="true">\
                    <img class="img-preview" src=""></img>\
                    <div class="lbl-image-btn-wrap">\
						<div class="lbl-create-property-image lbl-image-add">\
							<input class="image-'+iElementNumber+'" type="file" name="image-'+iElementNumber+'">\
						</div>\
						<button class="btn-remove-property-image" type="button">Delete</button>\
					</div>\
                  </div>';

    $("#lbl-create-images-wrap").append(sDiv);
}





function fnCreateLoginUser( oCreateUserForm ){

	console.log("create login user");

	// Get the value from the id input field

	// Serialize the data to be passed with ajax
	var sData = $(oCreateUserForm).serialize();

	var sUrl = "api-create-login-user.php";

	$.ajax({
			"type":"POST",
			"url": sUrl,
			"data": sData,
			"dataType":"json",
		success:function(jData){
			
			$("#lbl-signup-login-txt").append('<p>'+jData.message+'</p>');

		},
		error: function(jData){
			console.log("error");
			console.log(jData);
		}
    });
}





function fnCreateAdminUser( oCreateUserForm ) {


	// Get the value from the id input field
	var sId = $(oCreateUserForm).children("#txt-create-user-id").val();

	// Serialize the data to be passed with ajax
	var sData = $(oCreateUserForm).serialize();


	if (sId) {
		// If there's an id pass the data to update
		var sUrl = "api-update-user.php";
	} else {
		// If there isn't an id pass the data to create
		var sUrl = "api-create-admin-user.php";	
	}

	$.ajax({
			"type":"POST",
			"url": sUrl,
			"data": sData,
			"dataType":"json",
		success:function(jData){
			
			if(jData.status == "ok"){

				console.log(jData.message);
				fnGetUsers();
				
			} 

			if(jData.status == "error") {
				console.log(jData.message);
			}
		},
		error: function(jData){
			console.log("error");
			console.log(jData);
		}
    });
}



function fnDeleteData( oElementToDelete, sIdOfElement) {

	// Check if the object passed has the class lbl-user 
	if(oElementToDelete.hasClass("lbl-user")) {

		// Use delete user 
		var sUrl = "api-delete-user.php";
		
	} else if(oElementToDelete.hasClass("lbl-property")) {
		// If object contains property class use delete property
		var sUrl = "api-delete-property.php";
	}

	$.ajax({
			"url":sUrl,
			"method":"GET",
			"data":{"id":sIdOfElement}, // Pass the id of the user/property to be deleted
			"cache":false,
			"dataType":"json",
		success:function(jData){
			if(jData.status == "ok") {
			// If the element is successfully deleted remove the element from the DOM
				$(oElementToDelete).remove();
				console.log(jData.message);
			} 

			if(jData.status == "error") {
				console.log(jData.message);
			}
		},
		error: function(jData) {
			console.log("fail");
			console.log(jData);

		}
	});

};






function fnGetProperties(){

	


		var sUrl = "api-get-properties.php";
		$.ajax({
			"url":sUrl,
			"method":"GET",
			"data":{}, // We're not passing any data
			"cache":false,
			"dataType":"json"
		}).done( function( jData ){
			// Empty the table to avoid repetition
			$("#lbl-properties-table").empty();
			console.log(jData.message);
			// Loop through all the returned data
			for (var i = 0; i<jData.length; i++) {


				fnAppendProperty( jData[i] );
			}

		} ).fail( function(jData){
			console.log("fail");
		} );


}









function fnCheckUserRole( callback ) {


	var sResult;
	var sUrl = 'api-check-user-role.php';

	$.ajax({
		"url":sUrl,
		"method":"GET",
		"data":{},
		"cache":false,
		"dataType":"json",
		success: function( jData ){
			// Set the result to the user role returned from the api
			sResult = jData.role;
			// Return the result to the callback function
			callback(sResult);
		},
		error: function( jData ){

			// If there's an error return the empty variable
			callback(sResult);

		}
	});
}






function fnGetUsers(){


	var sUrl = "api-get-users.php";
	// The html bluprint for the users with placeholders
	var sUserBluePrint = 	'<div class="lbl-user table-row">\
								<div class="lbl-user-id no-table" hidden="true">{{id}}</div>\
								<div class="lbl-user-firstname">{{firstname}}</div>\
								<div class="lbl-user-lastname">{{lastname}}</div>\
								<div class="lbl-user-email">{{email}}</div>\
								<div class="lbl-user-password">{{password}}</div>\
								<div class="lbl-user-role">{{role}}</div>\
								<div data-go-to="wdw-create-user" class="fa fa-edit fa-fw link"></div>\
								<div class="fa fa-trash fa-fw btn-delete-user"></div>\
							</div>';

	$.ajax({
		"url":sUrl,
		"method":"GET",
		"data":{},
		"cache":false,
		"dataType":"json" 
	}).done( function( jData ){

		// Empty the table to avoid repetition 
		$("#lbl-users-table").empty();
		// Loop through the returned data of users
		for (var i = 0; i<jData.length; i++) {

			// Get a copy of the blueprint and replace the placeholder with return data values
			var sTempUser = sUserBluePrint;
		    sTempUser = sTempUser.replace("{{id}}", jData[i].id);
		    sTempUser = sTempUser.replace("{{firstname}}", jData[i].firstname);
		    sTempUser = sTempUser.replace("{{lastname}}", jData[i].lastname);
		    sTempUser = sTempUser.replace("{{email}}", jData[i].email);
		    sTempUser = sTempUser.replace("{{password}}", jData[i].password);
		    sTempUser = sTempUser.replace("{{role}}", jData[i].role);

		    // Apoend the user to the table
		    $("#lbl-users-table").append( sTempUser );

		}

	} ).fail( function(){
		console.log("fail");
	} );
}





function fnShowMainMenu() {
	$("#btn-main-menu").addClass("menu-open");
	$("#wdw-main-menu").css("display","flex");
	$("#wdw-main-menu").animate({"left": 0}, 1000);

}


function fnHideMainMenu() {
	$("#btn-main-menu").removeClass("menu-open");
	$("#wdw-main-menu").css("display","flex");
	$("#wdw-main-menu").animate({"left": "-30vw"}, 1000);
}





// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************



$(document).on("click", ".btn-show-single-property", function() {

	// $("#lbl-properties-table").addClass("no-scroll");
	var sClickedButton = this;
	fnGetSinglePropertyValues( sClickedButton );
})






$(document).on("click", "#btn-logout", function() {

	$("body").removeClass("logged-in");

	var sUrl = "api-user-logout.php";

	$.ajax({
			"type":"GET", // Use the method post, safer and able to pass more data
			"url": sUrl,
			"data": {},
			"cache":false,
			"dataType":"json", // return data as json
		success:function(jData){
			console.log("Logout");
			
		},
		error: function(jData){
			// if there's an error console log the data
			console.log(jData);
		}
    });

})






$(document).on("click", ".btn-signup-login", function() {
	console.log("click");
	
	// click event fired when the button on the signup or login form is clicked

	// Save the form object the clicked button is a child of
    var oParent = $(this).parent();
    
   

    // Remove any warning messages appended #lbl-signup-login-txt
    $("#lbl-signup-login-txt p").remove();



 
	if ( fnValidateInputs( oParent ) ) {
		
		if (oParent.is("#frm-user-signup") ) {

	    	fnCheckIfEmailExists( oParent );

		} else if ($(oParent).is("#frm-user-login") ) {
			fnCheckUserLoginInfo( oParent );
		}
	}  

  
});





$(document).on("click", ".link", function(){

	
	// Save the element clicked in a variable 
	var sClickedElement = this;

	// Hide all the windows
	fnHideMainMenu();
	$(".wdw").hide();

	// Get the clicked elements data atrribute go-to 
	var sWindowToShow = $(sClickedElement).attr("data-go-to");
	// Show the window with the id matching the data atrribute and show it
	$("#"+sWindowToShow).css("display","flex");

	// Pass the variable containing the clicked element to functions
	fnGetPropertyToEditValue(sClickedElement);
	fnGetUserToEditValue(sClickedElement);

});





$(document).on("contextmenu", "body.logged-in", function(event) {

	// Prevent default behavior on rightclick
	event.preventDefault();
	// Hide all windows
	fnShowMainMenu();
});





$(document).on("click","#btn-save-property", function(){

	var oForm = $("#btn-save-property").parent();
	var sAddress = $("#txt-create-property-address").val();


	fnGeocodeLatlng( sAddress, function( sLatlng ) {

		$("#txt-create-property-latlng").val(sLatlng);

		if( fnValidateInputs(oForm) ) {

	      	$("#frm-create-property").submit();
				
		}

	});
});




$(document).on("submit", "#frm-create-property", function(e) {

	e.preventDefault();
	// The form the button is the child of

	
	// Take the form data and serialize it, creating a url encoded text string
	var jData 		= new FormData(this);

	var sAddress 	= $("#txt-create-property-address").val()
	// Get the value from the id input field 
	var sId 		= $("#txt-create-property-id").val();

	if (sId) {
		// If there's an id go to the update property api
		var sUrl = "api-update-property.php";
	} else {
		// If there's not an id go to the create property
		var sUrl = "api-create-property.php";	
	}



	console.log(sId);
	
	$.ajax({
			"type":"POST", 
			"url": sUrl,
			"data": jData, // Passing the formdata
			"contentType":false,
        	"processData":false,
        	"cache":false,
        	"dataType": "json",
		success:function(jData){
				console.log(jData);
			
			if(jData.status == "ok") {
				console.log(jData.message);
				fnGetProperties();
			}

			if(jData.status == "error") {
				console.log(jData);
				console.log(jData.message);
			}
		},
		error: function(jData){
			console.log("error");
			console.log(jData);
		}
    });

});





$(document).on('change' , '[type="file"]' , function(){

      var preview = new FileReader();
      preview.readAsDataURL( this.files[0] );
      var self = $(this).parent();
      preview.onload = function(event){
        $(self).parent().siblings(".img-preview").attr("src", event.target.result).css({"height": "300px", "max-width":"300px"});
      }

      var sImageName = $(this).val().replace(/C:\\fakepath\\/i, '');
      $(this).parent().siblings(".lbl-image-to-edit").val(sImageName);
      $(this).parent().removeClass("lbl-image-add");
      $(this).parent().addClass("lbl-image-change");
      

      if( $('.image-'+iElementNumber).val() ) {

      	fnCreateImageInput();

      }
});



$(document).on("click",".btn-remove-property-image", function(){

	var sParentDiv = $(this).parent();
	$(sParentDiv).siblings(".lbl-image-to-edit").val("");
	$(sParentDiv).siblings(".img-preview").attr("src","").empty();
	$(sParentDiv).siblings(".lbl-create-property-image").removeClass("lbl-image-change");
	$(sParentDiv).siblings(".lbl-create-property-image").addClass("lbl-image-add");


	console.log( $(sParentDiv).siblings(".lbl-image-to-edit").val() );
})




$(document).on("click","#btn-save-user", function() {

	// The form the button is a child of
	var oForm = $(this).parent();
	// Pass the form to the create user function
	fnCreateAdminUser( oForm );	
});





$(document).on("click",".btn-delete-property", function() {

	// Get the id from the delete "button"s sibling div
	var sIdToDelete = $(this).parent().siblings(".lbl-property-id").text();

	// Save the parent container in a variable
	var oTheParent = $(this).parent().parent();

	// Pass the parent and id to a function
	fnDeleteData( oTheParent, sIdToDelete );
});




$(document).on("click",".btn-delete-user", function() {

	// Get the id from the delete "button"s sibling div
	var sIdToDelete = $(this).siblings(".lbl-user-id").text();

	// Save the parent container in a variable
	var oTheParent = $(this).parent();
	
	// Pass the parent and id to a function
	fnDeleteData( oTheParent, sIdToDelete );
});



$(document).on( "click", "#btn-main-menu", function() {


	if ( $("#btn-main-menu").hasClass("menu-open") ) {

		fnHideMainMenu();

	} else {
		fnShowMainMenu();
	}
})





$(document).on("click", ".btn-property-image-map", function() {
	

	var sClickedElement = $(this);
	// Hide all the windows
	sClickedElement.siblings(".btn-property-image-map").removeClass("selected-element");
	sClickedElement.addClass(".selected-element");
	sClickedElement.siblings(".show-hide").removeClass("show-object");
	// Get the clicked elements data atrribute go-to 
	var sElementToShow = sClickedElement.attr("data-show");


	// Show the window with the id matching the data atrribute and show it
	sClickedElement.addClass("selected-element");
	$("#"+sElementToShow).addClass("show-object");

});


