class ToolbarOption extends ClickableElement{
    constructor(pos, radius, color, clickHandler, cursor, ctx, iconUri) {
        super(new Path2D(), pos, { x: 0, y: 0 }, clickHandler, cursor, ctx)
        this.pos = {
            x: pos.x,
            y: pos.y
        }

        this.iconSize = {
            x: 40,
            y: 40
        }
        this.color = color
        this.iconUri = iconUri
        this.icon = new Image()
        this.icon.src = this.iconUri
        this.icon.onload = () => {
            console.log("Loaded")
            this.loaded = true
        }
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
            this.ctx.shadowBlur = 0
            
        }
        
        this.ctx.beginPath()
        this.path.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        
        this.ctx.closePath()
        this.ctx.fill(this.path)
        
        this.ctx.stroke(this.path)
        if (this.loaded) this.ctx.drawImage(this.icon, this.pos.x - 20, this.pos.y - 20, this.iconSize.x, this.iconSize.y)
    }

    methodCycle() {
        this.callIfClicked()
        this.hoverEffects()
    }
}