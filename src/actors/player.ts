import {init, Sprite} from 'kontra';
const { context } = init()

export const player = Sprite({
    x: 300,
    y: 100,
    anchor: {x: 0.5, y: 0.5},

    // required for a rectangle sprite
    width: 20,
    height: 40,
    color: 'red',

    context: context,

    dx: 5,
    dy: 2,

    update () {
        // move the game object normally
        this.advance();

        // change the velocity at the edges of the canvas
        if (this.x! < 0 ||
            this.x! + this.width! > this.context!.canvas.width) {
            this.dx = -this.dx!;
        }
        if (this.y! < 0 ||
            this.y! + this.height! > this.context!.canvas.height) {
            this.dy = -this.dy!;
        }
    }
});