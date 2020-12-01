export class Drawable {
    protected ctx:CanvasRenderingContext2D

    constructor(ctx:CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    public drawRect(x:number, y:number, sizeX:number, sizeY:number, border:string, bg:string):void {
        this.ctx.strokeStyle = border
        this.ctx.fillStyle = bg
        this.ctx.strokeRect(x, y, sizeX, sizeY)
        this.ctx.fillRect(x, y, sizeX, sizeY)
    }

    public drawCircle(x:number, y:number, r:number, bg:string):void {
        this.ctx.fillStyle = bg
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    public rotate(x:number, y:number, angle:number):void {
        this.ctx.translate(x, y)
        this.ctx.rotate(angle)
        this.ctx.translate(-x, -y)
    }

    public drawLine(x:number, y:number, toX:number, toY:number, color:string):void {
        this.ctx.fillStyle = '#000000'
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(toX, toY)
        this.ctx.stroke()
    }
}