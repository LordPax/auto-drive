import { ipcRenderer } from 'electron'
import { roundNumber, Wall, Point } from '../include/until'
import { Car } from '../car/car'
import * as fs from 'fs'

export class MapModel {
    private cars:Car[]
    private nbCar:number
    private wall:Wall[]

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

    public initMap(file:string):void {
        ipcRenderer.send('file', file)
        ipcRenderer.on('content-file', (event, arg) => {
            this.wall = arg.wall
            this.cars.forEach(car => car.getModel().setCoord(arg.spawn))
        })
    }

    public getCars(i:number):Car { return this.cars[i] }
    public getAllCars():Car[] { return this.cars }

    public getWall(i:number):Wall { return this.wall[i] }
    public getAllWall():Wall[] { return this.wall }
}