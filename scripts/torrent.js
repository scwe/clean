var StateMachine = require('javascript-state-machine');
var stream = require('torrent-stream');
var ElectronWindow = require('./electron-window');

var UPDATE_INTERVAL = 1000;
var logging = false;

var Torrent = function(magnet, path){
    //This is the constructor, fields go here
    this._engine = null;
    this._magnet = magnet;
    this._name = null;
    this._size = 0;
    this._path = path;
    this._updateInterval = null;
}

Torrent.prototype = {
    log: function(name, event, from, to){
        if(logging){
            console.log(name+" of the torrent "+this._magnet+" : "+event+" "+from+" "+to);
        }
    },
    onenterrestore: function(event, from, to){
        this.log("Restore", event, from, to);
    },
    onentersetup: function(event, from, to){
        this.log("Setup", event, from, to);
        this._engine = stream(this._magnet);

        this._engine.on('ready', this.ready.bind(this));
        this._updateView();
    },
    onenterready: function(event, from, to){
        this.log("Ready", event, from, to);

        this._engine.files.forEach(function(file) {
            var stream = file.createReadStream();
        });
        this.download();

    },
    onenterdownload: function(event, from, to){
        this.log("Download", event, from, to);
    },
    onenterpause: function(event, from, to){
        this.log("Pause", event, from, to);
    },
    onenterdelete: function(event, from, to, deleteFiles){
        this.log("Delete", event, from, to);
        if(deleteFiles){
            this._engine.remove(function(){
                this._engine.destroy(function(){
                    console.log("Torrent successfully cancelled");
                });
                console.log("Successfully deleted torrent files");
            });

            return;
        }
        this._engine.destroy(function(){
            console.log("Torrent successfully cancelled");
        })
    },
    onentercomplete: function(event, from, to){
        this.log("Complete", event, from, to);
    },
    _updateView: function(){
        console.log("Updating the view");
        ElectronWindow.getWindow().webContents.send('update_view', this.getAttributes());
    },
    _createUpdateInterval: function(){
        if(!this._updateInterval){
            this._updateInterval = setInterval(this.updateView.bind(this), 1000);
        }
    },
    _clearInterval: function(){
        if(this._updateInterval){
            clearInterval(this._updateInterval);
        }
    },
    getProgress: function(){
        return 0.1;
    },
    getDownSpeed: function(){
        return 1000;
    },
    getUpspeed: function(){
        return 1000;
    },
    getPeers: function(){
        return 5;
    },
    getAttributes: function(){
        return {
            magnet: this._magnet,
            name: this._name,
            size: this._size,
            path: this._path,
            progress: this.getProgress(),
            downSpeed: this.getDownSpeed(),
            upSpeed: this.getUpspeed(),
            peers: this.getPeers()
        };
    }
};

var state = StateMachine.create({
    target : Torrent.prototype,
    events : [
        {name: "restore", from: "none", to: "restore"},
        {name: "setup", from: ["restore", "none"], to: "setup"},
        {name: "ready", from: "setup", to: "ready"},
        {name: "download", from: ["pause", "ready"], to: "download"},
        {name: "pause", from: "download", to: "pause"},
        {name: "delete", from: ["download", "ready"], to: "none"},
        {name: "complete", from: "download", to: "complete"}
    ]
})


module.exports = Torrent;
