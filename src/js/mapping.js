/** Defaut settings for maps including variable with default location,
    fixed to the center of the map as below, would be replace
    by geolocationn if available. */
var initialLatLng = {
    lat: 0,
    lng: 0
};
var mapsSettings = {
    zoom: 3,
    center: initialLatLng
}

// Make the map a global viriable so it will be easier to manipulate
var map;

// Make the locations a global viriable so it will be easier to access
var markers = []

/** HTML for the Google Maps InfoWindows with 3 variables:
    {{url}} : url with photo from this location
    {{title}}: title for this location
    {{description}}: short description for this location */
var templateInfoWindowsHTML = "<div class='info-card-wide' style='background: url(\"{{url}}\") center / cover;'><div class='mdl-card__title'></div><div class='info-card-text'><h5>{{title}}</h5>{{description}}</div></div>";

/** function that will be callback by maps.googleapis.com/maps/api/js
 */
var initGoogleMaps = function() {
    // can we get the geolocation in this browser?
    if ("geolocation" in navigator) {
        console.log("geolocation is available");
        // Yes, trying to get it, if we can go to geoSuccess(), if not go to geoFail()
        navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
    } else {
        console.log("geolocation IS NOT available");
        // No, we go to geoFail()
        geoFail();
    }
};

// Function call successfull access to device location
var geoSuccess = function(position) {
    $(".mdl-spinner").removeClass("is-active");
    initialLatLng.lat = position.coords.latitude;
    initialLatLng.lng = position.coords.longitude;
    mapsSettings.center = initialLatLng;
    map = new google.maps.Map(document.getElementById("map"), mapsSettings);
    mapReady();
};

// fail - can't the location of the device
var geoFail = function() {
    console.log("Unable to retrieve your location");
    $(".mdl-spinner").remove();
    map = new google.maps.Map(document.getElementById("map"), mapsSettings);
    mapReady();
};

var addMarker = function(location, title, description, id, url, map) {
    var infoWindowsHTML = templateInfoWindowsHTML.replace(/{{title}}/g, title).replace(/{{description}}/g, description).replace("{{url}}", url);
    var infowindow = new google.maps.InfoWindow({
        content: infoWindowsHTML
    });
    var newMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        markerID: id
    });
    newMarker.addListener('click', function() {
        infowindow.open(map, newMarker);
        map.setCenter(newMarker.getPosition());
    });
    markers.push(newMarker);
};

var removeAllMarkers = function() {
    for (var m in markers) {
        markers[m].setMap(null);
    }
    markers = [];
}

