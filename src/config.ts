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
        height
    }
}

// const lx:number = 10, ly:number = 10
// const t_case:number = 40
// const mapx:number = width / 2 - (lx * t_case) / 2
// const mapy:number = height / 2 - (ly * t_case) / 2