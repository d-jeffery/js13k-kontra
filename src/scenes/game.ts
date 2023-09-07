import {emit, GameObject, getPointer, init, on, pointerPressed, Scene, Vector} from "kontra";
import {CPlayer} from "../vendor/player-small";
import BeatBeat from "../vendor/beat-beat-js";
import {player} from "../actors/player";
import {sky} from "../actors/sky";
import {gameSong} from "../music";
import {Crosshair} from "../actors/crosshair";

//declare const testSong: any;

export const gameScene = Scene({
    id: 'game',
    cPlayer: new CPlayer(),
    audio: undefined,
    audioBuffer: undefined,
    cullObjects: true,

    onHide() {
        this.audio.pause()
    },
    async onShow() {
        this.cPlayer.init(gameSong)

        let done = false

        // Wait for generate
        while (!done) {
            done = this.cPlayer.generate() >= 1
        }

        const audioCtx = new window.AudioContext()
        const buffer = this.cPlayer.createAudioBuffer(audioCtx)
        this.audioBuffer = new BeatBeat(audioCtx, buffer)

        await this.audioBuffer.load()

        const timing = [...this.audioBuffer.songData];

        this.audioBuffer.play((c: number, time: number, d: number) => {
            emit("fire", c, time, d)
        })

        this.add([
            sky,
            player,
            new Crosshair({id: 0, radius: 20, timing: timing[0]}),
            new Crosshair({id: 1, radius: 20, timing: timing[1]})
        ])
    },
    update() {
        this.objects = this.objects?.filter((o) => (o as GameObject).isAlive())
        this.objects?.forEach((o) => (o as GameObject).update())
    }
});