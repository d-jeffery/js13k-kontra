import {GameObject, getPointer, pointerPressed, Scene} from "kontra";
import {CPlayer} from "../player-small";
import {gameSong} from "../music";
import {player} from "../actors/player";
import {sky} from "../actors/sky";
import {Firework} from "../actors/firework";

export const gameScene = Scene({
    id: 'game',
    cPlayer: new CPlayer(),
    audio: undefined,

    cullObjects: true,

    onHide () {
        this.audio.pause()
    },
    onShow () {
        this.cPlayer.init(gameSong)

        let done = false

        while (!done) {
            done = this.cPlayer.generate() >= 1
            console.log('Not done')
        }
        const wave = this.cPlayer.createWave()
        this.audio = document.createElement('audio')
        this.audio.src = URL.createObjectURL(new Blob([wave], {type: 'audio/wav'}))
        this.audio.loop = true

        // @ts-ignore
        this.audio.play().catch((e) => {
            console.error('Unable to play music!', e)
        })

        this.objects = [sky, player]
    },
    update() {
        const {x, y} = getPointer();
        if (pointerPressed('left') && this.objects !== undefined) {
            this.objects.push(new Firework({x, y}))
        }

        this.objects?.forEach((o: object) => (o as GameObject).update());
    }
});