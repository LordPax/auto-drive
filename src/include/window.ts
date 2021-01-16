import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

export let win:BrowserWindow
export let child:BrowserWindow
export let promptAnswer:any

export const showWindow = (script:string) => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : true,
        webPreferences : {
            preload : path.join(__dirname, script),
            nodeIntegration : true
        }
    })

    win.loadFile(path.join(__dirname, "../../../view/index.html"))

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
        if (win === null) showWindow(script)
    })
}

export const menu = Menu.buildFromTemplate([    
    {
        label : 'Recharger',
        click : () => win.reload()
    },
    {
        label : "debug",
        click : () => win.webContents.openDevTools()
    }
])

