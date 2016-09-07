'use babel';
import React from 'react';
import Sidebar from '../views/sidebar.jsx';
import TorrentTable from '../views/torrentTable.jsx';

const {ipcRenderer} = require('electron');

class Downloads extends React.Component {
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
        var res = null;
        if(this.state.torrents.length === 0){
            res = <div className="row">
                <div className="container">
                    <p className="flow-text center-align">But there were no torrents</p>
                </div>
            </div>;
        }else{
            res = <div className="row">
                <div className="unpadding col s12 m4 l3">
                    <Sidebar/>
                </div>
                <div className="col s12 m8 l9">
                    <div className="container">
                        <TorrentTable torrents={this.state.torrents}/>
                    </div>
                </div>
            </div>
        }
        return res;
    }
}

export default Downloads;
