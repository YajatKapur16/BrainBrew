class ToolbarOption extends ClickableElement{
    constructor(pos, radius, color, clickHandler, cursor, ctx) {
        super(new Path2D(), pos, { x: 0, y: 0 }, clickHandler, cursor, ctx)
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.color = color

        this.radius = radius
        this.ctx = ctx
    }

    draw() {
        if (this.checkHover()) {
            console.log("Hover")
            this.ctx.fillStyle = "black"
            this.ctx.shadowBlur = 200
            this.ctx.shadowColor = this.color
        }

        else {
            this.ctx.fillStyle = "black"
            this.ctx.filter = "blur(2px)"
            this.ctx.shadowBlur = 0
            
        }
        
        this.ctx.beginPath()
        this.path.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        this.ctx.closePath()
        this.ctx.fill(this.path)
        
        this.ctx.stroke(this.path)
    }

    methodCycle() {
        this.callIfClicked()
        this.hoverEffects()
    }
}