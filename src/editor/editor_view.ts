import { Drawable } from '../include/drawable'
import { EditorModel } from './editor_model'
import { Editor } from './editor'
import { Point, Wall, Gate, MapText } from '../include/type'

export class EditorView extends Drawable {
    private model:EditorModel
    private editor:Editor

    constructor(edit:Editor, ctx:CanvasRenderingContext2D) {
        super(ctx)
        this.editor = edit
        this.model = edit.getModel()
    }

    public draw():void {
        const spawn:Point = this.model.getSpawn()
        const wall:Wall[] = this.model.getAllWall()
        const gate:Gate[] = this.model.getAllGate()
        // const text:MapText[] = this.model.getAllText()
        const mode:number = this.editor.getMode()
        const {cam} = EditorModel

        wall.forEach(elem => 
            this.drawLine(elem.x + cam.x, elem.y + cam.y, elem.toX + cam.x, elem.toY + cam.y, '#000000')
        )
        gate.forEach(elem => 
            this.drawLine(elem.x + cam.x, elem.y + cam.y, elem.toX + cam.x, elem.toY + cam.y, '#00ff00')
        )
        // text.forEach(elem => 
        //     this.drawText(elem.x, elem.y, elem.txt, '#000000', 15)
        // )
        this.drawCircle(spawn.x + cam.x, spawn.y + cam.y, 5, '#00ff00')

        if (mode === 1) this.drawMode(50, 50, 'insertion de mure')
        else if (mode === 2) this.drawHelp(50, 50)
        else if (mode === 3) this.drawMode(50, 50, 'modification spawn')
        else if (mode === 4) this.drawMode(50, 50, 'insertion de gate')
        else if (mode === 6) this.drawMode(50, 50, 'insertion de text')
    }

    public drawHelp(x:number, y:number):void {
        this.drawRect(x - 15, y - 30, 300, 220, '#000000', '#ffffff')
        this.drawText(x, y, 'Help mode :')
        this.drawText(x + 10, y + 25, ' - esc : mode null', '#000000', 18)
        this.drawText(x + 10, y + 50, ' - a : mode insertion de mure', '#000000', 18)
        this.drawText(x + 10, y + 75, ' - z : mode modifie le spawn', '#000000', 18)
        this.drawText(x + 10, y + 100, ' - e : mode insertion de gate', '#000000', 18)
        this.drawText(x + 10, y + 125, ' - r : mode insertion de text (soon)', '#000000', 18)
        this.drawText(x + 10, y + 150, ' - s : save la map', '#000000', 18)
        this.drawText(x + 10, y + 175, ' - h : affiche help', '#000000', 18)
    }

    public drawMode(x:number, y:number, text:string):void {
        this.drawRect(x - 15, y - 30, 200, 50, '#000000', '#ffffff')
        this.drawText(x, y, text)
    }
}