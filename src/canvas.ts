import { ipcRenderer } from 'electron'
import { config } from './include/config'
import { Map } from './map/map'
import { MapViewElectron } from './map/map_view'
import { CarViewElectron } from './car/car_view'
import { MapModelElectron } from './map/map_model'

document.addEventListener('DOMContentLoaded', () => {
    let { ctx, width, height, canvas, ratio } = config()
    const map:Map = new Map()

    map.setModel(new MapModelElectron(1, 'save/map/test_map2.json'))
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

    document.addEventListener('keypress', e => { // test des deplacements
        switch (e.key) {
            case 'z' :
                map.getModel().getCars(0).forward()
                break
            case 's' :
                map.getModel().getCars(0).backward()
                break
            case 'd' :
                map.getModel().getCars(0).turnRight()
                break
            case 'q' :
                map.getModel().getCars(0).turnLeft()
                break
        }
    })

    const draw = ():void => {
        ctx.clearRect(0, 0, width, height)
        map.draw()
    }
    const update = ():void => {
        map.update()
    }
    const main = ():void => {
        draw()
        update()
        requestAnimationFrame(main)
    }

    main()
})