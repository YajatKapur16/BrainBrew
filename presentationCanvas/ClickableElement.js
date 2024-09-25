class ClickableElement {
    constructor(path, pos, size, clickHandler, cursor, ctx) {

        this.id = Math.random() * 1000
        this.path = path
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.size = {
            x: size.x,
            y: size.y
        }
        this.ctx = ctx
        this.cursor = cursor
        this.onClick = clickHandler

    }

    checkHover() {
        return (((this.ctx.isPointInStroke(this.path, this.cursor.pos.x, this.cursor.pos.y) || this.ctx.isPointInPath(this.path, this.cursor.pos.x, this.cursor.pos.y))));
    }

    hoverEffects() {
        if (this.checkHover()) {
            //this.renderToolbar()
        }
    }

    callIfClicked() {
        if (this.checkHover() && cursor.isClicked) {
            console.log(this.id)
            this.onClick()
            this.cursor.isClicked = false
        }
        
    }
}