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

    render(){
        return (
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red" onClick={this.loadFiles.bind(this)}>
                    <i className="large material-icons md-36">add</i>
                </a>
                <ul>
                    <li><a className="btn-floating yellow darken-1" onClick={this.cancelTorrent.bind(this)}><i className="material-icons">cancel</i></a></li>
                    <li><a className="btn-floating blue" onClick={this.loadFiles.bind(this)}><i className="material-icons">insert_drive_file</i></a></li>
                    <li><a className="btn-floating green" onClick={this.loadFromMagnet.bind(this)}><i className="fa fa-magnet"></i></a></li>
                </ul>
            </div>
        );
    }
}

export default TorrentButtons;
