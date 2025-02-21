let item = 0
let opened = []
let completes = 0
let starttime
let skip = false
let icons
let icons2 = []
let checkopened = []
const cardturn = new Audio("card.wav")
function init() {
	skip = false
	const gamecontainer = document.createElement("div")
	gamecontainer.className = "gamecontainer"
	const menubuton = document.createElement("button")
	menubuton.id = "menubutton"
	menubuton.innerHTML = "Return"
	menubuton.addEventListener("click", () => {
		skip = true
		completes = gridsize**2
	})

	starttime = Date.now()
	const table = document.createElement("table")
	table.className = "table"
	setTimeout(() => {
		menubuton.style.opacity = 1
		table.style.opacity = 1
	}, 100)
	gamecontainer.appendChild(table)
	document.body.appendChild(menubuton)
	document.body.appendChild(gamecontainer)
	let numberarray = []
	for (let i = 0; i<gridsize**2/2; i+=0.5) {
		numberarray.push(Math.floor(i))
	}

	icons = ['icons/typescript.svg', 'icons/debian.svg', 'icons/ruby.svg', 'icons/vuedotjs.svg', 'icons/archlinux.svg', 'icons/flathub.svg', 'icons/sql.png', 'icons/nodedotjs.svg', 'icons/javascript.svg', 'icons/apachegroovy.svg', 'icons/linux.svg', 'icons/sas.svg', 'icons/dart.svg', 'icons/rust.png', 'icons/sas.png', 'icons/django.svg', 'icons/java.svg', 'icons/swift.svg', 'icons/scala.svg', 'icons/golang.svg', 'icons/gnubash.svg', 'icons/jupyter.svg', 'icons/elixir.svg', 'icons/json.svg', 'icons/stackoverflow.svg', 'icons/csharp.svg', 'icons/lua.svg', 'icons/php.svg', 'icons/vsc.svg', 'icons/kotlin.svg', 'icons/vim.svg', 'icons/jquery.svg', 'icons/python.svg', 'icons/hyprland.svg', 'icons/kde.svg', 'icons/centos.svg', 'icons/jetbrains.svg', 'icons/linuxmint.svg', 'icons/git.svg', 'icons/pypi.svg', 'icons/fedora.svg', 'icons/perl.svg', 'icons/react.svg', 'icons/fsharp.svg', 'icons/github.svg', 'icons/ubuntu.svg', 'icons/haskell.svg', 'icons/r.svg', 'icons/cpp.svg', 'icons/html.svg']
	console.log(icons.length)
	let matches = shuffle(numberarray)
	item = 0
	completes = 0
	opened = []
	checkopened = []
	table.style.scale = (1.5/gridsize) * 3
	checkcompletes()
	for (let x = 0; x<gridsize; x++){
		const row = document.createElement("tr")
		table.appendChild(row)
		for (let i = 0; i<gridsize; i++) {
			const cell = document.createElement("td")
			const button = document.createElement("div")
			button.className = "buttons"
			button.innerText = ""
			button.dataset.id = matches[item]
			button.dataset.uniqueid = Math.random()
			cell.appendChild(button)
			row.appendChild(cell)

			item++

			button.addEventListener("click", () => {
				if (button.innerText == "") {
					if (opened.length <= 1) {
						opencard()
					} else {
						document.querySelectorAll(".buttons").forEach(button => {
							button.innerText = ""
						})
						opened = []
						checkopened = []
						opencard()
					}
				
				}
				function opencard() {
					cardturn.currentTime = 0
					cardturn.play()
					console.log(icons[button.dataset.id])
					button.innerHTML = `<img src='${icons[button.dataset.id]}' width='50' height='50'></img>`
					opened.push(button.innerHTML)
					checkopened.push(button.dataset.uniqueid)
					console.log(button.dataset.uniqueid)
					if (checkopened[0] != checkopened[1]) {
						if (opened[0] == opened[1]) {
							document.querySelectorAll(".buttons").forEach(button => {
								if (button.innerHTML == opened[1]) {
									button.style.backgroundColor = "#99df93"
									button.className = "completedbuttons"
									completes++
								}
						})
					}
					}
				}
			})
		}
	}
	
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}
	function checkcompletes() {
		const check = setInterval(() => {
			if (completes == gridsize**2) {
				menu()
				if (skip) {
					table.style.opacity = 0
					againbutton.style.opacity = 0
					setTimeout(() => {
						document.body.removeChild(gamecontainer)
						table.innerHTML = ''
						initmenu()
					}, 400);
					return
				}
				function menu() {
					const table = document.querySelector(".table")
					const menubuton = document.getElementById("menubutton")
					menubuton.style.opacity = 0
					setTimeout(() => {
						menubuton.remove()
					}, 400);
					table.style.opacity = 0
					const againbutton = document.createElement("button")
					againbutton.id = "againbutton"
					againbutton.innerText = "Back to menu"
					clearInterval(check)
					gamecontainer.appendChild(againbutton)
					setTimeout(() => {
						table.innerHTML = `You completed this set in ${(Date.now() - starttime)/1000} seconds.`
						table.style.backgroundColor ='rgba(255, 255, 255, 0)'
						table.style.scale = 1
						table.style.opacity = 1
						againbutton.style.opacity = 1
						againbutton.addEventListener("click", () => {
							table.style.opacity = 0
							againbutton.style.opacity = 0
							setTimeout(() => {
								document.body.removeChild(gamecontainer)
								table.innerHTML = '';
								againbutton.innerHTML = '';
								initmenu()
							}, 400);
						})
					}, 400);
				}
			}
		}, 100);
	}
}

let gridsize
function initmenu() {
	const container = document.createElement("div")
	container.className = "container"
	setTimeout(() => {
		container.style.opacity = 1
	}, 10);

    const title = document.createElement("span")
    title.className = "title"
    title.innerHTML = "Memory"

	const playbutton = document.createElement("button")
	playbutton.id = "playbutton"
	playbutton.innerText = "Play!"
	playbutton.onclick = startgame
	setTimeout(() => {
		playbutton.style.opacity = 1
	}, 10);

    const gridsizeinput = document.createElement("input")
    gridsizeinput.type = "range"
    gridsizeinput.className = "slider"
    gridsizeinput.value = 4
	gridsizeinput.min = 2
	gridsizeinput.max = 8
	gridsizeinput.step = 2
	gridsize = 4

	const hr = document.createElement("hr")
	hr.style.border = "1.5px solid rgba(179, 166, 255, 0.27)"
	hr.style.width = "100%"
	hr.style.marginTop = "20px"
	hr.style.marginBottom = "20px"

    const gridsizedisplay = document.createElement("span")
	gridsizedisplay.id = "gridsizedisplay"
    gridsizedisplay.className = "gridsizedisplay"
    gridsizedisplay.innerHTML = "size: 4x4"

	gridsizeinput.addEventListener("input", () => {
		gridsizedisplay.innerHTML = `size: ${gridsizeinput.value}x${gridsizeinput.value}`
		gridsize = gridsizeinput.value
	})

	function startgame() {
		container.style.opacity = 0
		setTimeout(() => {
			container.remove()
			init()
		}, 400);
	}

    container.appendChild(title)
	container.appendChild(playbutton)
	container.appendChild(hr)
	container.appendChild(gridsizeinput)
    container.appendChild(gridsizedisplay)

    document.body.appendChild(container)
}

initmenu()
