const {app, BrowserWindow, ipcMain, dialog} = require('electron')

var TorrentManager = require('./torrent-manager')
var Settings = require('./settings')
var ElectronWindow = require('./electron-window')

function cleanUp () {
  app.quit()
}

function createWindow () {
  if (process.argv.length > 2 && (process.argv[2] === '--torrent' || process.argv[2] === '-t')) {
    console.log('Running in torrent test mode')
    if (process.argv.length > 3) {
      var filename = process.argv[3]
      TorrentManager.testTorrent(filename, cleanUp)
    } else {
      var files = getTorrentFile(false)
      if (files) {
        for (var k in files) {
          TorrentManager.testTorrent(files[k], cleanUp)
        }
      }
    }
    return
  }
  var win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,  // This is just for the moment, ideally we would have a small mode that looks good too
    frame: false,
    webPreferences: {
      webgl: false,
      webaudio: false
    }
  })

  ElectronWindow.setWindow(win)

  win.loadURL(`file://${__dirname}/static/index.html`)
  win.webContents.openDevTools()
}

function getTorrentFile (multi) {
  var props = ['openFile']
  if (multi) {
    props.push('multiSelections')
  }
  return dialog.showOpenDialog({
    title: 'Open Torrent',
    filters: [{name: 'torrent', extensions: ['torrent']}],
    properties: props})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    // We don't quit the app on mac, because it is more common for the top bar
    // to stay active
  TorrentManager.cancelTorrents()
  Settings.saveSettings()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('add_torrent_files', function (event) {
  var files = getTorrentFile(true)
  if (files) {
    for (var k in files) {
      TorrentManager.loadTorrent(files[k])
    }
  }
})

ipcMain.on('window-closed', function (event) {
  ElectronWindow.getWindow().close()
})

ipcMain.on('stop_torrent', function (event, id) {
  // torrent.stopTorrent(id)
})

ipcMain.on('cancel_torrent', function (event, id) {
  // torrent.cancelTorrent(id)
})

app.on('activate', () => {
  if (ElectronWindow.getWindow() === null) {
    createWindow()
  }
})
