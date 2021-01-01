import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

export let win:BrowserWindow
export let child:BrowserWindow
export let promptAnswer:any

export const showWindow = () => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : true,
        webPreferences : {
            preload : path.join(__dirname, "../showCanvas.js"),
            nodeIntegration : true
        }
    })

    win.loadFile(path.join(__dirname, "../../../view/index.html"))

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
        if (win === null) showWindow()
    })
}

export const editWindow = () => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : true,
        webPreferences : {
            preload : path.join(__dirname, "../editCanvas.js"),
            nodeIntegration : false
        }
    })

    win.loadFile(path.join(__dirname, "../../../view/index.html"))

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
        if (win === null) editWindow()
    })
}

// export const menu = Menu.buildFromTemplate([
//     {
//         label : 'Partie',
//         submenu : [
//             {
//                 label : 'Recharger',
//                 click : () => win.reload()
//             },
//             {
//                 label : "debug",
//                 click : () => win.webContents.openDevTools()
//             }
//         ]
//     }
// ])

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

