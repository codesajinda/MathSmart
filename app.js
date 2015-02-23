var express = require('express')
var app = express();
app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 3000);
app.get('/');
var io = require('socket.io').listen(server)
var rooms = [];
var usernames ={};
var currentRoom = '';
io.sockets.on('connection', function (socket) {
  socket.on('AddUser', function(username, room){
   if(username!="" && room != ""){
		currentRoom = room.toString();
		// store the username in the socket session for this client		
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = currentRoom;
		// add the client's username to the global list
		usernames[username] = username;
		rooms.push(currentRoom);
		// send client to room 1
		socket.join(currentRoom);
		// echo to client they've connected
		socket.emit('ConnectionStatus', 'SERVER', 'you have connected to ' + currentRoom);
		// echo to room  that a person has connected to their room
		socket.broadcast.to(currentRoom).emit('ConnectionStatus', 'SERVER', username + ' has connected to this room');
	}
  });
  
   socket.on('UpdateScore', function(score){
	 socket.broadcast.to(currentRoom).emit('ConnectionStatus', 'SERVER', 'Current score of ' + socket.username + ' is ' + score);	
  });
});