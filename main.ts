import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

let win:BrowserWindow

const mainWindow = () => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : false,
        webPreferences : {
            preload : path.join(__dirname, "src/canvas.js"),
            nodeIntegration : false
        }
    })

    // win.webContents.openDevTools();

    win.loadFile(path.join(__dirname, "../view/index.html"))
}

app.whenReady().then(mainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (win === null) mainWindow()
})

const menu:Menu = Menu.buildFromTemplate([
    {
        label : 'Partie',
        submenu : [
            {
                label : 'Recharger',
                click : () => win.reload()
            }
        ]
    },
    {
        label : "Test",
        click : () => console.log('je suis un test')
    }
])

// Menu.setApplicationMenu(menu)