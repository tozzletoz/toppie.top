const counterdisplay = document.getElementById("h1counter")
const diamond = document.getElementById("diamond")
const shopwindow = document.getElementById("shopwindow")
const rebirthwind = document.getElementById("rebirthwind")
const y_nwindow = document.getElementById("y_nwindow")

let synced = true
const displaysynced = document.getElementById("synced")
displaysynced.textContent = `synced: ${synced}`

let username = (localStorage.getItem("username") || null)

const undisplay = document.getElementById("undisplay")

let rebirths = parseInt(localStorage.getItem("rebirths") || 0)
let rebcounter = document.getElementById("rebdisplay")
rebcounter.textContent = `rebirths: ${rebirths}`

const rebnow = document.createElement("button")
rebnow.id = "rebnow"
rebnow.style.backgroundColor = "rgb(255, 252, 84)"
rebnow.textContent = `rebirth now (costs 💎${(rebirths*500000)+500000})`

let multiplier = (rebirths/2)+1

let multiplierdisplay = document.getElementById("multiplier")
multiplierdisplay.textContent = `multiplier: ${multiplier}`

const rebtxt = document.createElement("span")
rebtxt.textContent = "Rebirthing resets your progress but grants nice bonuses, like a diamond multiplier. This helps you progress faster in future runs, making each rebirth a step toward greater strength."
rebtxt.id = "rebtxt"
rebirthwind.appendChild(rebtxt)
rebirthwind.appendChild(rebnow)

const yes = document.createElement("button")
yes.textContent = "yes"
yes.id = "yes"
yes.style.backgroundColor = "rgb(175, 253, 73)"

const no = document.createElement("button")
no.textContent = "no"
no.id = "no"
no.style.backgroundColor = "rgb(253, 100, 73)"

const resettxt = document.createElement("span")
resettxt.textContent = "This will delete all of your progress, are you sure?"
resettxt.id = "resettxt"

y_nwindow.appendChild(resettxt)
y_nwindow.appendChild(no)
y_nwindow.appendChild(yes)

let price = parseInt(1000000 * Math.pow(2, rebirths));

rebnow.textContent = `rebirth now (costs 💎${price})`

var dpc = 1
var dps = 0

document.addEventListener('contextmenu', function(event) {
    event.preventDefault()
  })

const clicksound = new Audio("assets/sounds/click.wav")
const buysound = new Audio("assets/sounds/buy.wav")
const shopsound = new Audio("assets/sounds/shop.wav")
const cantbuy = new Audio("assets/sounds/nobuy.wav")
const goldenfx = new Audio("assets/sounds/golden.wav")
const bgm = new Audio("assets/sounds/bgm2.mp3")
const rebirthsound = new Audio("assets/sounds/lvlup.mp3")

bgm.volume = 0.7
bgm.loop = true
var shopopen = false

function msg(message){
    cantbuy.currentTime = 0
    cantbuy.play()
    //alert(message)
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
    counterdisplay.textContent = `diamonds: ${Math.round(counter)}`
    counterdisplay.style.fontSize = "30px"
    diamond.style.width = "180px"
    save()

    setTimeout(function() {
        counterdisplay.style.fontSize = "25px"
        counterdisplay.style.filter = ""
        diamond.style.width = "220px"
    }, 50)
}

diamond.addEventListener("click", function () {
    clicksound.currentTime = 0
    clicksound.play()
    counter+=dpc*multiplier;
    updatediamonds()
})

diamond.addEventListener("mouseout", function () {
    counterdisplay.style.fontSize = ""
    counterdisplay.style.filter = ""
    diamond.style.width = ""
})

