'use babel';

import React from 'react';
import TorrentItem from './torrentItem.jsx';

const {ipcRenderer} = require('electron');

    //
class TorrentTable extends React.Component {
    constructor(props){
        super(props);
        ipcRenderer.on('update_view', this.updateView.bind(this));

        this.state = {
            torrents : []
        };
    }

    updateTorrent(current, attributes){
        for(var i in current){
            if(current[i].id === attributes.id){
                current[i] = attributes;
                return current;
            }
        }
        current.push(attributes);
        return current;
    }

    updateView(event, attributes){
        this.setState({torrents: this.updateTorrent(this.state.torrents, attributes)});
    }

    render() {
        var torrentItems = this.state.torrents.map(function(torrent){
            return (
                <TorrentItem torrent={torrent} key={torrent.id}/>
            );
        });
        return <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Progress</th>
                    <th>Download Speed</th>
                    <th>Upload Speed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {torrentItems}
            </tbody>
        </table>;
    }
}

export default TorrentTable;
