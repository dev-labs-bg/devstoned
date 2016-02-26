function set_next_active_user() {
	var current = board.activeUser;

	var current_index = board.users.indexOf(current);
	var next_index = current_index + 1;
	if(next_index >= board.users.length) {
		next_index = 0;
	}

	board.activeUser = board.users[next_index];
}

var board = {
	board_socket: null,
	users: [],
	activeUser: 0,
	add_user: function(user, numUsers) {
		user.points = 0;
		user.pos = 0; 
		user.idIncrement = numUsers;
		// Send the id to the user
		user.emit('get_id', user.idIncrement);

		if(numUsers == 1)
			board.activeUser = user;
		board.users.push(user);
		board.board_socket.emit('join', user.idIncrement);
	},
	remove_user: function(user) {
    	board.users.splice(board.users.indexOf(user), 1);
	},
	handle_roll: function(user, number) {
		if(board.check_all_ready() && user.idIncrement == board.activeUser.idIncrement) {
			// Increment points
			if(user.pos + number > 20)
				user.pos = number + user.pos - 20;
			else 
				user.pos += number;

			user.points += number;

			// Send new data to user
			user.emit('points', user.points);
			user.emit('position', user.pos);

			board.board_socket.emit('update', user.idIncrement, user.pos);

			// Find next active
			set_next_active_user();

			board.board_socket.emit('nextTurn', board.activeUser.idIncrement);
		}
	},
	set_board: function(socket) {
		board.board_socket = socket;
	},
	check_all_ready: function() {
		var all_ready = true;
		board.users.forEach(function(user){
			if(user.is_ready != true)
				all_ready = false;
		});
		return all_ready;
	}
}

module.exports = board;