function toggleshop(){
    shopsound.currentTime = 0
    shopsound.play()
    if (rebopen==true){
        openrebs()
    }
    if (ynopen==true){
        resetyn()
    }
    if (leaderboardopen==true){
        toggleleaderboard()
    }
    const opacity = window.getComputedStyle(shopwindow).opacity
    const shopbtn = document.getElementById("shop")
    if (opacity=="0"){
        shopopen = true
        shopwindow.style.transform= "translate(-50%, -50%) scale(1)"
        shopwindow.style.opacity="1"
        shopwindow.style.pointerEvents="auto"
        shopwindow.style.visibility="visible"
        shopbtn.textContent = "×"
    }
    else if (opacity=="1"){
        shopopen = false
        shopwindow.style.transform= "translate(-50%, -50%) scale(0.75)"
        shopwindow.style.pointerEvents="none"
        shopwindow.style.opacity="0"
        shopwindow.style.visibility="hidden"
        shopbtn.textContent = "shop"
    }
}

setInterval(adddps, 1000)

function adddps() {
    const oldcounter = counter
    counter += dps*multiplier
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
    
    setTimeout(function() {
        generateinterval()
        spawngoldendiamond()
    }, randomnumb)
}

generateinterval()

const mutebtn = document.getElementById("mute")

let muted = localStorage.getItem("muted") || true

function playbgm(){
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
}

mutebtn.addEventListener("click", function(){
    playbgm()
})

function save() {
    synced = false
    displaysynced.textContent = `synced: ${synced}`
    localStorage.setItem("username", username)
    localStorage.setItem("multiplier", multiplier)
    localStorage.setItem("rebirths", rebirths)
    localStorage.setItem("counter", counter)
    localStorage.setItem("dps", dps)
    localStorage.setItem("dpc", dpc)
    localStorage.setItem("shopitems", JSON.stringify(shopitems))
}

function init(){
    counter = parseInt(localStorage.getItem("counter")) || 0
    dps = parseInt(localStorage.getItem("dps")) || 0
    dpc = parseInt(localStorage.getItem("dpc")) || 1

    shopitems = JSON.parse(localStorage.getItem("shopitems")) || [{img: "assets/icons/pickaxe.png", desc: "+1 diamond per click", price: 50, reward: "dpc+=1", amount: 0, type: 0},{img: "assets/icons/minecart.png", desc: "+1 diamond per second", price: 100, reward: "dps+=1", amount: 0, type: 1},{img: "assets/icons/drill.png", desc: "+5 diamonds per click", price: 200, reward: "dpc+=5", amount: 0, type: 0},{img: "assets/icons/excavator.webp", desc: "+5 diamonds per second", price: 450, reward: "dps+=5", amount: 0, type: 1},{img: "assets/icons/chest.png", desc: "+25 diamonds per click", price: 1100, reward: "dpc+=25", amount: 0, type: 0},{img: "assets/icons/rain.png", desc: "+25 diamonds per second", price: 2300, reward: "dps+=25", amount: 0, type: 1},{img: "assets/icons/ship.png", desc: "+100 diamonds per click", price: 4500, reward: "dpc+=100", amount: 0, type: 0},{img: "assets/icons/mine.png", desc: "+100 diamonds per second", price: 9000, reward: "dps+=100", amount: 0, type: 1},{img: "assets/icons/planet.png", desc: "+1000 diamonds per click", price: 45000, reward: "dpc+=1000", amount: 0, type: 0}]
    updatediamonds(); upddpc(); upddps()

    for (let i = 0; i < shopitems.length; i++) {
        let newbutton = document.createElement("div")
        if (shopitems[i].type==0){
            newbutton.style.backgroundColor = "rgb(255, 84, 84)"
            newbutton.addEventListener("mouseenter", () => {
                newbutton.style.boxShadow = "0 0 15px 5px rgba(255, 47, 47, 0.35)";
              });
              
              // Remove the shadow when the mouse leaves
              newbutton.addEventListener("mouseleave", () => {
                newbutton.style.boxShadow = "none";
              });
        } else{
            newbutton.style.backgroundColor = "rgb(84, 127, 255)"
            newbutton.addEventListener("mouseenter", () => {
                newbutton.style.boxShadow = "0 0 15px 5px rgba(47, 82, 255, 0.35)";
              });
              
              // Remove the shadow when the mouse leaves
              newbutton.addEventListener("mouseleave", () => {
                newbutton.style.boxShadow = "none";
              });
        }
        newbutton.className = "shopbutton"
        newbutton.innerHTML = `${shopitems[i].desc} <br>price: 💎${shopitems[i].price}, owned: ${shopitems[i].amount}`
        let icon = document.createElement("img")
        icon.src = shopitems[i].img
        icon.className = "shopicons"
        newbutton.appendChild(icon)
        newbutton.addEventListener("click", function(){
            if (counter>shopitems[i].price-1){
                buysound.currentTime = 0
                buysound.play()
                shopitems[i].amount+=1
                newbutton.innerHTML = `${shopitems[i].desc} <br>price: 💎${shopitems[i].price}, owned: ${shopitems[i].amount}`
                newbutton.appendChild(icon)
                counter-=shopitems[i].price
                eval(shopitems[i].reward)
                updatediamonds()
                if (shopitems[i].type == 0){
                    upddpc()
                } else {
                    upddps()
                }
                save()
            } else{
                cantbuy.currentTime = 0
                cantbuy.play()
                msg(`You need ${shopitems[i].price - counter} more diamonds.`)
            }
        })

        shopwindow.appendChild(newbutton)
    }
}

