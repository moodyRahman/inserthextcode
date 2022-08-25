
const mmm = () => {
    console.log("clicked")
    console.log()
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
}
