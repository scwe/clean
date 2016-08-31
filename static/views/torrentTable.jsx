'use babel';

import React from 'react';
import TorrentItem from './torrentItem.jsx';

export default class TorrentTable extends React.Component {
    render() {
        return <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
                <TorrentItem/>
                <TorrentItem/>
            </tbody>
        </table>;
        /*return
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Progress</th>
                    <th>Download Speed</th>
                    <th>Upload Speed</th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody id="torrent-table">
            </tbody>
        </table>*/
    }
}
