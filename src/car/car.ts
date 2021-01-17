import { CarViewElectron } from './car_view'
import { CarModel } from './car_model'
import { Map } from '../map/map'
import { MapModel } from '../map/map_model'
import { View, Wall, Point, Vector, Line, Sensor, Gate } from '../include/type'
import { NeuralNetwork, ReLu, Sig, Tanh, Heaviside } from 'billy-brain'
import { distance, intersec, getCollide, sensorCollidePoint, compareSensore } from '../include/utils'

export class Car {
    private model:CarModel
    private view:View
    private map:Map

    constructor(x:number = 0, y:number = 0, weight:number[][][] = null, bias:number[][][] = null) {
        this.model = new CarModel(x, y, weight, bias)
    }

    public update(wall:Wall[], gate:Gate[]):void {
        const coord:Point = this.model.getCoord()
        const size:Point = this.model.getSize()
        const vel:Point = this.model.getVelocity()
        const sensor:Sensor[] = this.model.getAllSensor()

        const an:number = 180 / (sensor.length + 1)
        const angle:number = this.model.getAngle() + 90

        this.model.setCoord({x:coord.x + vel.x, y:coord.y + vel.y})
        this.model.setAllSensor(sensor.map((sen, i) => this.model.createSensor(200, angle - (an * (i + 1)))))
        this.model.setAllPtsSensor(this.sensorPoint(wall))
        this.isGatePasse(gate)

        if (wall.length !== 0)
            this.calculeMove()
    }

    public draw():void {
        this.view.draw()
    }

    public calculeMove():void {
        const coord:Point = this.model.getCoord()
        const ptsSen:Point[] = this.model.getAllPtsSensor()
        const brain:NeuralNetwork = this.model.getBrain()

        const dist:number[][] = ptsSen
        .map(pts => pts !== null ? pts : {x:coord.x, y:coord.y})
        .map(pts => [distance(pts, coord)])

        this.move(brain.calculate(dist, Tanh, Heaviside))
    }

    public move(move:number[][]):void {
        if (move[0][0] === 1)
            this.forward()
        if (move[1][0] === 1)
            this.backward()
        if (move[2][0] === 1)
            this.turnRight()
        if (move[3][0] === 1)
            this.turnLeft()
    }

    public collision(wall:Wall[]):boolean {
        const ptsCar:Line[] = this.dimensionCar()

        const collision:boolean[] = wall.map(w => {
            const coli:boolean[] = ptsCar
            .map(pts => getCollide(w, pts))
            .filter(col => col === true)

            return coli.length > 0
        })
        .filter(col => col === true)

        return collision.length > 0
    }

    public sensorPoint(wall:Wall[]):Point[] {
        const sensor:Sensor[] = this.model.getAllSensor()
        const coord:Point = this.model.getCoord()

        const point:Point[] = sensor.map(s => {
            const coli:Point[] = wall
            .map(w => sensorCollidePoint(s, w))
            .filter(col => col !== null)
            .sort((a:Point, b:Point) => compareSensore(a, b, coord))

            return coli.length > 0 ? coli[0] : null
        })

        return point
    }

    public isGatePasse(gate:Gate[]):void {
        const gp:number[] = this.model.getAllGatePassed()
        const rw:number = this.model.getBrain().getReward()
        const ptsCar:Line[] = this.dimensionCar()
        const date:Date = new Date()

        gate.forEach((g, i) => {
            const coli:number = gp.indexOf(i) === -1 
            ? ptsCar.map(pts => getCollide(g, pts))
            .filter(col => col === true).length : 0

            if (coli > 0) {
                this.model.addGatePassed(i)
                this.model.getBrain().setReward(rw + 1)
                MapModel.timeComp = date.getTime() + MapModel.timeMax
            }
        })
    }

    public dimensionCar():Line[] {
        const {x, y} = this.model.getCoord()
        const {x:sx, y:sy} = this.model.getSize()

        return [
            {x, y, toX:x + sx, toY:y},
            {x:x + sx, y, toX:x, toY:y + sy},
            {x, y:y + sy, toX:x + sx, toY:y + sy},
            {x:x + sx, y:y + sy, toX:x, toY:y}
        ]
    }

    public forward():void {
        this.model.setVelocity(this.model.getSpeed() + this.model.getVmax())
    }
    public backward():void {
        this.model.setVelocity(this.model.getSpeed() - this.model.getVmax())
    }
    public turnRight():void {
        this.model.setAngle(this.model.getAngle() + 10)
    }
    public turnLeft():void {
        this.model.setAngle(this.model.getAngle() - 10)
    }

    public getModel():CarModel { return this.model }
    public setModel(model:CarModel):void { this.model = model }

    public getView():View { return this.view }
    public setView(view:View):void { this.view = view }
}