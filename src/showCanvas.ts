import { ipcRenderer } from 'electron'
import { config } from './include/config'
import { Map } from './map/map'
import { MapViewElectron } from './map/map_view'
import { CarViewElectron } from './car/car_view'
import { MapModel } from './map/map_model'

document.addEventListener('DOMContentLoaded', () => {
    let { ctx, width, height, canvas, ratio } = config()
    const map:Map = new Map(50, 'save/map/map_edit.json', 'save/model/model_test.json')
    // const map:Map = new Map(50, 'save/map/map_edit.json')

    map.setView(new MapViewElectron(map, ctx))
    map.setCarsView(car => new CarViewElectron(car, ctx))

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
        map.draw()
    }
    const update = ():void => {
        if (!map.isFinish())
            map.update()
    }
    const main = ():void => {
        draw()
        update()
        requestAnimationFrame(main)
    }

    main()
})