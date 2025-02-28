const diesound = new Audio("life.wav")
const jumpsound = new Audio("jump.wav")
const coinsound = new Audio("coin.wav")
const bgm = new Audio("bgm.mp3")
let highscore
bgm.loop = true
let animationid
let coins

async function get_user() {
    const response = await fetch("https://api.toppie.top/neonsprint/get_user", {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    console.log(data)

    if (data.message == "not logged in") {
        logoutbutton.style.display = "none"
	return
    } else {
        logoutbutton.style.display = "flex"
	highscore = data.highscore
	highscoredisplay.innerHTML = `YOUR HIGHSCORE: <u>${highscore}</u>`
	accountbuttonsholder.innerHTML = `<p>LOGGED IN AS ${data.username}</p>`
	coins = data.coins
	console.log(coins)
	coinsdisplay.innerHTML= `COINS: <u>${Math.round(coins)}</u>`
    }
}

async function logout() {
    const response = await fetch("https://api.toppie.top/neonsprint/logout", {
        method: 'POST',
        credentials: 'include'
    })
    await response.json()
    location.reload()
}

async function leaderboard() {
    const response = await fetch("https://api.toppie.top/neonsprint/leaderboard")
    const data = await response.json()

    const leaderboardcontainer = document.getElementById("lbcontent")
    leaderboardcontainer.innerHTML = ""

    data.highscores.forEach((item) => {
        let lbitem = document.createElement("p")
        lbitem.innerText = `${data.highscores.indexOf(item) + 1}. ${item.username}: ${item.highscore}`
        if (data.highscores.indexOf(item) + 1 == 1) {
            lbitem.style.color = "rgb(255, 238, 0)"
        } else if (data.highscores.indexOf(item) + 1 == 2) {
            lbitem.style.color = "rgb(212, 212, 212)"
        } else if (data.highscores.indexOf(item) + 1 == 3) {
            lbitem.style.color = "rgb(160, 85, 0)"
        }
        leaderboardcontainer.appendChild(lbitem)
    })
}

function main() {
	if (!muted) {
		bgm.volume = 1
		diesound.volume = 1
		jumpsound.volume = 1
	}
	let score = 0
	let death = false
	let lives = 3
	let counter = 0
    const gameover = setInterval(() => {
		if (lives === 0) {
			if (score > highscore) {
                fetch("https://api.toppie.top/neonsprint/save", {
                    method: "POST",
                    credentials: 'include',
                    body: JSON.stringify({"highscore": score, "coins": Math.round(coins)}),

                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(() => {
                    highscore = score
                    highscoredisplay.innerHTML = `YOUR HIGHSCORE: <u>${highscore}</u>`
                })
            }
			localStorage.setItem("prevscoreneonrun", score)
			menu()
			clearInterval(gameover)
			cancelAnimationFrame(animationid)
			renderer.domElement.remove()
			livescontainer.innerHTML = ""
			diesound.volume = 0
			jumpsound.volume = 0
			return
		}colors[colors.length - 1] !== 0
	}, 100)
	
	const scorecounter = document.getElementById("score")
	const livescontainer = document.querySelector(".lives")
	const life1 = document.createElement("span")
	const life2 = document.createElement("span")
	const life3 = document.createElement("span")
	life1.innerHTML = '<span class="material-symbols-outlined" id="life1">favorite</span>'
	life2.innerHTML = '<span class="material-symbols-outlined" id="life2">favorite</span>'
	life3.innerHTML = '<span class="material-symbols-outlined" id="life3">favorite</span>'
	livescontainer.appendChild(life3)
	livescontainer.appendChild(life2)
	livescontainer.appendChild(life1)

	const renderer = new THREE.WebGLRenderer()

	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	renderer.domElement.id = "canvas"

	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
	setInterval(() => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
    	camera.updateProjectionMatrix()
	}, 100)
	
	camera.lookAt(0, 0, 0)

	const imgloader = new THREE.TextureLoader()
	const scene = new THREE.Scene()
	scene.background = null
	renderer.setClearColor(0x000000, 0)

	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap

	const light = new THREE.DirectionalLight("#ffffff", 3)
	light.position.set(1.5, 1.5, 0.7)
	light.castShadow = true
	scene.add(light)

	light.shadow.mapSize.width = 1024
	light.shadow.mapSize.height = 1024
	light.shadow.camera.near = 0.5
	light.shadow.camera.far = 500

	let objects1 = []
	let colors = []
	let i = 0

	const playergeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
	const playermaterial = new THREE.MeshStandardMaterial({color: "cyan"})
	const player = new THREE.Mesh(playergeometry, playermaterial)
	//player.castShadow = true
	player.receiveShadow = true

	player.material.transparent = true
	player.material.opacity = 1
	player.position.set(0, -0.4, 0)
	player.position.z = 3
	scene.add(player)

	camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)

	let canjump = true
	let spacebar = false
	let leftpressed = false
	let rightpressed = false
	let mouseposx
	let mouseposy
	let mousedown
	document.addEventListener("touchstart", function(event) {
		mouseposx = event.touches[0].clientX
		mouseposy = event.touches[0].clientY
	})

	document.addEventListener("touchmove", function(event) {
		mouseposx = event.touches[0].clientX
		mouseposy = event.touches[0].clientY
	})

	window.addEventListener("keydown", event => {
		if ((event.key == " " || event.key == "ArrowUp" || event.key == "w") && canjump && !spacebar) {
			jump()
			jumpsound.currentTime = 0
			jumpsound.play()
			spacebar = true
		}

		if (event.key == "ArrowLeft" || event.key == "a") {
			leftpressed = true
		}
		if (event.key == "ArrowRight" || event.key == "d") {
			rightpressed = true
		}

	})

	window.addEventListener("keyup", event => {
		spacebar = false
		if (event.key == "ArrowLeft" || event.key == "a") {
			leftpressed = false
		}
		if (event.key == "ArrowRight" || event.key == "d") {
			rightpressed = false
		}
	})

	window.addEventListener("touchstart", event => {
		mousedown = true
		if (canjump && !spacebar) {
			if (mouseposy < window.innerHeight / 2) {
				jump()
				jumpsound.currentTime = 0
				jumpsound.play()
				spacebar = true
			}
		}
	})

	window.addEventListener("touchend", event => {
		mousedown = false
		spacebar = false
	})

	setInterval(() => {
		if (leftpressed && player.position.x > -0.66 || mousedown == true && mouseposx < window.innerWidth/2 && player.position.x > -0.66) {
			player.position.x-=0.01
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
		}
		if (rightpressed && player.position.x < 0.66 || mousedown == true && mouseposx > window.innerWidth/2 && player.position.x < 0.66) {
			player.position.x+=0.01
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
		}
	}, 10)
	
	function jump() {
		player.position.y = Math.abs(Math.sin(counter * 7) * (0.5+(jumppower/5))) - 0.4
		counter+=0.01
		if (counter > 0.46 && counter < 0.47) {
			counter = 0
			canjump = true
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
		} else {
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
			requestAnimationFrame(jump)
			canjump = false
		}
	}
	let counter2 = 0
	let increment = 0.01
	setInterval(() => {
		const geometry = new THREE.BoxGeometry(1.7, 0.1, 0.8)
		const material = new THREE.MeshStandardMaterial({color: "white"})
		const object = new THREE.Mesh(geometry, material)

		object.material.transparent = true
		object.position.z = -8
		object.position.y = -0.6
		//object.castShadow = true
		object.receiveShadow = true

		counter2+=0.1

		switch (Math.round(Math.random())) {
			case 0:
				increment = -0.01
				break
		
			case 1:
				increment = 0.01
				break
		}

		if (colors[colors.length - 1] !== 0) {
    		object.danger = Math.round(Math.random() * 1.6)
			if (object.danger == 0) {
				object.coin = Math.round(Math.random() * 20)
				if (object.danger == 0) {
					object.geometry = new THREE.BoxGeometry(0.3, 0.3, 0.38)
				}
				if (object.coin == 0) {
					object.geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.03, 32)
				}
			}
			object.posx = Math.round(Math.random() * 4)
		} else {
			object.danger = 1
		}
		colors.push(object.danger)
		scene.add(object)
		objects1.push(object)

		let opacity = 0
		function appear() {
			opacity += 0.1
			object.material.opacity = opacity
			if (opacity < 1) {
				requestAnimationFrame(appear)
			}}
		appear()

	}, 60)

	function adjustlives() {
		switch (lives) {
			case 2:
				life1.style.visibility = "hidden"
				break
			case 1:
				life2.style.visibility = "hidden"
				break
			case 0:
				life3.style.visibility = "hidden"
				menu()
				break
		}
	}

	function animation() {-0.4
		if (lives === 0) return
		objects1.forEach(object => {
			switch (object.danger) {
				case 0:
					object.material.color.set("red")
					if (object.coin == 0) {
						object.material.color.set("yellow")
						object.rotation.x = Math.PI / 2
						object.rotation.z+=0.1
					}
					let objectindex = objects1.indexOf(object)

					if (object.position.z > 10) {
						objects1.splice(objectindex, 1)
					}

					object.position.y = -0.4
					switch (object.posx) {
						case 0:
							object.position.x = -0.65
							break
						case 1:
							object.position.x = -0.325
							break
						case 2:
							object.position.x = 0.325
							break
						case 3:
							object.position.x = 0.65
							break
						case 4:
							object.position.x = 0
							break
					}
					if (object.position.z > 2.5 && object.position.z < 3.1 && player.position.x < object.position.x + 0.3 && player.position.x > object.position.x - 0.3 && player.position.y < 0.05) {
						if (!death && object.coin != 0) {
							diesound.currentTime = 0
							diesound.play()
							death = true
							lives-=1
							player.material.opacity = 0.5
							adjustlives()
							setTimeout(() => {
								death = false
								player.material.opacity = 1
							}, 1500)
						} else if (object.coin == 0) {
							object.geometry.dispose()
							object.material.dispose()
							scene.remove(object)
							coins+=(1/6)
							coinsound.currentTime = 0
							coinsound.play()
						}
					}
					break
			
				default:
					break
			}
			object.position.z+=0.10
		})
		score+=1
		scorecounter.innerHTML = `SCORE: ${score}`
		renderer.render(scene, camera)
		animationid = requestAnimationFrame(animation)
	}

	animationid = requestAnimationFrame(animation)
}

function menu() {
	mutebutton.style.visibility = "visible"
    get_user()
	if (hasplayed && !muted) {
			bgm.volume = 0.4
	}

	prevscore = localStorage.getItem("prevscoreneonrun") || 0

	creditsbutton.addEventListener("click", () => {
		document.querySelector(".menu").remove()
		document.body.appendChild(creditscontainer)
		detectback()
	})

	shopbutton.addEventListener("click", () => {
		document.querySelector(".menu").remove()
		document.body.appendChild(shopcontainer)
		shop()
		detectback()
	})

	leaderboardbutton.addEventListener("click", () => {
		document.querySelector(".menu").remove()
        document.body.appendChild(leaderboardcontainer)
        leaderboard()
		detectback()
	})

	logoutbutton.addEventListener("click", () => {
		logout()
	})

	function detectback() {
		document.querySelectorAll(".backbutton").forEach(button => {
		button.addEventListener("click", () => {
		try {
			document.querySelector(".leaderboard").remove()
		} catch {
			null
		}
		try {
			document.querySelector(".credits").remove()
		} catch {
			null
		}
		try {
			document.querySelector(".shop").remove()
		} catch {
			null
		}
		document.body.appendChild(menucontainer)
	})})
	}

	try {
		document.querySelector(".game").remove()
		document.querySelector(".menu").remove()
	} catch {
		null
    }

	prevscoredisplay.innerHTML= `LATEST SCORE: <u>${prevscore}</u>`
	coinsdisplay.innerHTML= `COINS: <u>${Math.round(coins)}</u>`
	document.body.appendChild(menucontainer)
	document.getElementById("playbutton").addEventListener("click", () => {
		if (hasplayed == false) {
			bgm.play()
		}
		hasplayed = true
		document.querySelector(".menu").remove()
		document.body.appendChild(gameinfocontainer)
		mutebutton.style.visibility = "hidden"
		main()
	})
}

let jumppower
let jumppowerowned
let movepower
let movepowerowned

async function shop() {
	coinsound.play()
	const minjump = document.getElementById("minjump")
	const plusjump = document.getElementById("plusjump")
	const jumpvalue = document.getElementById("jumpvalue")
	const minmove = document.getElementById("minmove")
	const plusmove = document.getElementById("plusmove")
	const movevalue = document.getElementById("movevalue")

	coinsdisplay.innerText = "-"
	jumpvalue.innerText = "-"
	movevalue.innerText = "-"

	const response = await fetch("https://api.toppie.top/neonsprint/upgrades", {
		method: "GET",
		credentials: "include",
		headers: {
			"content-type": "application/json"
		},
	})
	const data = await response.json()

	jumppower = data.upgrades.jumpheight
	movepower = data.upgrades.movespeed
	jumppowerowned = data.upgrades.jumpheightowned
	movepowerowned = data.upgrades.movespeedowned

	console.log(jumppower, movepower, jumppowerowned, movepowerowned)
	coinsdisplay.innerHTML= `COINS: <u>${Math.round(coins)}</u>`

	function updvalues(save=true) {
		console.log(coins)
		jumpvalue.innerText = jumppower
		movevalue.innerText = movepower
		fetch("https://api.toppie.top/neonsprint/upgrades", {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
			body: JSON.stringify({jumpheight: jumppower, jumpheightowned: jumppowerowned, movespeed: movepower, movespeedowned: movepowerowned})
		})
		if (save) {
			fetch("https://api.toppie.top/neonsprint/save", {
				method: "POST",
				credentials: "include",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({coins: Math.round(coins)})
			}).then(response => response.json()).then(data => {coinsdisplay.innerHTML= `COINS: <u>${Math.round(data.coins)}</u>`; coins = data.coins})
		}
	}
	updvalues(save=false)
	minjump.addEventListener("click", () => {
		if (jumppower > 1) {
			jumppower-=1
			updvalues()
		}
	})

	plusjump.addEventListener("click", () => {
			if (jumppowerowned < jumppower) {
				if (coins > 4) {
					if (jumppower < 5) {
						coins-=5
						jumppower+=1
						jumppowerowned+=1
						updvalues()
					}
				}
			} else {
				jumppower+=1
				updvalues()
			}
		}
	)
	minmove.addEventListener("click", () => {
		if (movepower > 1) {
			movepower-=1
			updvalues()
		}
	})

	plusmove.addEventListener("click", () => {
			if (movepowerowned < movepower) {
				if (coins > 4) {
					if (movepower < 5) {
						coins-=5
						movepower+=1
						movepowerowned+=1
						updvalues()
					}
				}
			} else {
				movepower+=1
				updvalues()
			}
		}
	)
}

const menucontainer = document.querySelector(".menu")
const gameinfocontainer = document.querySelector(".game")
const creditscontainer = document.querySelector(".credits")
const leaderboardcontainer = document.querySelector(".leaderboard")
const shopcontainer = document.querySelector(".shop")
const creditsbutton = document.getElementById("creditsbutton")
const leaderboardbutton = document.getElementById("leaderboardbutton")
const shopbutton = document.getElementById("shopbutton")
const logoutbutton = document.getElementById("logoutbutton")
const mutebutton = document.getElementById("mutebutton")
const accountbuttonsholder = document.querySelector(".accountbuttonsholder")
const highscoredisplay = document.getElementById("highscore")
const prevscoredisplay = document.getElementById("prevscore")
const coinsdisplay = document.getElementById("coinamount")
let prevscore
let hasplayed = false
const backbutton = document.querySelectorAll(".backbutton")
document.querySelector(".game").remove()
document.querySelector(".shop").remove()
document.querySelector(".menu").remove()
document.querySelector(".credits").remove()
document.querySelector(".leaderboard").remove()
menu()
let muted = false
mutebutton.addEventListener("click", () => {
	if (muted) {
		bgm.volume = 0.4
		bgm.play()
		diesound.volume = 1
		jumpsound.volume = 1
		muted = false
		mutebutton.innerHTML = '<span id="muteicon" class="material-symbols-outlined">volume_up</span>'
	} else {
		bgm.volume = 0
		bgm.pause()
		diesound.volume = 0
		jumpsound.volume = 0
		muted = true
		mutebutton.innerHTML = '<span id="muteicon" class="material-symbols-outlined">volume_mute</span>'
	}
})
