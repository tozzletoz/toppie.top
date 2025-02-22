const homebutton = document.getElementById("home")
const projectsbutton = document.getElementById("projects")
const aboutbutton = document.getElementById("about")

document.body.style.opacity = 0
setTimeout(() => {
	document.body.style.opacity = 1
}, 10)

homebutton.addEventListener("click", () => {
	open("file:///home/tozzle/Documents/vscode/home/index1.html", "_self")
})

projectsbutton.addEventListener("click", () => {
	open("file:///home/tozzle/Documents/vscode/home/index2.html", "_self")
})

aboutbutton.addEventListener("click", () => {
	open("file:///home/tozzle/Documents/vscode/home/index3.html", "_self")
})
