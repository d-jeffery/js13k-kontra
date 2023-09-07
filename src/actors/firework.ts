import {GameObjectClass,SpriteClass, Vector, emit} from "kontra";


/*function getFlame() {
    return new Flame(...arguments);
}*/


/*
class Flame extends SpriteClass {

    // @ts-ignore
    constructor(properties) {
        super(properties);
    }

    init(properties: object): void {
        this.velocity = Vector({
            x: this.radius * Math.cos(this.pos) * 0.25,
            y: this.radius * Math.sin(this.pos) * 0.25})
    }

    draw() {
        this.context.fillStyle = 'red'
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.context.fill();

        this.context.fillStyle = 'yellow'
        this.context.beginPath();
        this.context.arc(0, 0, this.radius - 2, 0, 2 * Math.PI);
        this.context.fill();
    }
}*/

export class Firework extends GameObjectClass {
    // @ts-ignore
    constructor(properties) {
        super(properties)
        this.ttl = 100
    }

    update(dt?: number) {
        this.advance()

        if (this.ttl > 0) {
            emit("explode", this.position)
            this.ttl = 0;
        }
    }
}



// properties will be passed to the sprites init() function


//
//
// export class Firework extends GameObjectClass {
//     init(properties: {x: number, y: number}): void {
//         console.log("Firework", properties)
//         this.position = Vector({x: properties.x, y: properties.y})
//         this.anchor = {x: 0.5, y: 0.5}
//     }
// }
//
//

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
