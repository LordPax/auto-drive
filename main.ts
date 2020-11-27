import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import * as path from 'path'
import * as fs from 'fs'

let win:BrowserWindow

const mainWindow = () => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : false,
        webPreferences : {
            preload : path.join(__dirname, "src/canvas.js"),
            nodeIntegration : true
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

ipcMain.on('file', (event, arg) => {
    const content:string = fs.readFileSync(arg, {encoding: 'utf8'})
    const map:number[][] = fs.existsSync(arg) ? JSON.parse(content) : [[]]

    event.reply('content-file', map)
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

Menu.setApplicationMenu(menu)