
function fnGeocodeLatlng( sAddress, sLatlngResponse ) {

        var geocoder = new google.maps.Geocoder();
        var mylatlng;

        var address = sAddress;
        geocoder.geocode({'address': address}, function(results, status) {

          console.log(results);
          if (status === 'OK') {
            mylatlng = results[0].geometry.location;
            sLatlngResponse(mylatlng);
          } else {

            alert('Geocode was not successful for the following reason: ' + status);
            mylatlng = false;
            sLatlngResponse(mylatlng);
          }
        });


}