var i, currentScore = 0, started = false,
canvas = document.getElementsByTagName("canvas")[0], 
context = canvas.getContext("2d");
canvas.width = canvas.height = 500;


var snake = {
  width: canvas.width / 10,
  style: "black",
  size: 1,
  x: 0,
  y: 0,
  speed: 90,
  parts: new Array()
};


var food = {
  style: "red",
  x: 0,
  y: 0,
  possibleX: [],
  possibleY: [],
  getpossibleXY: function() {
    for (i = 0; i < canvas.width; i += snake.width)
      food.possibleX.push(i);
    for (i = 0; i < canvas.height; i += snake.width)
      food.possibleY.push(i);
  },
  generate: function() {
    if (
    food.possibleX[Math.floor(Math.random() * food.possibleX.length)] === snake.x || 
    food.possibleX[Math.floor(Math.random() * food.possibleX.length)] === snake.x + snake.width || 
    food.possibleY[Math.floor(Math.random() * food.possibleX.length)] === snake.y || 
    food.possibleX[Math.floor(Math.random() * food.possibleX.length)] === snake.y + snake.width)
      food.generate();
    else
      move(food.possibleX[Math.floor(Math.random() * food.possibleX.length)], food.possibleY[Math.floor(Math.random() * food.possibleX.length)], food);
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
  if(!started) started = true;
});


food.getpossibleXY();
console.log(food.possibleX);
food.generate();
move(snake.x === 0 ? 0 : snake.x, snake.y === 0 ? 0 : snake.y, snake);


setInterval(function() {
  
  if (keysPressed[0])
    move(snake.x - snake.width, snake.y, snake);
  
  else if (keysPressed[1])
    move(snake.x, snake.y - snake.width, snake);
  
  else if (keysPressed[2])
    move(snake.x + snake.width, snake.y, snake);
  
  else if (keysPressed[3])
    move(snake.x, snake.y + snake.width, snake);
  
  if (snake.x < 0 || snake.y < 0 || snake.x > canvas.width-snake.width || snake.y > canvas.width - snake.width && started) restart();

}, snake.speed);


function move(x, y, type) {
  type.x = x;
  type.y = y;
  if (snake.x === food.x && snake.y === food.y) score();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = type.style;
  context.fillRect(x, y, snake.width, snake.width);
  context.fill();
  if (type === food)
    context.save();
  else {
    context.fillStyle = food.style;
    context.restore();
    context.fillRect(food.x, food.y, snake.width, snake.width);
  }
}


function restart() {
  for(i = 0;i<keysPressed.length;i++)keysPressed[i] = false;
  move(0, 0, snake);
  started = false;
}


function score(){
  currentScore++;
  snake.size++;
  //snake.parts.push(x:)
  food.generate();
}