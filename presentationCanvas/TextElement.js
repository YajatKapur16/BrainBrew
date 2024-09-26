class TextElement extends ClickableElement {
    constructor(startPos, cursor, ctx, text, color="purple") {
        super(new Path2D(), startPos, {
            x: cursor.pos.x - startPos.x,
            y: cursor.pos.y - startPos.y
        }, () => {
            pTag.innerHTML = text,
            textModal.style.display = "flex"
        }, cursor, ctx);

        this.size = {
            x: 160,
            y: 40
        }


    }

    methodCycle() {
        this.callIfClicked()
        this.hoverEffects()
    }

    render() {
        this.path.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 8)

        this.ctx.fillText("View Response", this.pos.x + 5, this.pos.y + 5)
        this.ctx.stroke(this.path)
    }
}