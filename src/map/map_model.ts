import { ipcRenderer } from 'electron'
import { roundNumber, emptyMap } from '../include/utils'
import { Wall, Point, MapContent, Gate, MapText } from '../include/type'
import { Car } from '../car/car'
import * as fs from 'fs'

export class MapModel {
    protected cars:Car[]
    protected nbCar:number
    protected wall:Wall[]
    protected gate:Gate[]
    protected text:MapText[]

    constructor(nbCar:number, file:string) {
        this.nbCar = nbCar
        this.cars = []
        this.wall = []
        this.gate = []
        this.text = []
        this.initCars(nbCar)
        this.loadMap(file)
    }

    public initCars(nb:number):void {
        this.cars = [...this.cars, new Car()]
        return nb > 1 ? this.initCars(nb - 1) : null
    }

    public loadMap(file:string):void {
        const content:string = fs.existsSync(file) ? fs.readFileSync(file, {encoding: 'utf8'}) : ''
        const map:MapContent = content !== '' ? JSON.parse(content) : emptyMap
        this.cars.forEach(car => car.getModel().setCoord(map.spawn))
        this.wall = map.wall
        this.gate = map.gate
        this.text = map.text
    }

    public getCars(i:number):Car { return this.cars[i] }
    public getAllCars():Car[] { return this.cars }

    public getWall(i:number):Wall { return this.wall[i] }
    public getAllWall():Wall[] { return this.wall }

    public getGate(i:number):Gate { return this.gate[i] }
    public getAllGate():Gate[] { return this.gate }

    public getText(i:number):MapText { return this.text[i] }
    public getAllText():MapText[] { return this.text }
}

/*export class MapModelElectron extends MapModel {
    constructor(nbCar:number, file:string) {
        super(nbCar, file);
    }

    public loadMap(file:string):void {
        ipcRenderer.send('file', file)
        ipcRenderer.on('content-file', (event, arg) => {
            this.cars.forEach(car => car.getModel().setCoord(arg.spawn))
            this.wall = arg.wall
        })
    }

    public loadMap(file:string):void {
        const content:string = fs.existsSync(file) ? fs.readFileSync(file, {encoding: 'utf8'}) : ''
        const map:MapContent = JSON.parse(content)
        this.cars.forEach(car => car.getModel().setCoord(map.spawn))
        this.wall = map.wall
    }
}

export class MapModelNode extends MapModel {
    constructor(nbCar:number, file:string) {
        super(nbCar, file);
    }

    public loadMap(file:string):void {
        // TODO : implementer une version sans event
    }
}*/