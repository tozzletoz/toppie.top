const player = document.getElementById("object")
const menu = document.getElementById("menu")
const playbtn = document.getElementById("playbtn")
const scorecounter = document.getElementById("scorecounter")
const gameoversound = new Audio("gameover.mp3")
const flapsound = new Audio("flap.mp3")

let velocity = 0
let canpress = true
let pipes = []
let inmenu = true
let score = 0
let spawntimeout
let canclick
let highscore = localStorage.getItem("highscore") || 0
scorecounter.innerHTML = "HIGHSCORE: " + highscore

player.style.visibility = "hidden"
menu.style.visibility = "visible"
scorecounter.style.visibility = "visible"

playbtn.addEventListener("click", () => {
    menu.style.visibility = "hidden"
    play()
})

document.addEventListener("keydown", (event) => {
    if (inmenu) return
    if ((event.key === "ArrowUp" || event.key === " ") && canpress) {
        canpress = false
        flapsound.currentTime = 0
        flapsound.play()
        velocity = -3
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key === " ") {
        canpress = true
    }
})

document.addEventListener("click", () => {
    if (inmenu || !canclick) return
    flapsound.currentTime = 0
    flapsound.play()
    velocity = -3
})

function touches(span, btn) {
    let rect1 = span.getBoundingClientRect()
    let rect2 = btn.getBoundingClientRect()
    return rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
}

function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function spawnpipe() {
    if (!inmenu) {
        let pipebottom = document.createElement("div")
        pipebottom.style.borderTopLeftRadius = "10px"
        pipebottom.style.borderTopRightRadius = "10px"
        pipebottom.className = "pipe"
        pipebottom.style.height = randomnumber(200, 340)
        pipebottom.style.bottom = 0

        let pipetop = document.createElement("div")
        pipetop.style.borderBottomLeftRadius = "10px"
        pipetop.style.borderBottomRightRadius = "10px"
        pipetop.className = "pipe"
        pipetop.style.height = randomnumber(200, 340)
        pipetop.style.top = 0

        document.body.appendChild(pipebottom)
        document.body.appendChild(pipetop)
        pipes.push(pipebottom, pipetop)

        if (!inmenu) {
            spawntimeout = setTimeout(spawnpipe, 1000)
        }
    }
}

function countscore() {
    if (inmenu) return
    scorecounter.innerHTML = "HIGHSCORE: " + highscore + "<br>SCORE: " + score
    setTimeout(countscore, 250)
    score += 1
    if (score > highscore) {
        highscore = score
        scorecounter.innerHTML = "HIGHSCORE: " + highscore + "<br>SCORE: " + score
        localStorage.setItem("highscore", highscore)
    }
}

function move() {
    let current_top = parseInt(getComputedStyle(player).top, 10)
    player.style.top = (current_top + velocity) + "px"
    velocity += 0.1
    for (let pipe of pipes) {
        if (touches(player, pipe)) {
            die()
            return
        }
    }
    if (current_top > window.innerHeight || current_top < 0) {
        die()
        return
    }
    setTimeout(move, 5)
}

function play() {
    canclick = false
    pipes.forEach(pipe => pipe.remove())
    score = 0
    velocity = 0
    inmenu = false
    player.style.top = "50px"
    player.style.visibility = "visible"
    pipes = []
    clearTimeout(spawntimeout)
    countscore()
    move()
    spawnpipe()
    setTimeout(() => canclick = true, 1)
}

function die() {
    flapsound.pause()
    flapsound.currentTime = 0
    scorecounter.innerHTML = "HIGHSCORE: " + highscore
    pipes.forEach(pipe => pipe.remove())
    gameoversound.currentTime = 0
    gameoversound.play()
    inmenu = true
    player.style.visibility = "hidden"
    menu.style.visibility = "visible"
    clearTimeout(spawntimeout)
}

function checkscreensize() {
    const islandscape = window.innerWidth > window.innerHeight
    const mainContent = document.getElementById('main-content')
    const landscapeWarning = document.getElementById('landscape-warning')

    if (!islandscape) {
        mainContent.style.display = "none"
        landscapeWarning.style.display = "block"
    } else {
        mainContent.style.display = "block"
        landscapeWarning.style.display = "none"
    }
}

checkscreensize()
window.addEventListener('resize', checkscreensize)
