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
        this.drawRect('#000000', '#ffffff')
    }

    public drawRect(border:string, bg:string):void {
        this.ctx.strokeStyle = border
        this.ctx.fillStyle = bg
        this.ctx.strokeRect(this.model.getCoord(0), this.model.getCoord(1), this.model.getSize(0), this.model.getSize(1))
        this.ctx.fillRect(this.model.getCoord(0), this.model.getCoord(1), this.model.getSize(0), this.model.getSize(1))
    }
}