import { CarView } from './car_view'
import { CarModel } from './car_model'
import { View, Wall, Point, Vector, Line } from '../include/until'

export class Car {
    private model:CarModel
    private view:View

    constructor(x:number = 0, y:number = 0) {
        this.model = new CarModel(x, y)
    }

    public update():void {
        const coord:Point = this.model.getCoord()
        const vel:Point = this.model.getVelocity()
        this.model.setCoord({x:coord.x + vel.x, y:coord.y + vel.y})
    }

    public draw():void {
        this.view.draw()
    }

    public collision(wall:Wall[]):boolean {
        const {x, y} = this.model.getCoord()
        const {x:sx, y:sy} = this.model.getSize()

        const ptsCar:Line[] = [ // p1 p2 p3 p4
            {x, y, toX:x + sx, toY:y},
            {x:x + sx, y, toX:x, toY:y + sy},
            {x, y:y + sy, toX:x + sx, toY:y + sy},
            {x:x + sx, y:y + sy, toX:x, toY:y}
        ]

        const collision:boolean[] = wall.map(w => {
            const coli:boolean[] = ptsCar
            .map(pts => this.getCollide(w, pts))
            .filter(col => col === true)

            return coli.length > 0
        })
        .filter(col => col === true)

        return collision.length > 0
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

    public sensor(line:Line, line2:Line):number {
        const {t, u} = this.intersec(line, line2)
        // TODO : implement sensor
        return 0
    }

    public forward():void {
        this.model.setVelocity(this.model.getSpeed() - this.model.getVmax())
    }
    public backward():void {
        this.model.setVelocity(this.model.getSpeed() + this.model.getVmax())
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