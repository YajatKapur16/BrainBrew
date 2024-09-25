class ImageElement extends ClickableElement {
    constructor(startPos, cursor, ctx, image, color="purple") {
        super(new Path2D(), startPos, {
            x: cursor.pos.x - startPos.x,
            y: cursor.pos.y - startPos.y
        }, () => {
            
        }, cursor, ctx);

        this.image = image

    }

    renderImage() {

    }
}