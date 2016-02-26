var user = {
	roll_dice: function() {
		return Math.min(6, Math.floor((Math.random() * 6) + 1));
	},
	set_ready: function(socket) {
		socket.is_ready = true;
	}
}

module.exports = user;
