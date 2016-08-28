const {app, BrowserWindow} = require('electron')
const Bencoding = require('bencoding')

let win

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

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});
