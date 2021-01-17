import { Car } from './car'
import { CarModel } from './car_model'
import { View, Point, Sensor } from '../include/type'
import { Drawable } from '../include/drawable'
import { MapModel } from '../map/map_model'

export class CarViewElectron extends Drawable implements View {
    private car:Car
    private model:CarModel

    constructor(car:Car, ctx:CanvasRenderingContext2D) {
        super(ctx)
        this.car = car
        this.model = car.getModel()
    }

    public draw():void {
        const coord:Point = this.model.getCoord()
        const {cam} = MapModel
        const size:Point = this.model.getSize()
        const sensor:Sensor[] = this.model.getAllSensor()
        const ptsSensor:Point[] = this.model.getAllPtsSensor()
        const angle:number = this.model.getAngle()

        const vCoord:Point = {x:coord.x + cam.x, y:coord.y + cam.y}

        // sensor.forEach(s =>
        //     this.drawLine(s.x, s.y, s.toX, s.toY, '#ff0000')
        // )
        ptsSensor.forEach(ps =>
            ps != null && this.drawCircle(ps.x + cam.x, ps.y + cam.y, 5, '#ff0000')
        )
        
        this.rotate(vCoord.x + size.x / 2, vCoord.y + size.y / 2, angle * Math.PI / 180)
        this.drawRect(vCoord.x, vCoord.y, size.x, size.y, '#000000', '#ffffff')
        this.drawCircle(vCoord.x + size.x * 0.75, vCoord.y + size.y / 2, 5, '#ff0000')
        this.rotate(vCoord.x + size.x / 2, vCoord.y + size.y / 2, -angle * Math.PI / 180)
    }
}

export class CarViewNode implements View {
    private car:Car
    private model:CarModel

    constructor(car:Car) {
        this.car = car
        this.model = car.getModel()
    }

    public draw():void {}
}