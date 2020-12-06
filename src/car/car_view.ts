import { Car } from './car'
import { CarModel } from './car_model'
import { View, Point, Sensor } from '../include/type'
import { Drawable } from '../include/drawable'

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
        const size:Point = this.model.getSize()
        const sensor:Sensor[] = this.model.getAllSensor()
        const ptsSensor:Point[] = this.model.getAllPtsSensor()
        const angle:number = this.model.getAngle()

        sensor.forEach(s =>
            this.drawLine(s.x, s.y, s.toX, s.toY, '#ff0000')
        )
        ptsSensor.forEach(ps =>
            ps != null && this.drawCircle(ps.x, ps.y, 5, '#ff0000')
        )
        
        this.rotate(coord.x + size.x / 2, coord.y + size.y / 2, angle * Math.PI / 180)
        this.drawRect(coord.x, coord.y, size.x, size.y, '#000000', '#ffffff')
        this.drawCircle(coord.x + size.x * 0.75, coord.y + size.y / 2, 5, '#ff0000')
        this.rotate(coord.x + size.x / 2, coord.y + size.y / 2, -angle * Math.PI / 180)
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