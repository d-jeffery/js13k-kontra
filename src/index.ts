import {
  initPointer,
  GameLoop,
  Scene,
  on
} from 'kontra'
import { introScene } from './scenes/intro'

// must call this to have pointer events work
initPointer()

let currentScene: Scene = introScene

on('changeScene', (scene: Scene) => {
  currentScene.hide()
  currentScene.destroy()
  currentScene = scene
  currentScene.show()
})

const loop = GameLoop({
  // create the main game loop
  update: function () {
    // update the game state
    currentScene.update()
  },
  render: function () {
    // render the game state
    currentScene.render()
  }
})

loop.start() // start the game
currentScene.show()
