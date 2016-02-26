var socketio = require('socket.io');
var request = require('request');
var express = require('express');

// App is the express server that serves the static files in public
var app = express();
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

// Server is used both by express and by socket.io
var server = require('http').createServer(app);
server.listen(8080);

// Start socket.io
var io = socketio.listen(server);

var user = require('./modules/user');
var board = require('./modules/board');
var numUsers = 1;
// Event user connected
io.on("connection", function(socket){
	socket.on('initialize_user', function(){
		board.add_user(socket, numUsers);
		numUsers++;

		socket.on("roll", function(){
			var number = user.roll_dice();
			board.handle_roll(socket, number);
		});
		socket.on("disconnect", function(){
			board.remove_user(socket);
		});
		socket.on("ready", function(){
			user.set_ready(socket);
		});
		socket.on('avatarImage', function(rawImageData) {
			board.setImage(socket, rawImageData);
		});
	});

	socket.on('initialize_board', function(){
		board.set_board(socket);

		// Will reset the board, clear users and set the new board to this current board
		socket.on('restart', function() {
			board.set_board(socket);

			// Reset count
			numUsers = 1;
			// Reset users
			board.users = [];
			// Reset active user
			board.activeUser = 0;
		});
	});

});
// vsichki sockets: io.sockets.emit..
// samo nashiq socket: socket

console.log('READY!');