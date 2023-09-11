import {Button, emit, getStoreItem, Grid, init, Scene, Text} from 'kontra'
import { gameScene } from './game'
import {sky} from "../actors/sky";
const { canvas } = init()

export const endScene = Scene({
    id: 'end',

    onShow () {
        const textOptions = {
            color: 'black',
            font: '48px Arial, sans-serif',
            onOver: function () {
                this.color = 'purple'
            },
            onOut: function () {
                this.color = 'black'
            }
        }

        const endTitle = Text({
            text: "Your score was: " + getStoreItem("score"),
            ...textOptions
        })

        const highScore = Text({
            text: "The high score is: " + getStoreItem("highscore"),
            ...textOptions
        })

        const end = Grid({
            x: 360,
            y: 640,
            anchor: { x: 0.5, y: 0.5 },

            // add 15 pixels of space between each row
            rowGap: 15,

            // center the children
            justify: 'center',

            children: [endTitle, highScore]
        })

        this.objects = [sky, end]
    }
})
