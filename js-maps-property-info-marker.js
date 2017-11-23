
// function geocodeAddress(geocoder, resultsMap, sAddress ) {
function fnGeocodeAddressForPropertiesMap( sLatLng, agMap, jProperty ) {

    var sPropertyBluePrint = fnCreateMapPropertyBlueprint();

    var sTempProperty = sPropertyBluePrint;
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


        var n = sLatLng.replace(/[()]/g,'');
        var nlatlng = n.split(/, ?/);

        var latlng = new google.maps.LatLng(parseFloat(nlatlng[0]), parseFloat(nlatlng[1]));;



        var infowindow = new google.maps.InfoWindow({
          content: sTempProperty
        });

        var marker = new google.maps.Marker({
          position: latlng,
          map: agMap,
          title: 'Hello World!'
        });

        marker.setMap(agMap);
    
        marker.addListener('click', function() {
          infowindow.open(agMap, marker);
            fnAppendImages(jProperty);
        });


        $(document).on("click", ".link", jProperty, function() {
          google.maps.event.trigger(agMap, "resize");
            var tlatlng = new google.maps.LatLng(56.26392,9.501785);
            agMap.setCenter(tlatlng);

        });


}


function fnAppendImages(jProperty){

        $("#lbl-map-properties-image-wrap-"+jProperty.id).empty();    

        for(var i=0; i<jProperty.images.length; i++){
                var sImgTemp= '<img class="lbl-property-image-'+i+' lbl-property-image image-slide fade" src="'+window.location.pathname+'uploads/property/{{image}}">';
                
                var sImgProperty    = sImgTemp;
                sImgProperty        = sImgTemp.replace("{{image}}", jProperty.images[i]);
                if("#lbl-map-properties-image-wrap-"+jProperty.id){

                console.log("#lbl-map-properties-image-wrap-"+jProperty.id);
                }
                $("#lbl-map-properties-image-wrap-"+jProperty.id).css("background-color","red");
                $("#lbl-map-properties-image-wrap-"+jProperty.id).append(sImgProperty);
        }
}



