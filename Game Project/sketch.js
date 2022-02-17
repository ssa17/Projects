var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var clouds;
var mountains;
var canyons;
var collectables;

var gameScore;
var lives;

var alive;

var flagPole;

var backgroundMusic;
var jumpSound;
var fallingSound;
var levelFinishedSound;
var restartSound;
var eatingSound;
var touchEnemy;

var platforms;

var enemies;

function preload(){
	soundFormats ('mp3', 'wav');

	//jump sound
	jumpSound = loadSound ('assets/jumping-grunt.mp3');
	jumpSound.setVolume(0.1);

	//falling sound
	fallingSound = loadSound ('assets/screaming-fall.mp3');
	fallingSound.setVolume(0.2);

	//end sound
	levelFinishedSound = loadSound ('assets/not-good.mp3');
	levelFinishedSound.setVolume(0.2);

	//restart with lives
	restartSound = loadSound ('assets/happened-restart.mp3');
	restartSound.setVolume(0.2);

	//eating burger sound
	eatingSound = loadSound ('assets/eating.mp3');
	eatingSound.setVolume(0.1);

	//contact made with enemy
	touchEnemy = loadSound ('assets/ouch.mp3');
	touchEnemy.setVolume(0.1);

	//background music
	backgroundMusic = loadSound ('assets/bgm.mp3', loaded);
	backgroundMusic.setVolume(0.1);
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	lives = 3;

	gameScore = 0;

	startGame();
}

function loaded(){
	backgroundMusic.loop();
}

