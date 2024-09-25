document.addEventListener("mousedown", e => {
    onAnotherElement = false
    elems.forEach(elem => {
        if (elem.checkHover()) {
            onAnotherElement = true
            if (elem.type == "text") activeTextElement = elem 
            //elem.clickHandler()
        }
    })

     if (!onAnotherElement) {
        //elems.push(new Rectangle(cursor, ctx))`
    }

    visualiserStart = {
        x: cursor.pos.x,
        y: cursor.pos.y
    }
    cursor.isClicked = true
    cursor.lastClickPos = {
        x: cursor.pos.x,
        y: cursor.pos.y
    }
})

document.addEventListener("mouseup", e => {
    cursor.isClicked = false
    if (!onAnotherElement) elems.push(new DefaultElement(visualiserStart, cursor, ctx, colors[Math.floor(Math.random() * colors.length)]))
})

document.addEventListener("mousemove", e => {
    cursor.pos.x = e.clientX
    cursor.pos.y = e.clientY
})



document.addEventListener("keydown", (e) => {
    if (activeTextElement != null) 
        if (e.key == 'Backspace') activeTextElement.setText(activeTextElement.text.substring(0, activeTextElement.text.length - 1))
        else if (e.key == "Shift") {
            // PAss
        }
        else if (e.key == "Enter") {
            let poppedElem = elems.pop()

            let newElem = new DefaultElement(timeline.nextElemPos, cursor, ctx, colors[Math.floor(Math.random() * colors.length)])
            newElem.size.x = poppedElem.size.x
            newElem.size.y = poppedElem.size.y
            newElem.setText(poppedElem.text)
            timeline.addElement(newElem)
        }
        else activeTextElement.setText(activeTextElement.text + e.key)
} )