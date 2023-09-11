import {
  initKeys,
  Sprite,
  keyPressed,
  gamepadPressed,
  initGamepad,
  initGesture,
  gestureMap,
  onGesture,
  initPointer
} from 'kontra'

initKeys()
initGamepad()
/*initGesture()

// pan is the name of the gesture
gestureMap.pan = {
  // panning uses 1 touch
  touches: 1,
  // panning is triggered on touchmove
  // @ts-ignore
  touchmove({ 0: touch }) {
    let x = touch.x - touch.start.x;
    let y = touch.y - touch.start.y;
    let absX = Math.abs(x);
    let absY = Math.abs(y);

    // return the direction the pan
    return absX > absY
        ? x < 0 ? 'left' : 'right'
        : y < 0 ? 'up' : 'down'
  }
};

// the gesture name and direction are combined as the callback name
onGesture('panleft', function(e, touches: object) {
  if (touches) {
    // @ts-ignore
    player.x = touches[0].x
  }
});

onGesture('panright', function(e, touches) {
  if (touches) {
    // @ts-ignore
    player.x = touches[0].x
  }
});

onGesture('panup', function(e, touches) {
  if (touches) {
    // @ts-ignore
    player.y = touches[0].y
  }
});

onGesture('pandown', function(e, touches) {
  if (touches) {
    // @ts-ignore
    player.y = touches[0].y
  }
});*/

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

    if (keyPressed('arrowleft') || keyPressed('a') || gamepadPressed('dpadleft')) {
      this.x -= 5
    }
    if (keyPressed('arrowright') || keyPressed('d') || gamepadPressed('dpadright')) {
      this.x += 5
    }
    if (keyPressed('arrowup') || keyPressed('w') || gamepadPressed('dpadup')) {
      this.y -= 5
    }
    if (keyPressed('arrowdown') || keyPressed('s') || gamepadPressed('dpaddown')) {
      this.y += 5
    }

    const width = this.context!.canvas.width
    const height = this.context!.canvas.height

    if (this.x < this.width / 2) {
      this.x = position.x
    }
    if (this.y < this.height / 2 + 96) {
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
