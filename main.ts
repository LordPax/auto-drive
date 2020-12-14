import { app, BrowserWindow, Menu, ipcMain } from 'electron'
// import { showWindow, editWindow, child, menu, promptAnswer, promptModal, win } from './src/include/window'
import { showWindow, editWindow, child, menu } from './src/include/window'
import { Wall, MapContent } from './src/include/type'
import * as path from 'path'
import * as fs from 'fs'

const { argv } = process

if (argv[2] === 'editor')
    app.whenReady().then(editWindow)
else
    app.whenReady().then(showWindow)

Menu.setApplicationMenu(menu)

// Called by the dialog box when closed

// ipcMain.on("valide-prompt", (event, data) => {
//     promptAnswer = data
// })

// Called by the application to open the prompt dialog

// ipcMain.on("prompt",  (event, notused) => {
//     promptModal(win, 'label de test', (data:any) => {
//        event.returnValue = data
//     })        
// })



// ipcMain.on('prompt', (event, arg) => {
//     child.show()
//     console.log(arg)
// })

// ipcMain.on('close-prompt', (event, arg) => {
//     child.hide()
// })

// ipcMain.on('valide-prompt', (event, arg) => {
//     console.log(arg)
// })

// ipcMain.on('file', (event, arg) => {
//     const content:string = fs.existsSync(arg) ? fs.readFileSync(arg, {encoding: 'utf8'}) : ''
//     const map:MapContent = JSON.parse(content)

//     event.reply('content-file', map)
// })

// ipcRenderer.send('name-file', 'save/map/test_map2.json')