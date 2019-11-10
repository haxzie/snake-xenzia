
export default class Snake {
    /**
     * 
     * @param {Canvas.context} context Context of the canvas
     * @param {Number} grid Grid size
     * @param {Object} InitialState initial x and y coords of the snake 
     */
    constructor(context, grid, { x, y}) {
        this.context = context;
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.dx = grid; // velocity x
        this.dy = 0; // velocity y
        this.cells = [];
        this.maxCells = 4;
    }


    /**
     * Attachs keyboard listeners to control the snake
     */
    setKeyboardControls() {
        // listen to keyboard events to move the snake
        document.addEventListener('keydown', (e) => {
            // prevent snake from backtracking on itself by checking that it's 
            // not already moving on the same axis (pressing left while moving
            // left won't do anything, and pressing right while moving left
            // shouldn't let you collide with your own body)

            // left arrow key
            if (e.which === 37 && this.dx === 0) {
                this.dx = -this.grid;
                this.dy = 0;
            }
            // up arrow key
            else if (e.which === 38 && this.dy === 0) {
                this.dy = -this.grid;
                this.dx = 0;
            }
            // right arrow key
            else if (e.which === 39 && this.dx === 0) {
                this.dx = this.grid;
                this.dy = 0;
            }
            // down arrow key
            else if (e.which === 40 && this.dy === 0) {
                this.dy = this.grid;
                this.dx = 0;
            }
        });
    }

    /**
     * Sets a collision object for the snake
     * @param {Object} collisionObject The object which the snake collides
     * @param {Function} onCollision Callback to be called when the snake collides with the object
     */
    setCollisionObject(collisionObject, callback) {
        this.collisionObject = collisionObject;
        this.onCollision = callback;
    }

    /**
     * Sets method to be called when the snake bites it's body
     * @param {Function} callback Function to be called when the snake bites itself
     */
    onBite(callback) {
        this.onBodyBite = callback;
    }
    /**
     * Resets the position of the snake
     */
    reset() {
        this.x = 160;
        this.y = 160;
        this.cells = [];
        this.maxCells = 4;
        this.dx = this.grid;
        this.dy = 0;
    }

    /**
     * Moves the snake by drawing one cell at a time
     */
    move() {
        const canvas = this.context.canvas;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        // move snake by it's velocity
        this.x += this.dx;
        this.y += this.dy;
        // wrap snake position horizontally on edge of screen
        if (this.x < 0) {
            this.x = canvas.width - this.grid;
        }
        else if (this.x >= canvas.width) {
            this.x = 0;
        }

        // wrap snake position vertically on edge of screen
        if (this.y < 0) {
            this.y = canvas.height - this.grid;
        }
        else if (this.y >= canvas.height) {
            this.y = 0;
        }
        // keep track of where this has been. front of the array is always the head
        this.cells.unshift({ x: this.x, y: this.y });
        // remove cells as we move away from them
        if (this.cells.length > this.maxCells) {
            this.cells.pop();
        }

        this.context.fillStyle = 'green';
        this.cells.forEach((cell, index) => {

            // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
            this.context.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);
            // snake ate apple
            if (cell.x === this.collisionObject.x && cell.y === this.collisionObject.y) {
                this.maxCells++;
                this.onCollision();
            }
            // check collision with all cells after this one (modified bubble sort)
            for (let i = index + 1; i < this.cells.length; i++) {

                // snake occupies same space as a body part. reset game
                if (cell.x === this.cells[i].x && cell.y === this.cells[i].y) {
                    this.onBodyBite();
                }
            }
        });
    }
}