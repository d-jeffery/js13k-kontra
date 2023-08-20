import {getPointer, init, lerp, Pool, Sprite, SpriteClass} from "kontra";
const { context } = init()

export class Firework extends SpriteClass {
    constructor(properties: any) {
        super(properties);
        console.log(properties)
        this.anchor = {x: 0.5, y: 0.5}
        this.width = 20
        this.height = 20
        this.color = 'yellow'
        this.pool = Pool({
            // @ts-ignore
            create: Sprite,
            maxSize: 100
        });
    }

    update(dt?: number) {
        this.pool.get({
            x: this.x,
            y: this.y,
            anchor: {x: 0.5, y: 0.5},
            width: 10,
            height: 10,
            color: 'yellow',
            ttl: 60,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
        });
        this.pool.update()
    }

    render() {
        this.pool.render()
    }

    draw() {
        super.draw()
    }
}
/*

export const firework = new Firework({
    x: 360,
    y: 640,
    anchor: {x: 0.5, y: 0.5},

    // required for a rectangle sprite
    width: 40,
    height: 80,
    color: 'red',

    context: context,

    pool: Pool({
        // @ts-ignore
        create: Sprite
    }),

    update () {
        // move the game object normally
        this.advance();

        const cursor = getPointer();

        this.x = lerp(<number>this.x, cursor.x, 0.5);
        this.y = lerp(<number>this.y, cursor.y, 0.5);

        // this.rotation = Math.atan2( cursor.y - this.y, cursor.x - this.x )
        pool.get({
            anchor: {x: 0.5, y: 0.5},
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            color: 'yellow',
            ttl: 60,
            dx: Math.random() * 2,
            dy: Math.random() * 2,
        });
        pool.update()

    },
    render() {
        pool.render()
    }
});*/
