const diesound = new Audio("life.wav")
const jumpsound = new Audio("jump.wav")
const bgm = new Audio("bgm.mp3")
bgm.loop = true
let animationid
function main() {
	bgm.volume = 1
	let score = 0
	let death = false
	let lives = 3
	let counter = 0
	const gameover = setInterval(() => {
		if (lives === 0) {
			if (score > highscore) {
				localStorage.setItem("highscoreneonrun", score)
			}
			localStorage.setItem("prevscoreneonrun", score)
			menu()
			clearInterval(gameover)
			cancelAnimationFrame(animationid)
			renderer.domElement.remove()
			livescontainer.innerHTML = ""
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
		camera.aspect = window.innerWidth / window.innerHeight;
    	camera.updateProjectionMatrix()
	}, 100)
	
	camera.lookAt(0, 0, 0)

	const imgloader = new THREE.TextureLoader()
	const scene = new THREE.Scene()
	scene.background = null
	renderer.setClearColor(0x000000, 0)

	let objects1 = []
	let objectsoutlines = []
	let colors = []
	let i = 0

	const playergeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
	const playermaterial = new THREE.MeshBasicMaterial({color: "cyan"})
	const player = new THREE.Mesh(playergeometry, playermaterial)

	const outlinegeometry = new THREE.EdgesGeometry(playergeometry)
	const linematerial = new THREE.LineBasicMaterial({color: "black", linewidth: 10})
	const outline = new THREE.LineSegments(outlinegeometry, linematerial)

	player.material.transparent = true
	player.material.opacity = 0.75
	player.position.set(0, -0.4, 0)
	player.position.z = 3
	outline.position.copy(player.position)
	scene.add(player)
	scene.add(outline)

	camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)

	let canjump = true
	let spacebar = false
	let leftpressed = false
	let rightpressed = false
	let mouseposx
	let mouseposy
	let mousedown
	document.addEventListener('mousemove', function(event) {
		mouseposx = event.clientX
		mouseposy = event.clientY
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

	window.addEventListener("mousedown", event => {
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

	window.addEventListener("mouseup", event => {
		mousedown = false
		spacebar = false
	})

	setInterval(() => {
		if (leftpressed && player.position.x > -0.66 || mousedown == true && mouseposx < window.innerWidth/2 && player.position.x > -0.66) {
			player.position.x-=0.01
			outline.position.copy(player.position)
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
		}
		if (rightpressed && player.position.x < 0.66 || mousedown == true && mouseposx > window.innerWidth/2 && player.position.x < 0.66) {
			player.position.x+=0.01
			outline.position.copy(player.position)
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
		}
	}, 10)

	function jump() {
		player.position.y = Math.abs(Math.sin(counter * 7) * 1) - 0.4
		counter+=0.01
		if (counter > 0.46 && counter < 0.47) {
			counter = 0
			canjump = true
			outline.position.copy(player.position)
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
		} else {
			outline.position.copy(player.position)
			camera.position.set(player.position.x/3, (player.position.y+1.3)/3, player.position.z + 4)
			requestAnimationFrame(jump)
			canjump = false
		}
	}
	setInterval(() => {
		const geometry = new THREE.BoxGeometry(1.7, 0, 1.2)
		const material = new THREE.MeshBasicMaterial({color: "white"})
		const object = new THREE.Mesh(geometry, material)

		const dangeroutlinegeometry = new THREE.EdgesGeometry(playergeometry)
		const dangerlinematerial = new THREE.LineBasicMaterial({color: "black", linewidth: 10})
		const dangeroutline = new THREE.LineSegments(dangeroutlinegeometry, dangerlinematerial)

		object.material.transparent = true
		object.position.z = -8
		object.position.y = -0.6

		if (colors[colors.length - 1] !== 0) {
    		object.danger = Math.round(Math.random() * 1)
			object.posx = Math.round(Math.random() * 4)
		} else {
			object.danger = 1
		}
		dangeroutline.position.copy(object.position)
		colors.push(object.danger)
		scene.add(object)
		scene.add(dangeroutline)
		objects1.push(object)
		objectsoutlines.push(dangeroutline)


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
					object.geometry = new THREE.BoxGeometry(0.3, 0.3, 0.38)
					let objectindex = objects1.indexOf(object)
					const outline = objectsoutlines[objectindex]
					let outlineindex = objectsoutlines.indexOf(outline)
					outline.position.copy(object.position)

					if (object.position.z > 10) {
						objects1.splice(objectindex, 1)
						objectsoutlines.splice(outlineindex, 1)
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
					if (object.position.z > 2.5 && object.position.z < 3.1 && player.position.x < object.position.x + 0.3 && player.position.x > object.position.x - 0.3 && player.position.y < 0.3) {
						if (!death) {
							diesound.currentTime = 0
							diesound.play()
							death = true
							lives-=1
							player.material.opacity = 0.5
							adjustlives()
							setTimeout(() => {
								death = false
								player.material.opacity = 0.75
							}, 1500)
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
	if (hasplayed) {
			bgm.volume = 0.4
	}

	highscore = localStorage.getItem("highscoreneonrun") || 0
	prevscore = localStorage.getItem("prevscoreneonrun") || 0
	try {
		document.querySelector(".game").remove()
		document.querySelector(".menu").remove()
	} catch {
		null
	}
	highscoredisplay.innerHTML= `HIGHSCORE: <u>${highscore}</u>`
	prevscoredisplay.innerHTML= `LATEST SCORE: <u>${prevscore}</u>`
	document.body.appendChild(menucontainer)
	document.getElementById("playbutton").addEventListener("click", () => {
		if (hasplayed == false) {
			bgm.play()
		}
		hasplayed = true
		document.querySelector(".menu").remove()
		document.body.appendChild(gameinfocontainer)
		main()
	})
}

const menucontainer = document.querySelector(".menu")
const gameinfocontainer = document.querySelector(".game")
const highscoredisplay = document.getElementById("highscore")
const prevscoredisplay = document.getElementById("prevscore")
let highscore
let prevscore
let hasplayed = false
document.querySelector(".game").remove()
document.querySelector(".menu").remove()
menu()