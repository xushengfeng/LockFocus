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
const Store = require("electron-store");
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
    app.on("second-instance", (event, commanLine, workingDirectory) => {});
}

app.whenReady().then(() => {
    // 初始化设置
    Store.initRenderer();
    store = new Store();

    const window = new BrowserWindow({
        icon: path.join(run_path, "assets/icons/1024x1024.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    window.loadFile("index.html");

    ipcMain.on("full_screen", (event, v) => {
        if (v) {
            window.setAlwaysOnTop(true, "screen-saver");
            window.setFullScreen(true);
        } else {
            window.setAlwaysOnTop(false);
            window.setFullScreen(false);
        }
    });
});

app.on("will-quit", () => {});
