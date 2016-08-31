import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../views/main.jsx';
import TorrentTable from '../views/torrentTable.jsx';

window.onload = function(){
    ReactDOM.render(<TorrentTable/>, document.getElementById('torrent-table'));
}
