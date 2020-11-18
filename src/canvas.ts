import { config } from './config'
import { Map } from './map'

document.addEventListener('DOMContentLoaded', () => {
    const { ctx, width, height } = config()
    const map:Map = new Map(2, ctx)

    const draw = ():void => {
        ctx.clearRect(0, 0, width, height)
        map.getCars(0).getView().drawCar()
        
    }
    const update = ():void => {

    }
    const main = ():void => {
        draw()
        update()
        requestAnimationFrame(main)
    }

    main()
})