// varaiable to store the location, fixed to the center of map as below or updated from geolocationn if available.
var initialLatLng = {
    lat: 0,
    lng: 0
};
// Settings for maps
var mapsSettings = {
    zoom: 6,
    center: initialLatLng
}


// Make the map a global viriable so it will be easier to manipulate
var map;

var markers = []

var infoWindowsHTML = '<div id="content" data-bind="foreach: locationsObservableArray">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading" data-bind="text: title"></h1>' +
    '<div id="bodyContent">' +
    '<p data-bind="text: description"></p>' +
    '<p></p>' +
    '</div>' +
    '</div>';

/**
 * Class
 * @constructor
 * @param {...}
 * @return {Boolean} Returns true on success
 * @private
 */
var initGoogleMaps = function() {
    if ("geolocation" in navigator) {
        console.log("geolocation is available");
        navigator.geolocation.getCurrentPosition(geoSucces, geoFail);
    } else {
        console.log("geolocation IS NOT available");
        geoFail();
    }
};

// success - get the location of the device
var geoSucces = function(position) {
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

var addMarker = function(location, text, id, map) {
    var infowindow = new google.maps.InfoWindow({
        content: infoWindowsHTML
    });
    var newMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: text,
        marker_id: id,
    });
    newMarker.addListener('click', function() {
        infowindow.open(map, newMarker);
    });
    markers.push(newMarker);
};

var removeAllMarkers = function() {
    for (var m in markers) {
        markers[m].setMap(null);
    }
    markers = [];
}


