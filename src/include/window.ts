import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

export let win:BrowserWindow

export const mainWindow = () => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : true,
        webPreferences : {
            preload : path.join(__dirname, "../canvas.js"),
            nodeIntegration : true
        }
    })

    // win.webContents.openDevTools();

    win.loadFile(path.join(__dirname, "../../../view/index.html"))

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
        if (win === null) mainWindow()
    })
}

export const menu = Menu.buildFromTemplate([
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