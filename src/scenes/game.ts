import {
    collides,
    emit,
    GameObject,
    init,
    on,
    Pool,
    Quadtree,
    Scene,
    Sprite,
    Vector
} from "kontra";
import {CPlayer} from "../vendor/player-small";
import BeatBeat from "../vendor/beat-beat-js";
import {player} from "../actors/player";
import {sky} from "../actors/sky";
import {gameSong} from "../music";
import {Crosshair} from "../actors/crosshair";

let { context } = init();
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
        pool.update()
        this.objects = this.objects?.filter((o) => (o as GameObject).isAlive())
        this.objects?.forEach((o) => (o as GameObject).update())

        let quadtree = Quadtree();
        // @ts-ignore
        quadtree.add(player, pool.getAliveObjects())
        // @ts-ignore
        const touching = quadtree.get(player).filter((f) => collides(player, f))

    },
    render() {
        this.objects?.forEach((o) => (o as GameObject).render())
        pool.render()
    }
});


let pool = Pool({
    // @ts-ignore
    create: Sprite,
});

pool.get({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: 'red',
    opacity: 0,
    ttl: 0
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