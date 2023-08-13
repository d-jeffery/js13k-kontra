import { init, Sprite, GameLoop } from 'kontra';
import { CPlayer } from "./player-small";

// var song={songData:[{i:[2,192,128,0,2,192,128,3,0,0,32,222,60,0,0,0,2,188,3,1,3,55,241,60,67,53,5,75,5],p:[1,2,3,4,3,4],c:[{n:[123],f:[]},{n:[118],f:[]},{n:[123,111],f:[]},{n:[118,106],f:[]}]},{i:[3,100,128,0,3,201,128,7,0,0,17,43,109,0,0,0,3,113,4,1,1,23,184,2,29,147,6,67,3],p:[,,1,2,1,2],c:[{n:[123,,,,,,,,123,,,,,,,,123,,,,,,,,123,,,,,,,,126,,,,,,,,126,,,,,,,,126,,,,,,,,126,,,,,,,,130,,,,,,,,130,,,,,,,,130,,,,,,,,130],f:[]},{n:[122,,,,,,,,122,,,,,,,,122,,,,,,,,122,,,,,,,,125,,,,,,,,125,,,,,,,,125,,,,,,,,125,,,,,,,,130,,,,,,,,130,,,,,,,,130,,,,,,,,130],f:[]}]},{i:[0,192,99,64,0,80,99,0,0,3,4,0,66,0,0,0,0,19,4,1,2,86,241,18,195,37,4,0,0],p:[,,1,1,1,1,1],c:[{n:[147,,,,147,,,,147,,,,147,,,,147,,,,147,,,,147,,,,147],f:[]}]},{i:[2,146,140,0,2,224,128,3,0,0,84,0,95,0,0,0,3,179,5,1,2,62,135,11,15,150,3,157,6],p:[,,,,1,2],c:[{n:[147,,145,,147,,,,,,,,,,,,135],f:[11,,,,,,,,,,,,,,,,11,,,,,,,,,,,,,,,,27,,,,,,,,,,,,,,,,84]},{n:[142,,140,,142,,,,,,,,,,,,130],f:[11,,,,,,,,,,,,,,,,11,,,,,,,,,,,,,,,,27,,,,,,,,,,,,,,,,84]}]}],rowLen:6615,patternLen:32,endPattern:6,numChannels:4};
//
// var player = new CPlayer();
// player.init(song);
// player.generate();
//
// var done = false;
//
// while(!done) {
//     done = player.generate() >= 1;
//     console.log("Not done")
// }
//
// var wave = player.createWave();
// var audio = document.createElement("audio");
// audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
//

let { canvas } = init();

let sprite = Sprite({
    x: 100,        // starting x,y position of the sprite
    y: 80,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
    dx: 2          // move the sprite 2px to the right every frame
});

let loop = GameLoop({  // create the main game loop
    update: function() { // update the game state
        sprite.update();

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (sprite.x > canvas.width) {
            sprite.x = -sprite.width;
        }
    },
    render: function() { // render the game state
        sprite.render();
    }
});

loop.start();    // start the game
