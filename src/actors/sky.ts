import { init, Sprite, on } from 'kontra'
const { context } = init()

export const sky = Sprite({
  x: 0,
  y: 0,
  anchor: { x: 0, y: 0 },

  context,

  // required for a rectangle sprite
  width: context.canvas.width,
  height: context.canvas.height,
  color: 'LightSkyBlue',
  count: 0,

  init: function (properties: { tempo: number }) {
    setInterval(() => {
      this.count += 2
      if (this.count === properties.tempo) this.count = 0
    }, properties.tempo)
  },
  render: function () {
    this.draw()

    if (!this.width || !this.height || (this.context == null)) {
      return
    }

    const radius = 20
    let left = false

    for (let h = -radius * 6; h < this.height + radius * 6; h += radius * 3) {
      const offset = left ? 0 : radius
      for (let w = 0; w < this.width; w += radius) {
        this.context.strokeStyle = 'white'
        this.context.lineWidth = 2
        this.context.beginPath()
        this.context.arc(2 * w + offset, h + 1 + this.count, radius, 0, Math.PI)
        this.context.stroke()

        this.context.lineWidth = 1
        this.context.strokeStyle = 'DeepSkyBlue'
        this.context.beginPath()
        this.context.arc(2 * w + offset, h + this.count, radius, 0, Math.PI)
        this.context.stroke()
      }
      left = !left
    }
  }
})
