const express = require('express');
var router = require('express').Router;
router = new router();

router.get('/api/hello', function(req, res) {
    res.send('GET Request to */api/hello*');
})

router.get('/api/bye', function(req, res) {
    res.send('GET Request to */api/bye*');
})

process.env.NODE_ENV = 'production';
if (process.env.NODE_ENV === 'production') {
    const firebase = require('firebase-admin');
    const functions = require('firebase-functions');
    const { app: config } = functions.config();
    Object.keys(config).forEach( key => {
        process.env[key.toUpperCase()] = 
            typeof config[key] === 'object'
                ? JSON.stringify(config[key])
                : config[key];
    });
    
    if( !firebase.apps.length) {
        firebase.initializeApp({
            credential: firebase.credential.cert(JSON.parse(process.env.GCP_SERVICE_KEY))
        });
    }
    exports.app = functions.runWith({ memory: '2GB' }).https.onRequest( router );
}
else
{
    const app = express();
    app.use(router);
    app.listen(3000, console.log("Listeninug on port 3000"));
}
