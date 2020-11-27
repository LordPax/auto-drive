import { CarView } from './car_view'
import { CarModel } from './car_model'
import { View } from '../until'

export class Car {
    private model:CarModel
    private view:View

    constructor() {
        this.model = new CarModel()
    }

    public updateCar():void {
        this.model.setCoord(0, this.model.getCoord(0) + this.model.getVelocity(0))
        this.model.setCoord(1, this.model.getCoord(1) + this.model.getVelocity(1))
    }

    public drawCar():void {
        this.view.draw()
    }

    public forward():void {
        this.model.setVelocity(this.model.getSpeed() - this.model.getVmax())
    }
    public backward():void {
        this.model.setVelocity(this.model.getSpeed() + this.model.getVmax())
    }
    public turnRight():void {
        this.model.setAngle(this.model.getAngle() + 10)
    }
    public turnLeft():void {
        this.model.setAngle(this.model.getAngle() - 10)
    }

    public getModel():CarModel { return this.model }
    public setModel(model:CarModel):void { this.model = model }

    public getView():View { return this.view }
    public setView(view:View):void { this.view = view }
}