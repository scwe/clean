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
        var old = <tr><td>{this.props.torrent.name}</td>
            <td>{this.props.torrent.size}</td>
            <td><progress className="progress progress-success" value={this.props.torrent.progress} max="100"></progress></td>
            <td>{this.props.torrent.dataRate.download}</td>
            <td>{this.props.torrent.dataRate.upload}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group" aria-label="Toolbar with button groups">
                    <a id="button_play" className="btn waves-effect" onClick={this.playPressed.bind(this)}>
                        <i className="material-icons">play_arrow</i>
                    </a>

                    <a id="button_stop" className="btn waves-effect" onClick={this.stopPressed.bind(this)}>
                        <i className="material-icons">stop</i>
                    </a>
                </div>
            </td></tr>;

            var old2 = <li>
                    <div className="collapsible-header"><i className="material-icons">file_download</i>{this.props.torrent.name}</div>
                    <div className="collapsible-body"><p>{JSON.stringify(this.props.torrent)}</p></div>
                </li>;

        return old2;
    }
}

export default TorrentItem;
