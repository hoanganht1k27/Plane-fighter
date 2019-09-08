var plane = function(game) {
	this.game = game;
	this.bullet = null;
	this.speed = 2;
	this.loaded = false;
	this.main = null;

	this.x = 0;
	this.y = GAME_HEIGHT - DOT_SIZE;

	var self = this;

	this.init = function() {
		this.bullet = new bullet(this);
		this.bullet.init();
		this.main = new Image();
		this.main.src = 'images/plane2.png';
		this.main.onload = () => {
			this.loaded = true;
		}
	}

	this.update = function() {
		if(this.game.moveLeft) {
			this.clearScreen();
			this.x -= this.speed;
			this.x = Math.max(this.x, 0);
		}
		if(this.game.moveRight) {
			this.clearScreen();
			this.x += this.speed;
			this.x = Math.min(this.x, GAME_WIDTH - DOT_SIZE);
		}
		this.bullet.update();
	}

	this.clearScreen = function() {
		this.game.context.fillStyle = "#FFFFFF";
		this.game.context.fillRect(self.x, self.y, DOT_SIZE, DOT_SIZE);
	}

	this.draw = function() {
		if(this.loaded) {
			this.bullet.draw();
			this.game.context.drawImage(self.main, self.x, self.y);
		}
	}
}