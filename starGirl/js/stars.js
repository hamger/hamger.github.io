var stars = [];
var num = 60;
var alive = 0;
var starObj = function() { //定义星星的类
	this.x;
	this.y;

	this.xSpd;
	this.ySpd;

	this.picNo;
	this.timer;
	this.beta;
}


starObj.prototype.initialize = function() {  //初始化赋值
	this.x = Math.random() * girlWidth + padLeft;
	this.y = Math.random() * girlHeight + padTop;

	this.ySpd = Math.random() * 0.6 - 0.3; //[-0.3,0.3)
	this.xSpd = Math.random() * 0.2 - 0.1; //[-0.1,0.1)

	this.picNo = Math.floor(Math.random() * 7);
	this.timer = 0;
	this.beta = Math.random() * Math.PI * 0.5;
}

starObj.prototype.draw = function() { //画星星
	this.beta += deltaTime * 0.005;
	ctx.save();
	ctx.globalAlpha = Math.sin(this.beta) * alive; //透明度缓冲动画
	ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
	ctx.restore();
}



starObj.prototype.update = function() {  //规定星星出现位置和总数量
	this.x += this.xSpd;
	this.y += this.ySpd;

	if (this.x > (padLeft + girlWidth - 7) || this.x < padLeft)
		this.initialize ();
	else if (this.y > (padTop + girlHeight - 7) || this.y < padTop)
		this.initialize ();

	this.timer += deltaTime;
	if (this.timer > 30) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
}


function drawStars() {  //画很多动态的星星
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}

function aliveUpdate() { //控制星星显示和消失
	if (switchy) {
		alive += 0.03;
		if (alive > 0.7) {
			alive = 0.7;
		}
	} else {
		alive -= 0.03;
		if (alive < 0) {
			alive = 0;
		}
	}
}













