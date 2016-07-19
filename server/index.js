var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

/// SETUP MIDDLEWARE ///
app.use(bodyParser.json()); // for parsing application/json

/// START SERVER ///
app.listen(3000, function(){
  console.log('server started on port 3000');
});

/// SETUP STATIC ROUTES ///
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
