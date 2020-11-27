import { Car } from './car'
import { CarModel } from './car_model'
import { View } from '../until'
import { Drawable } from '../drawable'

export class CarView extends Drawable implements View {
    private car:Car
    private model:CarModel

    constructor(car:Car, ctx:CanvasRenderingContext2D) {
        super(ctx)
        this.car = car
        this.model = car.getModel()
    }

    public draw():void {
        const coord:number[] = this.model.getAllCoord()
        const size:number[] = this.model.getAllSize()

        this.rotate([...coord, ...size], this.model.getAngle() * Math.PI / 180)
        this.drawRect([...coord, ...size],'#000000', '#ffffff')
        this.drawCircle([...coord, ...size],'#ff0000')
        this.rotate([...coord, ...size], -this.model.getAngle() * Math.PI / 180)
    }
}

// export class CarViewText implements View {}