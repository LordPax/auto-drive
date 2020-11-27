export class Drawable {
    public ctx:CanvasRenderingContext2D

    constructor(ctx:CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    /**
    * Draw rectangle
    *
    * @param info [x, y, sizeX, sizeY] 
    * @param border border color
    * @param bg background color
    */
    public drawRect(info:number[], border:string, bg:string):void {
        this.ctx.strokeStyle = border
        this.ctx.fillStyle = bg

        this.ctx.strokeRect(info[0], info[1], info[2], info[3])
        this.ctx.fillRect(info[0], info[1], info[2], info[3])
    }

    /**
    * Draw circle
    *
    * @param info [x, y, sizeX, sizeY] 
    * @param bg background color
    */
    public drawCircle(info:number[], bg:string):void {
        this.ctx.beginPath()
        this.ctx.fillStyle = bg
        this.ctx.arc(info[0] + info[2] / 4, info[1] + info[3] / 2, 5, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    /**
    * do rotation
    *
    * @param info [x, y, sizeX, sizeY] 
    * @param angle angle in degrees
    */
    public rotate(info:number[], angle:number):void {
        this.ctx.translate(info[0] + info[2] / 2, info[1] + info[3] / 2)
        this.ctx.rotate(angle)
        this.ctx.translate(-(info[0] + info[2] / 2), -(info[1] + info[3] / 2))
    }

    /**
    * Draw line
    *
    * @param info [x, y, sizeX, sizeY] 
    * @param color color of line
    */
    public drawLine(info:number[], color:string):void {
        this.ctx.fillStyle = '#000000'
        this.ctx.beginPath()
        this.ctx.moveTo(info[0], info[1])
        this.ctx.lineTo(info[2], info[3])
        this.ctx.stroke()
    }
}