The app runs on nodeJS/NPM so if you dont' have that installed you need to grab NodeJS. After you have Node follow these steps to get up and running :

1) Grab the repository with git clone. Enter git clone https://github.com/herokuprojects666/kochava.git on the node cli

2) Navigate to the folder where you cloned the repo. Run npm install. This will build the project dependencies.

3) Run grunt populate. This will generate css files from the scss as well as populate the /gen directory with with minified css/js for use in production

To run the app type in node index.js on the command line. To run it in production mode type in NODE_ENV=production node index.js . This will run the app with all the minified files located in /gen directory.

This app was built with underscorejs, nodejs, expressjs, grunt, mongodb, with minimal support from other libraries.

The app search page is located at the root URL (/)

The chart page is located at /chart

Currently, its setup to display one chart at a time. It could be easily extended to display all charts at once, different types of charts (currently only line and column). I also listed the max value for each graph. Again, that could easily be extended to include minimum value, mean value, median value, etc.

The client api is exposed at /clientApi. Currently, it can be queried with the guid, name, or platform. If you do query it for multiple name values, platform values, or guid values you need to pass in a coma separated list of terms. For example, to query apps that are on the platform 'ios' or 'android', you would pass in a query string of 'ios,android'. It only responds to GET requests. There is no corresponding route for POST requests. The JSON response contains an object that has an array populated with results from the database query.