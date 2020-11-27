import { MapModel } from './map_model'
import { Map } from './map'
import { View } from '../until'
import { Drawable } from '../drawable'

export class MapView extends Drawable implements View {
    private map:Map
    private model:MapModel

    constructor(map:Map, ctx:CanvasRenderingContext2D) {
        super(ctx)
        this.model = map.getModel()
    }

    public draw():void {
        this.model.getAllMapContent().map(elem => this.drawLine(elem, '#000000'))
    }
}