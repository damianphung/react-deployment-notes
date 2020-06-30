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

# AWS 
 Set up Cloudfront. Set Origin Domain as the web server. (ALB / ELB or EC2 ). This is where the CDN's will get the original web files.
 Web server runs node/server.js

 static files are served from build directory.

 How to serve static files from S3, but dynamic content from EC2?
 Setup cloudfront with S3 as the default path pattern.
 - Set Default Root object to index.html or your entry point page.
 Then add EC2 domain in Origin Domain field, for dynamic content
 - You can customize the path pattern for this Origin, such as /api/* . This tells CloudFront all /api URI requests are directed to the EC2 Origin specified.


 ![See here](https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-s3-amazon-cloudfront-a-match-made-in-the-cloud)

