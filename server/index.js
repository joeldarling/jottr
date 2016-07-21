var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


/// SETUP MIDDLEWARE ///
app.use(bodyParser.json()); // for parsing application/json


/// START SERVER ///
server.listen(3000, function(){
  console.log('server started on port 3000');
});

/// SETUP STATIC ROUTES ///
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

/// SOCKET ///
io.on('connection', function (socket) {

  socket.on('user typing', function (msg) {
    io.emit('player two', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
