import { config } from './config'
import { Map } from './map'

document.addEventListener('DOMContentLoaded', () => {
    const { ctx, width, height } = config()
    const map:Map = new Map(1, ctx)

    document.addEventListener('keypress', e => {
        switch (e.key) {
            case 'z' :
                map.getCars(0).forward()
                break
            case 's' :
                map.getCars(0).backward()
                break
            case 'd' :
                map.getCars(0).turnRight()
                break
            case 'q' :
                map.getCars(0).turnLeft()
                break
        }
    })

    const draw = ():void => {
        ctx.clearRect(0, 0, width, height)
        map.getCars(0).getView().drawCar()
        
    }
    const update = ():void => {
        map.getCars(0).update()
    }
    const main = ():void => {
        draw()
        update()
        requestAnimationFrame(main)
    }

    main()
})