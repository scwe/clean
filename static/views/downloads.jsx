'use babel';
import React from 'react';
import Sidebar from '../views/sidebar.jsx';
import TorrentTable from '../views/torrentTable.jsx';

class Downloads extends React.Component {
    loadFiles(){

    }
    cancelTorrent(){

    }
    loadFromMagnet(){

    }
    render() {
        return <div>
            <Sidebar/>
            <div className="container main">This is the downloads page</div>
                <div className="row top-buffer" id="torrent-controls">
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
                </div>
                <div className="row top-buffer" id="torrent-table">
                    <TorrentTable/>
                </div>
            </div>;
    }
}

export default Downloads;
