import { ipcRenderer } from 'electron'
import { config } from './config'
import { Map } from './map/map'
import { MapView } from './map/map_view'
import { CarView } from './car/car_view'

document.addEventListener('DOMContentLoaded', () => {
    const { ctx, width, height } = config()
    const map:Map = new Map(2)
    map.initMap('map/test_map.json')
    map.setView(new MapView(map, ctx))
    map.setCarsView(car => car.setView(new CarView(car, ctx)))

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