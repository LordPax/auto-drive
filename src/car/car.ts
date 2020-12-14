import { CarViewElectron } from './car_view'
import { CarModel } from './car_model'
import { View, Wall, Point, Vector, Line, Sensor, Gate } from '../include/type'
import { NeuralNetwork, ReLu, Sig, Tanh, Heaviside } from 'billy-brain'

export class Car {
    private model:CarModel
    private view:View

    constructor(x:number = 0, y:number = 0) {
        this.model = new CarModel(x, y)
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
        .map(pts => [this.distance(pts, coord)])

        const res:number[][] = brain.calculate(dist, Tanh, Heaviside)

        if (res[0][0] == 1)
            this.forward()

        if (res[1][0] == 1)
            this.backward()

        if (res[2][0] == 1)
            this.turnRight()

        if (res[3][0] == 1)
            this.turnLeft()
    }

    public collision(wall:Wall[]):boolean {
        const ptsCar:Line[] = this.dimensionCar()

        const collision:boolean[] = wall.map(w => {
            const coli:boolean[] = ptsCar
            .map(pts => this.getCollide(w, pts))
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
            .map(w => this.sensorCollidePoint(s, w))
            .filter(col => col !== null)
            .sort((a:Point, b:Point) => {
                const distA:number = this.distance(a, coord);
                const distB:number = this.distance(b, coord);
                
                return distA - distB
            })

            return coli.length > 0 ? coli[0] : null
        })

        return point
    }

    public isGatePasse(gate:Gate[]):void {
        const gp:number[] = this.model.getAllGatePassed()
        const rw:number = this.model.getBrain().getReward()
        const ptsCar:Line[] = this.dimensionCar()

        gate.forEach((g, i) => {
            const coli:number = gp.indexOf(i) === -1 
            ? ptsCar.map(pts => this.getCollide(g, pts))
            .filter(col => col === true).length
            : 0

            if (coli > 0) {
                this.model.addGatePassed(i) 
                this.model.getBrain().setReward(rw + 1)
                // console.log(rw + 1)
            }
        })
    }

    public dimensionCar():Line[] {
        const {x, y} = this.model.getCoord()
        const {x:sx, y:sy} = this.model.getSize()

        return [ // p1 p2 p3 p4
            {x, y, toX:x + sx, toY:y},
            {x:x + sx, y, toX:x, toY:y + sy},
            {x, y:y + sy, toX:x + sx, toY:y + sy},
            {x:x + sx, y:y + sy, toX:x, toY:y}
        ]
    }

    public distance(ptsA:Point, ptsB:Point):number {
        const vec:Point = {x:ptsA.x - ptsB.x, y:ptsA.y - ptsB.y}
        const dist:number = Math.sqrt(vec.x * vec.x + vec.y * vec.y)
        
        return dist
    }

    public intersec(line:Line, line2:Line):{t:number, u:number} {
        const vecD:Vector = {x:line.toX - line.x, y:line.toY - line.y}
        const vecE:Vector = {x:line2.toX - line2.x, y:line2.toY - line2.y}

        const denom:number = vecD.x * vecE.y - vecD.y * vecE.x

        const t:number = -(line.x * vecE.y - line2.x * vecE.y - vecE.x * line.y + vecE.x * line2.y) / denom
        const u:number = -(-vecD.x * line.y + vecD.x * line2.y + vecD.y * line.x - vecD.y * line2.x) / denom

        return {t, u}
    }

    public getCollide(line:Line, line2:Line):boolean {
        const {t, u} = this.intersec(line, line2)
        return t >= 0 && t <= 1 && u >= 0 && u <= 1
    }

    public sensorCollidePoint(line:Line, line2:Line):Point {
        const {t, u} = this.intersec(line, line2)

        const cond:boolean = t >= 0 && t <= 1 && u >= 0 && u <= 1
        const vecD:Vector = {x:line.toX - line.x, y:line.toY - line.y}

        const interX:number = line.x + t * vecD.x
        const interY:number = line.y + t * vecD.y

        return cond ? {x:interX, y:interY} : null
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