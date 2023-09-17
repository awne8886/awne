function antiCheat() {
    document.getElementById("inputarea").innerHTML = "";
    window.alert("Do not paste content into this webpage. You may use it to generate fake words, but you may not use your clipboard to cheat the game :) - awne");
    location.reload()
}

window.addEventListener("paste", antiCheat);
