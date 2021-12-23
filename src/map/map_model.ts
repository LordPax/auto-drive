import { ipcRenderer } from 'electron'
import { emptyMap, compareCar, emptyModel } from '../include/utils'
import { roundNumber } from 'lib-perso'
import { Wall, Point, MapContent, Gate, MapText, ModelContent } from '../include/type'
import { Car } from '../car/car'
import * as fs from 'fs'

export class MapModel {
    private cars:Car[]
    private nbCar:number
    private wall:Wall[]
    private gate:Gate[]
    private text:MapText[]
    public static timeGate:number // temps en miliseconds entre chaque gate
    public static timeComp:number
    public static timeMax:number = 3000
    public static cam:Point
    public static zoom:number

    constructor(nbCar:number, fileMap:string, fileModel:string|ModelContent[]) {
        this.nbCar = nbCar
        this.cars = []
        this.wall = []
        this.gate = []
        this.text = []
        const date:Date = new Date()
        const time:number = date.getTime()
        MapModel.timeGate = time
        MapModel.timeComp = time + MapModel.timeMax
        this.initAll(nbCar, fileMap, fileModel)
        MapModel.cam = {x:0, y:0}
        MapModel.zoom = 1
    }

    public initCars(nb:number, spawn:Point, model:ModelContent[], acc:number = 0):void {
        if (model.length > 0)
            this.cars = [...this.cars, new Car(spawn.x, spawn.y, model[acc].weight, model[acc].bias)]
        else
            this.cars = [...this.cars, new Car(spawn.x, spawn.y)]
        return acc < nb - 1 ? this.initCars(nb, spawn, model, acc + 1) : null
    }

    public loadModel(file:string):ModelContent[] {
        const content:string = fs.existsSync(file) ? fs.readFileSync(file, {encoding: 'utf8'}) : ''
        return content !== '' ? JSON.parse(content) : []
    }

    public loadMap(file:string):MapContent {
        const content:string = fs.existsSync(file) ? fs.readFileSync(file, {encoding: 'utf8'}) : ''
        return content !== '' ? JSON.parse(content) : emptyMap
    }

    public initAll(nbCar:number, fileMap:string, fileModel:string|ModelContent[]):void {
        const map:MapContent = this.loadMap(fileMap)
        const model:ModelContent[] = typeof fileModel === 'string'
            ? this.loadModel(fileModel) : fileModel

        this.wall = map.wall
        this.gate = map.gate
        this.text = map.text

        this.initCars(nbCar, map.spawn, model)
    }

    public extractModel():ModelContent[] {
        return this.cars
        .sort(compareCar)
        .map(car => {
            const weight:number[][][] = car.getModel().getBrain().saveWeight()
            const bias:number[][][] = car.getModel().getBrain().saveBias()

            return {
                weight,
                bias
            }
        })
    }

    public saveModel(file:string):void {
        const model:ModelContent[] = this.extractModel()
        const data:string = JSON.stringify(model)
        fs.writeFileSync(file, data)
    }

    public getWinner():Car[] { return this.cars.sort(compareCar)}
    public getLastWinner():Car[] {
        const bestScore:number = this.getWinner()[0].getModel().getBrain().getReward()
        return this.cars.filter(car => car.getModel().getBrain().getReward() === bestScore)
    }

    public getNbCar():number { return this.nbCar }

    public getCars(i:number):Car { return this.cars[i] }
    public getAllCars():Car[] { return this.cars }

    public getWall(i:number):Wall { return this.wall[i] }
    public getAllWall():Wall[] { return this.wall }
    public setAllWall(wall:Wall[]):void { this.wall = wall }

    public getGate(i:number):Gate { return this.gate[i] }
    public getAllGate():Gate[] { return this.gate }
    public setAllGate(gate:Gate[]):void { this.gate = gate }

    public getText(i:number):MapText { return this.text[i] }
    public getAllText():MapText[] { return this.text }
}
