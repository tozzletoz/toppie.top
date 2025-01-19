let counter = 0
const counterdisplay = document.getElementById("h1counter")
const diamond = document.getElementById("diamond")
const shopwindow = document.getElementById("shopwindow")
var dpc = 1
var dps = 0

const clicksound = new Audio("assets/sounds/click.wav")
const buysound = new Audio("assets/sounds/buy.wav")
const shopsound = new Audio("assets/sounds/shop.wav")
const cantbuy = new Audio("assets/sounds/nobuy.wav")
const goldenfx = new Audio("assets/sounds/golden.wav")
const bgm = new Audio("assets/sounds/bgm.mp3")
bgm.volume = 0.7
bgm.loop = true

function msg(message){
    alert(message)
}

const dpcdisplay = document.getElementById("dpcdisplay")
const dpsdisplay = document.getElementById("dpsdisplay")

function upddps(){
    dpsdisplay.textContent = `diamonds per second: ${dps}`
    dpsdisplay.style.fontSize = "30px"

    setTimeout(function() {
        dpsdisplay.style.fontSize = "25px"
    }, 50)
}

function upddpc(){
    dpcdisplay.textContent = `diamonds per click: ${dpc}`
    dpcdisplay.style.fontSize = "30px"

    setTimeout(function() {
        dpcdisplay.style.fontSize = "25px"
    }, 50)
}

function updatediamonds(){
    counterdisplay.textContent = `diamonds: ${counter}`
    counterdisplay.style.fontSize = "30px"

    setTimeout(function() {
        counterdisplay.style.fontSize = "25px"
    }, 50)
}

diamond.addEventListener("click", function () {
    clicksound.play()
    counter+=dpc;
    updatediamonds()
});
function toggleshop(){
    shopsound.play()
    const opacity = window.getComputedStyle(shopwindow).opacity
    const shopbtn = document.getElementById("shop")
    if (opacity=="0"){
        shopwindow.style.transform= "translate(-50%, -50%) scale(1)"
        shopwindow.style.opacity="1"
        shopwindow.style.pointerEvents="auto"
        shopwindow.style.visibility="visible"
        shopbtn.textContent = "×"
    }
    else if (opacity=="1"){
        shopwindow.style.transform= "translate(-50%, -50%) scale(0.75)"
        shopwindow.style.pointerEvents="none"
        shopwindow.style.opacity="0"
        shopwindow.style.visibility="hidden"
        shopbtn.textContent = "shop"
    }
}
shopitems = [
    {img: "assets/icons/pickaxe.png", desc: "+1 diamond per click", price: 50, reward: "dpc+=1", amount: 0, type: 0},
    {img: "assets/icons/minecart.png", desc: "+1 diamond per second", price: 100, reward: "dps+=1", amount: 0, type: 1},
    {img: "assets/icons/drill.png", desc: "+5 diamonds per click", price: 200, reward: "dpc+=5", amount: 0, type: 0},
    {img: "assets/icons/excavator.webp", desc: "+5 diamonds per second", price: 450, reward: "dps+=5", amount: 0, type: 1},
    {img: "assets/icons/chest.png", desc: "+25 diamonds per click", price: 1100, reward: "dpc+=25", amount: 0, type: 0},
    {img: "assets/icons/rain.png", desc: "+25 diamonds per second", price: 2300, reward: "dps+=25", amount: 0, type: 1},
    {img: "assets/icons/ship.png", desc: "+100 diamonds per click", price: 4500, reward: "dpc+=100", amount: 0, type: 0},
    {img: "assets/icons/mine.png", desc: "+100 diamonds per second", price: 9000, reward: "dps+=100", amount: 0, type: 1},
    {img: "assets/icons/planet.png", desc: "+1000 diamonds per click", price: 45000, reward: "dpc+=1000", amount: 0, type: 0}
]

for (let i = 0; i < shopitems.length; i++) {
    let newbutton = document.createElement("div")
    if (shopitems[i].type==0){
        newbutton.style.backgroundColor = "rgb(255, 84, 84)"
    } else{
        newbutton.style.backgroundColor = "rgb(84, 127, 255)"
    }
    newbutton.className = "shopbutton"
    newbutton.innerHTML = `${shopitems[i].desc} <br>price: 💎${shopitems[i].price}, owned: ${shopitems[i].amount}`
    let icon = document.createElement("img")
    icon.src = shopitems[i].img
    icon.className = "shopicons"
    newbutton.appendChild(icon)
    newbutton.addEventListener("click", function(){
        if (counter>shopitems[i].price-1){
            buysound.play()
            shopitems[i].amount+=1
            newbutton.innerHTML = `${shopitems[i].desc} <br>price: 💎${shopitems[i].price}, owned: ${shopitems[i].amount}`
            counter-=shopitems[i].price
            eval(shopitems[i].reward)
            updatediamonds()
            if (shopitems[i].type == 0){
                upddpc()
            } else {
                upddps()
            }
        } else{
            cantbuy.play()
            msg(`You need ${shopitems[i].price - counter} more diamonds.`)
        }
    })

    shopwindow.appendChild(newbutton)
}

setInterval(adddps, 1000)

function adddps() {
    const oldcounter = counter
    counter += dps
    if (oldcounter!==counter) {
        updatediamonds()
    }
}

function spawngoldendiamond() {
    let golddiamond = document.createElement("img")
    let stylesheet = document.createElement("style")
    stylesheet.type = "text/css"
    let randomstart = Math.floor(Math.random() * (500 - (-500) + 1)) + (-500)
    let randomend = Math.floor(Math.random() * (500 - (-500) + 1)) + (-500)
    stylesheet.innerText = `
    @keyframes move {
        from {
            transform: translateX(-500%) translateY(${randomstart}%) rotate(0deg);
        }
        to {
            transform: translateX(500%) translateY(${randomend}%) rotate(720deg);
        }
    }

    #golddiamond {
        filter: sepia(100%) brightness(150%) contrast(110%);
        animation: move 4s linear;
        width: 150px;
        height: auto;
        position: absolute;
        -webkit-user-drag: none;
    }

    #golddiamond:hover {
        filter: sepia(100%) brightness(190%) contrast(110%);
    }`
    golddiamond.src = "assets/icons/diamond.png"
    golddiamond.id = "golddiamond"

    document.head.appendChild(stylesheet)
    document.body.appendChild(golddiamond)

    golddiamond.addEventListener("click", function() {
        golddiamond.style.visibility = "hidden"
        goldenfx.play()
        counter += 1000
        updatediamonds()
    })
}

function generateinterval() {
    let randomnumb = Math.floor(Math.random() * (240000 - 180000 + 1)) + 180000
    console.log(randomnumb)
    
    setTimeout(function() {
        generateinterval()
        spawngoldendiamond()
    }, randomnumb)
}

generateinterval()

const mutebtn = document.getElementById("mute")

var muted = true

mutebtn.addEventListener("click", function(){
    bgm.play()
    img = mutebtn.querySelector("img")

    if (muted == false){
        bgm.pause()
        img.src = "assets/icons/mute.svg"
        muted = true
    }else{
        bgm.play()
        img.src = "assets/icons/unmute.svg"
        muted = false
    }
})
