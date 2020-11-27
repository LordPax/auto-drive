import { ipcRenderer } from 'electron'
import { roundNumber } from '../until'
import { Car } from '../car/car'
import * as fs from 'fs'

export class MapModel {
    private cars:Car[]
    private nbCar:number
    private mapContent:number[][]

    constructor(nbCar:number) {
        this.nbCar = nbCar
        this.cars = []
        this.mapContent = []
        this.initCars(nbCar)
    }

    public initCars(nb:number):void {
        this.cars = [...this.cars, new Car()]
        return nb > 1 ? this.initCars(nb - 1) : null
    }

    public initMap(file:string):void {
        ipcRenderer.send('file', file)
        ipcRenderer.on('content-file', (event, arg) => this.mapContent = arg)
    }

    public getCars(i:number):Car { return this.cars[i] }
    public getAllCars():Car[] { return this.cars }

    public getMapContent(l:number, c:number):number { return this.mapContent[l][c] }
    public getAllMapContent():number[][] { return this.mapContent }
}