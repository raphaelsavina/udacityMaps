var locations = [];
//var myViewModel;

var viewModel = function() {
    var self = this;
    self.allLocations = ko.observableArray(locations);
    self.filteredLocations = ko.observableArray(self.allLocations());
    self.searchLocation = ko.observable('');
    self.searchLocation.subscribe(function(value) {
        if (!(value && value.trim())) {
            self.filteredLocations(self.allLocations());
            return;
        }
        var data = ko.utils.arrayFilter(self.allLocations(), function(item) {
            if (item.title.toLowerCase().indexOf(value.trim().toLowerCase()) > -1) {
                return true;
            }
        });
        removeAllMarkers();
        self.filteredLocations(data);
        displayMarkers(self.filteredLocations());
    });
};

var mapReady = function() {
    getLocationfromDatabase(function() {
        displayMarkers(locations);
        //myViewModel = new viewModel();
        //ko.applyBindings(myViewModel);
        ko.applyBindings(new viewModel());
    });
}

var displayMarkers = function(markersToDisplay) {
    removeAllMarkers();
    for (l in markersToDisplay) {
        var position = {
            lat: parseFloat(markersToDisplay[l].lat),
            lng: parseFloat(markersToDisplay[l].lng)
        };
        addMarker(position, markersToDisplay[l].title, markersToDisplay[l].id, map);
    }
}
