'use babel';

import React from 'react';

class TorrentItem extends React.Component {

    constructor(props){
        super(props);
    }

    getState(){
        if(this.state === 'undefined'){
            this.state = 'stop';
        }
        return this.state;
    }

    setState(newState){
        this.state = newState;
    }

    playPressed(event){
        if(this.getState() === 'stop'){
            this.setState('play');
        }else if(this.getState() === 'resume'){
            this.setState('play');
        }else if(this.getState() === 'play'){
            this.setState('resume');
        }
    }

    stopPressed(event){
        this.setState('stop');
    }

    render() {
        return <li>
                <div className="collapsible-header"><i className="material-icons">file_download</i>{this.props.torrent.name}</div>
                <div className="collapsible-body"><p>{this.props.torrent.state}</p></div>
            </li>;
    }
}

export default TorrentItem;
