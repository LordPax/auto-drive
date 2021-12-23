import { config } from './include/config'
import { Map } from './map/map'
import { MapViewElectron } from './map/map_view'
import { CarViewElectron } from './car/car_view'
import { MapModel } from './map/map_model'
require('dotenv').config()

document.addEventListener('DOMContentLoaded', () => {
    let { ctx, width, height, canvas, ratio } = config()
    const NBCAR:number = parseInt(process.env.NBCAR)
    const { MAP, MODELSAVE } = process.env

    const map:Map = new Map(NBCAR, MAP, MODELSAVE)

    map.setView(new MapViewElectron(map, ctx))
    map.setCarsView(car => new CarViewElectron(car, ctx))
    map.event(document)

    window.addEventListener('resize', () => {
        width = window.innerWidth - 10
        height = window.innerHeight - 10

        canvas.width = width * ratio
        canvas.height = height * ratio
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
    })

    const draw = ():void => {
        const cam = MapModel.cam
        const zoom = MapModel.zoom

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, width, height)
        ctx.scale(ratio * zoom, ratio * zoom)
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