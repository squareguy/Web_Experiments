var
canvas = document.getElementsByTagName("canvas")[0],
context = canvas.getContext("2d"), 
i, currentScore = 0, started = false, width;


canvas.width = canvas.height = 500;
width = canvas.width / 10;
renderScore();


var snake = {
  style: "black",
  x: 0,
  y: 0,
  speed: 90,
  move:function(x, y){
    snake.x = x;snake.y = y;
    //Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.width);
    //Render Snake
    context.fillStyle = snake.style;
    context.fillRect(x, y, width, width);
    //Render Food
    context.fillStyle = food.style;
    context.fillRect(food.x, food.y, width, width);
  }
};


var food = {
  style: "red",
  x: 0,
  y: 0,
  possibleX: [],
  possibleY: [],
  getpossibleXY: function() {
    for (i = 0; i < canvas.width; i += width)
      food.possibleX.push(i);
    for (i = 0; i < canvas.height; i += width)
      food.possibleY.push(i);
  },
  generateCoord: function() {
    if(food.possibleX.length === 0) food.getpossibleXY();
    food.x = food.possibleX[Math.floor(Math.random() * food.possibleX.length)];
    food.y = food.possibleY[Math.floor(Math.random() * food.possibleY.length)];
  }
};


var keysPressed = [false, false, false, false], keys = [37, 38, 39, 40];


document.addEventListener("keydown", function(event) {
  for (i = 0; i < keys.length; i++) {
    if (event.keyCode === keys[i])
      keysPressed[i] = true;
    else
      keysPressed[i] = false;
  }
  if (!started)
    started = true;
});


food.generateCoord();
snake.move(0, 0);


var gameLoop = setInterval(function() {
  
  if (keysPressed[0])
    snake.move(snake.x - width, snake.y);
  
  else if (keysPressed[1])
    snake.move(snake.x, snake.y - width);
  
  else if (keysPressed[2])
    snake.move(snake.x + width, snake.y);
  
  else if (keysPressed[3])
    snake.move(snake.x, snake.y + width);
  
  if(snake.x === food.x && snake.y === food.y) score();
      
  if (snake.x < 0 || snake.y < 0 || snake.x > canvas.width - width || snake.y > canvas.width - width && started)
    restart();

}, snake.speed);


function restart() {
  for (i = 0; i < keysPressed.length; i++)
    keysPressed[i] = false;
  snake.move(0, 0);
  started = false;
  currentScore = 0;
  renderScore();
}


function score() {
  currentScore++;
  if (currentScore > localStorage.highScore)
    localStorage.highScore = currentScore;
  food.generateCoord();
  renderScore();
}


function renderScore(){
  document.getElementById("currentScore").innerHTML ="Current Score: " + currentScore;
  document.getElementById("highScore").innerHTML = "High Score: " + localStorage.highScore;
}