import {GameObjectClass, lerp, on, seedRand, Vector} from 'kontra'
import { Firework } from './firework'
import { SoundData } from '../vendor/beat-beat-js'

let rand = seedRand("kontra")

export class Crosshair extends GameObjectClass {
  // @ts-expect-error
  constructor (properties) {
    super(properties)
    this.radius = 40
    this.position = Vector({
      x: rand() * 720,
      y: rand() * 1280
    })
    this.nextTiming = this.timing.shift()

    on('fire', (c: number, time: number, d: SoundData) => {
      if (this.id === c && this.nextTiming.time === d.time) {
        this.parent!.add(
          new Firework({
            position: this.position,
            anchor: { x: 0.5, y: 0.5 },
            color: 'yellow',
            radius: 20,
            ttl: 120,
            data: d
          })
        )
        this.position = Vector({
          x: rand() * 720,
          y: rand() * 1280
        })
        this.radius = 40
        this.nextTiming = this.timing.shift()
      }
    })
  }

  update (dt?: number) {
    this.advance()
    if (this.radius > 20) {
      this.radius -= 1
    }
  }

  draw () {
    drawCrosshair(this.context, 0, 0, this.radius)
  }
}

export const drawCrosshair = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
  context.strokeStyle = 'red'
  context.lineWidth = 5
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.stroke()
  context.closePath()

  context.beginPath()
  context.lineTo(x, y + 30)
  context.lineTo(x, y - 30)
  context.stroke()
  context.closePath()

  context.beginPath()
  context.lineTo(x + 30, y)
  context.lineTo(x - 30, y)
  context.stroke()
  context.closePath()
}
