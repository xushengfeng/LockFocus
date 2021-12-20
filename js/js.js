const { ipcRenderer } = require("electron");
const Store = require("electron-store");
store = new Store();

var stop_time = store.get("stop_time") || 0;
if (stop_time > new Date().getTime()) {
    count_down_ui(true);
    full_screen(true);
}

document.querySelector("#time").oninput = () => {
    if (document.querySelector("#time").innerText.match(/\D/) != null) {
        document.querySelector("#time").innerText = "";
    }
};

document.querySelector("button").onclick = () => {
    count_down_ui(true);
    stop_time = new Date().getTime() + (text - 0) * 60 * 1000;
    store.set("stop_time", stop_time);
};

document.onkeydown = (e) => {
    if (e.key == "Enter") {
        count_down_ui(true);
        stop_time = new Date().getTime() + (text - 0) * 60 * 1000;
        store.set("stop_time", stop_time);
    }
};

var text = null;

function count_down_ui(v) {
    if (v) {
        if (document.querySelector("#time").innerText == "") {
            text = "0";
            full_screen(false);
        } else {
            text = document.querySelector("#time").innerText;
            full_screen(true);
        }

        document.querySelector("#time").contentEditable = false;
        document.querySelector("button").disabled = true;
        document.querySelector("button").className = "dis";
        document.querySelector("#time").className = "time";
        document.querySelector("#autorun").className = "autorun_h";
        setTimeout(count_down, 400);
    } else {
        document.querySelector("#time").contentEditable = true;
        document.querySelector("button").disabled = false;
        document.querySelector("button").className = "";
        document.querySelector("#time").className = "";
        document.querySelector("#autorun").className = "";
        document.querySelector("#time").innerText = text;
    }
}

function count_down() {
    var now_time = new Date().getTime();
    if (stop_time - now_time >= 0) {
        var d_time = stop_time - now_time;
        var all_s = Math.round(d_time / 1000);
        var h = Math.floor(Math.floor(all_s / 60) / 60);
        var m = ((Math.floor(all_s / 60) % 60) + "").padStart(2, "0");
        var s = ((all_s % 60) + "").padStart(2, "0");
        document.querySelector("#time").innerText = `${h != "0" ? h + ":" : ""}${m}:${s}`;
        setTimeout(count_down, 100);
    } else {
        count_down_ui(false);
        full_screen(false);
    }
}
function full_screen(v) {
    ipcRenderer.send("full_screen", v);
}

document.querySelector("#autorun > input").checked = store.get("autorun") || false;
document.querySelector("#autorun > input").onclick = () => {
    store.set("autorun", document.querySelector("#autorun > input").checked);
    ipcRenderer.send("autorun", document.querySelector("#autorun > input").checked);
};
