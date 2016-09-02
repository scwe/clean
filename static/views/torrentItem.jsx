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
            $('#button_play > i')
                .removeClass('fa-play')
                .addClass('fa-pause')
                .css('color', 'green');

        }else if(this.getState() === 'resume'){
            this.setState('play');
            $('#button_play > i')
                .removeClass('fa-play')
                .addClass('fa-pause')
                .css('color', 'green');

        }else if(this.getState() === 'play'){
            this.setState('resume');
            $('#button_play > i')
                .removeClass('fa-pause')
                .addClass('fa-play')
                .css('color', 'green');
        }
    }

    stopPressed(event){
        this.setState('stop');
        $("#button_play > i")
            .removeClass('fa-pause')
            .addClass('fa-play').
            css('color', 'black');
    }

    render() {
        return <tr><td>{this.props.torrent.name}</td>
            <td>{this.props.torrent.size}</td>
            <td><progress className="progress progress-success" value="25" max="100">{this.props.torrent.progress}</progress></td>
            <td>{this.props.torrent.dataRate.download}</td>
            <td>{this.props.torrent.dataRate.upload}</td>
            <td>
                <div className="btn-group btn-group-sm" role="group" aria-label="Toolbar with button groups">
                    <button type="button" id="button_play" className="btn" onClick={this.playPressed.bind(this)}>
                        <i className="fa fa-play" id="button_play_logo"></i>
                    </button>

                    <button type="button" id="button_stop" className="btn" onClick={this.stopPressed.bind(this)}>
                        <i className="fa fa-stop" id="button_stop_logo"></i>
                    </button>
                </div>
            </td></tr>;
    }
}

export default TorrentItem;
