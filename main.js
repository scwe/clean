const {app, BrowserWindow, ipcMain, dialog} = require('electron')

var fs = require('fs');
var TorrentManager = require('./scripts/torrentManager');
var Settings = require('./scripts/settings');

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 1000,  //This is just for the moment, ideally we would have a small mode that looks good too
        frame: false,
        webPreferences: {
            webgl: false,
            webaudio: false
        }
    });

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
                    var res = TorrentManager.loadTorrent(filenames[key]);
                    console.log("Got the torrent, about to send it: "+res);
                    event.sender.send('torrent_added', res);
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
    if(win === null){
        createWindow();
    }
});
