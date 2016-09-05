'use babel';
import React from 'react';

const {ipcRenderer} = require('electron');

class TorrentButtons extends React.Component {

    loadFiles(){
        ipcRenderer.send('add_torrent_files');
    }
    cancelTorrent(){

    }
    loadFromMagnet(){

    }

    render() {
        return <div>
        <div className="col-lg-3 offset-lg-1">
            <button type="button" className="btn btn-default pull-right" onClick={this.loadFiles.bind(this)}>
                Open File
            </button>
        </div>
        <div className="col-lg-3">
            <button type="button" className="btn btn-default centered-col" onClick={this.cancelTorrent.bind(this)}>
                Cancel Download
            </button>
        </div>
        <div className="col-lg-3">
            <button type="button" className="btn btn-default pull-left" onClick={this.loadFromMagnet.bind(this)}>
                <i className="fa fa-magnet" aria-hidden="true"></i> Magnet URL
                </button>
            </div>
        </div>;
    }
}

export default TorrentButtons;
