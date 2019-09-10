var boss1 = function(bullet) {
	this.game = bullet.game;
	this.bullet = bullet;
	this.x = 0;
	this.y = 0;
	this.bossSize = 50;
	this.main = null;
	this.bossLoaded = false;
	this.blood = 1000;
	this.unitBlood = 0;
	this.waiting = 0;
	this.directionY = 1;
	this.directionX = 1;
	this.speed = 5;
	this.dan = null;
	this.danSize = 10;
	this.speedY = 2;
	this.waitingY = 0;
	this.tpY = 60;
	this.trajectory = new Array(-2, -1, 0, 1, 2);

	this.init = function() {
		this.main = new Image();
		this.main.src = 'images/boss2.png';
		this.main.onload = () => {
			this.bossLoaded = true;
		}
		this.x = Math.floor(Math.random() * (GAME_WIDTH - this.bossSize));
		this.y = 0;
		this.unitBlood = this.bossSize / this.blood;
		this.dan = new Array();
		this.waitingY = this.tpY - 1;
	}

	this.update = function() {
		this.waiting++;
		this.waitingY++;
		if(this.waiting == this.speed) {
			this.clearScreen();
			this.y += this.directionY;
			this.x += this.directionX;
			if(this.y == 120) this.directionY *= -1;
			if(this.x == GAME_WIDTH - this.bossSize) this.directionX *= -1;
			if(this.y == 0) this.directionY *= -1;
			if(this.x == 0) this.directionX *= -1;
			this.waiting = 0;
		}

		if(this.waitingY == this.tpY) {
			this.addDan();
			this.waitingY = 0;
		}

		this.updateDan();
	}

	this.updateDan = function() {
		this.dan.map((el, i) => {
			this.clearDan(el);
			this.dan[i].x += this.dan[i].incX;
			this.dan[i].y += this.dan[i].incY;
		})

		this.dan.map((el, i) => {
			this.game.context.fillStyle = el.color;
			this.game.context.fillRect(el.x, el.y, this.danSize, this.danSize);
			if(this.bullet.gameOver) return;
		})

		this.dan.map((el, i) => {
			this.checkHit(el, i);
		})
	}

	this.checkHit = function(el, i) {
		let x = this.bullet.plane.x, y = this.bullet.plane.y;
		let u = el.x, v = el.y;
		let t1 = false, t2 = false;
		if(u + this.danSize >= x && x + DOT_SIZE >= u) t1 = true;
		if(v + this.danSize >= y && v <= y + DOT_SIZE) t2 = true;
		if(t1 && t2) {
			this.bullet.gameOver = true;
			this.clearScreen();
			this.dan.map(el => {
				this.clearDan(el);
			})
			return;
		}

		if(u + this.danSize <= 0 || v >= GAME_HEIGHT || u >= GAME_WIDTH) this.dan.splice(i, 1);
	}

	this.randomMove = function() {
		let id = Math.floor(Math.random() * 4);
		return this.trajectory[id];
	}

	this.addDan = function() {
		let k1 = new Object();
		k1.x = this.x;
		k1.y = this.y + this.bossSize;
		k1.color = '#050505';
		k1.incX = this.randomMove();
		k1.incY = this.speedY;
		this.dan.unshift(k1);

		let k2 = new Object();
		k2.x = this.x + this.danSize;
		k2.y = this.y + this.bossSize;
		k2.color = '#050505';
		k2.incX = this.randomMove();
		k2.incY = this.speedY;
		this.dan.unshift(k2);

		let k3 = new Object();
		k3.x = this.x + 2 * this.danSize;
		k3.y = this.y + this.bossSize;
		k3.color = '#050505';
		k3.incX = this.randomMove();
		k3.incY = this.speedY;
		this.dan.unshift(k3);

		let k4 = new Object();
		k4.x = this.x + 3 * this.danSize;
		k4.y = this.y + this.bossSize;
		k4.color = '#050505';
		k4.incX = this.randomMove();
		k4.incY = this.speedY;
		this.dan.unshift(k4);

		let k5 = new Object();
		k5.x = this.x + 4 * this.danSize;
		k5.y = this.y + this.bossSize;
		k5.color = '#050505';
		k5.incX = this.randomMove();
		k5.incY = this.speedY;
		this.dan.unshift(k5);
	}

	this.drawBlood = function() {
		if(this.blood <= 300) {
			this.game.context.fillStyle = '#ff0000';
		}
		else if(this.blood <= 600) {
			this.game.context.fillStyle = '#ffe000';
		}
		else if(this.blood <= 900) {
			this.game.context.fillStyle = '#6eff00';
		}
		else {
			this.game.context.fillStyle = '#306905';
		}
		this.game.context.fillRect(this.x, this.y - 10, this.unitBlood * this.blood, 7);
	}

	this.draw = function() {
		if(this.bossLoaded) {
			this.drawBlood();
			this.game.context.drawImage(this.main, this.x, this.y);
		}
	}

	this.clearDan = function(el) {
		this.game.context.fillStyle = '#FFFFFF';
		this.game.context.fillRect(el.x, el.y, this.danSize, this.danSize);
	}

	this.clearScreen = function() {
		this.game.context.fillStyle = '#FFFFFF';
		this.game.context.fillRect(this.x, this.y - 10, this.bossSize, this.bossSize + 10);
	}
}
