var bullet = function(plane) {
	this.game = plane.game;
	this.plane = plane;
	this.matrix = null;
	this.speed = 10;
	this.waiting = 0;
	this.bulletSize = 5;
	this.color = new Array('#03312E', '#790A39', '#1C790A', '#791C0A', '#E50DBF', '#3605F2');
	this.gameOver = false;
	this.opponentLevel = 1;
	this.bulletLevel = 1;
	this.opponent = null;	
	this.score = 0;
	this.scoreInc = 0;

	this.init = function() {
		this.matrix = new Array();
		this.opponent = new Array();
		let opponent = new Opponent(this);
		opponent.init();
		this.opponent.push(opponent);
		this.waiting = 0;
		this.score = 0;
		this.scoreInc = 0;
		this.gameOver = false;
		this.opponentLevel = 1;
	}

	this.update = function() {
		this.opponent.map(el => {
			el.update();
		})

		this.checkDie();

		let keep = new Object();
		keep.x = this.plane.x + DOT_SIZE / 2 - 2;
		keep.y = this.plane.y;
		let id = Math.floor(Math.random() * 5);
		keep.color = this.color[id];
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

		this.updateOpponent();
	}

	this.updateLevel = function() {
		if(this.scoreInc == this.opponentLevel * this.opponentLevel * this.opponentLevel) {
			this.opponentLevel++;
			this.scoreInc = 0;	
		}
	}

	this.updateOpponent = function() {
		while(this.opponent.length < this.opponentLevel) {
			let opponent = new Opponent(this);
			opponent.init();
			this.opponent.push(opponent);
		}
	}

	this.checkHit = function(el) {
		let x = el.x, y = el.y;

		this.opponent.map((opponent, index) => {
			let u = opponent.x, v = opponent.y;
			let t1 = false, t2 = false;
			if(x + 5 > u && x < u + 20) t1 = true;
			if(y <= v + 20 && y + 5 > v + 20) t2 = true;
			if(t1 && t2) {
				this.opponent[index].blood--;
				if(this.opponent[index].blood == 0) {
					this.score++;
					document.getElementById('score').innerHTML = "Score: " + this.score;
					this.scoreInc++;
					this.updateLevel();
					this.opponent.splice(index, 1);
				}
			}
		})
	}

	this.checkDie = function() {
		this.opponent.map(el => {
			if(el.y + el.opponentSize >= GAME_HEIGHT) {
				this.gameOver = true;
			}
		})
	}

	this.refreshOpponent = function() {
		
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
			this.game.context.fillStyle = el.color;
			this.game.context.fillRect(x, y, this.bulletSize, this.bulletSize);
		});

		this.opponent.map(el => {
			el.draw();
		})
	}
}