function draw()
{
	background(64,224,208); // sky colour

	noStroke();
	fill(238,232,170);
	rect(0, floorPos_y, width, height/4); // draw ground

	push();
	translate(scrollPos,0);

	// Draw clouds.
	drawClouds();

	// Draw mountains.
	drawMountains();

	// Draw trees.
	drawTrees();

	// Draw canyons.
	for(i = 0; i < canyons.length; i++){
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	}
	
	// Draw collectable items.
	for(i = 0; i < collectables.length; i++){
		if(collectables[i].isFound == false){
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}

	//draw platforms
	for(i = 0; i < platforms.length; i++){
		platforms[i].draw();
	}

	//enemies
	for(i = 0; i < enemies.length; i++){
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

		if(isContact){
			if(lives > 0){
				lives --;
				touchEnemy.play();
				startGame();
				break;
			}
		}
	}

	//call flag pole
	renderFlagpole();

	pop();

	//lives counter
	for(i = 0; i < lives; i++){
		if(lives == 1){
			var s = random(30,33);
		} else{var s = random(30,31);}
		if(lives > 0){
			fill(255,0,0);
			heart(s+i*20,s,s/2);
		}
	}

	//gamescore counter
	fill(0);
	textSize(20);
	text('GameScore: ' + gameScore,10,20)

	//GameOver text
	if(lives < 1){
		textSize(35);
		text('GameOver! Reload to Play Again', width/3,height/2);
		return;
	}

	// Draw game character.	////////////  code located in drawGameCharBody.js file  /////////////
	drawGameChar();

	//level finished text
	if(flagPole.isReached == true){
		fill(0);
		textSize(35);
		text('You Won! Well Done!', width/3,height/2);
		gameChar_y -= 10
		return;
	}

	// Logic to make the game character move or the background scroll.
	if(isLeft && isPlummeting == false){
		if(gameChar_x > width * 0.4){
			gameChar_x -= 7;
		}else{scrollPos += 7;}
	}

	if(isRight && isPlummeting == false){
		if(gameChar_x < width * 0.6){
			gameChar_x  += 7;
		}else{scrollPos -= 7;} // negative for moving against the background
	}

	restart();

	checkPlayerDie();

	// Logic to make the game character rise and fall.
	//falling after jumping
	if(gameChar_y < floorPos_y){
		var isContact = false;
		for(i = 0; i < platforms.length; i++){
			if(platforms[i].checkContact(gameChar_world_x, gameChar_y)){
				isContact = true;
				isFalling = false;
				break;
			}
		}
		if(isContact == false){
			gameChar_y +=2.5;
			isFalling = true;
		}
	}else{isFalling = false};

	//plummeting or falling inside canyon
	if(isPlummeting == true){
		gameChar_y +=10;
		isLeft = false;
		isRight = false;
	}

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	checkFlagPole();	
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	if(alive == true && gameChar_y <= floorPos_y){
		if(key == 'A' || keyCode == 37){
			isLeft = true;
		}
		if(key == 'D' || keyCode == 39){
			isRight = true;
		}
	}
	if (keyCode == 32 && gameChar_y <= floorPos_y && (isFalling || isPlummeting) != true){
		gameChar_y -= 100;
		jumpSound.play();
	}
}

function keyReleased()
{
	if(key == 'A' || keyCode == 37){
		isLeft = false;
	}
	if(key == 'D' || keyCode == 39){
		isRight = false;
	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds(){
	for(var i = 0; i < clouds.length; i++){
		fill(100);
		rect(clouds[i]+83, 113, 160, 10, 10);
		ellipse(clouds[i]+184, 103, 35, 35);
		ellipse(clouds[i]+213, 108, 30, 30);
		ellipse(clouds[i]+158, 108, 25, 25);
		ellipse(clouds[i]+173, 93, 30, 30);
		ellipse(clouds[i]+208, 88, 25, 25);
		ellipse(clouds[i]+228, 113, 10, 10);
		ellipse(clouds[i]+193, 93, 20, 20);
		fill(255);
		rect(clouds[i]+85, 115, 160, 10, 10);
		ellipse(clouds[i]+186, 105, 35, 35);
		ellipse(clouds[i]+215, 110, 30, 30);
		ellipse(clouds[i]+160, 110, 25, 25);
		ellipse(clouds[i]+175, 95, 30, 30);
		ellipse(clouds[i]+210, 90, 25, 25);
		ellipse(clouds[i]+230, 115, 10, 10);
		ellipse(clouds[i]+195, 95, 20, 20);
	}
}

// Function to draw mountains objects.
function drawMountains(){
	for(var i = 0; i < mountains.length; i++){
		push()
		noStroke();
		fill(147,112,219);
		triangle(mountains[i]-124,floorPos_y,
			mountains[i]+76,floorPos_y-300,
			mountains[i]+276,floorPos_y);
		fill(255,255,255);
		beginShape()
		vertex(mountains[i]+76, 132);
		vertex(mountains[i]+10, 230);
		vertex(mountains[i]+49, 210);
		vertex(mountains[i]+57, 252);
		vertex(mountains[i]+78, 216);
		vertex(mountains[i]+90, 243);
		vertex(mountains[i]+104, 222);
		vertex(mountains[i]+143, 232);
		endShape()
		pop()
	}
}

// Function to draw trees objects.
function drawTrees(){
	for(var i = 0; i < trees_x.length; i++){
		push();
		stroke(47,79,79);
		strokeWeight(0.5);
		fill(119,136,153);
		ellipse(trees_x[i]+2,floorPos_y-1,15,7);
		ellipse(trees_x[i]+23,floorPos_y-1,15,7);
		
		push();
		strokeWeight(1);
		stroke(46,139,87)
		fill(0,255,0);
		ellipse(trees_x[i]+5,floorPos_y-28,7,60);
		line(trees_x[i]+4.5,floorPos_y-58,trees_x[i]+4.5,floorPos_y+1);
		ellipse(trees_x[i]+13,floorPos_y-30,7,75);
		line(trees_x[i]+12.5,floorPos_y-67,trees_x[i]+12.5,floorPos_y+6);
		ellipse(trees_x[i]+20,floorPos_y-22,7,45);
		line(trees_x[i]+19.5,floorPos_y-45,trees_x[i]+19.5,floorPos_y);
		pop();

		ellipse(trees_x[i],floorPos_y+1,15,7);
		ellipse(trees_x[i]+5,floorPos_y+2,15,7);
		ellipse(trees_x[i]+25,floorPos_y+1,15,7);
		ellipse(trees_x[i]+20,floorPos_y+2,15,7);
		ellipse(trees_x[i]+13,floorPos_y+4,15,7);
		pop();
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon){
	push();
	fill(189,183,107);
	rect(t_canyon.x_pos,floorPos_y,t_canyon.width,height);
	stroke(183,134,11);
	strokeWeight(5);
	line(t_canyon.x_pos,floorPos_y+1,t_canyon.x_pos,600);
	line(t_canyon.x_pos+t_canyon.width,floorPos_y+1,t_canyon.x_pos+t_canyon.width,height);
	pop();
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon){
	if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y == floorPos_y){
		isPlummeting = true;
		fallingSound.play();
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable){
		fill(244,164,96);
		stroke(160,82,45);
		rect(t_collectable.x_pos-10,t_collectable.y_pos+9,t_collectable.size-25,t_collectable.size-45,1);
		push()
		fill(139,69,19);
		rect(t_collectable.x_pos-10,t_collectable.y_pos+5,t_collectable.size-25,t_collectable.size-45,1);
		push()
		fill(0,255,0);
		stroke(50,205,50);
		rect(t_collectable.x_pos-9.5,t_collectable.y_pos+3,t_collectable.size-26,t_collectable.size-46,2);
		pop()
		rect(t_collectable.x_pos-10,t_collectable.y_pos-1,t_collectable.size-25,t_collectable.size-45,1);
		pop()
		arc(t_collectable.x_pos+3,t_collectable.y_pos+1,t_collectable.size-25,t_collectable.size-28,PI,0,CHORD);
		noStroke();
		fill(245,222,179);
		ellipse(t_collectable.x_pos+8,t_collectable.y_pos-4,t_collectable.size-48,t_collectable.size-49);
		ellipse(t_collectable.x_pos-4,t_collectable.y_pos-5,t_collectable.size-48,t_collectable.size-49);
		ellipse(t_collectable.x_pos+3,t_collectable.y_pos-2,t_collectable.size-48,t_collectable.size-49);
		ellipse(t_collectable.x_pos,t_collectable.y_pos-7,t_collectable.size-48,t_collectable.size-49);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable){
	if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 55){
		t_collectable.isFound = true;
		gameScore ++;
		eatingSound.play();
	}
}

//flagPole
function renderFlagpole(){
	push();
	stroke(100);
	strokeWeight(10);
	line(flagPole.x, floorPos_y, flagPole.x, floorPos_y - 150);
	pop();
	fill(255,0,0);
	rect(flagPole.x-5, flagPole.y, 35,20,2);
}

function checkFlagPole(){
	var d = abs(gameChar_world_x - flagPole.x);
	if(d < 15){
		flagPole.y = floorPos_y - 160;
		flagPole.isReached = true;
		levelFinishedSound.play();
	}
}

//death checker
function checkPlayerDie(){
	if(gameChar_y > height && alive == true){
		lives--;
		alive = false;
	}
}

//restarts the character after death
function restart(){
	if(alive == false && lives > 0){
		fill(0);
		textSize(30)
		text('Oops! Press Space to Restart', width/3, height/2)
		startGame();
		gameChar_x = width/2;
		gameChar_y = floorPos_y;
		restartSound.play();
	}

		
}

//hearts drawing code
function heart(x, y, size) {
	beginShape();
	vertex(x, y);
	bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
	bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
	endShape(CLOSE);
}

function startGame(){
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the gameworld. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	trees_x = [-850, -300, 100, 350, 800, 1500];

	clouds = [-2650, -2750, -2200, -1500, -850, -300, 0, 100, 700, 1300, 1900, 2450, 2550, 3500];

	mountains = [-2050, -2200, -1500, -500, 200, 350, 1000, 1700, 2500, 2650, 3500, 3800,];

	canyons = [
		{x_pos: 150, width: 150, isPlummeting: false},
		{x_pos: 650, width: 100, isPlummeting: false},
		{x_pos: -450, width: 100, isPlummeting: false},
		{x_pos: -1000, width: 100, isPlummeting: false},
		{x_pos: -1500, width: 100, isPlummeting: false},
		{x_pos: 1050, width: 300, isPlummeting: false},
		{x_pos: 1600, width: 100, isPlummeting: false},
		{x_pos: 2200, width: 100, isPlummeting: false},
		{x_pos: -2400, width: 750, isPlummeting: false},
		{x_pos: 3000, width: 100, isPlummeting: false}
	];

	collectables = [
		{x_pos: 230,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: 700,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: -400,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: -950,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: -1185,y_pos: floorPos_y-300,size: 50,isFound: false},
		{x_pos: 1100,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: 1650,y_pos: floorPos_y-150,size: 50,isFound: false},
		{x_pos: 2250,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: 3050,y_pos: floorPos_y-75,size: 50,isFound: false},
		{x_pos: 2815,y_pos: floorPos_y-200,size: 50,isFound: false}
	];

	flagPole = {
		x: 3300,
		y: floorPos_y - 20,
		isReached: false,
	};

	alive = true;

	platforms = [];
	platforms.push(createPlatforms(200,floorPos_y - 30,65));
	platforms.push(createPlatforms(1170,floorPos_y - 30,75));
	platforms.push(createPlatforms(1530,floorPos_y - 80,75));
	platforms.push(createPlatforms(-1220,floorPos_y - 80,75));
	platforms.push(createPlatforms(-1220,floorPos_y - 180,75));
	platforms.push(createPlatforms(2440,floorPos_y - 80,75));
	platforms.push(createPlatforms(2570,floorPos_y - 145,175));

	enemies = [];
	enemies.push(new Enemy(-150, floorPos_y - 10, 100));
	enemies.push(new Enemy(1765, floorPos_y - 10, 350));
	enemies.push(new Enemy(-790, floorPos_y - 10, 250));
	enemies.push(new Enemy(-1637, floorPos_y - 10, 115));
	enemies.push(new Enemy(2575, floorPos_y - 165, 150));
}

function createPlatforms(x, y, length){
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function(){
			fill(189,183,107);
			rect(this.x, this.y, this.length, 10, 5);
		},
		checkContact: function(gc_x, gc_y){
			if(gc_x > this.x && gc_x < this.x + this.length){
				var d = this.y - gc_y;
				if(d >= 0 && d < 3){
					return true;
				}
			}
			return false;
		}
	}
	return p;
}

function Enemy(x, y, range){
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.inc = 1;

	this.update = function(){
		this.currentX += this.inc;
		if(this.currentX >= this.x + this.range){
			this.inc = -1;
		}else if(this.currentX <= this.x){
			this.inc = 1;
		}
	}
	
	this.draw = function(){
		this.update();
		stroke(255);
		fill(238, 130, 238);
		rect(this.currentX - 10, this.y - 5, 5, 15, 5)
		rect(this.currentX - 3, this.y, 5, 22, 5)
		rect(this.currentX + 5, this.y - 5, 5, 20, 5)
		ellipse(this.currentX, this.y - 10, 30, 25);
		noStroke();
		fill(128, 0, 128);
		ellipse(this.currentX + 5, this.y - 13, 5)
	}

	this.checkContact = function(gc_x, gc_y){
		var d = dist(gc_x, gc_y, this.currentX, this.y);
		if(d < 35){
			return true;
		}
		return false;
	}
}
