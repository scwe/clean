'use babel';

import React from 'react';
import TorrentItem from './torrentItem.jsx';

class TorrentTable extends React.Component {

    render() {
        var torrentItems = this.props.torrents.map(function(torrent){
            return (
                <TorrentItem torrent={torrent} key={torrent.id}/>
            );
        });
        return <ul className="collapsible popout" data-collapsible="expandable">{torrentItems}</ul>;
    }
}

export default TorrentTable;
