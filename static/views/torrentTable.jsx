'use babel';

import React from 'react';
//import TorrentItem from './torrentItem.jsx';

    //<TorrentItem/>
    //<TorrentItem/>
class TorrentTable extends React.Component {
    render() {
        return <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>;
    }
}

export default TorrentTable;