init()

var rebopen = false
//rebirths
function openrebs(){
    let price = parseInt(1000000 * Math.pow(2, rebirths));
    rebnow.textContent = `rebirth now (costs 💎${price})`
    if (shopopen==true){
        toggleshop()
    }
    if (ynopen==true){
        resetyn()
    }
    if (leaderboardopen==true){
        toggleleaderboard()
    }
    shopsound.currentTime = 0
    shopsound.play()
    const opacity = window.getComputedStyle(rebirthwind).opacity
    const rebbtn = document.getElementById("rebirth")
    if (opacity=="0"){
        rebopen = true
        rebirthwind.style.transform= "translate(-50%, -50%) scale(1)"
        rebirthwind.style.opacity="1"
        rebirthwind.style.pointerEvents="auto"
        rebirthwind.style.visibility="visible"
        rebbtn.textContent = "×"
    }
    else if (opacity=="1"){
        rebopen = false
        rebirthwind.style.transform= "translate(-50%, -50%) scale(0.75)"
        rebirthwind.style.pointerEvents="none"
        rebirthwind.style.opacity="0"
        rebirthwind.style.visibility="hidden"
        rebbtn.textContent = "rebirth"
    }
}


rebnow.addEventListener("click", function(){
    let price = parseInt(1000000 * Math.pow(2, rebirths));
    rebnow.textContent = `rebirth now (costs 💎${price})`

    if (counter >= price){
        shopsound.volume = 0
        openrebs()
        rebirthsound.currentTime = 0
        rebirthsound.play()
        dpc = 1
        dps = 0
        counter = 0 
        rebirths+=1
        multiplier=(rebirths/2)+1
        multipliercounter = multiplier.toFixed(1)
        rebnow.textContent = `rebirth now (costs 💎${price})`
        rebcounter.textContent = `rebirths: ${rebirths}`
        multiplierdisplay.textContent = `multiplier: ${multipliercounter}`
        updatediamonds()
        upddpc()
        upddps()
        setInterval(() => {
            shopsound.volume = 1
        }, 800);
        console.log(shopsound.volume)
        if (username !== null){
            saveto_lb()
        }
        save()
    }else{
        msg(`You need ${price - Math.round(counter)} more diamonds.`)
    }
})

var ynopen = false

