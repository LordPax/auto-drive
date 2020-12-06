import { Car } from '../car/car'
import { MapViewElectron } from './map_view'
import { MapModel } from './map_model'
import { View, Wall } from '../include/type'

export class Map {
    private model:MapModel
    private view:View

    constructor(nbCar:number = null, file:string = null) {
        //this.model = new MapModel(nbCar, file)
    }

    public initMap(map:string):void {
        this.model.initMap(map)
    }

    public update():void {
        const wall:Wall[] = this.model.getAllWall()
        this.model.getAllCars().forEach(car => {
            if (!car.collision(wall))
                car.update(wall)
        })
    }

    public draw():void {
        this.model.getAllCars().forEach(car => car.draw())
        this.view.draw()
    }

    public setCarsView(callback:(car:Car) => View) {
        this.model.getAllCars().forEach(car => car.setView(callback(car)))
    }

    public getModel():MapModel { return this.model }
    public setModel(model:MapModel):void { this.model = model }

    public getView():View { return this.view }
    public setView(view:View):void { this.view = view }
}