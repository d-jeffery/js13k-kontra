import {GameObjectClass, lerp, on, Vector} from "kontra";
import {gameScene} from "../scenes/game";
import {Firework} from "./firework";

export class Crosshair extends GameObjectClass {
    // @ts-ignore
    constructor(properties) {
        super(properties);
        this.position = Vector({x: Math.random() * 720, y:  Math.random() * 1280})
        this.target = undefined

        on("fire", (c: number, time:number, d:number) => {
            if (this.id === c) {
                this.parent!.add(new Firework({
                    position: this.position,
                    anchor: {x: 0.5, y: 0.5},
                    color: 'yellow',
                    radius: 20,
                    ttl: 120,
                }))
                this.target = Vector({x: Math.random() * 720, y:  Math.random() * 1280})
            }
        })
    }

    update(dt?: number) {
        if (this.target) {
            this.position.x = lerp(this.position.x, this.target.x, 1 / 30)
            this.position.y = lerp(this.position.y, this.target.y, 1 / 30)
        }
    }

    draw() {
        this.context.strokeStyle = 'red'
        this.context.lineWidth = 5
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath()

        this.context.beginPath()
        this.context.lineTo(0, 30)
        this.context.lineTo(0, -30)
        this.context.stroke();
        this.context.closePath()

        this.context.beginPath()
        this.context.lineTo(30, 0)
        this.context.lineTo(-30, 0)
        this.context.stroke();
        this.context.closePath()
    }
}