function resetyn(){
    if (shopopen==true){
        toggleshop()
    }
    if (rebopen==true){
        openrebs()
    }
    if (leaderboardopen==true){
        toggleleaderboard()
    }
    shopsound.currentTime = 0
    shopsound.play()
    const opacity = window.getComputedStyle(y_nwindow).opacity
    const resetbtn = document.getElementById("reset")
    if (opacity=="0"){
        ynopen = true
        y_nwindow.style.transform= "translate(-50%, -50%) scale(1)"
        y_nwindow.style.opacity="1"
        y_nwindow.style.pointerEvents="auto"
        y_nwindow.style.visibility="visible"
        resetbtn.textContent = "×"
    }
    else if (opacity=="1"){
        ynopen = false
        y_nwindow.style.transform= "translate(-50%, -50%) scale(0.75)"
        y_nwindow.style.pointerEvents="none"
        y_nwindow.style.opacity="0"
        y_nwindow.style.visibility="hidden"
        resetbtn.textContent = "delete data"
    }
}

function clearls(){
    localStorage.clear()
    window.location.reload(true)
}

yes.addEventListener("click", function(){
    clearls()
})

no.addEventListener("click", function() {
    resetyn()
})

leaderboardopen = false
const leaderboardholder = document.getElementById("leaderboardholder")
let title = document.createElement("div")
title.innerHTML = "REBIRTHS<br>LEADERBOARD:"
title.id="title"
leaderboardholder.appendChild(title)

async function load_lb() {
    leaderboardholder.innerHTML = ""
    leaderboardholder.appendChild(title)
    const leaderboarddata = await get_lb()
    let sorted = Object.entries(leaderboarddata)

    sorted.sort((a, b) => b[1] - a[1])

    if (leaderboarddata) {
        sorted.forEach(([key, value]) => {
            let leaderboard_i = document.createElement("div")
            leaderboard_i.innerHTML = `<i>${key}</i> - ${value} rebirths`
            leaderboard_i.id = "datainlb"

            leaderboardholder.appendChild(leaderboard_i)
        })
    } else {
        let leaderboard_i = document.createElement("div")
        leaderboard_i.id = "datainlb"
        leaderboard_i.textContent = "Loading..."
        leaderboardholder.appendChild(leaderboard_i)
    }
}

function toggleleaderboard(){
    load_lb()
    if (shopopen==true){
        toggleshop()
    }
    if (rebopen==true){
        openrebs()
    }
    if (ynopen==true){
        resetyn()
    }
    shopsound.currentTime = 0
    shopsound.play()
    const opacity = window.getComputedStyle(leaderboardholder).opacity
    const leaderboardbtn = document.getElementById("leaderboard")
    if (opacity=="0"){
        leaderboardopen = true
        leaderboardholder.style.transform= "translate(-50%, -50%) scale(1)"
        leaderboardholder.style.opacity="1"
        leaderboardholder.style.pointerEvents="auto"
        leaderboardholder.style.visibility="visible"
        leaderboardbtn.textContent = "×"
    }
    else if (opacity=="1"){
        leaderboardopen = false
        leaderboardholder.style.transform= "translate(-50%, -50%) scale(0.75)"
        leaderboardholder.style.pointerEvents="none"
        leaderboardholder.style.opacity="0"
        leaderboardholder.style.visibility="hidden"
        leaderboardbtn.textContent = "leaderboard"
    }
}

// LEADERBOARD
if (username == null) {
    getuser().then(userData => {
        username = userData
        undisplay.textContent = `username: ${username}`
        save()
    })
}

undisplay.textContent = `username: ${username}`

function saveto_lb() {
    const url = "https://api.npoint.io/5accda10b85caaa660a5"

    get_lb().then(data => {
        data[`${username}`] = rebirths

        axios.post(url, data)
    })
}

async function get_lb() {
    const url = "https://api.npoint.io/5accda10b85caaa660a5"

    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        return null
    }
}

setInterval(function() {
    if (username !== null){
        saveto_lb()
        synced = true
        displaysynced.textContent = `synced: ${synced}`
    }
}, 10000)


function getuser() {
    return fetch("https://usernameapiv1.vercel.app/api/random-usernames")
        .then(response => response.json())
        .then(data => data.usernames[0])
}
