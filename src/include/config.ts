export const config = () => {
    const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
    const ctx:CanvasRenderingContext2D = canvas.getContext('2d')
    const width:number = window.innerWidth - 10
    const height:number = window.innerHeight - 10
    const ratio:number = window.devicePixelRatio

    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(ratio, ratio)

    return {
        ctx,
        width,
        height,
        canvas,
        ratio
    }
}