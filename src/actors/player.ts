import { getPointer, Sprite, lerp } from 'kontra'

export const player = Sprite({
    x: 360,
    y: 640,
    anchor: { x: 0.5, y: 0.5 },

    // required for a rectangle sprite
    width: 40,
    height: 80,
    color: 'green',

    update() {
        // move the game object normally
        this.advance()

        const cursor = getPointer()

        this.x = lerp(<number>this.x, cursor.x, 0.25)
        this.y = lerp(<number>this.y, cursor.y, 0.25)

        // const desired = Math.atan2( cursor.y - this.y, cursor.x - this.x ) + (Math.PI/180 * 90)
        // this.rotation = lerp(<number>this.rotation, desired, 0.25);
    },
})
