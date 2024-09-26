const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

const imageModal = document.getElementById("imageContainer")
const img = document.getElementById("imgTag")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.strokeStyle = "#ffffff"
ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
ctx.font = "900 24px JetBrains Mono"

let fontSize = 24
let tempElem = null
let elems = []
let onAnotherElement = false
let visualiserStart = {
    x: 0,
    y: 0
}

let cursor = {
    pos: {},
    lastClickPos: {},
    isClicked: false,
    holding: false,
}

 let colors = ["#bc13fe", "#29ffd1", "#14c8ff", "#ff14f7", "#ecff20"]

let activeTextElement= null

const  gen_path = (x1, y1, x2, y2, num) => {
    let ctrl = 0
    let x = x1
    let y = 0
    let path = []
    let slope = (y2 - y1)/(x2 - x1);
    while (ctrl <= num){
        y = ((slope * (x - x1)) + y1)
        path.push([x, y])
        x += (x2 - x1)/num;
        ctrl++;
    }
    return path
}

const lineAnimation = (start, finish, stepCount, ctx) => {
    let dist = {
        x: finish.x - start.x,
        y: finish.y - start.y
    }

    let step = {
        x: Math.floor(dist.x / stepCount),
        y: Math.floor(dist.y / stepCount)
    }

    let current = {
        x: start.x,
        y: start.y
    }


    for (let i = 0; i < stepCount; i++) {
        ctx.strokeStyle = "#ffffff"
        ctx.beginPath()
        ctx.moveTo(current.x, current.y)
        ctx.lineTo(current.x + step.x, current.y + step.y)
        ctx.stroke()
        current.x += step.x
        current.y += step.y
    }
}

const hideImage = () => {
    imageModal.style.display = "none"
}