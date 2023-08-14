import { Button, emit, Grid, init, Scene, Text, track } from 'kontra'

const { canvas } = init()

export const introScene = Scene({
  id: 'intro',

  onShow () {
    const textOptions = {
      color: 'black',
      font: '20px Arial, sans-serif',
      onOver: function () {
        this.color = 'purple'
      },
      onOut: function () {
        this.color = 'black'
      }
    }

    const slothlikegames = Text({
      text: 'SLOTH-LIKE GAMES',
      onDown: function () {
        window.open('https://slothlikeman.itch.io/', '_blank')
      },
      ...textOptions
    })

    const and = Text({
      text: 'and',
      ...textOptions
    })

    const mindfieldstudios = Text({
      text: 'MindField Studios',
      onDown: function () {
        window.open('https://www.instagram.com/mindfieldstudios', '_blank')
      },
      ...textOptions
    })

    const startButton = Button({
      // text properties
      text: {
        text: 'Click to Begin!',
        color: 'red',
        font: '20px Arial, sans-serif',
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
        this.context.strokeStyle = 'red'

        if (this.pressed === true) {
          this.context.strokeStyle = 'purple'
          this.textNode.color = 'purple'
        } else if (this.hovered === true) {
          this.textNode.color = 'red'
          canvas.style.cursor = 'pointer'
        } else {
          this.textNode.color = 'red'
          canvas.style.cursor = 'initial'
        }

        // @ts-expect-error width and height can be calculated
        this.context.strokeRect(0, 0, this.width, this.height)
      },
      update () {
        if (this.pressed === true) {
          emit('changeScene', menuScene)
        }
      }
    })

    const intro = Grid({
      x: 300,
      y: 100,
      anchor: { x: 0.5, y: 0.5 },

      // add 15 pixels of space between each row
      rowGap: 15,

      // center the children
      justify: 'center',

      children: [slothlikegames, and, mindfieldstudios, startButton]
    })

    this.objects = [intro]
    track(slothlikegames)
    track(mindfieldstudios)
  }
})

export const menuScene = Scene({
  id: 'menu'

})
