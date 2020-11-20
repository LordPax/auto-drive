import { Car } from './car'

export class Map {
    private cars:Car[]
    private nbCar:number
    private ctx:CanvasRenderingContext2D

    constructor(nbCar:number, ctx:CanvasRenderingContext2D) {
        this.nbCar = nbCar
        this.cars = []
        this.ctx = ctx
        this.initCars(nbCar)
    }

    public initCars(nb:number):void {
        this.cars = [...this.cars, new Car(this.ctx)]
        return nb > 1 ? this.initCars(nb - 1) : null
    }

    public updateCars():void {
        this.cars.forEach(car => car.updateCar())
    }

    public drawCars():void {
        this.cars.forEach(car => car.drawCar())
    }

    public getCars(i:number):Car { return this.cars[i] }
    public getAllCars():Car[] { return this.cars }
}