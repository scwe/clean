const {app, BrowserWindow, ipcMain, dialog} = require('electron')

var parseTorrent = require('parse-torrent');
var fs = require('fs');
var torrent = require('torrent-stream');

let win;

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

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

function loadTorrents(filenames){

    if(filenames){
        console.log("Woohoo we got this far: "+filenames);
        for(var key in filenames){
            var tFile = parseTorrent(fs.readFileSync(filenames[key]));
            var magnet = parseTorrent.toMagnetURI(tFile);
            console.log(magnet);
        }
    }
}

ipcMain.on('add_torrent_files', function(event){
    console.log("Recieved the event, trying to open dialog");
    var torrents = dialog.showOpenDialog({
        title: 'Open Torrent', 
        filters: [{name: "torrent", extensions: ["torrent"]}],
        properties: ['openFile', 'multiSelections']}, loadTorrents);
});

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});
