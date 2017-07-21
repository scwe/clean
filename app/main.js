import path from 'path'
import url from 'url'
import electron, {app, crashReporter, BrowserWindow, Menu, ipcMain, dialog} from 'electron'
import TorrentManager from './torrent-manager'
import Settings from './settings'
import ElectronWindow from './electron-window'
import { configureAppStore }  from './store'
import { testAction } from './ducks/test.duck'

// Build The redux store
const isDevelopment = (process.env.NODE_ENV === 'development');

let mainWindow = null;
let forceQuit = false;

const store = configureAppStore()

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'Scott Weston',
  companyName: 'weston.scot@gmail.com',
  submitURL: 'https://www.github.com/scwe/clean/issues',
  uploadToServer: false
})

function cleanUp () {
  app.quit()
}

app.on('window-all-closed', () => {
  TorrentManager.cancelTorrents()
  Settings.saveSettings()

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

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

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1600,
    minWidth: 1000,  // This is just for the moment, ideally we would have a small mode that looks good too
    frame: false,
    show: false,
    title: 'clean',
    webPreferences: {
      webgl: false,
      webaudio: false
    }
  })

  ElectronWindow.setWindow(mainWindow)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault()
          mainWindow.hide()
        }
      })

      app.on('activate', () => {
        mainWindow.show()
      })

      app.on('before-quit', () => {
        forceQuit = true
      })
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null
      })
    }
  })

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools()

    // add inspect element on right click menu
    addRightClickInspection(mainWindow)
  }
})

function addRightClickInspection (win) {
  if (isDevelopment) {
    // add inspect element on right click menu
    win.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          win.inspectElement(props.x, props.y)
        }
      }]).popup(win)
    })
  }
}



function getTorrentFile (multi) {
  const props = ['openFile']
  if (multi) {
    props.push('multiSelections')
  }
  return dialog.showOpenDialog({
    title: 'Open Torrent',
    filters: [{name: 'torrent', extensions: ['torrent']}],
    properties: props})
}

ipcMain.on('add_torrent_files', (event) => {
  const files = getTorrentFile(true)
  if (files) {
    for (var k in files) {
      TorrentManager.loadTorrent(files[k])
    }
  }
})

ipcMain.on('window-closed', (event) => {
  ElectronWindow.getWindow().close()
})

ipcMain.on('stop_torrent', (event, id) => {
  // torrent.stopTorrent(id)
})

ipcMain.on('cancel_all_torrents', (event) => {
  // torrent.cancelTorrent(id)
  store.dispatch(testAction('something'))
})

ipcMain.on('download_location_set_location', (event, id) => {
  const folder = dialog.showOpenDialog({
    title: 'Select Download Location Folder',
    properties: ['openDirectory']
  })

  event.sender.send('download_location_confirm', folder)
})

process.on('message', (message) => {
  console.log('We recieved a message: ', message)
})


ipcMain.on('open_magnet_prompt', (event, id) => {
  let magnetPrompt = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    resizable: isDevelopment,
    title: 'Open Magnet URL',
    height: 140,
    width: 600
  })

  magnetPrompt.setMenu(null)
  addRightClickInspection(magnetPrompt)


  magnetPrompt.loadURL(url.format({
    pathname: path.join(__dirname, 'magnet.html'),
    protocol: 'file:',
    slashes: true
  }))

  magnetPrompt.once('ready-to-show', () => {
    magnetPrompt.show()
  })

  ipcMain.once('magnet_submit', (event, magnetUrl) => {
    console.log('URL is: ', magnetUrl)
    TorrentManager.addFromMagnet(magnetUrl)
    magnetPrompt.close()
  })

  ipcMain.once('magnet_close', (event) => {
    magnetPrompt.close()
  })
})


app.on('activate', () => {
  if (ElectronWindow.getWindow() === null) {
    createWindow()
  }
})
