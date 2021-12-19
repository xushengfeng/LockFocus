// Modules to control application life and create native browser window
const {
    app,
    Tray,
    Menu,
    clipboard,
    globalShortcut,
    desktopCapturer,
    BrowserWindow,
    ipcMain,
    dialog,
    Notification,
    net,
    shell,
} = require("electron");
var robot = require("robotjs");
const Store = require("electron-store");
var screen = require("electron").screen;
const path = require("path");
run_path = path.resolve(__dirname, "");

// 自动开启开发者模式
if (app.isPackaged || process.argv.includes("-n")) {
    dev = false;
} else {
    dev = true;
}

const isFirstInstance = app.requestSingleInstanceLock();
if (!isFirstInstance) {
    app.quit();
} else {
    app.on("second-instance", (event, commanLine, workingDirectory) => {
    });
}

app.whenReady().then(() => {
    // 初始化设置
    Store.initRenderer();
    store = new Store();

});

app.on("will-quit", () => {
});