var StateMachine = require('javascript-state-machine');
var stream = require('torrent-stream');
var ElectronWindow = require('./electron-window');
var shortId = require('shortid');

var UPDATE_INTERVAL = 5000;
const FILE_SIZES = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
var logging = false;

var Torrent = function(magnet, path){
    //This is the constructor, fields go here
    this._engine = null;
    this._magnet = magnet;
    this._name = null;
    this._size = 0;
    this._path = path;
    this._updateInterval = null;
    this._id = null;
    this._lastSwarm = null;
    this._dataRate = {download: 0, upload: 0};

    this.startup();
}

Torrent.prototype = {
    log: function(name, event, from, to){
        if(logging){
            console.log(name+" of the torrent "+this._name+" : "+event+" "+from+" "+to+" current is now: "+this.current);
        }
    },
    onstartup: function(event, from, to){
        this.log("Startup", event, from, to);
    },
    onenterrestore: function(event, from, to){
        this.log("Restore", event, from, to);
    },
    onentersetup: function(event, from, to){
        this.log("Setup", event, from, to);

        this._engine = stream(this._magnet);
        this._id = shortId.generate();

        this._engine.on('ready', this.ready.bind(this));
    },
    onenterready: function(event, from, to){
        this.log("Ready", event, from, to);

        this._name = this._engine.torrent.name;
        console.log("Name is: "+this._name);
        this._size = this._engine.torrent.length;

        this._engine.files.forEach(function(file) {
            var stream = file.createReadStream();
        });

        this._updateView();
        this.download();

    },
    onenterdownload: function(event, from, to){
        this.log("Download", event, from, to);
        this._createUpdateInterval();
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
        ElectronWindow.getWindow().webContents.send('update_view', this.getAttributes());
    },
    _createUpdateInterval: function(){
        if(!this._updateInterval){
            this._updateInterval = setInterval(this._updateView.bind(this), 1000);
        }
    },
    _clearInterval: function(){
        if(this._updateInterval){
            clearInterval(this._updateInterval);
        }
    },
    getProgress: function(){
        return this._engine.swarm.downloaded / this._size;
    },
    getTotalDownloaded: function(){
        return this._engine.swarm.downloaded;
    },
    getTotalUploaded: function(){
        return this._engine.swarm.uploaded;
    },
    getDataRate: function(){
        if (this._lastSwarm) {
            this._dataRate = {
                download: (this._engine.swarm.downloaded - this._lastSwarm.downloaded) /
                (UPDATE_INTERVAL / 1000),
                upload: (this._engine.swarm.uploaded - this._lastSwarm.uploaded) /
                (UPDATE_INTERVAL / 1000)
            };
        }

        this._lastSwarm = {
            downloaded: this._engine.swarm.downloaded,
            uploaded: this._engine.swarm.uploaded,
        };
        return this._dataRate;
    },
    getPeers: function(){
        return this._engine.swarm._peers.length;
    },
    convertDataRate: function(value){
        if(!value){
            value = 0;
        }
        var count = 0;
        while(value > 1000){
            value = value / 1000;
            count++;
        }
        return value.toPrecision(3).toString()+FILE_SIZES[count];
    },
    getAttributes: function(){
        var dr = this.getDataRate();
        return {
            magnet: this._magnet,
            name: this._name,
            size: this.convertDataRate(this._size),
            path: this._path,
            dataRate : {
                download: this.convertDataRate(dr.download) + "/s",
                upload: this.convertDataRate(dr.upload) + "/s"
            },
            progress: this.getProgress(),
            totalDown : this.convertDataRate(this.getTotalDownloaded()),
            totalUp : this.convertDataRate(this.getTotalUploaded()),
            peers: this.getPeers(),
            id: this._id,
            state: this.current
        };
    }
};

StateMachine.create({
    target : Torrent.prototype,
    events : [
        {name: "startup", from: "none", to: "startup"},
        {name: "restore", from: "startup", to: "restore"},
        {name: "setup", from: ["restore", "startup"], to: "setup"},
        {name: "ready", from: "setup", to: "ready"},
        {name: "download", from: ["pause", "ready"], to: "download"},
        {name: "pause", from: "download", to: "pause"},
        {name: "delete", from: ["download", "ready"], to: "none"},
        {name: "complete", from: "download", to: "complete"}
    ]
})


module.exports = Torrent;
