import { Car } from './car'
import { CarModel } from './car_model'
import { View, Point } from '../include/until'
import { Drawable } from '../include/drawable'

export class CarView extends Drawable implements View {
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

        this.rotate(coord.x + size.x / 2, coord.y + size.y / 2, this.model.getAngle() * Math.PI / 180)
        this.drawRect(coord.x, coord.y, size.x, size.y, '#000000', '#ffffff')
        this.drawCircle(coord.x + size.x / 4, coord.y + size.y / 2, 5, '#ff0000')
        this.rotate(coord.x + size.x / 2, coord.y + size.y / 2, -this.model.getAngle() * Math.PI / 180)
    }
}

// export class CarViewText implements View {}