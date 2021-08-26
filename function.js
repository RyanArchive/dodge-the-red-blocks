
var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
	myGamePiece = new component(50, 70, "#89D7F1", 145, 420);
	myScore = new component("20px", "Yu Gothic UI", "black", 20, 40, "text");
	myGameArea.start();
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 340;
		this.canvas.height = 490;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea,10);
		},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.x = x;
	this.y = y;
	
	this.update = function() {
		ctx = myGameArea.context;

		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	this.newPos = function() {
		this.x += this.speedX;
		this.hitRight();
		this.hitLeft();
	}

	this.hitRight = function() {
		var right = myGameArea.canvas.width - this.width;
		if (this.x > right) {
			this.x = right;
		}
	}

	this.hitLeft = function() {
		var left = 0;
		if (this.x < left) {
			this.x = left;
		}
	}

	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}    
}

function updateGameArea() {
	var y, height, minDistance, maxDistance, distance;
	
	for (i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece.crashWith(myObstacles[i])) {
			return;
		} 
	}
	
	myGameArea.clear();
	myGameArea.frameNo += 1;
	
	if (myGameArea.frameNo == 1 || everyinterval(170)) {
		y = myGameArea.canvas.height;
		minDistance = 0;
		maxDistance = 290;        
		distance = Math.floor(Math.random() * (maxDistance - minDistance + 1) + minDistance);
		myObstacles.push(new component(50, 70, "#E61F26", distance, 0));
	}
    
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].y += 1.5;
		myObstacles[i].update();
	}
	
	myScore.text="SCORE: " + myGameArea.frameNo;
	myScore.update();
	myGamePiece.newPos();
	myGamePiece.update();
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
	return false;
}

function moveleft() {
	myGamePiece.speedX = -1;
}

function moveright() {
	myGamePiece.speedX = 1;
}

function clearmove() {
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}