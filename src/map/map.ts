import { Car } from '../car/car'
import { MapViewElectron } from './map_view'
import { MapModel } from './map_model'
import { View, Wall, Gate, ModelContent, Point } from '../include/type'
import { match } from '../include/utils'
import { NeuralNetwork, ReLu, Sig, Tanh, Heaviside } from 'billy-brain'

export class Map {
    private model:MapModel
    private view:View
    
    constructor(nbCar:number, fileMap:string, fileModel:string|ModelContent[] = '') {
        this.model = new MapModel(nbCar, fileMap, fileModel)    
    }

    public update():void {
        const wall:Wall[] = this.model.getAllWall()
        const gate:Gate[] = this.model.getAllGate()
        const date:Date = new Date()
        
        this.model.getAllCars().forEach(car => {
            if (!car.collision(wall))
                car.update(wall, gate)
            else
                car.getModel().setVelocity(0)
        })

        MapModel.timeGate = date.getTime()
    }

    public event(doc:Document):void {
        doc.addEventListener('keydown', event => {
            const {x, y} = MapModel.cam
            const v:number = 20
            MapModel.cam = match(event.keyCode)
            .case(37, () => ({x:x + v, y})) // left
            .case(38, () => ({x, y:y + v})) // up
            .case(39, () => ({x:x - v, y})) // right
            .case(40, () => ({x, y:y - v})) // down
            .default(() => ({x, y}))
        })
    }

    public mutateCar():ModelContent[] {
        const winner:NeuralNetwork = this.model.getWinner()[0].getModel().getBrain()
        const modelWinner:ModelContent[] = this.model.getLastWinner()
        .map(car => car.getModel().getBrain())
        .map(net => ({weight:net.saveWeight(), bias:net.saveBias()}))

        const nb:number = this.model.getNbCar()
        const nbWinner:number = modelWinner.length

        return this.repeteMutate(nb - nbWinner, winner, modelWinner)
    }

    public repeteMutate(nb:number, net:NeuralNetwork, mod:ModelContent[], acc:number = 0):ModelContent[] {
        const otherNet:NeuralNetwork = net.cloneMutate()
        const weight:number[][][] = otherNet.saveWeight()
        const bias:number[][][] = otherNet.saveBias()

        const nouvMod = [...mod, {weight, bias}]

        return acc < nb - 1 ? this.repeteMutate(nb, net, nouvMod, acc + 1) : nouvMod
    }

    public isFinish():boolean { return MapModel.timeGate >= MapModel.timeComp }

    public draw():void {
        this.view.draw()
        this.model.getAllCars().forEach(car => car.draw())
    }

    public setCarsView(callback:(car:Car) => View) {
        this.model.getAllCars().forEach(car => car.setView(callback(car)))
    }

    public getModel():MapModel { return this.model }
    public setModel(model:MapModel):void { this.model = model }

    public getView():View { return this.view }
    public setView(view:View):void { this.view = view }
}