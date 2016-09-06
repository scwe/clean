'use babel';
import React from 'react';
import Sidebar from '../views/sidebar.jsx';
import TorrentTable from '../views/torrentTable.jsx';


class Downloads extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="unpadding col s12 m4 l3">
                    <Sidebar/>
                </div>
                <div className="col s12 m8 l9">
                    <div className="container">
                        <TorrentTable/>
                    </div>
                </div>
            </div>);
    }
}

export default Downloads;
