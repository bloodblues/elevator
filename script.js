(function() {

	// Get the buttons.
	var upBtn = document.getElementById('upBtn');
	var stopBtn = document.getElementById('stopBtn');
	var resetBtn = document.getElementById('resetBtn');
	var chooseFloor = document.getElementsByClassName('chooseFloor');
    
	var requestID;
	var canvas = document.getElementById('stage');
	var ctx = canvas.getContext('2d');

	// Set the fill style for the drawing context.
	ctx.fillStyle = '#212121';

	// Variables to for the drawing position and object.
	var box = {
		width:30,
		height:60,
		x:canvas.width/3,
		y:canvas.height-boxHeight
	}
	
	var floorsAvaible = [];
	var previousSelectedFloor;
	var selectedFloor = 1;
	var boxWidth = 30;
	var boxHeight = 60;
	var posX = canvas.width/3;
	var posY = canvas.height-boxHeight;
	var pixelsPerFrame = 5; // How many pixels the box should move per frame.

	// Draw the initial box on the canvas.
	ctx.fillRect(posX, posY, boxWidth, boxHeight);

	// Animate.
	function animate() {
		
		requestID = requestAnimationFrame(animate);

		if (previousSelectedFloor<selectedFloor) {
			ctx.clearRect(posX, (posY + pixelsPerFrame),canvas.width, boxHeight);
			ctx.fillRect(posX, posY, boxWidth, boxHeight);
			// Y es mayor hasta que alcanza el piso (animacion sube)
			if (posY>floorsAvaible[selectedFloor]) {
				posY -= pixelsPerFrame;	
			}else{
				posY += pixelsPerFrame;	
				cancelAnimationFrame(requestID); 
			}
			
		}else if(previousSelectedFloor>selectedFloor){
			ctx.clearRect(posX, (posY - pixelsPerFrame),canvas.width, boxHeight);
			ctx.fillRect(posX, posY, boxWidth, boxHeight);
			// Y es menor hasta que alcanza el piso  (animacion Baja)
			if (posY<floorsAvaible[selectedFloor]) {
				posY += pixelsPerFrame;	
			}else{
				posY -= pixelsPerFrame;	
				cancelAnimationFrame(requestID);
			}
		}

		/*
		if (posY >= 10) {
			ctx.clearRect(posX, (posY + pixelsPerFrame),canvas.width, boxHeight);
			ctx.fillRect(posX, posY, boxWidth, boxHeight);
			posY -= pixelsPerFrame;
		} else {
			cancelAnimationFrame(requestID);
		}*/
		setFloors();

	}

	// SET FLOORS
	function setFloors(){
		var divisionHeight = 10;
		var currentY = 5;	
		for (var i = 0 ; i < 9; i++) {
			currentY += (i==0)?0:boxHeight+divisionHeight;
			//console.log(currentY);
			ctx.beginPath();
			ctx.moveTo(0,currentY);
			ctx.lineTo(100,currentY);
			ctx.lineWidth = divisionHeight;
			ctx.strokeStyle = '#D3D52E';
			ctx.stroke();
			// Letrero Piso
			ctx.font = '40pt Arial';
			ctx.fillStyle = '#2f2f2f';
			ctx.fillText(9-i, 33, currentY+53);

			//asignando pisos
			floorsAvaible[9-i] = currentY+5; 
		}
	}

	setFloors();

	var myFunction = function(){
		previousSelectedFloor = selectedFloor;
	    selectedFloor = this.textContent;
	    requestID = requestAnimationFrame(animate);
	}
	//Adding event to panel 

	for (var i = 0; i < chooseFloor.length; i++) {
    	chooseFloor[i].addEventListener('click', myFunction, false);
	}


	// Event listener for the up button.
	upBtn.addEventListener('click', function(e) {
		e.preventDefault();

		// up the elevator.
		requestID = requestAnimationFrame(animate);
	});


	// Event listener for the stop button.
	stopBtn.addEventListener('click', function(e) {
		e.preventDefault();

		// Stop the animation;
		cancelAnimationFrame(requestID);
	});


	// Event listener for the reset button.
	resetBtn.addEventListener('click', function(e) {
		e.preventDefault();

		// Reset the X position to 0.
		// Clear the canvas.
		ctx.clearRect(posX, (posY + pixelsPerFrame),canvas.width, boxHeight);
		posY = canvas.height-boxHeight;
		// Draw the initial box on the canvas.
		ctx.fillRect(posX, posY, boxWidth, boxHeight);
		setFloors();
	});

}());
