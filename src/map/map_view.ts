import { MapModel } from './map_model'
import { Map } from './map'
import { View, Wall, Gate, MapText } from '../include/type'
import { Drawable } from '../include/drawable'

export class MapViewElectron extends Drawable implements View {
    private map:Map
    private model:MapModel

    constructor(map:Map, ctx:CanvasRenderingContext2D) {
        super(ctx)
        this.map = map
        this.model = map.getModel()
    }

    public draw():void {
        const wall:Wall[] = this.model.getAllWall()
        const gate:Gate[] = this.model.getAllGate()
        const text:MapText[] = this.model.getAllText()

        wall.forEach(elem => 
            this.drawLine(elem.x, elem.y, elem.toX, elem.toY, '#000000')
        )
        gate.forEach(elem => 
            this.drawLine(elem.x, elem.y, elem.toX, elem.toY, '#00ff00')
        )
        text.forEach(elem => 
            this.drawText(elem.x, elem.y, elem.txt, '#000000', 15)
        )
    }
}

export class MapViewNode implements View {
    private map:Map
    private model:MapModel

    constructor(map:Map) {
        this.map = map
        this.model = map.getModel()
    }

    public draw():void {}
}