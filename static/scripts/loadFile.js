const { ipcRenderer } = require('electron')

function loadFiles(){
    console.log("Trying to load files");
    ipcRenderer.send('add_torrent_files');
}

function loadFromMagnet(){
    console.log("UNIMPLEMENTED");
    ipcRenderer.send('add_torrent_from_magnet');
}

function cancelTorrent(){
    console.log("Canceling the torrent");
    ipcRenderer.send('cancel_torrent', undefined);
}
