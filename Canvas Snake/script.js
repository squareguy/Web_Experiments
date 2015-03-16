var i, score = 0, 
canvas = document.getElementsByTagName("canvas")[0], 
context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
var snake = {
  height: canvas.height / 10,
  width: canvas.width / 10,
  style: "black",
  x: 0,
  y: 0,
  speed: 90,
  move: function(x, y) {
  }
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
    for (i = 0; i < canvas.height; i += snake.height)
      food.possibleY.push(i);
  },
  generate: function() {
    if(
    food.possibleX[Math.floor(Math.random() * food.possibleX.length)] === snake.x ||
    food.possibleX[Math.floor(Math.random() * food.possibleX.length)] === snake.x +snake.width ||
    food.possibleY[Math.floor(Math.random() * food.possibleX.length)] === snake.y ||
    food.possibleX[Math.floor(Math.random() * food.possibleX.length)] === snake.y + snake.height) food.generate();
    else
    move( food.possibleX[Math.floor(Math.random() * food.possibleX.length)], food.possibleY[Math.floor(Math.random() * food.possibleX.length)], food);
  }
};
var keysDown = [false, false, false, false], keys = [37, 38, 39, 40];
document.addEventListener("keydown", function(event) {
  for (i = 0; i < keys.length; i++) {
    if (event.keyCode === keys[i])
      keysDown[i] = true;
  }
});
document.addEventListener("keyup", function(event) {
  for (i = 0; i < keys.length; i++) {
    if (event.keyCode === keys[i])
      keysDown[i] = false;
  }
});
food.getpossibleXY();
console.log(food.possibleX);
food.generate();
move(snake.x === 0 ? 0 : snake.x, snake.y === 0 ? 0 : snake.y, snake);
setInterval(function() {
  
  if (keysDown[0])
    move(snake.x <= 0 ? 0 : (snake.x - snake.width), snake.y, snake);
  
  else if (keysDown[1])
    move(snake.x, snake.y <= 0 ? 0 : snake.y - snake.height, snake);
  
  else if (keysDown[2])
    move(snake.x >= (canvas.width - snake.width) ? (canvas.width - snake.width) : (snake.x + snake.width), snake.y, snake);
  
  else if (keysDown[3])
    move(snake.x, snake.y >= (canvas.height - snake.height) ? (canvas.height - snake.height) : snake.y + snake.height, snake);

}, snake.speed);
function move(x, y, type) {
  type.x = x;
  type.y = y;
  if (snake.x === food.x && snake.y === food.y) {
    score++;
    food.generate();
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = type.style;
  context.fillRect(x, y, snake.width, snake.height);
  context.fill();
  if (type === food)
    context.save();
  else {
    context.fillStyle = food.style;
    context.restore();
    context.fillRect(food.x, food.y, snake.height, snake.width);
  }
}
