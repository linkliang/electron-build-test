const electron = require('electron')
const os = require('os')
const {autoUpdater} = require("electron-updater")
const appVersion = require('../package.json').version

let initialized = false
const platform = `${os.platform()}_${os.arch()}`

function init(mainWindow) {
  mainWindow.webContents.send('console', `App version: ${appVersion}`)
  mainWindow.webContents.send('message', { msg: `🖥 App version: ${appVersion}` })

  if (initialized || process.env.NODE_ENV === 'development') { return }

  initialized = true

  autoUpdater.on('error', (ev, err) => {
    mainWindow.webContents.send('message', { msg: `😱 Error: ${err}` })
  })

  autoUpdater.once('checking-for-update', (ev, err) => {
    mainWindow.webContents.send('message', { msg: '🔎 Checking for updates' })
  })

  autoUpdater.once('update-available', (ev, err) => {
    mainWindow.webContents.send('message', { msg: '🎉 Update available. Downloading ⌛️', hide: false })
  })

  autoUpdater.once('update-not-available', (ev, err) => {
    mainWindow.webContents.send('message', { msg: '👎 Update not available' })
  })

  autoUpdater.once('update-downloaded', (ev, err) => {
    const msg = '<p style="margin: 0;">🤘 Update downloaded - <a onclick="quitAndInstall()">Restart</a></p>'
    mainWindow.webContents.send('message', { msg, hide: false, replaceAll: true })
  })

  autoUpdater.checkForUpdates()
}

module.exports = {
  init
}