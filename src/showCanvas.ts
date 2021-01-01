import { ipcRenderer } from 'electron'
import { config } from './include/config'
import { Map } from './map/map'
import { MapViewElectron } from './map/map_view'
import { CarViewElectron } from './car/car_view'
import { MapModel } from './map/map_model'
import { Point } from './include/type'
import { match } from './include/utils'
require('dotenv').config()

document.addEventListener('DOMContentLoaded', () => {
    let { ctx, width, height, canvas, ratio } = config()
    const NBCAR:number = parseInt(process.env.NBCAR)
    const { MAP, MODELSAVE } = process.env
    //let cam:Point = {x:0, y:0}

    const map:Map = new Map(NBCAR, MAP, MODELSAVE)

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

    /*window.addEventListener('keydown', event => {
        const {x, y} = cam
        cam = match(event.keyCode)
        .case(37, () => ({x:x+10, y})) // left
        .case(38, () => ({x, y:y+10})) // up
        .case(39, () => ({x:x-10, y})) // right
        .case(40, () => ({x, y:y-10})) // down

    })*/

    const draw = ():void => {
        ctx.clearRect(0, 0, width, height)
        map.draw()
        // console.log(cam)
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