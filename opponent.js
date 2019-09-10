var Opponent = function(bullet) {
	this.game = bullet.game;
	this.x = 0;
	this.y = 0;
	this.opponentSize = 20;
	this.blood = 5;
	this.unitBlood = 0;
	this.colorOptions = new Array('#4C4B4C', '#B20DB2', '#270AC6', '#C6210A', '#E8E50F', '#0FE8E5', '#0AF029', '#F5860D');
	this.color = null;

	var self = this;

	this.init = function() {
		this.x = Math.floor(Math.random() * (GAME_WIDTH - this.opponentSize));
		this.y = 0;
		let id = Math.floor(Math.random() * (this.colorOptions.length - 1));
		this.color = this.colorOptions[id];
	}

	this.update = function() {
		this.clearScreen();
		this.y ++;
	}

	this.clearScreen = function() {
		this.game.context.fillStyle = '#FFFFFF';
		this.game.context.fillRect(self.x, self.y - 10, this.opponentSize, 5);
		this.game.context.fillRect(self.x, self.y, self.opponentSize, self.opponentSize);
	}

	this.drawBlood = function() {
		if(this.blood <= 2) {
			this.game.context.fillStyle = '#f71515';
		}
		else if(this.blood <= 5) {
			this.game.context.fillStyle = '#a7f70b';
		}
		else this.game.context.fillStyle = '#36EA03';

		this.game.context.fillRect(self.x, self.y - 10, this.blood * this.unitBlood, 5);
	}

	this.draw = function() {
		this.drawBlood();
		this.game.context.fillStyle = this.color;
		this.game.context.fillRect(self.x, self.y, self.opponentSize, self.opponentSize);
	}
}