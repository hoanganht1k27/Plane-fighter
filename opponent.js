var opponent = function(bullet) {
	this.game = bullet.game;
	this.x = 0;
	this.y = 0;
	this.opponentSize = 20;
	this.blood = 5;
	this.unitBlood = this.opponentSize / this.blood;

	var self = this;

	this.init = function() {
		this.x = Math.floor(Math.random() * (GAME_WIDTH - this.opponentSize));
		this.y = 0;
		this.blood = 5;
	}

	this.update = function() {
		this.clearScreen();
		this.y++;
	}

	this.clearScreen = function() {
		this.game.context.fillStyle = '#FFFFFF';
		this.game.context.fillRect(self.x, self.y - 10, this.blood * this.unitBlood, 5);
		this.game.context.fillRect(self.x, self.y, self.opponentSize, self.opponentSize);
	}

	this.drawBlood = function() {
		this.game.context.fillStyle = '#36EA03';
		this.game.context.fillRect(self.x, self.y - 10, this.blood * this.unitBlood, 5);
	}

	this.draw = function() {
		this.drawBlood();
		this.game.context.fillStyle = '#FC0303';
		this.game.context.fillRect(self.x, self.y, self.opponentSize, self.opponentSize);
	}
}