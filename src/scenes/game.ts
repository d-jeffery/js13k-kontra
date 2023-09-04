import {GameObject, getPointer, init, pointerPressed, Scene} from "kontra";
import {CPlayer} from "../vendor/player-small";
import BeatBeat from "../vendor/beat-beat-js";
import {player} from "../actors/player";
import {sky} from "../actors/sky";
import {Firework} from "../actors/firework";
import {gameSong} from "../music";

const {context} = init()
//declare const testSong: any;

export const gameScene = Scene({
    id: 'game',
    cPlayer: new CPlayer(),
    audio: undefined,
    audioBuffer: undefined,

    cullObjects: true,

    context: context,

    onHide() {
        this.audio.pause()
    },
    onShow() {
        this.cPlayer.init(gameSong)

        let done = false

        // Wait for generate
        while (!done) {
            done = this.cPlayer.generate() >= 1
        }
        // const wave = this.cPlayer.createWave()
        // this.audio = document.createElement('audio')
        // this.audio.src = URL.createObjectURL(new Blob([wave], {type: 'audio/wav'}))
        // this.audio.loop = true

        // @ts-ignore
        // this.audio.play().catch((e) => {
        //     console.error('Unable to play music!', e)
        // })
        const audioCtx = new window.AudioContext()
        const buffer = this.cPlayer.createAudioBuffer(audioCtx)
        this.audioBuffer = new BeatBeat(audioCtx, buffer)

        this.audioBuffer.load().then(() => {
            // @ts-ignore
            this.audioBuffer.play((c, time, d) => {
                // console.log(c, time, d)
                this.objects!.push(new Firework({x: Math.random() * 1000, y:  Math.random() * 1000}))
            })
        })

        this.objects = [sky, player]
    },
    update() {
        this.objects?.forEach((o: object) => (o as GameObject).update());
        this.objects = this.objects?.filter((o: object) => (o as GameObject).isAlive());
    },
    render() {
        this.objects?.forEach((o: object) => (o as GameObject).render());
    }
});