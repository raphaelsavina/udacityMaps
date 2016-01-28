// Connection to firebase
var FirebaseRef = new Firebase("https://udacitymapping.firebaseio.com/");

var getLocationfromDatabase = function(callback) {
    FirebaseRef.once("value", function(data) {
        if (data.exists()) {
            success(data.val(), callback);
        }
    }, function(error) {
        failed(error);
    });
}

var success = function(data, callback) {
    for (l in data) {
        locations.push({
          id: l,
          title: data[l].title,
          description: data[l].description,
          like: data[l].likes,
          lat: data[l].lat,
          lng: data[l].lng,
          url: data[l].url
        });
    };
    callback();
}

var failed = function(error) {
    console.log(error.code);
}

var addLocationtoDatabase = function(title, description, lat, lng, url) {
    var newLocation = FirebaseRef.push({
        lat: lat,
        lng: lng,
        title: title,
        description: description,
        url: url,
        likes: 0,
        last_modified: new Date()
    });
    newLocationKey = newLocation.key();
    console.log(newLocationKey);
}
