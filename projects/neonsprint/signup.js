const submitbutton = document.getElementById("submit")
const statusp = document.getElementById("status")

submitbutton.addEventListener("click", async () => {
	console.log(1)
	const response = await fetch("https://api.toppie.top/neonsprint/signup", {
		method: "POST",
		body: JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value}),
		headers: {
			"Content-Type": "application/json"
		}
	})
	const data = await response.json()
    console.log(data.status)	
	if (data.status == "username taken") {
		statusp.innerText = "USERNAME TAKEN"
	} else if (data.status == "success") {
		statusp.innerHTML = "SUCCESS, YOU CAN NOW <a href='login.html'>LOG IN</a>"
	} else {
		statusp.innerText = data.status.toUpperCase()
	}
})