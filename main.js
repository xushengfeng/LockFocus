// Modules to control application life and create native browser window
const { app, Menu, Tray, BrowserWindow, ipcMain } = require("electron");
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

    tray = new Tray(`${run_path}/assets/icons/64x64.png`);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "教程帮助",
            click: () => {
                create_help_window();
            },
        },
        {
            type: "separator",
        },
        {
            label: "退出",
            click: () => {
                app.quit();
            },
        },
    ]);
    tray.setContextMenu(contextMenu);

    var window;
    main_win();
    function main_win() {
        window = new BrowserWindow({
            icon: path.join(run_path, "assets/icons/1024x1024.png"),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
            },
        });

        window.loadFile("index.html");
        if (dev) window.webContents.openDevTools();

        const template = [];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        window.on("close", () => {
            main_win();
        });
    }
    ipcMain.on("full_screen", (event, v) => {
        if (v) {
            window.setAlwaysOnTop(true, "screen-saver");
            window.setFullScreen(true);
        } else {
            window.setAlwaysOnTop(false);
            window.setFullScreen(false);
        }
    });
    new BrowserWindow({
        show: false,
    });
});

app.on("will-quit", () => {});
