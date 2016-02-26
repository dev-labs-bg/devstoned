var io = require('socket.io').listen(8080);

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
	});

	socket.on('initialize_board', function(){
		board.set_board(socket);
	});

});
// vsichki sockets: io.sockets.emit..
// samo nashiq socket: socket