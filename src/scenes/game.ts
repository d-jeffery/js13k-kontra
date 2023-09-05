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

    timings: [],
    leftTarget: undefined,
    leftTargetLoc: undefined,
    rightTarget: undefined,
    rightTargetLoc: undefined,

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

            this.timing = [...this.audioBuffer.songData];

            // @ts-ignore
            this.audioBuffer.play((c, time, d) => {
                let target
                if (c === 0) {
                    this.leftTarget = undefined
                    target = this.leftTargetLoc
                }
                if (c === 1) {
                    this.rightTarget = undefined
                    target = this.rightTargetLoc
                }

                this.objects!.push(new Firework(target))
            })
        })

        this.objects = [sky, player]
    },
    update() {
        this.objects?.forEach((o: object) => (o as GameObject).update());
        this.objects = this.objects?.filter((o: object) => (o as GameObject).isAlive());

        if (this.timing === undefined) return

        if (!this.leftTarget) {
            this.leftTarget = this.timing[0].shift()
            this.leftTargetLoc = {x: Math.random() * 1000, y:  Math.random() * 1000}
        }

        if (!this.rightTarget) {
            this.rightTarget = this.timing[1].shift()
            this.rightTargetLoc = {x: Math.random() * 1000, y:  Math.random() * 1000}
        }
    },
    render() {
        this.objects?.forEach((o: object) => (o as GameObject).render());

        if (this.leftTarget) {
            this.drawCrossHairs(this.leftTargetLoc)
        }

        if (this.rightTarget) {
            this.drawCrossHairs(this.rightTargetLoc)
        }
    },
    drawCrossHairs(location: {x: number, y:number}): void {
        context.strokeStyle = 'red'
        context.lineWidth = 5
        context.beginPath();
        context.arc(location.x, location.y, 20, 0, 2 * Math.PI);
        context.stroke();
        context.closePath()

        context.beginPath()
        context.lineTo(location.x, location.y + 30)
        context.lineTo(location.x, location.y - 30)
        context.stroke();
        context.closePath()

        context.beginPath()
        context.lineTo(location.x + 30, location.y)
        context.lineTo(location.x - 30, location.y)
        context.stroke();
        context.closePath()
    }
});