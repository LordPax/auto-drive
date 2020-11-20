import { Car } from './car'
import { CarModel } from './car_model'

export class CarView {
    private ctx:CanvasRenderingContext2D
    private car:Car
    private model:CarModel

    constructor(car:Car, ctx:CanvasRenderingContext2D) {
        this.ctx = ctx
        this.car = car
        this.model = car.getModel()
    }

    public drawCar():void {
        this.rotate(this.model.getAngle() * Math.PI / 180)
        this.drawRect('#000000', '#ffffff')
        this.drawCircle('#ff0000')
        this.rotate(-this.model.getAngle() * Math.PI / 180)
    }

    public drawRect(border:string, bg:string):void {
        this.ctx.strokeStyle = border
        this.ctx.fillStyle = bg

        this.ctx.strokeRect(this.model.getCoord(0), this.model.getCoord(1), this.model.getSize(0), this.model.getSize(1))
        this.ctx.fillRect(this.model.getCoord(0), this.model.getCoord(1), this.model.getSize(0), this.model.getSize(1))
    }

    public drawCircle(bg:string):void {
        this.ctx.beginPath()
        this.ctx.fillStyle = bg
        this.ctx.arc(this.model.getCoord(0) + this.model.getSize(0) / 4, this.model.getCoord(1) + this.model.getSize(1) / 2, 5, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    public rotate(angle:number):void {
        this.ctx.translate(this.model.getCoord(0) + this.model.getSize(0) / 2, this.model.getCoord(1) + this.model.getSize(1) / 2)
        this.ctx.rotate(angle)
        this.ctx.translate(-(this.model.getCoord(0) + this.model.getSize(0) / 2), -(this.model.getCoord(1) + this.model.getSize(1) / 2))
    }
}