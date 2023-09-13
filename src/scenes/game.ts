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
  Text, setStoreItem, getStoreItem, seedRand, onKey, initKeys
} from 'kontra'
import { CPlayer } from '../vendor/player-small'
import BeatBeat, { SoundData } from '../vendor/beat-beat-js'
import { player } from '../actors/player'
import { sky } from '../actors/sky'
import { gameSong } from '../music'
import { Crosshair } from '../actors/crosshair'
import { endScene } from "./end";

const { context } = init()

initKeys();

// declare const testSong: any;
let rand = seedRand("kontra")

export const gameScene = Scene({
  id: 'game',
  cPlayer: new CPlayer(),
  audioBuffer: undefined,
  cullObjects: true,
  score: 0,
  progress: 0,
  total: 0,
  escapes: 5,
  sortFunction: (object1: object, object2: object): number => {
    if (object1 === player && player.escaping) {
      return 1
    } else if (object2 === player && player.escaping) {
      return -1
    } else if (object1 === player && !player.escaping) {
      return -1
    } else if (object2 === player && !player.escaping) {
      return 1
    } else {
      return 0
    }
  },
  onHide() {
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
    this.total = this.audioBuffer.songData[0].length + this.audioBuffer.songData[1].length
    // const timing = [...this.audioBuffer.songData]

    this.audioBuffer.play((c: number, time: number, d: number) => {
      emit('fire', c, time, d)
    })

    this.add([
      player,
      new Crosshair({ id: 0, timing: this.audioBuffer.songData[0] }),
      new Crosshair({ id: 0, timing: this.audioBuffer.songData[0] }),
      new Crosshair({ id: 1, timing: this.audioBuffer.songData[1] }),
      new Crosshair({ id: 1, timing: this.audioBuffer.songData[1] }),
    ])

    onKey('space', (e) => {
      if (this.escapes === 0 || player.escaping) return
      this.escapes -= 1
      player.escaping = true
      setTimeout(()=> player.escaping = false, 3000)
    });

  },
  update () {
    sky.update()
    if (this.audioBuffer.songData[0] === undefined || this.audioBuffer.songData[1] === undefined ) {
      return
    }

    this.progress = this.audioBuffer.songData[0].length + this.audioBuffer.songData[1].length

    pool.update()
    this.objects = this.objects?.filter((o) => (o as GameObject).isAlive())
    this.objects?.forEach((o) => { (o as GameObject).update() })

    if (!player.escaping) {
      const quadtree = Quadtree()
      // @ts-expect-error
      quadtree.add(player, pool.getAliveObjects())
      // @ts-expect-error
      const touching = quadtree.get(player).filter((f) => collides(player, f))
      this.score += touching.length
      touching.forEach((t) => ((t as GameObject).ttl = 0))
    }

    if ((this.audioBuffer.songData[0].length + this.audioBuffer.songData[1].length) === 0) {
      setTimeout(() => {
        setStoreItem("score", this.score)
        const highscore = getStoreItem("highscore") || Infinity
        setStoreItem("highscore", Math.min(highscore, this.score))

        emit('changeScene', endScene)
      }, 8000)
    }
  },
  render () {
    sky.render()
    pool.render()
    this.objects?.sort(this.sortFunction)
    this.objects?.forEach((o) => { (o as GameObject).render() })

    this.context?.beginPath()
    this.context!.lineWidth = 10
    this.context!.fillStyle = 'gray'
    this.context?.fillRect(0, 0, 720, 96)
    this.context?.closePath()

    this.context?.beginPath()
    this.context!.lineWidth = 10
    this.context!.fillStyle = 'gray'
    this.context?.fillRect(0, 1184, 720, 1280)
    this.context?.closePath()

    this.context?.beginPath()
    this.context!.lineWidth = 10
    this.context!.fillStyle = 'black'
    this.context?.fillRect(340, 20, 360, 48)
    this.context?.closePath()

    this.context?.beginPath()
    this.context!.lineWidth = 0
    this.context!.fillStyle = 'red'
    this.context?.fillRect(350, 30, (1 - (this.progress / this.total)) * 340, 28)
    this.context?.closePath()

    Text({
      text: 'Progress',
      font: '32px Arial',
      color: 'white',
      anchor: {x: 0.5, y: 0},
      x: 520,
      y: 30,
      textAlign: 'center'
    }).render()

    Text({
      text: 'Escapes: ' + this.escapes,
      font: '48px Arial',
      color: 'black',
      x: 20,
      y: 25,//1220,
      textAlign: 'left'
    }).render()

    Text({
      text: 'Score: ' + this.score,
      font: '48px Arial',
      color: 'black',
      x: 360,
      y: 1220,
      anchor: {x: 0.5, y: 0},
      textAlign: 'center'
    }).render()
  }
})

const pool = Pool({
  // @ts-expect-error
  create: Sprite,
  isAlive: () => true
})

pool.get({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  color: 'red',
  opacity: 0,
  ttl: 0
})

on('explode', (position: Vector, soundData: SoundData) => {
  let radius: number, color1: string, color2: string, count: number, ttl: number, speed: number

  if (soundData.data < 0.25) {
    radius = 20
    color1 = 'red'
    color2 = 'yellow'
    count = 4
    ttl = 320
    speed = 4
  } else if (soundData.data < 0.5) {
    radius = 10
    color1 = 'red'
    color2 = 'yellow'
    count = 6
    ttl = 240
    speed = 7
  } else {
    radius = 5
    color1 = 'red'
    color2 = 'yellow'
    count = 12
    ttl = 60
    speed = 12
  }
  const random = rand() * Math.PI

  for (let f = 0; f < count; f++) {
    const pos = (f / count) * 2 * Math.PI

    pool.get({
      position,
      anchor: { x: 0.5, y: 0.5 },
      width: radius * 2,
      height: radius * 2,
      color: 'yellow',
      ttl,
      dx: speed * Math.cos(pos + random) * 0.25,
      dy: speed * Math.sin(pos + random) * 0.25,
      render: () => {
        renderFireWork(context, color1, color2, radius)
      }
    })
  }
})

const renderFireWork = (context: CanvasRenderingContext2D, color1: string, color2: string, radius: number) => {
  context.fillStyle = color1
  context.beginPath()
  context.arc(radius, radius, radius, 0, 2 * Math.PI)
  context.fill()

  context.fillStyle = color2
  context.beginPath()
  context.arc(radius, radius, radius * 0.6, 0, 2 * Math.PI)
  context.fill()
}
