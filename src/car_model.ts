import { NeuralNetwork, ReLu, Sig, Tanh, Heaviside } from 'billy-brain'

export class CarModel {
    private brain:NeuralNetwork
    private coord:number[]
    private velocity:number[]
    private vMax:number
    private size:number[]
    private angle:number

    constructor() {
        this.brain = new NeuralNetwork(5)
        this.initBrain()
        this.coord = [50, 50]
        this.velocity = [0, 0]
        this.size = [10, 20]
        this.vMax = 5
    }

    public initBrain():void {
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(5)
        this.brain.addLayer(4)
    }

    public getBrain():NeuralNetwork { return this.brain }
    public setBrain(brain:NeuralNetwork):void { this.brain = brain }

    public getCoord(i:number):number { return this.coord[i] }
    public setCoord(i:number, v:number):void { this.coord[i] = v }

    public getSize(i:number):number { return this.size[i] }
    public setSize(i:number, v:number):void { this.size[i] = v }

    public getVelocity(i:number):number { return this.coord[i] }
    public setVelocity(i:number, v:number):void { this.coord[i] = v }

    public getVmax():number { return this.vMax }
    public setVmax(v:number):void { this.vMax = v }

    public getAngle():number { return this.angle }
    public setAngle(v:number):void { this.angle = v }
}