'use babel';
import React from 'react';
import {Link} from 'react-router';

const {electronApp} = require('electron').remote;


class App extends React.Component {
    quitClicked(){
        electronApp.quit();
    }
    titleClicked(){
        return false;
    }
    render() {
        return <div>
        <nav className="navbar navbar-dark navbar-fixed-top bg-inverse">
            <div className="navbar-brand" id="title-text" href="" onClick={this.titleClicked.bind(this)}>.clean</div>
            <div id="navbar">
                <nav className="nav navbar-nav pull-xs-right">
                    <Link className="nav-item nav-link" to="/downloads" activeClassName="active">Downloads</Link>
                    <Link className="nav-item nav-link" to="/stats" activeClassName="active">Stats</Link>
                    <Link className="nav-item nav-link" to="/watch" activeClassName="active">Watch</Link>
                    <Link className="nav-item nav-link" to="/settings" activeClassName="active">Settings</Link>
                    <a className="nav-item nav-link" onClick={this.quitClicked.bind(this)}>Quit</a>
                </nav>
            </div>
        </nav>
        {this.props.children}
        </div>
    }
}

export default App;
