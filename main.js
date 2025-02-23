const homebutton = document.getElementById("home")
const projectsbutton = document.getElementById("projects")
const aboutbutton = document.getElementById("about")

function loadingbar() {
	const bar = document.createElement("hr")
	bar.style.border = "2px solid #ffffff91"
	bar.style.width = "0%"
	bar.style.transition = "0.3s ease"
	bar.style.position = "fixed"
	bar.style.top = "-8px"
	document.body.appendChild(bar)

	for (let i = 0; i<15000; i++){
		setTimeout(() => {
		bar.style.width = `${i/150}%`
		bar.style.borderColor = "#ffffff91"
		}, 10)
		setTimeout(() => {
			bar.style.opacity = 0
		}, 500);
	}
}

setTimeout(() => {
	loadingbar()
}, 200);

homebutton.addEventListener("click", () => {
	open("https://toppie.top/", "_self")
})

projectsbutton.addEventListener("click", () => {
	open("https://toppie.top/projects/", "_self")
})

aboutbutton.addEventListener("click", () => {
	open("https://toppie.top/about", "_self")
})
