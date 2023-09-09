interface SoundData {
    data: number
    time: number
}

export default class BeatBeat {
    isPlaying = false

    private offlineContext!: OfflineAudioContext
    private songData: Record<number, SoundData[]> = []

    constructor(
        private context: AudioContext,
        private buffer: AudioBuffer,
        private filterFrequency = 100,
        private peakGain = 15,
        private threshold = 0.2,
        private sampleSkip = 350,
        private minAnimationTime = 0.2
    ) {}

    load() {
        return new Promise<void>(async (resolve) => {
            await this.analyze()
            resolve()
        })
    }

    play(cb: any) {
        this.isPlaying = true
        const source = this.context.createBufferSource()
        source.buffer = this.buffer
        source.connect(this.context.destination)
        source.start()
        this.animate(cb)
    }

    private async analyze() {
        this.offlineContext = new OfflineAudioContext(
            this.buffer.numberOfChannels,
            this.buffer.length,
            this.buffer.sampleRate
        )
        const source = this.offlineContext.createBufferSource()
        source.buffer = this.buffer

        const filter = this.offlineContext.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.value = this.filterFrequency
        filter.Q.value = 1

        const filter2 = this.offlineContext.createBiquadFilter()
        filter2.type = 'peaking'
        filter2.frequency.value = this.filterFrequency
        filter2.Q.value = 1
        filter2.gain.value = this.peakGain

        source.connect(filter2)
        filter2.connect(filter)
        filter.connect(this.offlineContext.destination)
        source.start()
        const buffer = await this.offlineContext.startRendering()

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const data = buffer.getChannelData(channel)

            this.songData[channel] = []
            for (let i = 0; i < data.length; ++i) {
                if (data[i] > this.threshold) {
                    const time = i / buffer.sampleRate
                    const previousTime = this.songData[channel].length
                        ? this.songData[channel][
                              this.songData[channel].length - 1
                          ].time
                        : 0
                    if (time - previousTime > this.minAnimationTime) {
                        this.songData[channel].push({
                            data: data[i],
                            time,
                        })
                    }
                }
                i += this.sampleSkip
            }
        }
    }

    private animate(cb: any) {
        for (let c = 0; c < Object.keys(this.songData).length; c++) {
            this.songData[c].forEach((d, i) => {
                const time =
                    i === this.songData[c].length - 1
                        ? d.time
                        : this.songData[c][i + 1].time - d.time
                setTimeout(() => cb(c, time, d), d.time * 1000)
            })
        }
    }
}
