var StateMachine = require('javascript-state-machine');
var stream = require('torrent-stream');

var Torrent = function(magnet, path){
    //This is the constructor, fields go here
    this._engine = null;
    this._magnet = magnet;
    console.log("Creating the torrent state is: "+state+" with curernt :"+state.current);
}

Torrent.prototype = {
    log: function(name, event, from, to){
        console.log(name+" of the torrent "+this._magnet+" : "+event+" "+from+" "+to);
    },
    onenterrestore: function(event, from, to){
        this.log("Restore", event, from, to);
    },
    onentersetup: function(event, from, to){
        this.log("Setup", event, from, to);
        this._engine = stream(this._magnet);

        this._engine.on('ready', this.ready.bind(this));
    },
    onenterready: function(event, from, to){
        this.log("Ready", event, from, to);

        this._engine.files.forEach(function(file) {
            console.log('Starting download of file:', file.name);
            var stream = file.createReadStream();
            // stream is readable stream to containing the file content
        });

    },
    onenterdownload: function(event, from, to){
        this.log("Download", event, from, to);
    },
    onenterpause: function(event, from, to){
        this.log("Pause", event, from, to);
    },
    onenterdelete: function(event, from, to){
        this.log("Delete", event, from, to);
        this._engine.destroy(function(){
            console.log("Torrent successfully cancelled");
        })
    },
    onentercomplete: function(event, from, to){
        this.log("Complete", event, from, to);
    },
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
