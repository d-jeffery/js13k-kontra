import { initPointer, GameLoop, Scene, on } from 'kontra'
import { introScene } from './scenes'
// import { CPlayer } from "./player-small";
// import { introMusic } from "./music";
//
// const player = new CPlayer();
// player.init(introMusic);
//
// let done = false;
//
// while(!done) {
//     done = player.generate() >= 1;
//     console.log("Not done")
// }
//
// const wave = player.createWave();
// const audio = document.createElement("audio");
// audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
//

// must call this to have pointer events work
initPointer()

let currentScene: Scene = introScene

on('changeScene', (scene: Scene) => {
  currentScene.hide()
  currentScene = scene
  currentScene.show()
})

const loop = GameLoop({ // create the main game loop
  update: function () { // update the game state
    currentScene.update()
  },
  render: function () { // render the game state
    currentScene.render()
  }
})

loop.start() // start the game
currentScene.show()
