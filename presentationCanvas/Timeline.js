class Timeline {
    constructor(ctx) {
        this.ctx = ctx
        this.start = []
        this.events = []
        this.eventCount = 0;
        this.alternator = false
        this.eventPadding = {
            x: 20,
            y: 40
        }
        this.branches = []
        this.isMaster = true
        this.source = {
            x: 0,
            y: canvas.clientHeight / 2
        }
        this.startPos = {
            x: this.source.x,
            y: this.source.y
        }
        this.nextElemPos = {
            x: this.startPos.x + this.eventPadding.x,
            y: this.startPos.y + this.eventPadding.y

        }

        this.speed = 4
        this.animEnd = {
            x: this.source.x + this.speed,
            y: this.source.y + this.speed
        }

        this.gradient = this.ctx.createLinearGradient(this.source.x, this.source.y, this.nextElemPos.x, this.source.y)
        this.gradientColors = ["purple"]
        this.connectors = []
        this.timelineDrawComplete = false
    }

    updateAnimationCoordinates() {
        this.timelineDrawComplete = false
        if (this.animEnd.x < this.nextElemPos.x) {
            this.animEnd.x += this.speed
            this.timelineDrawComplete = false
        } else {
            this.timelineDrawComplete = true
        }
        
    }

    addElement(elem) {
        this.eventCount++
        if (this.alternator) elem.pos.y -= elem.size.y
        elem.adjustToolbar()
        elem.polarity = !this.alternator
        console.log(elem.ctx)
        this.events.push(elem)
        this.nextElemPos = {
            x: this.nextElemPos.x +  elem.size.x + this.eventPadding.x,
            y: (this.alternator) ? this.source.y + this.eventPadding.y : this.source.y - this.eventPadding.y
        }
        this.alternator = !this.alternator
        this.gradientColors.push(elem.color)
        this.updateGradient()
    }

    updateGradient() {
        this.gradient = this.ctx.createLinearGradient(this.source.x, this.source.y, this.nextElemPos.x, this.source.y)
        let step = 1 / this.gradientColors.length

        this.gradientColors.forEach((gradientColor, index) => this.gradient.addColorStop(step * index, gradientColor))
    }

    getAlternator() {
        return this.alternator
    }

    draw() {
        let gradient = this.ctx.createLinearGradient(this.source.x, this.source.y, this.nextElemPos.x, this.nextElemPos.y)
        let i = 0
        // Render the timeline
        this.startPos = {
            x: this.source.x,
            y: this.source.y
        }

        this.ctx.lineWidth = 8
        this.ctx.strokeStyle = this.gradient
        this.ctx.moveTo(this.source.x, this.source.y)
        this.ctx.lineTo(this.animEnd.x, this.animEnd.y)
        this.ctx.stroke()
        this.events.forEach(event => {
            gradient.addColorStop(0.1 * i, this.gradientColors[i])
            i++
            // this.ctx.shadowBlur = 20
            // this.ctx.shadowColor = "purple"
            // this.ctx.strokeStyle = "#ffffff"
            // this.ctx.moveTo(this.startPos.x, this.startPos.y)
            // this.ctx.lineTo(this.startPos.x + this.eventPadding.x + event.size.x, this.startPos.y)
            // this.ctx.stroke()
            // this.startPos = {
            //     x: this.startPos.x + this.eventPadding.x + event.size.x,
            //     y: this.startPos.y
            // }

            // Render the Element
            event.draw()
            event.methodCycle()
            
            
        })

    }
}