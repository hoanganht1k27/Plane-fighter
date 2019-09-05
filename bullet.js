var bullet = function(plane) {
	this.game = plane.game;
	this.plane = plane;
	this.matrix = null;
	this.speed = 10;
	this.waiting = 0;
	this.bulletSize = 5;
	this.color = new Array('#03312E', '#790A39', '#1C790A', '#791C0A', '#E50DBF', '#3605F2');
	this.opponent = null;
	this.opponentAlive = true;
	this.gameOver = false;	

	this.init = function() {
		this.matrix = new Array();
		this.opponent = new opponent(this);
		this.opponent.init();
	}

	this.update = function() {
		this.opponent.update();
		if(this.opponent.y >= GAME_HEIGHT) {
			this.refreshOpponent();
		}
		let keep = new Object();
		keep.x = this.plane.x + DOT_SIZE / 2 - 2;
		keep.y = this.plane.y;
		if(this.waiting == this.speed)
		{
			this.matrix.unshift(keep);
			this.waiting = 0;
		}
		for(let i = 0; i < this.matrix.length; i++) {
			this.clearScreen(this.matrix[i]);
			this.matrix[i].y -= 2;
			this.checkHit(this.matrix[i]);
		}
		this.waiting += 2;
		while(this.matrix.length) {
			let keep = this.matrix.pop();
			if(keep.y > -this.bulletSize) {
				this.matrix.push(keep);
				break;
			}
		}

		if(!this.opponentAlive) {
			this.refreshOpponent();
			this.opponentAlive = true;
		}
	}

	this.checkHit = function(el) {
		let x = el.x, y = el.y;
		let u = this.opponent.x, v = this.opponent.y;
		let t1 = false, t2 = false;
		if(x + 5 > u && x < u + 20) t1 = true;
		if(y <= v + 20 && y + 5 > v + 20) t2 = true;
		if(t1 && t2) {
			this.opponent.blood--;
			if(this.opponent.blood == 0) {
				this.opponentAlive = false;
			}
		}
	}

	this.checkDie = function() {

	}

	this.refreshOpponent = function() {
		this.opponent = new opponent(this);
		this.opponent.init();
	}

	this.clearScreen = function(el) {
		let x = el.x;
		let y = el.y;
		this.game.context.fillStyle = '#FFFFFF';
		this.game.context.fillRect(x, y, this.bulletSize, this.bulletSize);
	}

	this.draw = function() {
		this.matrix.map(el => {
			let x = el.x;
			let y = el.y;
			let id = Math.floor(Math.random() * 5);
			this.game.context.fillStyle = this.color[id];
			this.game.context.fillRect(x, y, this.bulletSize, this.bulletSize);
		});
		this.opponent.draw();
	}
}