
/////////////////////////////-----Function to draw the game character-----/////////////////////////////////////////////
function drawGameChar()
{
	if(isLeft && isFalling) //////////////////////    jumping left    /////////////////////////
	{
		fill(250,128,114);
		stroke(220,20,60);
		
		jumpingArms();
		leftBody();
	
		//legs
		beginShape()
		curveVertex(gameChar_x-19,gameChar_y-12);	
		curveVertex(gameChar_x-13,gameChar_y-14);
		curveVertex(gameChar_x-9,gameChar_y-10);
		curveVertex(gameChar_x-25,gameChar_y-10);
		endShape();
		beginShape()
		curveVertex(gameChar_x+13,gameChar_y-6);	
		curveVertex(gameChar_x+8,gameChar_y-11);
		curveVertex(gameChar_x+16,gameChar_y-13);
		curveVertex(gameChar_x+22,gameChar_y-9);
		endShape();
	
		pants();
	
		//eyes
		stroke(0);
		fill(255);
		ellipse(gameChar_x-5,gameChar_y-45,8,10);
		ellipse(gameChar_x,gameChar_y-45,8,10);
		push()
		strokeWeight(2);
		point(gameChar_x-1,gameChar_y-42);
		point(gameChar_x-6,gameChar_y-42);
		pop()
	
		leftEyebrows();
	
		//mouth
		push()
		fill(139,0,0);
		ellipse(gameChar_x-5,gameChar_y-32,7,3);
		noStroke();
		fill(255,192,203);
		ellipse(gameChar_x-5,gameChar_y-31,3,1);
		pop()
	}
	else if(isRight && isFalling) ////////////////    jumping right   /////////////////////////
	{
		fill(250,128,114);
		stroke(220,20,60);
		
		jumpingArms();
		rightBody();
	
		//legs
		beginShape()
		curveVertex(gameChar_x+19,gameChar_y-12);	
		curveVertex(gameChar_x+13,gameChar_y-14);
		curveVertex(gameChar_x+9,gameChar_y-10);
		curveVertex(gameChar_x+25,gameChar_y-10);
		endShape();
		beginShape()
		curveVertex(gameChar_x-13,gameChar_y-6);	
		curveVertex(gameChar_x-8,gameChar_y-11);
		curveVertex(gameChar_x-16,gameChar_y-13);
		curveVertex(gameChar_x-22,gameChar_y-9);
		endShape();
	
		pants();
	
		//eyes
		stroke(0);
		fill(255);
		ellipse(gameChar_x+5,gameChar_y-45,8,10);
		ellipse(gameChar_x,gameChar_y-45,8,10);
		push()
		strokeWeight(2);
		point(gameChar_x+1,gameChar_y-42);
		point(gameChar_x+6,gameChar_y-42);
		pop()
	
		rightEyebrows();
	
		//mouth
		push()
		fill(139,0,0);
		ellipse(gameChar_x+5,gameChar_y-32,7,3);
		noStroke();
		fill(255,192,203);
		ellipse(gameChar_x+5,gameChar_y-31,3,1);
		pop()
	}
	else if(isLeft) //////////////////////////////    walking left    /////////////////////////
	{
		fill(250,128,114);
		stroke(220,20,60);
		
		walkingArms();
		leftBody();

		//legs
		beginShape()
		curveVertex(gameChar_x-19,gameChar_y-6);	
		curveVertex(gameChar_x-12,gameChar_y-14);
		curveVertex(gameChar_x-9,gameChar_y-10);
		curveVertex(gameChar_x-19,gameChar_y-4);
		endShape();
		beginShape()
		curveVertex(gameChar_x+15,gameChar_y-6);	
		curveVertex(gameChar_x+9,gameChar_y-10);
		curveVertex(gameChar_x+15,gameChar_y-12);
		curveVertex(gameChar_x+19,gameChar_y-5);
		endShape();

		pants();

		//eyes
		stroke(0);
		fill(255);
		ellipse(gameChar_x-5,gameChar_y-45,8,10);
		ellipse(gameChar_x+1,gameChar_y-45,8,10);
		push()
		strokeWeight(2);
		point(gameChar_x-7,gameChar_y-45);
		point(gameChar_x-1,gameChar_y-45);
		pop()

		leftEyebrows();

		//mouth
		push()
		fill(139,0,0);
		ellipse(gameChar_x-3,gameChar_y-32,12,7);
		noStroke();
		fill(250,128,114);
		ellipse(gameChar_x-3,gameChar_y-34,12,4.5);
		fill(255,192,203);
		ellipse(gameChar_x-2,gameChar_y-30,5,2);
		pop()
		noFill();
		bezier(gameChar_x-9,gameChar_y-33,
			gameChar_x-7,gameChar_y-32,
			gameChar_x,gameChar_y-32,
			gameChar_x+3,gameChar_y-33);
		line(gameChar_x-9.5,gameChar_y-34,gameChar_x-10.5,gameChar_y-33);
		line(gameChar_x+2,gameChar_y-34.5,gameChar_x+3.5,gameChar_y-33);
	}
	else if(isRight) /////////////////////////////    walking right   /////////////////////////
	{
		fill(250,128,114);
		stroke(220,20,60);
		
		walkingArms();
		rightBody();

		//legs
		beginShape()
		curveVertex(gameChar_x+19,gameChar_y-6);	
		curveVertex(gameChar_x+12,gameChar_y-14);
		curveVertex(gameChar_x+9,gameChar_y-10);
		curveVertex(gameChar_x+19,gameChar_y-4);
		endShape();
		beginShape()
		curveVertex(gameChar_x-15,gameChar_y-6);	
		curveVertex(gameChar_x-9,gameChar_y-10);
		curveVertex(gameChar_x-15,gameChar_y-12);
		curveVertex(gameChar_x-19,gameChar_y-5);
		endShape();

		pants();

		//eyes
		stroke(0);
		fill(255);
		ellipse(gameChar_x+5,gameChar_y-45,8,10);
		ellipse(gameChar_x,gameChar_y-45,8,10);
		push()
		strokeWeight(2);
		point(gameChar_x+2,gameChar_y-45);
		point(gameChar_x+7,gameChar_y-45);
		pop()

		rightEyebrows();

		//mouth
		push()
		fill(139,0,0);
		ellipse(gameChar_x+3,gameChar_y-32,12,7);
		noStroke();
		fill(250,128,114);
		ellipse(gameChar_x+3,gameChar_y-34,12,4.5);
		fill(255,192,203);
		ellipse(gameChar_x+2,gameChar_y-30,5,2);
		pop()
		noFill();
		bezier(gameChar_x+9,gameChar_y-33,
			gameChar_x+7,gameChar_y-32,
			gameChar_x,gameChar_y-32,
			gameChar_x-3,gameChar_y-33);
		line(gameChar_x-3.5,gameChar_y-34,gameChar_x-4.5,gameChar_y-33);
		line(gameChar_x+8,gameChar_y-34.5,gameChar_x+9.5,gameChar_y-33);
	}
	else if(isFalling || isPlummeting) ///////////  jumping facing forward   //////////////////
	{
		fill(250,128,114);
		stroke(220,20,60);
		
		jumpingArms();
		leftBody();

		//legs
		ellipse(gameChar_x-9,gameChar_y-11,7,12);
		ellipse(gameChar_x+9,gameChar_y-11,7,12);

		pants();

		//eyes
		stroke(0);
		fill(255);
		ellipse(gameChar_x-5,gameChar_y-45,8,10);
		ellipse(gameChar_x+1,gameChar_y-45,8,10);
		push()
		strokeWeight(2);
		point(gameChar_x-5,gameChar_y-42);
		point(gameChar_x,gameChar_y-42);
		pop()

		leftEyebrows();

		//mouth
		push()
		fill(139,0,0);
		ellipse(gameChar_x-3,gameChar_y-32,7,3);
		noStroke();
		fill(255,192,203);
		ellipse(gameChar_x-3,gameChar_y-31,3,1);
		pop()
	}
	else /////////////////////////////////////////   facing forward   /////////////////////////
	{
		fill(250,128,114);
		stroke(220,20,60);
		//left arm
		curveTightness(10);
		beginShape()
		curveVertex(gameChar_x-20,gameChar_y-21);
		curveVertex(gameChar_x-10,gameChar_y-29);	
		curveVertex(gameChar_x-11,gameChar_y-36);
		curveVertex(gameChar_x-21,gameChar_y-25);
		endShape();
		//right arm
		beginShape()
		curveVertex(gameChar_x+20,gameChar_y-21);
		curveVertex(gameChar_x+10,gameChar_y-29);	
		curveVertex(gameChar_x+11,gameChar_y-36);
		curveVertex(gameChar_x+21,gameChar_y-25);
		endShape();

		leftBody();

		//legs
		ellipse(gameChar_x-9,gameChar_y-7,7,12);
		ellipse(gameChar_x+9,gameChar_y-7,7,12);

		pants();

		//eyes
		stroke(0);
		fill(255);
		ellipse(gameChar_x-5,gameChar_y-45,8,10);
		ellipse(gameChar_x+1,gameChar_y-45,8,10);
		push()
		strokeWeight(2);
		point(gameChar_x-5,gameChar_y-45);
		point(gameChar_x,gameChar_y-45);
		pop()

		leftEyebrows();

		//mouth
		push()
		fill(139,0,0);
		ellipse(gameChar_x-3,gameChar_y-32,12,7);
		noStroke();
		fill(250,128,114);
		ellipse(gameChar_x-3,gameChar_y-34,12,4.5);
		fill(255,192,203);
		ellipse(gameChar_x-2,gameChar_y-30,5,2);
		pop()
		noFill();
		bezier(gameChar_x-9,gameChar_y-33,
			gameChar_x-7,gameChar_y-32,
			gameChar_x,gameChar_y-32,
			gameChar_x+3,gameChar_y-33);
		line(gameChar_x-9.5,gameChar_y-34,gameChar_x-10.5,gameChar_y-33);
		line(gameChar_x+2,gameChar_y-34.5,gameChar_x+3.5,gameChar_y-33);
	}
}

