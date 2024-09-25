const visualise = () => {
    let visualisePath = new Path2D()
    visualisePath.roundRect(visualiserStart.x, visualiserStart.y, cursor.pos.x - visualiserStart.x, cursor.pos.y - visualiserStart.y, 8)
    ctx.fill(visualisePath)
}


let timelineAnimationIndex = 0


let timeline = new Timeline(ctx)
let idle = false // Optimization


const appLoop = () => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timeline.draw()
    timeline.updateAnimationCoordinates()

    if (cursor.isClicked && !onAnotherElement) visualise()
    
    elems.forEach(elem => {
        elem.draw()
        elem.methodCycle()
    })
    requestAnimationFrame(appLoop)
}
appLoop()  