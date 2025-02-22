const homebutton = document.getElementById("home")
const projectsbutton = document.getElementById("projects")
const aboutbutton = document.getElementById("about")

document.body.style.opacity = 0
setTimeout(() => {
	document.body.style.opacity = 1
}, 10)

homebutton.addEventListener("click", () => {
	open("https://toppie.top/", "_self")
})

projectsbutton.addEventListener("click", () => {
	open("https://toppie.top/projects/", "_self")
})

aboutbutton.addEventListener("click", () => {
	open("https://toppie.top/about/", "_self")
})