//functions to reduce drawing iterations
function pants(){
	//pants
	push()
	stroke(0);
	fill(0,200,0);
	bezier(gameChar_x-17.5,gameChar_y-17,
		gameChar_x-12,gameChar_y-4,
		gameChar_x+13,gameChar_y-4,
		gameChar_x+17.5,gameChar_y-17);
	line(gameChar_x-18,gameChar_y-18,gameChar_x+17,gameChar_y-18);
	noStroke()
	fill(153,50,204);
	ellipse(gameChar_x-7,gameChar_y-14,5,5);
	ellipse(gameChar_x+5,gameChar_y-12,3,3);
	ellipse(gameChar_x+12,gameChar_y-15,4,4);
	pop()
}
function jumpingArms(){
	//left arm
	curveTightness(10);
	beginShape()
	curveVertex(gameChar_x-20,gameChar_y-37);
	curveVertex(gameChar_x-10,gameChar_y-29);	
	curveVertex(gameChar_x-11,gameChar_y-36);
	curveVertex(gameChar_x-21,gameChar_y-41);
	endShape();
	//right arm
	beginShape()
	curveVertex(gameChar_x+20,gameChar_y-37);
	curveVertex(gameChar_x+10,gameChar_y-29);	
	curveVertex(gameChar_x+11,gameChar_y-36);
	curveVertex(gameChar_x+21,gameChar_y-41);
	endShape();
}
function walkingArms(){
	//left arm
	curveTightness(10);
	beginShape()
	curveVertex(gameChar_x-20,gameChar_y-29);
	curveVertex(gameChar_x-10,gameChar_y-29);	
	curveVertex(gameChar_x-11,gameChar_y-36);
	curveVertex(gameChar_x-21,gameChar_y-25);
	endShape();
	//right arm
	beginShape()
	curveVertex(gameChar_x+20,gameChar_y-29);
	curveVertex(gameChar_x+10,gameChar_y-29);	
	curveVertex(gameChar_x+11,gameChar_y-36);
	curveVertex(gameChar_x+21,gameChar_y-25);
	endShape();
}
function leftBody(){
	//body
	ellipse(gameChar_x,gameChar_y-17,33,20);
	triangle(gameChar_x,gameChar_y-65,
		gameChar_x-17,gameChar_y-17,
		gameChar_x+17,gameChar_y-17);
	curveTightness(10);
	beginShape();
	curveVertex(gameChar_x+4,gameChar_y-67);
	curveVertex(gameChar_x-3,gameChar_y-58);
	curveVertex(gameChar_x+3,gameChar_y-57);
	curveVertex(gameChar_x+4,gameChar_y-67);
	endShape();
}
function rightBody(){
	//body
	ellipse(gameChar_x,gameChar_y-17,33,20);
	triangle(gameChar_x,gameChar_y-65,
		gameChar_x-17,gameChar_y-17,
		gameChar_x+17,gameChar_y-17);
	curveTightness(10);
	beginShape();
	curveVertex(gameChar_x-4,gameChar_y-67);
	curveVertex(gameChar_x+3,gameChar_y-58);
	curveVertex(gameChar_x-3,gameChar_y-57);
	curveVertex(gameChar_x-4,gameChar_y-67);
	endShape();
}
function leftEyebrows(){
	//eyeBrows
	line(gameChar_x-4,gameChar_y-54,gameChar_x-6,gameChar_y-53);
	line(gameChar_x-4,gameChar_y-53,gameChar_x-6,gameChar_y-52);
	line(gameChar_x,gameChar_y-54,gameChar_x+2,gameChar_y-53);
	line(gameChar_x,gameChar_y-53,gameChar_x+2,gameChar_y-52);
}
function rightEyebrows(){
	//eyeBrows
	line(gameChar_x+3,gameChar_y-54,gameChar_x+5,gameChar_y-53);
	line(gameChar_x+3,gameChar_y-53,gameChar_x+5,gameChar_y-52);
	line(gameChar_x-1,gameChar_y-54,gameChar_x-3,gameChar_y-53);
	line(gameChar_x-1,gameChar_y-53,gameChar_x-3,gameChar_y-52);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////