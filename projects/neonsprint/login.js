const submitbutton = document.getElementById("submit")
const statusp = document.getElementById("status")

submitbutton.addEventListener("click", async () => {
	console.log(1)
	const response = await fetch("https://api.toppie.top/neonsprint/login", {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value}),
		headers: {
			"Content-Type": "application/json"
		}
	})
	const data = await response.json()
    console.log(data.status)
	if (data.status == "incorrect credentials") {
		statusp.innerText = "INCORRECT USERNAME/PASSWORD"
	} else if (data.status == "success") {
		window.location.replace("index.html")
	}
})