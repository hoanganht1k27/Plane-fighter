const GAME_WIDTH = 300;
const GAME_HEIGHT = 300;
const DOT_SIZE = 32;

var game = function() {
	this.canvas = null;
	this.context = null;
	this.plane = null;
	this.moveRight = false;
	this.moveLeft = false;
	this.resume = true;
	this.pause = false;
	this.gameOver = false;
	this.gameOverImg = null;

	var self = this;

	this.init = function() {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext('2d');
		this.canvas.width = GAME_WIDTH;
		this.canvas.height = GAME_HEIGHT;

		document.getElementById('container').appendChild(this.canvas);

		this.plane = new plane(this);
		this.plane.init();

		this.gameOverImg = new Image();
		this.gameOverImg.src = 'images/gameOver.jpg';

		this.listenEvent();

		this.loop();
	}

	this.listenEvent = function() {
		document.addEventListener('keydown', (event) => {
			if(event.keyCode == 37 ) {
				this.moveLeft = true;
			} else if(event.keyCode == 39) {
				this.moveRight = true;
			}
		})

		document.addEventListener('keyup', (event) => {
			if(event.keyCode == 37 ) {
				this.moveLeft = false;
			} else if(event.keyCode == 39) {
				this.moveRight = false;
			}
		})

		document.getElementById('left').addEventListener('touchstart', () => {
			this.moveLeft = true;
		})

		document.getElementById('left').addEventListener('touchend', () => {
			this.moveLeft = false;
		})

		document.getElementById('right').addEventListener('touchstart', () => {
			this.moveRight = true;
		})

		document.getElementById('right').addEventListener('touchend', () => {
			this.moveRight = false;
		})

		document.getElementById('resume').addEventListener('click', () => {
			if(this.gameOver) return;
			this.resume = true;
			this.pause = false;
		})

		document.getElementById('pause').addEventListener('click', () => {
			this.resume = false;
			this.pause = true;
		})

		document.getElementById('replay').addEventListener('click', () => {
			this.resetGame();
		})
	}

	this.resetGame = function() {
		document.getElementById('score').innerHTML = "Score: 0";

		this.context.fillStyle = '#FFFFFF';
		this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

		this.plane = new plane(this);
		this.plane.init();

		this.resume = true;
	    this.pause = false;

	    this.gameOver = false;
	}

	this.loop = function() {
		if(self.resume) {
			self.update();
			self.draw();
			self.checkGameOver();	
		}
		setTimeout(self.loop, 20);
	}

	this.checkGameOver = function() {
		this.gameOver = this.plane.bullet.gameOver;
		if(this.gameOver) {
			this.context.drawImage(this.gameOverImg, 0, 0);
			this.pause = true;
			this.resume = false;
		}
	}

	this.update = function() {
		this.plane.update();
	}

	this.draw = function() {
		this.plane.draw();
	}
}

var g = new game();
g.init();