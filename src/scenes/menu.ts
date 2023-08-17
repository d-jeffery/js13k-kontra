import {Button, emit, Grid, init, Scene, Text} from "kontra";
import {CPlayer} from "../player-small";
import {introMusic} from "../music";
import {gameScene} from "./game";
const { canvas } = init()

export const menuScene = Scene({
    id: 'menu',
    player: new CPlayer(),
    audio: undefined,

    onHide () {
        this.audio.pause()
    },

    onShow () {
        this.player.init(introMusic)

        let done = false

        while (!done) {
            done = this.player.generate() >= 1
            console.log('Not done')
        }
        const wave = this.player.createWave()
        this.audio = document.createElement('audio')
        this.audio.src = URL.createObjectURL(new Blob([wave], { type: 'audio/wav' }))
        this.audio.loop = true

        // @ts-ignore
        this.audio.play().catch((e) => {
            console.error('Unable to play music!', e)
        })

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

        const menuTitle = Text({
            text: 'Eeeeeyyyyy, it\'s a fuck\'n game',
            ...textOptions
        })

        const title = Text({
            text: 'ABOUT HISTORY SHIT',
            ...textOptions
        })

        const startButton = Button({
            // text properties
            text: {
                text: 'Click to Begin!',
                color: 'red',
                font: '20px Arial, sans-serif',
                anchor: {x: 0.5, y: 0.5}
            },
            padX: 20,
            padY: 10,
            anchor: {x: 0.5, y: 0.5},

            render() {
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
            update() {
                if (this.pressed === true) {
                    emit('changeScene', gameScene)
                }
            }
        });

        const menu = Grid({
            x: 300,
            y: 100,
            anchor: { x: 0.5, y: 0.5 },

            // add 15 pixels of space between each row
            rowGap: 15,

            // center the children
            justify: 'center',

            children: [menuTitle, title, startButton]
        })

        this.objects = [menu]
    }
})