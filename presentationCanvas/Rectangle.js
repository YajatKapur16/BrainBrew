class Rectangle extends MovableElement{
    constructor(startPos, cursor, ctx) {
        super(new Path2D(), cursor, ctx);
        this.pos = {
            x: startPos.x,
            y: startPos.y,
        }

        this.prevPos = {
            x: this.pos.x,
            y: this.pos.y
        }

        this.size = {
            x: cursor.pos.x - startPos.x,
            y: cursor.pos.y - startPos.y
        }

    }
    draw() {
        this.path.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
        this.ctx.stroke(this.path);
    }
}