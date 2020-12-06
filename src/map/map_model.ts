import { ipcRenderer } from 'electron'
import { roundNumber } from '../include/utils'
import { Wall, Point } from '../include/type'
import { Car } from '../car/car'
import * as fs from 'fs'

export abstract class MapModel {
    protected cars:Car[]
    protected nbCar:number
    protected wall:Wall[]

    constructor(nbCar:number, file:string) {
        this.nbCar = nbCar
        this.cars = []
        this.wall = []
        this.initCars(nbCar)
        this.initMap(file)
    }

    public initCars(nb:number):void {
        this.cars = [...this.cars, new Car()]
        return nb > 1 ? this.initCars(nb - 1) : null
    }

    public abstract initMap(file:string):void

    public getCars(i:number):Car { return this.cars[i] }
    public getAllCars():Car[] { return this.cars }

    public getWall(i:number):Wall { return this.wall[i] }
    public getAllWall():Wall[] { return this.wall }
}

export class MapModelElectron extends MapModel {
    constructor(nbCar:number, file:string) {
        super(nbCar, file);
    }

    public initMap(file:string):void {
        ipcRenderer.send('file', file)
        ipcRenderer.on('content-file', (event, arg) => {
            this.wall = arg.wall
            this.cars.forEach(car => car.getModel().setCoord(arg.spawn))
        })
    }
}

export class MapModelNode extends MapModel {
    constructor(nbCar:number, file:string) {
        super(nbCar, file);
    }

    public initMap(file:string):void {
        // TODO : implementer une version sans event
    }
}