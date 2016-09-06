'use babel';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import NavItem from './navitem.jsx';
import TorrentButtons from './torrentButtons.jsx';

const {app} = require('electron').remote;


class Navbar extends React.Component {
    quitClicked(){
        app.quit();
    }
    render() {
        return <div>
            <div className="navbar-fixed">
                <nav className="drag">
                    <div className="nav-wrapper blue-grey">
                        <div className="brand-logo" id="title">.clean</div>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons no-drag">menu</i></a>
                        <ul className="right hide-on-med-and-down no-drag">
                            <NavItem index={true} to="/">Downloads</NavItem>
                            <NavItem to="/stats">Stats</NavItem>
                            <NavItem to="/watch">Watch</NavItem>
                            <NavItem to="/settings">Settings</NavItem>
                            <li><a onClick={this.quitClicked.bind(this)}>Quit</a></li>
                        </ul>
                        <ul className="side-nav no-drag" id="mobile-demo">
                            <NavItem index={true} to="/">Downloads</NavItem>
                            <NavItem to="/stats">Stats</NavItem>
                            <NavItem to="/watch">Watch</NavItem>
                            <NavItem to="/settings">Settings</NavItem>
                            <li><a onClick={this.quitClicked.bind(this)}>Quit</a></li>
                        </ul>
                    </div>
                </nav>

            </div>
            <TorrentButtons/>
            {this.props.children}
        </div>;
    }
}

export default Navbar;