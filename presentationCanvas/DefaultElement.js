class DefaultElement extends ClickableElement{
    constructor(startPos, cursor, ctx, color="purple") {
        super(new Path2D(), startPos, {
            x: cursor.pos.x - startPos.x,
            y: cursor.pos.y - startPos.y
        }, () => {
            this.toolbar = true
        }, cursor, ctx);
        this.pos = {
            x: startPos.x,
            y: startPos.y,
        }

        this.child = {}
        this.childOffset = {
            x: 0,
            y: 60
        }

        this.prevPos = {
            x: this.pos.x,
            y: this.pos.y
        }

        this.size = {
            x: cursor.pos.x - startPos.x,
            y: cursor.pos.y - startPos.y
        }

        this.text = ""
        this.type = "text"
        this.color = color

        this.textOffset = {
            x: 20,
            y: 20
        }
        this.toolbarOptionRadius = 20
        this.toolbarOffset = {
            x: 40,
            y: 30
        }
        this.toolbarHeight = (this.toolbarOptionRadius * 8) + this.toolbarOffset.x
        this.toolbarOptions = [


                new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOffset.y }, this.toolbarOptionRadius, this.color, () => {
                    console.log("Works")
                    fetch("https://22d4-34-147-25-51.ngrok-free.app/generate", {
                        method: "post",
                        body: JSON.stringify({
                            "prompt": "a beautiful landscape with mountains and rivers",
                            "negative_prompt": "",
                            "num_inference_steps": 28,
                            "guidance_scale": 7.0,
                            "height": 512,
                            "width": 512
                        })
                    }).then(res => {
                        console.log(res.json())
                    })
                }, this.cursor, this.ctx),

                
                new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOptionRadius * 2 + this.toolbarOffset.y * 2}, this.toolbarOptionRadius, this.color, () => {
                    console.log("Works")
                    this.child = new ImageElement( { x: this.pos.x - this.childOffset.x, y: this.pos.y - this.childOffset.y }, this.cursor, this.ctx )
                }, this.cursor, this.ctx),


                new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOptionRadius * 4 + this.toolbarOffset.y * 3}, this.toolbarOptionRadius, this.color, () => {
                    console.log("Works")
                }, this.cursor, this.ctx),


                new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOptionRadius * 6  + this.toolbarOffset.y * 4}, this.toolbarOptionRadius, this.color, () => {
                    console.log("Works")
                }, this.cursor, this.ctx)
            ]



    }
    adjustToolbar() {
        this.toolbarOptions = [
            new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOffset.y }, this.toolbarOptionRadius, this.color,() => {
                console.log("Works")
            }, this.cursor, this.ctx), 
            new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOptionRadius * 2 + this.toolbarOffset.y * 2}, this.toolbarOptionRadius, this.color,() => {
                console.log("Works")
            }, this.cursor, this.ctx),
            new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOptionRadius * 4 + this.toolbarOffset.y * 3}, this.toolbarOptionRadius, this.color,() => {
                console.log("Works")
            }, this.cursor, this.ctx),
            new ToolbarOption({ x: this.pos.x + this.size.x + this.toolbarOffset.x, y: this.pos.y + this.toolbarOptionRadius * 6  + this.toolbarOffset.y * 4}, this.toolbarOptionRadius, this.color, () => {
                console.log("Works")
            },this.cursor, this.ctx)
        ]
    }

    setText(text) {
        this.text = text
    }

    renderToolbar() {
        this.toolbarOptions.forEach(option => {
            option.draw()
            option.methodCycle()
        });
    }

    drawText() {
        let lineHeight = fontSize + 10
        let lineNumber = 1;
        let line = ""
        if (this.ctx.measureText(this.text).width > this.size.x - 50) {
            for (let index in this.text) {
                let letter = this.text.charAt(index)
                line += letter
                if (this.ctx.measureText(line).width > this.size.x - 50) {
                    this.ctx.fillText(line, this.pos.x + this.textOffset.x, this.pos.y + (lineHeight * lineNumber) + this.textOffset.y)
                    lineNumber++
                    line = ""
                } 
            }
            lineNumber++
            this.ctx.fillText(line, this.pos.x + this.textOffset.x, this.pos.y + (lineHeight * lineNumber) + this.textOffset.y)
        } else {
            this.ctx.fillText(this.text, this.pos.x + this.textOffset.x, this.pos.y + (lineHeight * lineNumber) + this.textOffset.y)
        }
        
    }
    
    draw() {
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        this.ctx.shadowBlur = 100
        this.ctx.shadowColor = this.color
        if (this.checkHover()) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
            this.ctx.shadowBlur = 200
            this.ctx.shadowColor = this.color
        }

        else {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"

            this.ctx.shadowBlur = 0
            
        }
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        this.ctx.shadowBlur = 100
        this.ctx.shadowColor = this.color
        this.ctx.filter = "none"
        this.path.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 8)
        this.ctx.fill(this.path);
        this.ctx.stroke(this.path);
        this.ctx.fillStyle = "#ffffff"
        
        this.drawText()
        if (this.toolbar) this.renderToolbar()
    }

    methodCycle() {
        this.callIfClicked()
        this.hoverEffects()
    }
}