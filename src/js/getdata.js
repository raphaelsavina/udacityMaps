// Connection to firebase
var FirebaseRef = new Firebase("https://udacitymapping.firebaseio.com/");

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
