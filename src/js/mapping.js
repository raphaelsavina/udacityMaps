// varaiable to store the location, fixed as below or updated from geolocationn if available.
var initialLatLng = {
    lat: -25.363,
    lng: 131.044
};

// Make the map a global viriable so it will be easier to manipulate
var map;

var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';


var initGoogleMaps = function() {
    if ("geolocation" in navigator) {
        console.log("geolocation is available");
        navigator.geolocation.getCurrentPosition(geoSucces, geoFail);
    } else {
        console.log("geolocation IS NOT available")
    }
    // var infowindow = new google.maps.InfoWindow({
    //     content: contentString
    // });
    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 16,
    //     center: initialLatLng
    // });
    // var marker = new google.maps.Marker({
    //     position: initialLatLng,
    //     map: map,
    //     title: 'Hello World!'
    // });
    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    // });
};

// success - get the location of the device
var geoSucces = function(position) {
    $(".mdl-spinner").removeClass("is-active");
    initialLatLng.lat = position.coords.latitude;
    initialLatLng.lng = position.coords.longitude;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialLatLng,
        scaleControl: true
    });
};

// fail - can't the location of the device
var geoFail = function() {
    console.log("Unable to retrieve your location");
    $(".mdl-spinner").remove();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialLatLng
    });
}

var addMarker = function(location, text, map) {
    var newMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: text
    });
    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    // });
};
