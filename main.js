const counterdisplay = document.getElementById("h1counter")
const diamond = document.getElementById("diamond")
diamond.style.filter = "drop-shadow(0 0 2rem rgba(0, 110, 255, 0.51))"
const shopwindow = document.getElementById("shopwindow")
const rebirthwind = document.getElementById("rebirthwind")
const y_nwindow = document.getElementById("y_nwindow")

let totalClicks = (localStorage.getItem("totalClicks") || 0)

let totalTimeSeconds = (localStorage.getItem("totalTimeSeconds") || 0)
const totalTimeDisplay = document.getElementById("totalTime")

setInterval(function(){
	totalTimeSeconds++
	let days = Math.floor(totalTimeSeconds/86400)
	let hours = Math.floor(totalTimeSeconds/3600)
	let minutes = Math.floor(totalTimeSeconds/60)

	totalTimeDisplay.textContent = `${days} days, ${hours} hours, ${minutes} minutes`
	dpcdisplay.textContent = `diamonds per click: ${dpc}`
	dpsdisplay.textContent = `diamonds per second: ${dps}`

	localStorage.setItem("totalTimeSeconds", totalTimeSeconds)
}, 1000)

let synced = true
const displaysynced = document.getElementById("synced")
displaysynced.textContent = `synced: ${synced}`

let username = (localStorage.getItem("username") || null)

const overlay = document.createElement("div")
overlay.style.position = "fixed"
overlay.style.top = "0"
overlay.style.left = "0"
overlay.style.width = "100vw"
overlay.style.height = "100vh"
overlay.style.background = "rgba(0, 0, 0, 0.17)"
overlay.style.display = "flex"
overlay.style.justifyContent = "center"
overlay.style.alignItems = "center"
overlay.style.zIndex = "999999"
overlay.style.visibility = "hidden"
document.body.appendChild(overlay)

function toggleOverlay(){
	let visibility = window.getComputedStyle(overlay).visibility
	if (visibility == "hidden"){
		overlay.style.visibility = "visible"
	}else{
		overlay.style.visibility = "hidden"
	}
}

if (username == null || undefined){
	toggleOverlay()
    usernameScreen = document.getElementById("usernameScreen")
    usernameScreen.style.transform= "translate(-50%, -50%) scale(1)"
    usernameScreen.style.opacity="1"
    usernameScreen.style.pointerEvents="auto"
    usernameScreen.style.visibility="visible"

    usernameInput = document.createElement("input")
    usernameInput.type = "text"
    usernameInput.id = "usernameInput"
    usernameInput.placeholder = "Username..."

    usernameInput.addEventListener("input", function(){
        usernameInput.placeholder = "Username..."
        try{
            placeholderStyle.remove()
        }catch{
            null
        }
        const placeholderStyle = document.createElement("style")
        placeholderStyle.innerHTML = `
            #usernameInput::placeholder {
                color: #bfbfbf;
            }`
        document.head.appendChild(placeholderStyle)
    })

    usernameInfo = document.createElement("h4")
    usernameInfo.textContent = "Enter a username, it will be visible for others on the leaderboard."
    usernameInfo.id = "usernameInfo"

    function setUser(){
        usernameApply.disabled = true
        usernameApply.textContent = "Loading..."
        preUser = String(usernameInput.value)

        async function fetchContent() {

            const content = await get_lb()
            exists = content.hasOwnProperty(preUser)
            usernameApply.disabled = false
            usernameApply.textContent = "Confirm"
            
            if (preUser.length >= 3 && preUser != null && exists == false && preUser.length <= 15 && preUser.includes(" ") != true){
                username = String(usernameInput.value)
                undisplay.textContent = `username: ${username}`
                save()
                document.body.removeChild(overlay)
                localStorage.setItem("username", username)
                usernameScreen.style.transform= "translate(-50%, -50%) scale(1)"
                usernameScreen.style.opacity="0"
                usernameScreen.style.pointerEvents="none"
                usernameScreen.style.visibility="hidden"
                document.body.removeChild(usernameScreen)
                saveto_lb()
        }else{
            try{
                placeholderStyle.remove()
            }catch{
                null
            }
            const placeholderStyle = document.createElement("style")
            usernameInput.value = ""
            placeholderStyle.innerHTML = `
                #usernameInput::placeholder {
                    color:rgb(255, 0, 0);
                }`
            document.head.appendChild(placeholderStyle)
            if (exists == true){
            usernameInput.placeholder = "Username already in use."
        }else{
            usernameInput.placeholder = "There's an error with the given username."
        }
    }

        }
        fetchContent()
    }

    const usernameApply = document.createElement("button")
    usernameApply.textContent = "Confirm"
    usernameApply.id = "usernameApply"
    usernameApply.onclick = setUser

    usernameScreen.appendChild(usernameInfo)
    usernameScreen.appendChild(usernameInput)
    usernameScreen.appendChild(usernameApply)
	toggleOverlay
}else{
    saveto_lb()
}

