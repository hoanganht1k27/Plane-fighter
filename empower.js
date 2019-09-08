var empower = function(bullet) {
	this.game = bullet.game;
	this.x = 0;
	this.y = 0;
	this.empowerSize = 32;
	this.icon = null;

	this.init = function() {
		this.icon = new Image();
		this.icon.src = 'images/empower1.png';
	}

	this.new = function() {
		this.x = Math.floor(Math.random() * (GAME_WIDTH - this.empowerSize));
		this.y = 0;
	}

	this.update = function() {
		this.clearScreen();
		this.y += 2;
	}

	this.draw = function() {
		this.game.context.drawImage(this.icon, this.x, this.y);
	}

	this.clearScreen = function() {
		this.game.context.fillStyle = '#FFFFFF';
		this.game.context.fillRect(this.x, this.y, this.empowerSize, this.empowerSize);
	}
}