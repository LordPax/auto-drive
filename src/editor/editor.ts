import { ipcRenderer } from 'electron'
import { EditorView } from './editor_view'
import { EditorModel } from './editor_model'
import { match, prompt } from '../include/utils'
import { Wall, Point, MapText } from '../include/type'

export class Editor {
    private view:EditorView
    private model:EditorModel
    private mode:number
    private ptsW:Point
    private ptsG:Point

    constructor(file:string, ctx:CanvasRenderingContext2D) {
        this.model = new EditorModel(file)
        this.view = new EditorView(this, ctx)
        this.mode = 0
        this.ptsW = null
        this.ptsG = null
    }

    public update():void {
        if (this.mode === 5) {
            this.eventSave()
            this.mode = 0
        }
    }

    public draw():void {
        this.view.draw()
    }

    public event(doc:Document):void {
        doc.addEventListener('keydown', keyEvent => {
            this.mode = match(keyEvent.key)
            .case('Escape', () => 0) // esc : mode null
            .case('a', () => 1) // a : mode add mure
            .case('h', () => 2) // h : affiche help
            .case('z', () => 3) // z : mode change spawn
            .case('e', () => 4) // e : mode add gate
            .case('s', () => 5) // s : mode save map
            .case('r', () => 6) // r : mode add text (soon)
            .default(() => 0)

            // console.log(keyEvent.key)
            // console.log(this.mode)
            
            if (this.mode !== 1) this.ptsW = null
        })
        doc.addEventListener('click', mouseEvent => {
            if (this.mode === 1)
                this.eventAddWall(mouseEvent)
            else if (this.mode === 3)
                this.eventChangeSpawn(mouseEvent)
            else if (this.mode === 4)
                this.eventAddGate(mouseEvent)
            else if (this.mode === 6) {
                this.eventAddText(mouseEvent)
            }
        })
    }

    public eventAddWall(mouseEvent:MouseEvent):void {
        const {clientX, clientY} = mouseEvent
        const pts:Point = {x:clientX, y:clientY}

        if (this.ptsW !== null)
            this.model.addWall({x:this.ptsW.x, y:this.ptsW.y, toX:pts.x, toY:pts.y})

        this.ptsW = pts
    }

    public eventAddGate(mouseEvent:MouseEvent):void {
        const {clientX, clientY} = mouseEvent
        const pts:Point = {x:clientX, y:clientY}

        if (this.ptsG !== null) {
            this.model.addGate({x:this.ptsG.x, y:this.ptsG.y, toX:pts.x, toY:pts.y})
            this.ptsG = null
        }
        else
            this.ptsG = pts
    }

    public eventChangeSpawn(mouseEvent:MouseEvent):void {
        const {clientX, clientY} = mouseEvent
        this.model.setSpawn({x:clientX, y:clientY})
    }

    public eventSave():void {
        const name:string = this.model.getName()
        this.model.saveMap(name)
    }

    public async eventAddText(mouseEvent:MouseEvent):Promise<void> {
        // const text = await prompt('prompt de test')
        // console.log(text)
        // userPrompt('enter text : ', '', null).then((txt:string):void => {
        //     const {clientX, clientY} = mouseEvent
        //     if (txt.trim() !== '')
        //         this.model.addText({x:clientX, y:clientY, txt})
        // })
        // vex.dialog.prompt({
        //     message: 'What planet did the aliens come from?',
        //     placeholder: 'Planet name',
        //     callback: (value:any) => {
        //         console.log(value)
        //     }
        // })
        // dialogs.prompt('username', (ok:any) => {
        //     console.log('prompt', ok)
        // })
    }

    public getMode():number { return this.mode}
    public setMode(mode:number):void { this.mode = mode}

    public getModel():EditorModel { return this.model }
    public setModel(model:EditorModel):void { this.model = model }

    public getView():EditorView { return this.view }
    public setView(view:EditorView):void { this.view = view }
}