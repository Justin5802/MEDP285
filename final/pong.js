 const canvas = document.getElementById("pong");
 const context = canvas.getContext("2d");

 const paddleWidth = 10, paddleHeight = 100;
 let ballRadius = 10;

 const paddleLeft = {
     x: 0,
     y: canvas.height / 2 - paddleHeight / 2,
     width: paddleWidth,
     height: paddleHeight,
     speed: 5,
     dy: 0
 };

 const paddleRight = {
     x: canvas.width - paddleWidth,
     y: canvas.height / 2 - paddleHeight / 2,
     width: paddleWidth,
     height: paddleHeight,
     speed: 4,
     dy: 0
 };

 const ball = {
     x: canvas.width / 2,
     y: canvas.height / 2,
     radius: ballRadius,
     speed: 4,
     dx: 4,
     dy: 4
 };

 let gameRunning = false;  
 let upPressed = false;
 let downPressed = false;


 function drawPaddle(x, y, width, height) {
     context.fillStyle = "#FFF";
     context.fillRect(x, y, width, height);
 }

 function drawBall(x, y, radius) {
     context.fillStyle = "#FFF";
     context.beginPath();
     context.arc(x, y, radius, 0, Math.PI * 2, false);
     context.closePath();
     context.fill();
 }

 function update() {
     paddleLeft.y += paddleLeft.dy;
     paddleRight.y += paddleRight.dy;

     if (paddleLeft.y < 0) paddleLeft.y = 0;
     if (paddleLeft.y + paddleLeft.height > canvas.height) paddleLeft.y = canvas.height - paddleLeft.height;
     if (paddleRight.y < 0) paddleRight.y = 0;
     if (paddleRight.y + paddleRight.height > canvas.height) paddleRight.y = canvas.height - paddleRight.height;

     ball.x += ball.dx;
     ball.y += ball.dy;

     if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
         ball.dy = -ball.dy;
     }

     if (ball.x - ball.radius < paddleLeft.x + paddleLeft.width && ball.y > paddleLeft.y && ball.y < paddleLeft.y + paddleLeft.height) {
         ball.dx = -ball.dx;
     }

     if (ball.x + ball.radius > paddleRight.x && ball.y > paddleRight.y && ball.y < paddleRight.y + paddleRight.height) {
         ball.dx = -ball.dx;
     }

     if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
         ball.x = canvas.width / 2;
         ball.y = canvas.height / 2;
         ball.dx = -ball.dx;
     }

     if (ball.y < paddleRight.y + paddleRight.height / 2) {
         paddleRight.dy = -paddleRight.speed;
     } else {
         paddleRight.dy = paddleRight.speed;
     }
 }

 function render() {
     context.clearRect(0, 0, canvas.width, canvas.height);
     drawPaddle(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
     drawPaddle(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
     drawBall(ball.x, ball.y, ball.radius);
 }

 function preventDefaultScrolling(event) {
     if (gameRunning) {
         event.preventDefault();
     }
 }

 document.addEventListener("keydown", function(event) {
     if (event.key === "ArrowUp") {
         upPressed = true;
     }
     if (event.key === "ArrowDown") {
         downPressed = true;
     }
 });

 document.addEventListener("keyup", function(event) {
     if (event.key === "ArrowUp") {
         upPressed = false;
     }
     if (event.key === "ArrowDown") {
         downPressed = false;
     }
 });

 function movePaddle() {
     if (upPressed) {
         paddleLeft.dy = -paddleLeft.speed;
     } else if (downPressed) {
         paddleLeft.dy = paddleLeft.speed;
     } else {
         paddleLeft.dy = 0;
     }
 }


 function gameLoop() {
     movePaddle();
     update();
     render();
     requestAnimationFrame(gameLoop);
 }

 document.getElementById("startGameButton").addEventListener("click", function() {
     gameRunning = true;
     document.getElementById("startGameButton").style.display = "none";
     document.getElementById("endGameButton").style.display = "inline-block";
     canvas.style.display = "block"; 
     document.body.addEventListener("keydown", preventDefaultScrolling, { passive: false });  
     gameLoop(); 
 });

 document.getElementById("endGameButton").addEventListener("click", function() {
     gameRunning = false;
     document.getElementById("startGameButton").style.display = "inline-block";
     document.getElementById("endGameButton").style.display = "none";
     canvas.style.display = "none";  
     document.body.removeEventListener("keydown", preventDefaultScrolling);  
 });