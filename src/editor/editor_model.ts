import { Wall, Point, MapContent, Gate, MapText } from '../include/type'
import { emptyMap } from '../include/utils'
import * as fs from 'fs'

export class EditorModel {
    private wall:Wall[]
    private spawn:Point
    private gate:Gate[]
    private name:string
    private text:MapText[]
    public static cam:Point
    public static zoom:number

    constructor(file:string) {
        this.name = file
        this.wall = []
        this.spawn = {x:0, y:0}
        this.gate = []
        this.text = []
        this.loadMap(file)
        EditorModel.cam = {x:0, y:0}
        EditorModel.zoom = 1
    }

    public loadMap(file:string):void {
        const content:string = fs.existsSync(file) ? fs.readFileSync(file, {encoding: 'utf8'}) : ''
        const map:MapContent = content !== '' ? JSON.parse(content) : emptyMap
        this.spawn = map.spawn
        this.wall = map.wall
        this.gate = map.gate
        this.text = map.text
    }

    public saveMap(file:string):void {
        const map:string = JSON.stringify({
            spawn:this.spawn,
            wall:this.wall,
            gate:this.gate,
            text:this.text
        })
        fs.writeFileSync(file, map)
    }

    public getSpawn():Point { return this.spawn }
    public setSpawn(spawn:Point):void { this.spawn = spawn }

    public getName():string { return this.name }
    public setName(name:string):void { this.name = name }

    public getWall(i:number):Wall { return this.wall[i] }
    public getAllWall():Wall[] { return this.wall }
    public addWall(wall:Wall):void { this.wall = [...this.wall, wall] }
    public setAllWall(wall:Wall[]):void { this.wall = wall }

    public getGate(i:number):Gate { return this.gate[i] }
    public getAllGate():Gate[] { return this.gate }
    public addGate(gate:Gate):void { this.gate = [...this.gate, gate] }
    public setAllGate(gate:Gate[]):void { this.gate = gate }

    public getText(i:number):MapText { return this.text[i] }
    public getAllText():MapText[] { return this.text }
    public addText(text:MapText):void { this.text = [...this.text, text] }
    public setAllText(text:MapText[]):void { this.text = text }
}