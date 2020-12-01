import { MapModel } from './map_model'
import { Map } from './map'
import { View } from '../include/until'
import { Drawable } from '../include/drawable'

export class MapView extends Drawable implements View {
    private map:Map
    private model:MapModel

    constructor(map:Map, ctx:CanvasRenderingContext2D) {
        super(ctx)
        this.model = map.getModel()
    }

    public draw():void {
        this.model.getAllWall().forEach(elem => 
            this.drawLine(elem.x, elem.y, elem.toX, elem.toY, '#000000')
        )
    }
}