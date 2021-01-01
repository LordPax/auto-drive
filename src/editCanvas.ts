import { config } from './include/config'
import { Editor } from './editor/editor'
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
        ctx.clearRect(0, 0, width, height)
        editor.draw()
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