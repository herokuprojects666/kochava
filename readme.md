The app runs on nodeJS so if you dont' have that installed you need to grab it @ http://nodejs.org

To

This app was built with underscorejs, nodejs, expressjs, grunt, mongodb, with minimal support from other libraries.

The app search page is located at the root URL (/)

The chart page is located at /chart

The client api is located at /clientApi. Currently, it can be queried with the guid, name, or platform. If you do query it for multiple name values, platform values, or guid values you need to pass in a coma separated list of terms. For example, to query apps that are on the platform 'ios' or 'android', you would pass in a query string of 'ios,android'. It only responds to GET requests. There is no corresponding route for POST requests.

Currently, its setup to display one chart at a time. It could be easily extended to display all charts at once, different types of charts (currently only line and column). I also listed the max value for each graph. Again, that could easily be extended to include minimum value, mean value, median value, etc.

The production version