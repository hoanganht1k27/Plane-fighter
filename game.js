const GAME_WIDTH = 300;
const GAME_HEIGHT = 300;
const DOT_SIZE = 32;

var game = function() {
	this.canvas = null;
	this.context = null;
	this.plane = null;
	this.moveRight = false;
	this.moveLeft = false;

	var self = this;

	this.init = function() {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext('2d');
		this.canvas.width = GAME_WIDTH;
		this.canvas.height = GAME_HEIGHT;

		document.getElementById('container').appendChild(this.canvas);

		this.plane = new plane(this);
		this.plane.init();

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
	}

	this.loop = function() {
		self.update();
		self.draw();
		setTimeout(self.loop, 20);
	}

	this.update = function() {
		this.plane.update();
		// console.log('update');
	}

	this.draw = function() {
		this.plane.draw();
	}
}

var g = new game();
g.init();