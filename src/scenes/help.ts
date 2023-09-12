import { Button, emit, Grid, init, Scene, Text } from 'kontra'
import { gameScene } from './game'
import {sky} from "../actors/sky";

export const helpScene = Scene({
  id: 'menu',

  onShow () {
    const textOptions = {
      color: 'black',
      font: '32px Arial, sans-serif',
      textAlign: 'center'
    }

    const menuTitle = Text({
      text: "You been strapped to a Kite as punishment.\n" +
          "The local guards are using you for\n" +
          "target practice!",
      ...textOptions
    })

    const crosshairs = Text({
      text: "Avoid the cross-hairs and dodge the debris!\n" +
          "Use W-A-S-D or the arrow keys to move.\n" +
          "The lower your score, the better you've done!",
      ...textOptions
    })

    const startButton = Button({
      // text properties
      text: {
        text: 'Click to Begin!',
        color: 'red',
        font: '32px Arial, sans-serif',
        anchor: { x: 0.5, y: 0.5 }
      },
      padX: 20,
      padY: 10,
      anchor: { x: 0.5, y: 0.5 },

      render () {
        // focused by keyboard
        if (this.context == null) {
          throw new Error('Missing context.')
        }

        this.context.lineWidth = 3
        this.context.strokeStyle = 'black'
        this.context.fillStyle = 'red'
        this.textNode.color = 'white'

        if (this.pressed === true) {
          this.context.fillStyle = 'purple'
          this.textNode.color = 'white'
        } else if (this.hovered === true) {
          this.context.fillStyle = 'purple'
        }

        // @ts-expect-error width and height can be calculated
        this.context.fillRect(0, 0, this.width, this.height)
        // @ts-expect-error width and height can be calculated
        this.context.strokeRect(0, 0, this.width, this.height)
      },
      update () {
        if (this.pressed === true) {
          emit('changeScene', gameScene)
        }
      }
    })

    const menu = Grid({
      x: 360,
      y: 640,
      anchor: { x: 0.5, y: 0.5 },

      // add 15 pixels of space between each row
      rowGap: 15,

      // center the children
      justify: 'center',

      children: [menuTitle, crosshairs, startButton]
    })

    this.objects = [sky, menu]
  }
})