setInterval(() => {
    if (rebirths >= 1){diamond.style.filter = "hue-rotate(150deg) saturate(200%) brightness(0.9)"}
    if (rebirths >= 5) {diamond.style.filter = "hue-rotate(-60deg)"}
    if (rebirths >= 10) {diamond.style.filter = "brightness(170%) grayscale(100%)"}
    if (rebirths >= 20) {diamond.style.filter = "hue-rotate(205deg) saturate(80%) brightness(130%)"}
}, 100)

const undisplay = document.getElementById("undisplay")
const totalDisplay = document.getElementById("totalDisplay")

let rebirths = parseInt(localStorage.getItem("rebirths") || 0)
let shopitems = parseInt(localStorage.getItem("shopitems") || 0)
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

let price = parseInt(1000000 * Math.pow(rebirths, 3) + 1000000)

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
const bgm = new Audio("assets/sounds/msc.mp3")
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

function updatediamonds(){
    counterdisplay.textContent = Math.round(counter)
    counterdisplay.style.fontSize = "35px"
    diamond.style.width = "180px"
    save()

    setTimeout(function() {
        counterdisplay.style.fontSize = "40px"
        counterdisplay.style.filter = ""
        diamond.style.width = "220px"
    }, 50)
}

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
    if (statsOpen==true){
        toggleStats()
    }
    const opacity = window.getComputedStyle(shopwindow).opacity
    const shopbtn = document.getElementById("shop")
    if (opacity=="0"){
        shopopen = true
        shopwindow.style.transform= "translate(-50%, -50%) scale(1)"
        shopwindow.style.opacity="1"
        shopwindow.style.pointerEvents="auto"
        shopwindow.style.visibility="visible"
        shopbtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
    }
    else if (opacity=="1"){
        shopopen = false
        shopwindow.style.transform= "translate(-50%, -50%) scale(0.75)"
        shopwindow.style.pointerEvents="none"
        shopwindow.style.opacity="0"
        shopwindow.style.visibility="hidden"
        shopbtn.innerHTML = '<span class="material-symbols-outlined">storefront</span>'
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
mutebtn.innerHTML = '<span class="material-symbols-outlined"> music_off </span>'
let muted = true
function toggleMusic(){
    if (muted == false){
        bgm.pause()
        muted = true
        mutebtn.innerHTML = '<span class="material-symbols-outlined"> music_off </span>'
    }else{
        bgm.play()
        muted = false
        mutebtn.innerHTML = '<span class="material-symbols-outlined"> music_note </span>'
    }
}

mutebtn.addEventListener("click", function(){
    playbgm()
})

setInterval(function(){
	localStorage.setItem("totalClicks", totalClicks)
})

function save(saveCount=true) {
    synced = false
    displaysynced.textContent = `synced: ${synced}`
    localStorage.setItem("multiplier", multiplier)
    localStorage.setItem("rebirths", rebirths)
    localStorage.setItem("counter", counter)
    localStorage.setItem("dps", dps)
    localStorage.setItem("dpc", dpc)
	localStorage.setItem("totalClicks", totalClicks)
    if (saveCount == true){
        localStorage.setItem("shopitems", JSON.stringify(shopitems))
    }else{
        localStorage.setItem("shopitems", null)
        shopwindow.innerHTML = ""
        init()
    }
}

function init(){
    counter = parseInt(localStorage.getItem("counter")) || 0
    dps = parseInt(localStorage.getItem("dps")) || 0
    dpc = parseInt(localStorage.getItem("dpc")) || 1

    shopitems = JSON.parse(localStorage.getItem("shopitems")) || [{img: "assets/icons/pickaxe.png", desc: "+1 diamond per click", price: 50, reward: "dpc+=1", amount: 0, type: 0},{img: "assets/icons/minecart.png", desc: "+1 diamond per second", price: 100, reward: "dps+=1", amount: 0, type: 1},{img: "assets/icons/drill.png", desc: "+5 diamonds per click", price: 200, reward: "dpc+=5", amount: 0, type: 0},{img: "assets/icons/excavator.webp", desc: "+5 diamonds per second", price: 450, reward: "dps+=5", amount: 0, type: 1},{img: "assets/icons/chest.png", desc: "+25 diamonds per click", price: 1100, reward: "dpc+=25", amount: 0, type: 0},{img: "assets/icons/rain.png", desc: "+25 diamonds per second", price: 2300, reward: "dps+=25", amount: 0, type: 1},{img: "assets/icons/ship.png", desc: "+100 diamonds per click", price: 4500, reward: "dpc+=100", amount: 0, type: 0},{img: "assets/icons/mine.png", desc: "+100 diamonds per second", price: 9000, reward: "dps+=100", amount: 0, type: 1},{img: "assets/icons/planet.png", desc: "+1000 diamonds per click", price: 45000, reward: "dpc+=1000", amount: 0, type: 0}, {img: "assets/icons/realm.png", desc: "+10000 diamonds per second", price: 1000000, reward: "dps+=10000", amount: 0, type: 1}, {img: "assets/icons/diamondGod.png", desc: "+100000 diamonds per click", price: 6000000, reward: "dpc+=100000", amount: 0, type: 0}]
    updatediamonds()

    for (let i = 0; i < shopitems.length; i++) {
        let newbutton = document.createElement("div")
        if (shopitems[i].type==0){
            newbutton.style.backgroundColor = "rgb(255, 84, 84)"
            newbutton.addEventListener("mouseenter", () => {
                newbutton.style.boxShadow = "0 0 15px 5px rgba(255, 47, 47, 0.35)";shopitems
              });
              
              newbutton.addEventListener("mouseleave", () => {
                newbutton.style.boxShadow = "none";
              });
        } else{
            newbutton.style.backgroundColor = "rgb(84, 127, 255)"
            newbutton.addEventListener("mouseenter", () => {
                newbutton.style.boxShadow = "0 0 15px 5px rgba(47, 82, 255, 0.35)";
              });
              
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
    let price = parseInt(1000000 * Math.pow(rebirths, 3) + 1000000)
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
    if (statsOpen==true){
        toggleStats()
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
        rebbtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
    }
    else if (opacity=="1"){
        rebopen = false
        rebirthwind.style.transform= "translate(-50%, -50%) scale(0.75)"
        rebirthwind.style.pointerEvents="none"
        rebirthwind.style.opacity="0"
        rebirthwind.style.visibility="hidden"
        rebbtn.innerHTML = '<span class="material-symbols-outlined">restart_alt</span>'
    }
}


rebnow.addEventListener("click", function(){
    let price = parseInt(1000000 * Math.pow(rebirths, 3) + 1000000)
    rebnow.textContent = `rebirth now (costs 💎${price})`

    if (counter >= price){
        if (username !== null){
            saveto_lb()
        }
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
        let price = parseInt(1000000 * Math.pow(rebirths, 3) + 1000000)
        rebnow.textContent = `rebirth now (costs 💎${price})`
        rebcounter.textContent = `rebirths: ${rebirths}`
        multiplierdisplay.textContent = `multiplier: ${multipliercounter}`
        updatediamonds()
        setInterval(() => {
            shopsound.volume = 1
        }, 800);
        if (username !== null){
            saveto_lb()
        }
        save(saveCount=false)
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
    if (statsOpen==true){
        toggleStats()
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
        resetbtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
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
	totalClicks = 0
	localStorage.setItem("totalClicks", totalClicks)
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
    if (statsOpen==true){
        toggleStats()
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
        leaderboardbtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
    }
    else if (opacity=="1"){
        leaderboardopen = false
        leaderboardholder.style.transform= "translate(-50%, -50%) scale(0.75)"
        leaderboardholder.style.pointerEvents="none"
        leaderboardholder.style.opacity="0"
        leaderboardholder.style.visibility="hidden"
        leaderboardbtn.innerHTML = '<span class="material-symbols-outlined">leaderboard</span>'
    }
}

// LEADERBOARD
if (username != null){
    undisplay.textContent = `username: ${username}`
}else{
    undisplay.textContent = `username: not given`
}

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

//autoclicker detection

let clicks = []

diamond.addEventListener("click", function(){
	totalClicks++
    timenow = Date.now()
    clicks.push(timenow)
    clicks = clicks.filter(time => timenow - time <= 50)

    if (clicks.length/20 < 0.067){
        clicksound.currentTime = 0
        clicksound.play()
        counter+=dpc*multiplier
        updatediamonds()
    }else{
        null
    }
})


//STATS
const stats = document.getElementById("stats")

stats.appendChild(dpcdisplay)
stats.appendChild(dpsdisplay)
stats.appendChild(rebcounter)
stats.appendChild(multiplierdisplay)
stats.appendChild(undisplay)
stats.appendChild(totalDisplay)
stats.appendChild(totalTimeDisplay)

setInterval(function(){
	totalDisplay.textContent = `total clicks: ${totalClicks}`
}, 100)

const openStats = document.getElementById("openStats")
statsOpen = false
function toggleStats(){
    if (shopopen==true){
        toggleshop()
    }
    if (rebopen==true){
        openrebs()
    }
    if (ynopen==true){
        
		resetyn()
    }
	if (leaderboardopen==true){
        toggleleaderboard()
    }
    shopsound.currentTime = 0
    shopsound.play()
    const opacity = window.getComputedStyle(stats).opacity
    if (opacity=="0"){
        statsOpen = true
        stats.style.transform= "translate(-50%, -50%) scale(1)"
        stats.style.opacity="1"
        stats.style.pointerEvents="auto"
        stats.style.visibility="visible"
        openStats.innerHTML = '<span class="material-symbols-outlined">close</span>'
    }
    else if (opacity=="1"){
        statsOpen = false
        stats.style.transform= "translate(-50%, -50%) scale(0.75)"
        stats.style.pointerEvents="none"
        stats.style.opacity="0"
        stats.style.visibility="hidden"
        openStats.innerHTML = '<span class="material-symbols-outlined">query_stats</span>'
    }
}
