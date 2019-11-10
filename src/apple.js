function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default class Apple {
    /**
     * 
     * @param {Canvas.Context} context Canvas context
     * @param {Number} grid Grid Size
     * @param {Object} initialState initial placement of the apple 
     */
    constructor(context, grid, { x, y }) {
        this.context = context;
        this.grid = grid;
        this.x = x;
        this.y = y;
    }

    /**
     * Draw the apple on the canvas
     */
    drop() {
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.grid - 1, this.grid - 1);
    }

    /**
     * Spawn the apple in a new random place
     */
    spawn() {
        this.x = getRandomInt(0, 25) * this.grid;
        this.y = getRandomInt(0, 25) * this.grid;
    }
}