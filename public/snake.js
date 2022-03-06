var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var grid = 10;
var count = 0;
var running = false;
var aiGo = false;
var data = [];

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};
var sleepTime = 80;
var superHard = false;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function loop() {
  

  sleep(sleepTime);
  if(superHard == true){
    grid=3;
  }
  else{grid=10}
  if(running){
    requestAnimationFrame(loop);
  }
  else if(aiGo){
    requestAnimationFrame(loop);
    var directionOut = network.activate([snake.x/400,snake.y/400,apple.x/400,apple.y/400]);
    
      var max = Math.max.apply(Math, directionOut);
      var findHelper = (element) => element == max;
      var index = directionOut.findIndex(findHelper);
      directionOut[index] = 1;
      if(directionOut[0] == 1 && snake.dx != -grid){
        snake.dx = grid;
        snake.dy = 0;
      }
      else if(directionOut[1] == 1 && snake.dy != grid){
        snake.dy = -grid;
        snake.dx = 0;
      }
      else if(directionOut[2] == 1 && snake.dx != grid){
        snake.dx = -grid;
        snake.dy = 0;
      }
      else if(directionOut[3] == 1 && snake.dy != -grid){
        snake.dy = grid;
        snake.dx = 0;
      }
    else{
      directionOut[index] = 0;
      var max = Math.max.apply(Math, directionOut);
      var findHelper = (element) => element == max;
      var index = directionOut.findIndex(findHelper);
      directionOut[index] = 1;
      if(directionOut[0] == 1 && snake.dx != -grid){
        snake.dx = grid;
        snake.dy = 0;
      }
      else if(directionOut[1] == 1 && snake.dy != grid){
        snake.dy = -grid;
        snake.dx = 0;
      }
      else if(directionOut[2] == 1 && snake.dx != grid){
        snake.dx = -grid;
        snake.dy = 0;
      }
      else if(directionOut[3] == 1 && snake.dy != -grid){
        snake.dy = grid;
        snake.dx = 0;
      }
    }
  }


  
  
  if (++count < 0) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  snake.cells.unshift({x: snake.x, y: snake.y});
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  context.fillStyle = "Yellow";
  context.fillRect(apple.x, apple.y, grid-1, grid-1);
  context.fillStyle = "Blue";
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    if (cell.x == apple.x && cell.y == apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        console.log(snake.dx + ":" + snake.dy);
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}
document.addEventListener("keydown", function(e) {
  var direction1 = 0, direction2 = 0, direction3 = 0, direction4 = 0;
  
  if (e.which === 37 && snake.dx === 0 && superHard == false) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0 && superHard == false) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
  if(snake.dx == 10){
    direction1 = 1;
  }
  else if(snake.dy ==-10){
    direction2 = 1;
  }
  else if(snake.dx == -10){
    direction3 = 1;
  }
  else if(snake.dy == 10){
    direction4 = 1;
  }

  

  data[data.length] = {input:[snake.x/400,snake.y/400,apple.x/400,apple.y/400], output: [direction1, direction2, direction3, direction4]};
});
function start(){
running = true;
requestAnimationFrame(loop);
}
function stop(){
  running = false;
}
function ai(){
  abc(data);
}
