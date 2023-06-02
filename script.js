
const style_data = [
	"bg-color", 'text-color', 'accent', 'icon'
]

const setMessage = (message) => {
	console.log(document.getElementById("message"))
	document.getElementById("message").style.display = "inline";
	document.getElementById("message").innerHTML = message;
}

const onLoad = () => {

	// read URL parameters and make sure they're all valid keys
	const url_params = new URLSearchParams(window.location.search);

	if (url_params.toString() === "")
	{
		return;
	}

	if (!style_data.every((e) => url_params.has(e))) {
		setMessage("odd things in the URL")
		return;
	}

	// store url parameters with their name in a more convenient array of JSON
	let url_data = style_data.map((e) => {
		return { color: url_params.get(e), name: e }
	})

	// validate that every value is a valid hex code
	const regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
	if (!url_data.every((e) => e.color.match(regexp))) {
		setMessage("bad URL")
		return;
	}

	// set document styles
	url_data.forEach((e) => {
		document.documentElement.style.setProperty(`--${e.name}`, e.color);
	})

	// set output panel
	document.getElementById("output").innerHTML =
		`<div>:root {\n${url_data.reduce((prev, curr) => prev + `    --${curr.name}: ${curr.color};\n`, "")}\n} </div>
<div>{
${url_data.reduce((prev, curr) => prev + `    "${curr.name}": "${curr.color}";\n`, "")}
},</div>
	`

	// update the text inputs with the hex codes
	const form_data = style_data.map((e) => document.getElementById(e))
	form_data.forEach((e, index) => {
		e.value = url_data[index].color;
	})
}

const mmm = () => {
	// // read hex codes from form
	const form_data = style_data.map((e) => { return { color: document.getElementById(e).value, name: e } })

	const regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
	if (!form_data.every((e) => e.color.match(regexp))) {
		setMessage("bad input | type only hex codes")
		return;
	}

	// update url params
	const urlParams = new URLSearchParams(window.location.search);
	form_data.forEach((e) => {
		console.log(e)
		urlParams.set(e.name, e.color)
	})
	window.location.search = urlParams;

}

window.addEventListener('load', function (event) {
	onLoad();
	document.getElementById("submit").addEventListener("click", mmm)

});
