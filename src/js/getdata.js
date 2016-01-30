/*
   getdata.js

   Variables and functions for data retrieval from Firebase

*/

// Global variable with URL for connection to firebase (only write)
var FirebaseRef = new Firebase("https://udacitymapping.firebaseio.com/");


/*  Function connecting to Firebase to get all the location
    called when map is ready from octopus.js
    parameter: the callback function on sucess
*/
var getLocationfromDatabase = function(callback) {
    FirebaseRef.once("value", function(data) {
        // is there data?
        if (data.exists()) {
            // sending the data to the success() callback function
            success(data.val(), callback);
        }
    }, function(error) {
        // failed() is called on error
        failed(error);
    });
};

/*  Function called on success, will fill the locations[] array with all location
    parameters:
      data: an object with all the data
      callback: callback function to run on completion, see mapReady in octopus.js
*/
var success = function(data, callback) {
    // Iterate through the data and push what is needed to the locations[] array
    for (var l in data) {
        locations.push({
          id: l,
          title: data[l].title,
          description: data[l].description,
          like: data[l].likes,
          lat: data[l].lat,
          lng: data[l].lng,
          url: data[l].url
        });
    }
    // finished so callback the function
    callback();
};

/*  Function called on failure.
    parameters:
      error: error from Fireabse
*/
var failed = function(error) {
    console.log(error.code);
    var errorHTML = "<h6>Sorry, can't get the data</h6>";
    $("#error").append("Sorry, can't get the data");
};


/*  Function to add data into Firebase, called from the admin page.
    parameters:
      title: title for this location
      description: description for this location
      lat: lattitude of the location
      lng: longitude of the location
      url: url to the photo of this location
*/
var addLocationtoDatabase = function(title, description, lat, lng, url) {
    // push data of the location to Firebase, includes "likes" (see TODO)
    var newLocation = FirebaseRef.push({
        lat: lat,
        lng: lng,
        title: title,
        description: description,
        url: url,
        likes: 0,
        last_modified: new Date()
    });
    // getting and log the Firebase key (id) for this location
    newLocationKey = newLocation.key();
    console.log(newLocationKey);
};
