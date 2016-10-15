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
        var progressStyle ={
            width: (this.props.torrent.progress * 100).toString()+"%"
        };

      return (
        <li>
          <div className="collapsible-header">
            <div className="col s12">
              <div className="flow-text">
                <div className="center-align wrap-word small-flow">{this.props.torrent.name}</div>
              </div>
            </div>
            <div className="col s6">
              <i className="material-icons left">file_download</i>
              {this.props.torrent.dataRate.download}
            </div>
            <div className="col s6">
              <i className="material-icons left">file_upload</i>
              {this.props.torrent.dataRate.upload}
            </div>

          </div>
            <div className="progress">
              <div className="determinate" style={progressStyle}></div>
            </div>
          <div className="collapsible-body"><p>{this.props.torrent.state}</p></div>
        </li>
      )
    }
}

export default TorrentItem;
