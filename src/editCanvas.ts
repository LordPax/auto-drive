import { config } from './include/config'
import { Editor } from './editor/editor'

document.addEventListener('DOMContentLoaded', () => {
    let { ctx, width, height, canvas, ratio } = config()
    // const editor:Editor = new Editor('save/map/test_map2.json', ctx)
    const editor:Editor = new Editor('save/map/map_edit.json', ctx)

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