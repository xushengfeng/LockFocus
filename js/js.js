const { ipcRenderer } = require("electron");

document.querySelector("button").onclick = () => {
    full_screen(true);
    count_down();
};

function full_screen(v) {
    ipcRenderer.send("full_screen", v);
}
