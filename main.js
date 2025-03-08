const navbar = document.querySelector(".navbar")
const iconmenu = document.querySelector("#iconmenu")
let menuopen = false

document.addEventListener("scroll", () => {
	let scrollpos = ((window.scrollY * -1) * 0.2)
	document.body.style.backgroundPosition = `center ${scrollpos}px`
})

iconmenu.addEventListener("touch", () => {
	if (menuopen == false) {
		navbar.style.left = 0
		iconmenu.style.left = 130
		iconmenu.style.transform = "rotateZ(-180deg)"
		menuopen = true
	} else {
		iconmenu.style.left = 10
		navbar.style.left = -120
		menuopen = false
		iconmenu.style.transform = "rotateZ(0deg)"
	}
})

document.addEventListener("mousemove", (event) => {
	if (event.clientX < 120) {
		navbar.style.left = 0
		iconmenu.style.left = 130
		iconmenu.style.transform = "rotateZ(-180deg)"
		menuopen = true
	} else {
		menuopen = false
		iconmenu.style.left = 10
		navbar.style.left = -120
		menuopen = false
		iconmenu.style.transform = "rotateZ(0deg)"
	}
})
