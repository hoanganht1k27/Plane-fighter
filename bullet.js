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
	this.empower = null;
	this.gift = null;

	this.init = function() {
		this.matrix = new Array();
		this.opponent = new Array();
		this.addOpponent();
		this.waiting = 0;
		this.score = 0;
		this.scoreInc = 0;
		this.gameOver = false;
		this.opponentLevel = 1;
		this.empower = new empower(this);
		this.empower.init();
	}

	this.update = function() {
		this.opponent.map(el => {
			el.update();
		})

		if(this.gift != null) {
			this.gift.update();
		}

		if(this.gift != null)
		this.checkEatGift();

		this.checkDie();

		if(this.waiting == this.speed)
		{
			this.addBullet();
		}
		this.matrix.map((el, i) => {
			this.clearScreen(this.matrix[i]);
			this.matrix[i].y -= 2;
			this.checkHit(this.matrix[i], i);
		})
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

	this.addBullet = function() {
		let kc = Math.floor((DOT_SIZE - this.bulletLevel * this.bulletSize) / (this.bulletLevel + 1));
		for(let i = 1; i <= this.bulletLevel; i++) {
			let keep = new Object();
			keep.x = this.plane.x + kc * i + this.bulletSize * (i - 1);
			keep.y = this.plane.y;
			let id = Math.floor(Math.random() * (this.color.length - 1));
			keep.color = this.color[id];
			this.matrix.unshift(keep);
		}
		this.waiting = 0;
	}

	this.addOpponent = function() {
		let opponent = new Opponent(this);
		opponent.init();
		opponent.blood = this.opponentLevel + 4;
		if(this.opponentLevel >= 4) {
			opponent.blood += 4;
		}

		if(this.opponentLevel >= 5) {
			opponent.blood += 4;
		}
		opponent.unitBlood = Math.floor(opponent.opponentSize / opponent.blood);
		this.opponent.push(opponent);
	}

	this.checkEatGift = function() {
		let x = this.plane.x, y = this.plane.y;
		let u = this.gift.x, v = this.gift.y;

		if(v >= GAME_HEIGHT - this.gift.empowerSize) {
			this.gift = null;
			return;
		}

		let t1 = false, t2 = false;
		if(u + this.gift.empowerSize >= x && u <= x + DOT_SIZE) t1 = true;
		if(v <= y + DOT_SIZE && v + this.gift.empowerSize >= y) t2 = true;
		if(t1 && t2) {
			this.gift.clearScreen();
			this.gift = null;
			this.bulletLevel++;
		}
	}

	this.updateLevel = function() {
		if(this.scoreInc == this.opponentLevel * this.opponentLevel * this.opponentLevel) {
			this.opponentLevel++;
			this.scoreInc = 0;	
		}

		if(this.score == 10 || this.score == 36 || this.score == 100) {
			this.gift = this.empower;
			this.gift.new();
		}
	}

	this.updateOpponent = function() {
		while(this.opponent.length < this.opponentLevel) {
			this.addOpponent();
		}
	}

	this.checkHit = function(el, i) {
		let x = el.x, y = el.y;

		this.opponent.map((opponent, index) => {
			let u = opponent.x, v = opponent.y;
			let t1 = false, t2 = false;
			if(x + 5 > u && x < u + 20) t1 = true;
			if(y <= v + 20 && y + 5 > v + 20) t2 = true;
			if(t1 && t2) {
				// this.matrix.splice(i, 1);
				// console.log(i);
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

		if(this.gift != null) {
			this.gift.draw();
		}

		this.opponent.map(el => {
			el.draw();
		})
	}
}