# udacityMaps
Project for Udacity Web Front End

## How-To:

### Run:
Build the files (see below) and upload the files from the dist/ folder (src/ folder would work too but files are not optimised) on a web server or run localy. For example use ```python -m SimpleHTTPServer``` and you should then see:
```
Serving HTTP on 0.0.0.0 port 8000 ...
```
It means the server is up and running on your computer on port 8000. You can type http://localhost:8000/ into the address bar of a web browser to see the web site.

### Use:
-The page will try to get your device location, depending on your settings, you will see a warning about this. If you agree to share the location with the browser, the map will center to where you are. If not, you dont' want to share it or it can be accessed, the map will center to a default lat 0, lng 0.
-You will see on the left the list of locations, you can click on each

### Build:
Use ```grunt``` to get the processed files in ```/dist``` based on the source in ```/src```.
The first time, from a terminal, navigate at the root of the project, where ```gruntfile.js``` is and type ```npm install```. This will read the ```pacakage.json``` files and install all the grunt dependencies you need.

## ToDo:
- autoclose 1st one when opening a second infoWindow
- add like button on infoWindows, clicks saved to Firebase and total displayed on infoWindows
