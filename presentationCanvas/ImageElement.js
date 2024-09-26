class ImageElement extends ClickableElement {
    constructor(startPos, cursor, ctx, imageUri, color="purple") {
        super(new Path2D(), startPos, {
            x: cursor.pos.x - startPos.x,
            y: cursor.pos.y - startPos.y
        }, () => {
            img.src = imageUri,
            imageModal.style.display = "flex"
        }, cursor, ctx);

        this.imageUri = imageUri
        this.loaded = false
        this.image = new Image()
        this.image.width = 240
        this.image.height = 240
        this.size = {
            x: 240,
            y: 240
        }
        this.image.src = this.imageUri
        this.image.onload = () => {
            console.log("Loaded")
            this.loaded = true
        }

    }

    methodCycle() {
        this.callIfClicked()
        this.hoverEffects()
    }

        render() {
            this.path.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y)
            this.ctx.stroke(this.path)
            if (this.loaded) this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
            this.methodCycle()
        }
}