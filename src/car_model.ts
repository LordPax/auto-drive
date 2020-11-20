import { NeuralNetwork, ReLu, Sig, Tanh, Heaviside } from 'billy-brain'
import { roundNumber } from './until'

export class CarModel {
    private brain:NeuralNetwork
    private coord:number[]
    private velocity:number[]
    private vMax:number
    private size:number[]
    private angle:number
    private speed:number

    constructor() {
        this.brain = new NeuralNetwork(5)
        this.initBrain()
        this.coord = [100, 100]
        this.velocity = [0, 0]
        this.speed = 0
        this.size = [40, 20]
        this.vMax = 5
        // this.angle = 90
        this.setAngle(90)
    }

    public initBrain():void {
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(4)
    }

    public convAngle(angle:number):{ vx:number, vy:number } {
        const vx:number = Math.cos(angle * Math.PI / 180)
        const vy:number = Math.sin(angle * Math.PI / 180)

        return { vx, vy }
    }

    public getBrain():NeuralNetwork { return this.brain }
    public setBrain(brain:NeuralNetwork):void { this.brain = brain }

    public getCoord(i:number):number { return this.coord[i] }
    public setCoord(i:number, v:number):void { this.coord[i] = v }

    public getSize(i:number):number { return this.size[i] }
    public setSize(i:number, v:number):void { this.size[i] = v }

    public getVelocity(i:number):number { return this.velocity[i] }
    public getSpeed():number { return this.speed }
    public setVelocity(velocity:number):void { 
        const { vx, vy } = this.convAngle(this.angle)
        const vx2:number = velocity * vx
        const vy2:number = velocity * vy

        this.speed = velocity
        this.velocity = [vx2, vy2]
    }

    public getVmax():number { return this.vMax }
    public setVmax(v:number):void { this.vMax = v }

    public getAngle():number { return this.angle }
    public setAngle(a:number):void { 
        const angle = a % 360
        const { vx, vy } = this.convAngle(angle)
        const vx2:number = this.speed * vx
        const vy2:number = this.speed * vy

        this.angle = angle
        this.velocity = [vx2, vy2]
    }
}