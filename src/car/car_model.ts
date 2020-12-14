import { NeuralNetwork, ReLu, Sig, Tanh, Heaviside } from 'billy-brain'
import { roundNumber } from '../include/utils'
import { Point, Sensor, Gate } from '../include/type'

export class CarModel {
    private brain:NeuralNetwork
    private coord:Point
    private velocity:Point
    private vMax:number
    private size:Point
    private angle:number
    private speed:number
    private sensor:Sensor[]
    private ptsSensor:Point[]
    private gatePassed:number[]

    constructor(x:number = 0, y:number = 0) {
        this.brain = new NeuralNetwork(5)
        this.initBrain()
        this.coord = {x, y}
        this.velocity = {x:0, y:0}
        this.speed = 0
        this.size = {x:30, y:30}
        this.vMax = 5
        this.sensor = []
        this.ptsSensor = []
        this.gatePassed = []
        // this.setAngle(-110)
        this.setAngle(-90)
        this.initSensor(5)
    }

    public initBrain():void {
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(4)
    }

    public initSensor(nb:number, acc:number = 1):void {
        const an:number = 180 / (nb + 1)
        const angle:number = (this.angle + 90) - (an * acc)
        this.sensor = [...this.sensor, this.createSensor(200, angle)]
        this.ptsSensor = [...this.ptsSensor, null]
        return acc < nb ? this.initSensor(nb, acc + 1) : null
    }

    public createSensor(range:number, angle:number):Sensor {
        const { vx, vy } = this.convAngle(angle)
        const longToX:number = range * vx
        const longToY:number = range * vy

        return {
            x:this.coord.x + this.size.x / 2,
            y:this.coord.y + this.size.y / 2,
            toX:(this.coord.x + this.size.x / 2) + longToX,
            toY:(this.coord.y + this.size.y / 2) + longToY
        }
    }

    public convAngle(angle:number):{ vx:number, vy:number } {
        const vx:number = Math.cos(angle * Math.PI / 180)
        const vy:number = Math.sin(angle * Math.PI / 180)

        return { vx, vy }
    }

    public setVelocity(velocity:number):void { 
        const minus:number = velocity >= -this.vMax ? 1 : -1
        const vel:number = velocity <= this.vMax && velocity >= -this.vMax 
            ? velocity : this.vMax * minus
        const { vx, vy } = this.convAngle(this.angle)
        const vx2:number = vel * vx
        const vy2:number = vel * vy

        this.speed = vel
        this.velocity = {x:vx2, y:vy2}
    }

    public setAngle(a:number):void { 
        const angle = a % 360
        const { vx, vy } = this.convAngle(angle)
        const vx2:number = this.speed * vx
        const vy2:number = this.speed * vy

        this.angle = angle
        this.velocity = {x:vx2, y:vy2}
    }

    public getBrain():NeuralNetwork { return this.brain }
    public setBrain(brain:NeuralNetwork):void { this.brain = brain }

    public getCoord():Point { return this.coord }
    public setCoord(v:Point):void { this.coord = v }

    public getGatePassed(i:number):number { return this.gatePassed[i] }
    public getAllGatePassed():number[] { return this.gatePassed }
    public setGatePassed(gp:number, i:number):void { this.gatePassed[i] = gp }
    public addGatePassed(gp:number):void { this.gatePassed = [...this.gatePassed, gp] }

    public getSensor(i:number):Sensor { return this.sensor[i] }
    public getAllSensor():Sensor[] { return this.sensor }
    public setAllSensor(s:Sensor[]):void { this.sensor = s }

    public getPtsSensor(i:number):Point { return this.ptsSensor[i] }
    public getAllPtsSensor():Point[] { return this.ptsSensor }
    public setAllPtsSensor(s:Point[]):void { this.ptsSensor = s }

    public getSize():Point { return this.size }
    public setSize(v:Point):void { this.size = v }

    public getVelocity():Point { return this.velocity }
    public getSpeed():number { return this.speed }

    public getVmax():number { return this.vMax }
    public setVmax(v:number):void { this.vMax = v }

    public getAngle():number { return this.angle }
}