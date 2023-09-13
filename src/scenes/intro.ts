import { Button, emit, Grid, init, Scene, Text, track } from 'kontra'
import { helpScene } from './help'
import { gameScene } from './game'
import {sky} from "../actors/sky";
const { canvas } = init()

export const introScene = Scene({
  id: 'intro',

  onShow () {
    const textOptions = {
      color: 'black',
      font: '32px Arial, sans-serif',
      onOver: function () {
        this.color = 'purple'
      },
      onOut: function () {
        this.color = 'black'
      }
    }

    const slothlikegames = Text({
      text: 'SLOTH-LIKE MAN',
      onDown: function () {
        window.open('https://slothlikeman.itch.io/', '_blank')
      },
      ...textOptions
    })

    const and = Text({
      text: 'with',
      ...textOptions
    })

    const mindfieldstudios = Text({
      text: 'Music by Raindrop',
      onDown: function () {
        window.open(
          'https://spotify.link/8JDINBv12Cb',
          '_blank'
        )
      },
      ...textOptions
    })

    const present = Text({
      text: 'present\n',
      ...textOptions
    })

    const title = Text({
      text: 'KITE KAOS!\n',
      font: '64px Brush Script MT, cursive',
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
        if (this.context == null) {
          throw new Error('Missing context.')
        }

        this.context.lineWidth = 3
        this.context.strokeStyle = 'black'
        this.context.fillStyle = 'red'
        this.textNode.color = 'white'

        if (this.pressed === true) {
          this.context.fillStyle = 'purple'
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

    const helpButton = Button({
      // text properties
      text: {
        text: 'Read Help',
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
          emit('changeScene', helpScene)
        }
      }
    })

    const intro = Grid({
      x: 360,
      y: 640,
      anchor: { x: 0.5, y: 0.5 },

      // add 15 pixels of space between each row
      rowGap: 15,

      // center the children
      justify: 'center',

      children: [
        slothlikegames,
        and,
        mindfieldstudios,
        present,
        title,
        startButton,
        helpButton
      ]
    })
    sky.init({tempo: 120})
    this.objects = [sky, intro]
    track(slothlikegames)
    track(mindfieldstudios)
  }
})
