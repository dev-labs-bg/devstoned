var io = require('socket.io').listen(8080);

var users = [];
var board = [];

var numUsers = 0;
// Event user connected
io.on("connection", function(socket){
	console.log('new connection');

	socket.idIncrement = numUsers++;

	// Bind events to this user:
	socket.on("chat_msg_send", function(data){
		console.log('nqkvi neshta' + data);

		io.sockets.emit("chat_msg_recieve", data);
		socket.emit('kladslksa', getmessage)
	});

	function test(data){
		console.log('nqkvi neshta' + data);

		io.sockets.emit("chat_msg_recieve", data);
		socket.emit('kladslksa', getmessage)
	}
});

io.on("disconnect", function(socket){
	
});
// vsichki sockets: io.sockets.emit..
// samo nashiq socket: socket