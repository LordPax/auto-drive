import { Map } from '../map/map'
import { MapViewNode } from '../map/map_view'
import { CarViewNode } from '../car/car_view'
import { MapModel } from '../map/map_model'
import { TrainModel } from './train_model'
import { TrainView } from './train_view'
import { ModelContent } from '../include/type'

export class Train {
    private model:TrainModel
    private view:TrainView

    constructor(nbSim:number, nbCar:number, fileMap:string, fileModel:string) {
        this.model = new TrainModel(nbSim, nbCar, fileMap, fileModel)
        this.view = new TrainView(this)
    }

    public calculate(mod1:string|ModelContent[] = [], acc:number = 0):void {
        const map:Map = new Map(this.model.getNbCar(), this.model.getFileMap(), mod1)

        map.setView(new MapViewNode(map))
        map.setCarsView(car => new CarViewNode(car))

        while (!map.isFinish()) {
            map.update()
        }

        this.model.addScore(map.getModel().getWinner()[0].getModel().getBrain().getReward())
        this.view.draw(map.getModel().getAllGate().length)

        const mod2:ModelContent[] = map.mutateCar()
        
        this.model.setGen(this.model.getGen() + 1)

        return acc < this.model.getNbSim() - 1
            ? this.calculate(mod2, acc + 1)
            : map.getModel().saveModel(this.model.getFileModel())
    }

    public getModel():TrainModel { return this.model }
    public setModel(model:TrainModel):void { this.model = model }

    public getView():TrainView { return this.view }
    public setView(view:TrainView):void { this.view = view }
}