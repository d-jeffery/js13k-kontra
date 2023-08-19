import {getPointer, init, Sprite, lerp} from 'kontra';
const { context } = init()

export const player = Sprite({
    x: 360,
    y: 640,
    anchor: {x: 0.5, y: 0},

    // required for a rectangle sprite
    width: 40,
    height: 80,
    color: 'red',

    context: context,

    update () {
        // move the game object normally
        this.advance();

        const cursor = getPointer();

        this.x = lerp(<number>this.x, cursor.x, 0.5);
        this.y = lerp(<number>this.y, cursor.y, 0.5);

        // this.rotation = Math.atan2( cursor.y - this.y, cursor.x - this.x )
    }
});