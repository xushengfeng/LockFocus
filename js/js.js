document.querySelector("#time").oninput = () => {
    if (document.querySelector("#time").innerText.match(/\D/) != null) {
        document.querySelector("#time").innerText = "";
    }
};

document.querySelector("button").onclick = () => {
    count_down_ui(true);
    full_screen(true);
};

function count_down_ui(v) {
    if (v) {
        document.querySelector("button").disabled = true;
        document.querySelector("button").className = "dis";
        document.querySelector("#time").className = "time";
    } else {
        document.querySelector("button").disabled = false;
        document.querySelector("button").className = "";
        document.querySelector("#time").className = "";
    }
    set_time = new Date().getTime();
    count_down()
}

set_time = null;

const { ipcRenderer } = require("electron");
function full_screen(v) {
    ipcRenderer.send("full_screen", v);
}
