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
        
    }

    public getModel():CarModel { return this.model }
    public setModel(model:CarModel) {this.model = model }

    public getView():CarView { return this.view }
    public setView(view:CarView) {this.view = view }
}