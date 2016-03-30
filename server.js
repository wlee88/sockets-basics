var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('User connected via socket.io!');

  socket.on('message', function(message) {
    console.log('Message recieved: ' + message.text);

    //send to everyone BUT the sender io.emit sends to everyone.
    // socket.broadcast.emit('message', message);
    message.timestamp = moment.valueOf();
    io.emit('message',message);
  });

  //timestamp property - Javascript timestamp(milliseconds)

  socket.emit('message', {
    text: 'Welcome to the chat application',
    timestamp: moment.valueOf()
  });

});

http.listen(PORT, function() {
  console.log("Server Started");
});
