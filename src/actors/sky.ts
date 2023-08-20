import {init, Sprite} from 'kontra';
const { context } = init()

export const sky = Sprite({
    x: 0,
    y: 0,
    anchor: {x: 0, y: 0},

    // required for a rectangle sprite
    width: context!.canvas.width,
    height: context!.canvas.height,
    color: 'LightSkyBlue',

    context: context
});