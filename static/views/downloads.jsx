'use babel';
import React from 'react';
import Sidebar from '../views/sidebar.jsx';
import TorrentTable from '../views/torrentTable.jsx';
import TorrentButtons from '../views/torrentButtons.jsx';


class Downloads extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col s12 m4 l3">
                    <div className="container">
                        <Sidebar/>
                    </div>
                </div>
                <div className="col s12 m8 l9">
                    <div className="container">
                        <div>
                            <TorrentButtons/>
                        </div>
                        <div className="row top-buffer" id="torrent-table">
                            <TorrentTable/>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Downloads;
