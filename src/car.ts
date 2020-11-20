import { CarView } from './car_view'
import { CarModel } from './car_model'

export class Car {
    private model:CarModel
    private view:CarView

    constructor(ctx:CanvasRenderingContext2D) {
        this.model = new CarModel()
        this.view = new CarView(this, ctx)
    }

    public update():void {
        this.model.setCoord(0, this.model.getCoord(0) + this.model.getVelocity(0))
        this.model.setCoord(1, this.model.getCoord(1) + this.model.getVelocity(1))

        // console.log('x :', this.model.getCoord(0))
        // console.log('y :', this.model.getCoord(1))
        // console.log('vx :', this.model.getVelocity(0))
        // console.log('vy :', this.model.getVelocity(1))
        // console.log('angle :', this.model.getAngle())
        // console.log('speed :', this.model.getSpeed())
    }

    public forward():void {
        this.model.setVelocity(this.model.getSpeed() - 2)
    }
    public backward():void {
        this.model.setVelocity(this.model.getSpeed() + 2)
    }
    public turnRight():void {
        this.model.setAngle(this.model.getAngle() + 10)
    }
    public turnLeft():void {
        this.model.setAngle(this.model.getAngle() - 10)
    }

    public getModel():CarModel { return this.model }
    public setModel(model:CarModel):void { this.model = model }

    public getView():CarView { return this.view }
    public setView(view:CarView):void { this.view = view }
}