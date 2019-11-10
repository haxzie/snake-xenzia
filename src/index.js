import Snake from './snake';
import Apple from './apple';


// create a canvas object and append it into the body
const canvas = document.createElement('CANVAS');
canvas.setAttribute('height', '400');
canvas.setAttribute('width', '400');
canvas.style.backgroundColor = `#000000`;
document.body.appendChild(canvas);
// get the 2d context from canvas
const context = canvas.getContext('2d');
const grid = 16;
let count = 0;

// setup apple
const apple = new Apple(context, grid, { x: 320, y: 320 });

// setup snake
const snake = new Snake(context, grid, { x: 160, y: 160});
snake.setCollisionObject(apple, () => {
  apple.spawn();
});
snake.onBite(() => {
  snake.reset();
});
snake.setKeyboardControls();


// game loop
function loop() {
  requestAnimationFrame(loop);
  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }
  count = 0;

  snake.move();
  apple.drop();

}

// start the game
requestAnimationFrame(loop);
