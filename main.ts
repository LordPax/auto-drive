import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { mainWindow, menu } from './src/include/window'
import { Wall, MapContent } from './src/include/until'
import * as path from 'path'
import * as fs from 'fs'

app.whenReady().then(mainWindow)
Menu.setApplicationMenu(menu)

ipcMain.on('file', (event, arg) => {
    const content:string = fs.existsSync(arg) ? fs.readFileSync(arg, {encoding: 'utf8'}) : ''
    const map:MapContent = JSON.parse(content)

    event.reply('content-file', map)
})