const {app, BrowserWindow, ipcMain, dialog} = require('electron')

var fs = require('fs');
var TorrentManager = require('./scripts/torrent-manager');
var Settings = require('./scripts/settings');
var ElectronWindow = require('./scripts/electron-window');

function createWindow(){
    var win = new BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 1000,  //This is just for the moment, ideally we would have a small mode that looks good too
        frame: false,
        webPreferences: {
            webgl: false,
            webaudio: false
        }
    });

    ElectronWindow.setWindow(win);

    win.loadURL(`file://${__dirname}/static/index.html`);
    win.webContents.openDevTools();
    Settings.saveSettings();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    //We don't quit the app on mac, because it is more common for the top bar
    //to stay active
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

ipcMain.on('add_torrent_files', function(event){
    var torrents = dialog.showOpenDialog({
        title: 'Open Torrent',
        filters: [{name: "torrent", extensions: ["torrent"]}],
        properties: ['openFile', 'multiSelections']}, function(filenames){
            if(filenames){
                for(var key in filenames){
                    TorrentManager.loadTorrent(filenames[key]);
                }
            }
        });
});

ipcMain.on('stop_torrent', function(event, id){
    torrent.stopTorrent(id);
});

ipcMain.on('cancel_torrent', function(event, id){
    torrent.cancelTorrent(id);
});

app.on('activate', () => {
    if(ElectronWindow.getWindow() === null){
        createWindow();
    }
});
