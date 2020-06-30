![React Logo](https://github.com/zeit/now/blob/master/packages/frameworks/logos/react.svg)

# React Example

Page is created by react-scripts build output.
Simply tell the host provider this is where it should host the files.


# Server side code

## Vercel
 Deployed to Vercel with vercel cli.
 Serverless functions are called from within /api directory.
 When a request to the endpoint is requested (via href or button click to /api/<endpoint>) the api will be invoked.

## Firebase
 If there is a need to migrate to a different provider such as firebase. You can continue to host the web files in the build directory.
 Serverless functions are defined in the /server directory. 
 The index.js file defines the routes and the middleware function to be invoked on a incoming http request.

 firebase.json defines a rule that all http requests to <url>/api/** will invoke the app function that we defined in index.js 

```
const express = require('express');
var router = require('express').Router;
router = new router(); 
# define routes...
#
# firebase admin config
# ...
# ...

exports.app = functions.runWith({ memory: '2GB' }).https.onRequest( router );
```

# AWS - TO TEST
 S3 would host the build output
 Cloudfront would be the edge CDN.
 Web server would run on a EC2/lightsail server.
