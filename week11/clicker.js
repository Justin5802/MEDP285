let shapeX;
let shapeY;
let shapeSize;
let shapeMaximumSize;
let shapeColor;
let score = 0;
let highScore;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB);
  noStroke();
  textSize(36);
  highScore = getItem('high score');

  if (highScore === null) {
    highScore = 0;
  }
}

function draw() {
  background(20);


  if (shapeSize > 0) {
    fill(shapeColor);
    drawShape(shapeX, shapeY, shapeSize);
    describeElement('Shape', 'Randomly colored shrinking shape');

    shapeSize -= 1;

    textAlign(RIGHT, TOP);
    fill(220);
    text(score, width - 20, 20);
    describeElement('Score', `Text with current score: ${score}`);
  } else {
    endGame();
  }
}

function startGame() {
  score = 0;
  shapeMaximumSize = min(height / 2, width / 2);
  resetShape();
}

function endGame() {
  noLoop();

  highScore = max(highScore, score);
  storeItem('high score', highScore);

  textAlign(CENTER, CENTER);
  fill(220);
  let startText = `Shape Clicker
  Click the shape before it gets too small
  Score: ${score}
  High score: ${highScore}
  Click to play`;
  text(startText, 0, 0, width, height);
  describeElement('Start text', `Text reading, "${startText}"`);
}

function resetShape() {
  shapeSize = shapeMaximumSize;
  shapeX = random(shapeSize, width - shapeSize);
  shapeY = random(shapeSize, height - shapeSize);
  shapeColor = color(random(240, 360), random(40, 80), random(50, 90));
  shapeType = int(random(4)); 
}

function drawShape(x, y, size) {
  switch (shapeType) {
    case 0: 
      ellipse(x, y, size, size);
      break;
    case 1: 
      rect(x - size / 2, y - size / 2, size, size);
      break;
    case 2: 
      triangle(x - size / 2, y + size / 2, x + size / 2, y + size / 2, x, y - size / 2);
      break;
    case 3: 
      rect(x - size / 2, y - size / 4, size, size / 2);
      break;
  }
}

function mousePressed() {
  if (isLooping() === true) {
    let distanceToShape = dist(mouseX, mouseY, shapeX, shapeY);
    let isInShape = false;

    switch (shapeType) {
      case 0: 
        if (distanceToShape < shapeSize / 2) {
          isInShape = true;
        }
        break;
      case 1: 
        if (mouseX > shapeX - shapeSize / 2 && mouseX < shapeX + shapeSize / 2 &&
            mouseY > shapeY - shapeSize / 2 && mouseY < shapeY + shapeSize / 2) {
          isInShape = true;
        }
        break;
      case 2: 
        let b1 = (mouseX > shapeX - shapeSize / 2 && mouseX < shapeX + shapeSize / 2 &&
                  mouseY > shapeY && mouseY < shapeY + shapeSize / 2);
        let b2 = (mouseX < shapeX + shapeSize / 2 && mouseX > shapeX - shapeSize / 2 &&
                  mouseY < shapeY && mouseY > shapeY - shapeSize / 2);
        if (b1 || b2) {
          isInShape = true;
        }
        break;
      case 3: 
        if (mouseX > shapeX - shapeSize / 2 && mouseX < shapeX + shapeSize / 2 &&
            mouseY > shapeY - shapeSize / 4 && mouseY < shapeY + shapeSize / 4) {
          isInShape = true;
        }
        break;
    }

    if (isInShape) {
      shapeMaximumSize = max(shapeMaximumSize - 1, 15);
      resetShape();
      score += 1;
    }
  } else {
    startGame();
    loop();
  }
}
