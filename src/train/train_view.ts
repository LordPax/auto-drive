import { TrainModel } from './train_model'
import { Train } from './train'

export class TrainView {
    private train:Train
    private model:TrainModel

    constructor(train:Train) {
        this.train = train
        this.model = train.getModel()
    }

    public draw(nbGate:number):void {
        const nbSim:number = this.model.getNbSim()
        const gen:number = this.model.getGen()
        const score:number = this.model.getScore(gen - 1)

        console.log('train generation : ' + gen + ' / ' + nbSim + ' - score : ' + score + ' / ' + nbGate)
    }
}