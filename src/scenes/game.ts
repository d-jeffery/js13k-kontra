import {GameObject, getPointer, init, pointerPressed, Scene} from "kontra";
import {CPlayer} from "../vendor/player-small";
import BeatBeat from "../vendor/beat-beat-js";
import {gameSong, introMusic} from "../music";
import {player} from "../actors/player";
import {sky} from "../actors/sky";
import {Firework} from "../actors/firework";

const {context} = init()

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
        const wave = this.cPlayer.createWave()
        this.audio = document.createElement('audio')
        this.audio.src = URL.createObjectURL(new Blob([wave], {type: 'audio/wav'}))
        // this.audio.loop = true

        // @ts-ignore
        // this.audio.play().catch((e) => {
        //     console.error('Unable to play music!', e)
        // })

        const audioCtx = new window.AudioContext()
        const buffer = this.cPlayer.createAudioBuffer(audioCtx)

        this.audioBuffer = new BeatBeat(audioCtx, buffer)

        this.audioBuffer.load().then(() => {
            this.audioBuffer.play(() => {
                this.objects!.push(new Firework({x: Math.random() * 1000, y:  Math.random() * 1000}))
            })
        })

        this.objects = [sky, player]
    },
    update() {
        const {x, y} = getPointer();
        if (pointerPressed('left') && this.objects !== undefined) {
            this.objects.push(new Firework({x, y}))
        }

        this.objects?.forEach((o: object) => (o as GameObject).update());
    },
    render() {
        this.objects?.forEach((o: object) => (o as GameObject).render());

        //const data = this.cPlayer.getData(this.audio.currentTime, 10000)
        //console.log(extractPeaks(data[0]));
        //console.log(extractPeaks(data[1]));

        // const audioCtx = new window.AudioContext()
        // const buffer = this.cPlayer.createAudioBuffer(audioCtx)
        // const bufferL = buffer.getChannelData(0)
        // for(let i = 0; i < buffer.length; i++) {
        //     const n = bufferL[i * (1000)]
        //     context.beginPath();
        //     context.moveTo(i + 0.5, 700);
        //     context.lineTo(i + 0.5, 700 + (-n * 800));
        //     context.stroke();
        // }
        // https://stackoverflow.com/questions/25836447/generating-a-static-waveform-with-webaudio

        // const sampleSize = 10000;
        // const data = this.cPlayer.getData(this.audio.currentTime, sampleSize)
        //
        // if (this.context) {
        //
        //     // Plot left channel.
        //     this.context.beginPath();
        //     this.context.moveTo(0, 50 + 90 * data[0]);
        //     for (let k = 0; k < sampleSize; ++k) {
        //         this.context.lineTo(k, 50 + 90 * data[k * 2]);
        //     }
        //     this.context.stroke();
        //
        //     // Plot right channel.
        //     this.context.beginPath();
        //     this.context.moveTo(0, 150 + 90 * data[1]);
        //     for (let k = 0; k < sampleSize; ++k) {
        //         this.context.lineTo(k, 150 + 90 * data[k * 2 + 1]);
        //     }
        //     this.context.stroke();
        // }
    }
});