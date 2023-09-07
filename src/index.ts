import {initPointer, GameLoop, Scene, on, Pool, Sprite, Vector, init} from 'kontra'
import { introScene } from './scenes/intro'

// must call this to have pointer events work
initPointer()
let { context } = init();

let currentScene: Scene = introScene
/*const pool = Pool({
  // create a new sprite every time the pool needs a new object.
  // equivalent to `create(props) { return Sprite(props) }`
  // @ts-ignore
  create: Sprite
});

// properties will be passed to the sprites init() function
on('explode', (position: Vector = Vector(50, 50)) => {
  console.log(position)
  pool.get({
    position: position,
    width: 20,
    height: 40,
    color: 'red',
    ttl: 60
  });
})*/

on('changeScene', (scene: Scene) => {
  currentScene.hide()
  currentScene.destroy()
  currentScene = scene
  currentScene.show()
})

const loop = GameLoop({ // create the main game loop
  update: function () { // update the game state
    currentScene.update()
    pool.update()
  },
  render: function () { // render the game state
    currentScene.render()
    pool.render()
  }
})

loop.start() // start the game
currentScene.show()


let pool = Pool({
  // create a new sprite every time the pool needs a new object.
  // equivalent to `create(props) { return Sprite(props) }`
  // @ts-ignore
  create: Sprite
});

// properties will be passed to the sprites init() function
pool.get({
  x: 100,
  y: 200,
  width: 20,
  height: 40,
  color: 'red',
  opacity: 0,
  ttl: 60
});

on("explode", (position: Vector) => {

  for(let f = 0; f < 10; f++) {
    const pos = (f / 10) * 2 * Math.PI
    const radius = 5

    pool.get({
      position,
      width: 10,
      height: 10,
      color: 'yellow',
      ttl: 240,
      dx: radius * Math.cos(pos) * 0.25,
      dy: radius * Math.sin(pos) * 0.25,
      render: () => {
        context.fillStyle = 'red'
        context.beginPath();
        context.arc(0, 0, 5, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = 'yellow'
        context.beginPath();
        context.arc(0, 0, 3, 0, 2 * Math.PI);
        context.fill();
      }
    });
  }
})