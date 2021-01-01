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