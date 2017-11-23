
// function fnCreatePropertyMap(geocoder, sId, resultsMap, sAddress ) {
function fnCreateSinglePropertyMapMarker( sId, sLatLng, sAddress ) {

  // console.log("geocoder");

        var n = sLatLng.replace(/[()]/g,'');
        var nlatlng = n.split(/, ?/);

        var latlng = new google.maps.LatLng(parseFloat(nlatlng[0]), parseFloat(nlatlng[1]));;

        var mapOptions = {
              mapTypeId: "roadmap",
                zoom: 13,
                center: latlng
        }

        var resultsMap = new google.maps.Map(document.getElementById('lbl-property-map-'+sId), mapOptions);



        var marker = new google.maps.Marker({
          position: latlng,
          map: resultsMap,
          title: sAddress
        });

        marker.setMap(resultsMap);



        $(document).on("click", ".link", function() {
          fnResizeMap( resultsMap, latlng );
        });

}



function fnGeocodeAddressMarker( resultsMap, sAddress ) {
  console.log("test "+resultsMap);

        var geocoder = new google.maps.Geocoder();
        var latlng;
        var address = sAddress;
        var aMapMarkers = [];
        
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            google.maps.event.trigger(resultsMap, "resize");
            console.log("Her");
            resultsMap.setCenter(results[0].geometry.location);
            latlng = results[0].geometry.location;
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: 'sAddress'
            });
            aMapMarkers.push(marker);
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });


        $(document).on("click", ".btn-property-image-map", function() {
          fnResizeMap( resultsMap, latlng );
        })

        
        $(document).on("click", "#btn-close-single-property", function() {

          setTimeout( function() {
            for(i=0; i<aMapMarkers.length; i++){
                aMapMarkers[i].setMap(null);
            }
            
          }, 300)

        })



}


function fnResizeMap( map, sLatLng ){
    google.maps.event.trigger(map, "resize");
    map.setCenter(sLatLng);
}




