The app runs on nodeJS/NPM so if you dont' have that installed you need to grab NodeJS. After you have Node follow these steps to get up and running :

1) Grab the repository with git clone. Enter git clone https://github.com/herokuprojects666/kochava.git on the node cli

2) Navigate to the folder where you cloned the repo. Run npm install. This will build the project dependencies.

3) Run grunt populate. This will generate css files from the scss as well as populate the /gen directory with with minified css/js for use in production

To run the app type in any mode, type node index.js on the command line.

To run the app in production mode type in NODE_ENV=production node index.js . This will run the app with all the minified files located in /gen directory. Note : make sure to run grunt populate if you haven't yet otherwise the required files won't exist!

This app was built with underscorejs, nodejs, expressjs, grunt, mongodb, with minimal support from other libraries.

The app search page is located at the root URL (/)

The chart page is located at /chart

The client api is exposed at /clientApi. Currently, it can be queried with the guid, name, or platform. If you do query it for multiple name values, platform values, or guid values you need to pass in a coma separated list of terms. For example, to query apps that are on the platform 'ios' or 'android', you would pass in a query string of 'ios,android' which would translate into a URL of /clientApi?platform=ios%2Candroid . The JSON response contains an object that has an array populated with results from the database query.