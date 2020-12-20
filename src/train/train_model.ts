import { Map } from '../map/map'
import { MapModel } from '../map/map_model'
import { MapViewNode } from '../map/map_view'
import { View } from '../include/type'

export class TrainModel {
    private nbSim:number
    private gen:number
    private fileMap:string
    private fileModel:string
    private nbCar:number
    private score:number[]
    
    constructor(nbSim:number, nbCar:number, fileMap:string, fileModel:string) {
        this.nbSim = nbSim
        this.fileMap = fileMap
        this.fileModel = fileModel
        this.nbCar = nbCar
        this.score = []
        this.gen = 1
    }

    public getNbSim():number { return this.nbSim }
    public getNbCar():number { return this.nbCar }

    public getFileMap():string { return this.fileMap }
    public setFileMap(fileMap:string) { this.fileMap = fileMap }

    public getFileModel():string { return this.fileModel }
    public setFileModel(fileModel:string) { this.fileModel = fileModel }

    public getGen():number { return this.gen }
    public setGen(gen:number) { this.gen = gen }

    public addScore(score:number):void { this.score = [...this.score, score] }
    public getScore(i:number):number { return this.score[i] }
    public getAllScore():number[] { return this.score }
}