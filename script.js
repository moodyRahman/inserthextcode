
const style_data = [
    "bg-color", 'text-color', 'accent', 'icon'
]

const onLoad = () => {
    const url_params = new URLSearchParams(window.location.search);
    let url_data = style_data.map((e) => {
        return {color: url_params.get(e), name: e}
    })

    const regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
    
    if (! url_data.every((e) => e.color.match(regexp)) ) {
        document.getElementById("wack").style.display = "inline";
        return;
    }

    console.log(url_data)
    url_data.forEach((e) => {
        console.log()
        document.documentElement.style.setProperty(`--${e.name}`, e.color);        
    })

    // document.getElementById("output").innerHTML =
    // `:root {
    //     --bg-color: ${bg_color};
    //     --text-color:${text_color};
    //     --accent: ${accent};
    //     --icon: ${icon};
    // }`

    document.getElementById("output").innerHTML =
    `:root {\n${url_data.reduce((prev, curr) => prev + `    --${curr.name}: ${curr.color};\n`, "") }\n}`
}

const mmm = () => {
    const bg_color = document.getElementById("bg-color").value;
    const text_color = document.getElementById("text-color").value;
    const accent = document.getElementById("accent").value;
    const icon = document.getElementById("icon").value;
    const regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
    if (!bg_color.match(regexp) || !text_color.match(regexp) || !accent.match(regexp) || !icon.match(regexp)) {
        document.getElementById("wack").style.display = "inline";
        return;
    }
    document.documentElement.style.setProperty('--bg-color', bg_color);
    document.documentElement.style.setProperty('--text-color', text_color);
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--icon', icon);

    document.getElementById("output").innerHTML =
    `:root {
        --bg-color: ${bg_color};
        --text-color:${text_color};
        --accent: ${accent};
        --icon: ${icon};
    }`

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('bg-color', bg_color);
    urlParams.set('text-color', text_color);
    urlParams.set('accent', accent);
    urlParams.set('icon', icon);

    window.location.search = urlParams;

}

window.addEventListener('load', function(event) {
    onLoad();
}); 