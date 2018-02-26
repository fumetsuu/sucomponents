const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path')

require('electron-debug')()

require('electron-reload')(path.join(__dirname, '/app/build/'))

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({ frame: false, width: 800, height: 600, backgroundColor: '#1a1a1e', show: false })
    mainWindow.setTitle('SuComponents')
    mainWindow.setMenu(null)
    mainWindow.loadURL('file://'+__dirname+'/app/index.html')
    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})