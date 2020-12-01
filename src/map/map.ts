import { Car } from '../car/car'
import { MapView } from './map_view'
import { MapModel } from './map_model'
import { View } from '../include/until'

export class Map {
    private model:MapModel
    private view:View

    constructor(nbCar:number, file:string) {
        this.model = new MapModel(nbCar, file)
    }

    public initMap(map:string):void {
        this.model.initMap(map)
    }

    public update():void {
        this.model.getAllCars().forEach(car => {
            if (!car.collision(this.model.getAllWall()))
                car.update()
        })
    }

    public draw():void {
        this.model.getAllCars().forEach(car => car.draw())
        this.view.draw()
    }

    public setCarsView(callback:(car:Car) => void) {
        this.model.getAllCars().forEach(callback)
    }

    public getModel():MapModel { return this.model }
    public setModel(model:MapModel):void { this.model = model }

    public getView():View { return this.view }
    public setView(view:View):void { this.view = view }
}