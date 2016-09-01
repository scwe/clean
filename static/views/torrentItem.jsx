'use babel';

import React from 'react';

class TorrentItem extends React.Component {

    constructor(props){
        super(props);
        this.state = 'stop';
    }

    playPressed(event){
        if(this.state === 'stop'){
            this.state = 'play';
            $('#button_play > i')
                .removeClass('fa-play')
                .addClass('fa-pause')
                .css('color', 'green');

        }else if(this.state === 'resume'){
            this.state = 'play';
            $('#button_play > i')
                .removeClass('fa-play')
                .addClass('fa-pause')
                .css('color', 'green');

        }else if(this.state === 'play'){
            this.state = 'resume';
            $('#button_play > i')
                .removeClass('fa-pause')
                .addClass('fa-play')
                .css('color', 'green');
        }
    }

    stopPressed(event){
        this.state = 'stop';
        $("#button_play > i")
            .removeClass('fa-pause')
            .addClass('fa-play').
            css('color', 'black');
    }

    render() {
        return <tr><td>This is a test torrent</td>
            <td>5.63GB</td>
            <td><progress className="progress progress-success" value="25" max="100">25%</progress></td>
            <td>1.00MB/s</td>
            <td>53KB/s</td>
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
