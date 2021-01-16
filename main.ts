import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { showWindow, child, menu } from './src/include/window'
import { Wall, MapContent } from './src/include/type'
import * as path from 'path'
import * as fs from 'fs'

const { argv } = process

app.whenReady().then(() => argv[2] === 'show' 
    ? showWindow('../showCanvas.js') 
    : showWindow('../editCanvas.js')
)

Menu.setApplicationMenu(menu)