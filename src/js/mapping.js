/*
   mapping.js

   Variables and functions for Google Maps

*/

/*  Defaut settings for maps including variable with default location (0,0),
    fixed to the center of the map as below, would be replace
    by geolocationn if available. */
var initialLatLng = {
    lat: 0,
    lng: 0
};
var mapsSettings = {
    zoom: 4,
    center: initialLatLng,
    mapTypeControl: false
};

// Make the map a global viriable so it will be easier to access
var map;

// Make the locations a global viriable so it will be easier to access
var markers = [];

/*  HTML for the Google Maps InfoWindows with 3 variables:
    {{url}} : url with photo from this location
    {{title}}: title for this location
    {{description}}: short description for this location */
var templateInfoWindowsHTML = "<div class='info-card-wide' style='background: url(\"{{url}}\") center / cover;'><div class='mdl-card__title'></div><div class='info-card-text'><h5>{{title}}</h5>{{description}}</div></div>";

/*  Function that will be callback by maps.googleapis.com/maps/api/js
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

/*  Function call by initGoogleMaps if we have the device location
    parameter: position return by browser
*/
 var geoSuccess = function(position) {
    // remove the loading spinner
    $(".mdl-spinner").remove();
    // get lat and lng from position
    initialLatLng.lat = position.coords.latitude;
    initialLatLng.lng = position.coords.longitude;
    // use position to center the map
    mapsSettings.center = initialLatLng;
    // init map using these settings
    map = new google.maps.Map(document.getElementById("map"), mapsSettings);
    // callback to octopus.js as map is ready
    mapReady();
};

/*  Function call by initGoogleMaps if we don't the device location
*/
var geoFail = function() {
    // remove the loading spinner
    $(".mdl-spinner").remove();
    // keep default location (0,0) to center the map
    map = new google.maps.Map(document.getElementById("map"), mapsSettings);
    // callback to octopus.js as map is ready
    mapReady();
};

/*  Function to add individual maker and attached infoWindow to the map.
    Called from octopus.js
    Parameters:
        location: lat + lng for the marker
        title: title of the location
        description: short description for infoWindows
        id: id of location in Firebase (for TODO)
        url: url to photo of this location
        map: this map
*/
var addMarker = function(location, title, description, id, url, map) {
    // compute infoWindows from all elements to be displayed.
    var infoWindowsHTML = templateInfoWindowsHTML.replace(/{{title}}/g, title).replace(/{{description}}/g, description).replace("{{url}}", url);
    // init infoWindow with google.maps
    var infowindow = new google.maps.InfoWindow({
        content: infoWindowsHTML
    });
    // init marker wih google.maps
    var newMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        markerID: id
    });
    // add click listener to open infoWindow
    newMarker.addListener('click', function() {
        infowindow.open(map, newMarker);
        // center the map on the clicked marker
        map.setCenter(newMarker.getPosition());
        // make the marker bounce
        newMarker.setAnimation(google.maps.Animation.BOUNCE);
        // bounce for 2 seconds only
        setTimeout(function(){
                  newMarker.setAnimation(null);
        }, 2000);
    });
    // add this new marker to the gloabl array of displayed marker
    markers.push(newMarker);
};

/*  Function to remove all the markers from the map
    called from octopus.js
*/
var removeAllMarkers = function() {
    // iterate all markers
    for (var m in markers) {
        // move each to a non-existing map
        markers[m].setMap(null);
    }
    // empy the markers array
    markers = [];
};
