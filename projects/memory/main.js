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
		completes = gridsize ** 2
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
	for (let i = 0; i < gridsize ** 2 / 2; i += 0.5) {
		numberarray.push(Math.floor(i))
	}

	icons = ['icons/typescript.svg', 'icons/debian.svg', 'icons/ruby.svg', 'icons/vuedotjs.svg', 'icons/archlinux.svg', 'icons/flathub.svg', 'icons/sql.png', 'icons/nodedotjs.svg', 'icons/javascript.svg', 'icons/apachegroovy.svg', 'icons/linux.svg', 'icons/sas.svg', 'icons/dart.svg', 'icons/rust.png', 'icons/gnome.svg', 'icons/django.svg', 'icons/java.svg', 'icons/swift.svg', 'icons/scala.svg', 'icons/golang.svg', 'icons/gnubash.svg', 'icons/jupyter.svg', 'icons/elixir.svg', 'icons/json.svg', 'icons/stackoverflow.svg', 'icons/csharp.svg', 'icons/lua.svg', 'icons/php.svg', 'icons/vsc.svg', 'icons/kotlin.svg', 'icons/vim.svg', 'icons/jquery.svg', 'icons/python.svg', 'icons/hyprland.svg', 'icons/kde.svg', 'icons/centos.svg', 'icons/jetbrains.svg', 'icons/linuxmint.svg', 'icons/git.svg', 'icons/pypi.svg', 'icons/fedora.svg', 'icons/perl.svg', 'icons/react.svg', 'icons/fsharp.svg', 'icons/github.svg', 'icons/ubuntu.svg', 'icons/haskell.svg', 'icons/r.svg', 'icons/cpp.svg', 'icons/html.svg']
	console.log(icons.length)
	let matches = shuffle(numberarray)
	item = 0
	completes = 0
	opened = []
	checkopened = []
	if (window.mobileCheck()) {
		table.style.scale = (1.5 / gridsize) * 2
	} else {
		table.style.scale = (1.5 / gridsize) * 3
	}
	checkcompletes()
	for (let x = 0; x < gridsize; x++) {
		const row = document.createElement("tr")
		table.appendChild(row)
		for (let i = 0; i < gridsize; i++) {
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
			if (completes == gridsize ** 2) {
				menu()
				if (skip) {
					table.style.opacity = 0
					againbutton.style.opacity = 0
					setTimeout(() => {
						document.body.removeChild(gamecontainer)
						table.innerHTML = ''
						initmenu()
					}, 400)
					return
				}
				function menu() {
					const table = document.querySelector(".table")
					const menubuton = document.getElementById("menubutton")
					menubuton.style.opacity = 0
					setTimeout(() => {
						menubuton.remove()
					}, 400)
					table.style.opacity = 0
					const againbutton = document.createElement("button")
					againbutton.id = "againbutton"
					againbutton.innerText = "Back to menu"
					clearInterval(check)
					gamecontainer.appendChild(againbutton)
					setTimeout(() => {
						table.innerHTML = `You completed this set in ${(Date.now() - starttime) / 1000} seconds.`
						table.style.backgroundColor = 'rgba(255, 255, 255, 0)'
						table.style.scale = 1
						table.style.opacity = 1
						againbutton.style.opacity = 1
						againbutton.addEventListener("click", () => {
							table.style.opacity = 0
							againbutton.style.opacity = 0
							setTimeout(() => {
								document.body.removeChild(gamecontainer)
								table.innerHTML = ''
								againbutton.innerHTML = ''
								initmenu()
							}, 400)
						})
					}, 400)
				}
			}
		}, 100)
	}
}

let gridsize
function initmenu() {
	const container = document.createElement("div")
	container.className = "container"
	setTimeout(() => {
		container.style.opacity = 1
	}, 10)

	const title = document.createElement("span")
	title.className = "title"
	title.innerHTML = "Memory"

	const playbutton = document.createElement("button")
	playbutton.id = "playbutton"
	playbutton.innerText = "Play!"
	playbutton.onclick = startgame
	setTimeout(() => {
		playbutton.style.opacity = 1
	}, 10)

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
		playbutton.disabled = true
		container.style.opacity = 0
		setTimeout(() => {
			container.remove()
			init()
		}, 400)
	}

	container.appendChild(title)
	container.appendChild(playbutton)
	container.appendChild(hr)
	container.appendChild(gridsizeinput)
	container.appendChild(gridsizedisplay)

	document.body.appendChild(container)
}

window.mobileCheck = function () {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera)
	return check
};

initmenu()
