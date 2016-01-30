/*
   octopus.js

   Variables and functions fo rthe ViewModel

*/



//  Have all the locations in a global variable
var locations = [];

/*  Main viewModel function
    to be called as a callback one the map is ready
    and the data has been retrieved from Firebase */
var viewModel = function() {
    var self = this;
    // using locations[] for all locations observable srray
    self.allLocations = ko.observableArray(locations);
    // filtered observable array from all location
    self.filteredLocations = ko.observableArray(self.allLocations());
    // init and define search observable
    self.searchLocation = ko.observable('');
    self.searchLocation.subscribe(function(value) {
        if (value == "") {
            // if value empty: not filtered, use all locations
            var data = locations;
        } else {
            // if value: filter locations to keep only ones containing "value"
            var data = ko.utils.arrayFilter(self.allLocations(), function(item) {
                if (item.title.toLowerCase().indexOf(value.trim().toLowerCase()) > -1) {
                    return true;
                }
            });
        }
        // data is used to display
        self.filteredLocations(data);
        // remove all marker and display new ones from updated list
        removeAllMarkers();
        displayMarkers(self.filteredLocations());
    });
};

/*  Function called once we have (or not) the device
    geolocation from mapping.js
*/
var mapReady = function() {
    // Get the data from Firebase (getdata.js)
    getLocationfromDatabase(function() {
        // callback function once we have the data
        // diplay all the markers and initiate View Model
        displayMarkers(locations);
        ko.applyBindings(new viewModel());
    });
}

/*  Function to display all the makers
    parameter: an array with all the markers
*/
var displayMarkers = function(markersToDisplay) {
    // need to start from empty map so remove all existing markers (mapping.js)
    removeAllMarkers();
    // loop through each items
    for (var l in markersToDisplay) {
        // compute the position from lat and long
        var position = {
            lat: parseFloat(markersToDisplay[l].lat),
            lng: parseFloat(markersToDisplay[l].lng)
        };
        /*  call addMarker() with:
            position lat + lng
            title of the location
            description of the location
            firebase id of the location (for future use)
            url of the photo
            our map
        */
        addMarker(position, markersToDisplay[l].title, markersToDisplay[l].description, markersToDisplay[l].id, markersToDisplay[l].url, map);
    }
}

/*  Function to be attached (in view model) to the each locations.
    Will open by simulating 'click' on marker, the info window
    Knockout is sending the following parameters:
        data: location data object corresponding to the binded button, not needed
        event: object that trigger this event
*/
var openInfoWindow = function(data, event) {
    // retrieve marker id from the event object
    var id = event.target.id;
    // trigger a clic on this marker
    google.maps.event.trigger(markers[id],'click');
};