The app runs on nodeJS/NPM so if you dont' have that installed you need to grab NodeJS.

To install locally, grab the remote repository from the command line with : git clone https://github.com/herokuprojects666/kochava. After you have the repo, navigate to it and run the command npm install. This will install all the project dependencies. There is a local, development version with unminified files. As soon as you're ready to build the production version of the app, run grunt default. This will generate all the js/css/view files @ the /gen directory.

To run the app in any mode type in node index.js on the command line. To run it in production mode type in NODE_ENV=production node index.js . This will run the app with all the minified files located in /gen directory.

This app was built with underscorejs, nodejs, expressjs, grunt, mongodb, with minimal support from other libraries.

The app search page is located at the root URL (/)

The chart page is located at /chart

Currently, its setup to display one chart at a time. It could be easily extended to display all charts at once, different types of charts (currently only line and column). I also listed the max value for each graph. Again, that could easily be extended to include minimum value, mean value, median value, etc.

The client api is exposed at /clientApi. Currently, it can be queried with the guid, name, or platform. If you do query it for multiple name values, platform values, or guid values you need to pass in a coma separated list of terms. For example, to query apps that are on the platform 'ios' or 'android', you would pass in a query string of 'ios,android'. It only responds to GET requests. There is no corresponding route for POST requests. The JSON response contains an object that has an array populated with results from the database query.