import { init, Sprite, on } from 'kontra'
const { context } = init()

export const sky = Sprite({
    x: 0,
    y: 0,
    anchor: { x: 0, y: 0 },

    context: context,

    // required for a rectangle sprite
    width: context!.canvas.width,
    height: context!.canvas.height,
    color: 'LightSkyBlue',
    direction: false,
    offset: 20,

    init: function (properties: { tempo: number }) {
        setInterval(()=> {
            this.direction = !this.direction
            this.offset = 20
        }, properties.tempo * 10)
    },
    update: function() {
        this.advance()
        this.offset--
}   ,
    render: function () {
        this.draw()

        if (!this.width || !this.height || !this.context) {
            return
        }

        const radius = 20;
        let left = this.direction;

        for (let h = 0; h < this.height; h += radius * 3 ) {
            const count = left ? -this.offset : this.offset

            for(let w = -radius; w < this.width + radius; w += radius ) {
                this.context.strokeStyle = 'white'
                this.context.lineWidth = 2;
                this.context.beginPath()
                this.context.arc(2 * w + count, h+1, radius, 0, Math.PI)
                this.context.stroke()

                this.context.lineWidth = 1;
                this.context.strokeStyle = 'DeepSkyBlue'
                this.context.beginPath()
                this.context.arc(2 * w + count, h, radius, 0, Math.PI)
                this.context.stroke()
            }
            left = !left
        }
    }
})
