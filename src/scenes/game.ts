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
    Vector,
    Text,
} from 'kontra'
import { CPlayer } from '../vendor/player-small'
import BeatBeat, {SoundData} from '../vendor/beat-beat-js'
import { player } from '../actors/player'
import { sky } from '../actors/sky'
import { gameSong } from '../music'
import { Crosshair } from '../actors/crosshair'

let { context } = init()
//declare const testSong: any;

export const gameScene = Scene({
    id: 'game',
    cPlayer: new CPlayer(),
    audio: undefined,
    audioBuffer: undefined,
    cullObjects: true,
    score: 0,

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

        const timing = [...this.audioBuffer.songData]

        this.audioBuffer.play((c: number, time: number, d: number) => {
            emit('fire', c, time, d)
        })

        sky.init({tempo: 120})

        this.add([
            sky,
            player,
            new Crosshair({ id: 0, radius: 20, timing: timing[0] }),
            new Crosshair({ id: 1, radius: 20, timing: timing[1] }),
        ])
    },
    update() {
        pool.update()
        this.objects = this.objects?.filter((o) => (o as GameObject).isAlive())
        this.objects?.forEach((o) => (o as GameObject).update())

        let quadtree = Quadtree()
        // @ts-ignore
        quadtree.add(player, pool.getAliveObjects())
        // @ts-ignore
        const touching = quadtree.get(player).filter((f) => collides(player, f))
        this.score -= touching.length
        touching.forEach((t) => ((t as GameObject).ttl = 0))
    },
    render() {
        this.objects?.forEach((o) => (o as GameObject).render())
        pool.render()

        Text({
            text: 'Score: ' + this.score,
            font: '32px Arial',
            color: 'black',
            x: 720 / 2,
            y: 100,
            anchor: { x: 0.5, y: 0.5 },
            textAlign: 'center',
        }).render()
    },
})

let pool = Pool({
    // @ts-ignore
    create: Sprite,
})

pool.get({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: 'red',
    opacity: 0,
    ttl: 0,
})

on('explode', (position: Vector, soundData: SoundData) => {

    let radius: number
    let color1: string
    let color2: string
    let count: number
    let ttl: number
    let speed: number

    if (soundData.data < 0.25) {
        radius = 20
        color1 = "brown"
        color2 = "yellow"
        count = 4
        ttl = 320
        speed = 4
    } else if (soundData.data < 0.5) {
        radius = 10
        color1 = "orange"
        color2 = "yellow"
        count = 6
        ttl = 240
        speed = 7
    } else {
        radius = 5
        color1 = "red"
        color2 = "yellow"
        count = 12
        ttl = 60
        speed = 12
    }
    const random = Math.random() * Math.PI

    for (let f = 0; f < count; f++) {
        const pos = (f / count) * 2 * Math.PI

        pool.get({
            position,
            anchor: {x: 0.5, y: 0.5},
            width: 10,
            height: 10,
            color: 'yellow',
            ttl,
            dx: speed * Math.cos(pos + random) * 0.25,
            dy: speed * Math.sin(pos + random) * 0.25,
            render: () => {
                renderFireWork(context, color1, color2, radius)
            },
        })
    }
})

const renderFireWork = (context: CanvasRenderingContext2D, color1: string, color2: string, radius: number) => {
    context.fillStyle = color1
    context.beginPath()
    context.arc(0, 0, radius, 0, 2 * Math.PI)
    context.fill()

    context.fillStyle = color2
    context.beginPath()
    context.arc(0, 0, radius * 0.6, 0, 2 * Math.PI)
    context.fill()
}