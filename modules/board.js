var board = {
	users: [],
	activeUser: 0,
	add_user: function(user, numUsers){
		user.points = 0;
		user.pos = 1; 
		user.idIncrement = numUsers;
		if(numUsers == 1)
			activeUser = user;
		board.users.push(user);
	},
	remove_user: function(user){
		users = [];
		board.users.forEach(function(selected_user){
			if(selected_user.idIncrement != user.idIncrement)
				users.push(selected_user);
		});
		board.users = users;
	},
	handle_roll: function(user, number){
		if(user.idIncrement == activeUser.idIncrement){
			users = [];
			board.users.forEach(function(selected_user){
				if(selected_user.idIncrement == user.idIncrement){
					if(selected_user.pos > 20)
						selected_user.pos = number + selected_user.pos - 20;
					selected_user.points += number;
				}
				users.push(selected_user);
			});
			board.users = users;
		}
	}
}

module.exports = board;
