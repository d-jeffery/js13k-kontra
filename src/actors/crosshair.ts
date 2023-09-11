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
      x: 40 + rand() * (720 - 40),
      y: 40 + 96 + rand() * (1280 - 96 - 40)
    })
    this.flash = true
    this.nextTiming = this.timing.shift()

    setInterval(() => this.flash = !this.flash, 250)

    on('fire', (c: number, time: number, d: SoundData) => {
      if (!this.nextTiming) {
        this.ttl = 0
        return
      }
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
          x: 40 + rand() * (720 - 40),
          y: 40 + 96 + rand() * (1280 - 96 - 40)
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
    drawCrosshair(this.context, 0, 0, this.radius, this.flash ? 'black' : 'darkred')
  }
}

export const drawCrosshair = (context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string = 'red') => {
  context.strokeStyle = color
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
