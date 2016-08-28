const {app, BrowserWindow, ipcMain, dialog} = require('electron')

var parseTorrent = require('parse-torrent');
var fs = require('fs');
var torrent = require('torrent-stream');

let win;
let engine;

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

            engine = torrent(magnet, {path: '~/torrent_test'});

            engine.on('ready', function(){
                engine.files.forEach(function(file){
                    console.log("Downlodaing file: "+file.name);
                    var stream = file.createReadStream();
                    console.log("Streaming file: "+Object.keys(stream));
                });
            });

            engine.on('download', function(index){
                console.log("Finished downloading piece index: "+index);
            });

            engine.on('torrent', function(){
                console.log("Finished getting the metadata");
            });
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

ipcMain.on('stop_torrent', function(event, torrent_file){

});

ipcMain.on('cancel_torrent', function(event, torrent_file){
    if(engine){
        engine.destroy(function(){console.log("FInished destroying");});
    }
});

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});
