import { ipcRenderer } from 'electron'

document.addEventListener('DOMContentLoaded', () => {
    const valideBtn:HTMLElement = document.getElementById('valide')
    const closeBtn:HTMLElement = document.getElementById('close')

    const close = ():void => {
        ipcRenderer.send('close-prompt')
    }

    const valide = ():void => {
        const text:string = document.getElementById('text').innerHTML
        ipcRenderer.send('valide-prompt', text)
    }

    valideBtn.addEventListener('click', valide)
    closeBtn.addEventListener('click', close)
})