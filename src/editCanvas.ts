import { config } from './include/config'
import { Editor } from './editor/editor'
import { EditorModel } from './editor/editor_model'
require('dotenv').config()

document.addEventListener('DOMContentLoaded', () => {
    let { ctx, width, height, canvas, ratio } = config()
    const MAP:string = process.env.MAP
    const editor:Editor = new Editor(MAP, ctx)

    editor.event(document)

    window.addEventListener('resize', () => {
        width = window.innerWidth - 10
        height = window.innerHeight - 10

        canvas.width = width * ratio
        canvas.height = height * ratio
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
    })

    const draw = ():void => {
        const cam = EditorModel.cam
        const zoom = EditorModel.zoom

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, width, height)
        // ctx.translate(-cam.x * zoom, -cam.y * zoom)
	    ctx.scale(ratio * zoom, ratio * zoom)
        editor.draw()

        // TODO: débugger le zoom
    }
    const update = ():void => {
        editor.update()
    }
    const main = ():void => {
        draw()
        update()
        requestAnimationFrame(main)
    }

    main()
})