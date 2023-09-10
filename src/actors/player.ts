import { initKeys, Sprite, keyPressed } from 'kontra'

initKeys()

export const player = Sprite({
  x: 360,
  y: 1024,
  anchor: { x: 0.5, y: 0.5 },

  // required for a rectangle sprite
  width: 40,
  height: 80,
  color: 'green',

  update () {
    // move the game object normally
    this.advance()

    if (this.x === undefined ||
            this.y === undefined ||
            this.width === undefined ||
            this.height === undefined
    ) {
      throw new Error('Missing location data')
    }

    const position = { x: this.x, y: this.y }

    if (keyPressed('arrowleft') || keyPressed('a')) {
      this.x -= 5
    }
    if (keyPressed('arrowright') || keyPressed('d')) {
      this.x += 5
    }
    if (keyPressed('arrowup') || keyPressed('w')) {
      this.y -= 5
    }
    if (keyPressed('arrowdown') || keyPressed('s')) {
      this.y += 5
    }

    const width = this.context!.canvas.width
    const height = this.context!.canvas.height

    if (this.x < this.width / 2) {
      this.x = position.x
    }
    if (this.y < this.height / 2) {
      this.y = position.y
    }
    if (this.x > width - this.width / 2) {
      this.x = position.x
    }
    if (this.y > height - this.height / 2) {
      this.y = position.y
    }
  }
})
