// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow, Tray} = require('electron')
const {autoUpdater} = require("electron-updater")
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/files.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createVersionWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/version.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

let tray
// Tray icon&Menu
function createTray(){
  const iconPath = path.join(__dirname, 'images/tray.png')
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Filesync', click: () => {
      createWindow()
    }},
    { label: 'Check for Updates'},
    { label: 'Preferences'},
    { label: 'Version', click: () =>{
      createVersionWindow()
    }},
    { label: 'Quit', click: () => {
      app.quit()
    }}
  ])
  tray.setToolTip('Lean')
  tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createTray()
  autoUpdater.checkForUpdates()
})
app.on('window-all-closed', () => {
})
/*
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
*/

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
