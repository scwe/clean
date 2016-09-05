'use babel';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import NavItem from './navitem.jsx';

const {app} = require('electron').remote;


class Navbar extends React.Component {
    quitClicked(){
        app.quit();
    }
    render() {
        return <div>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <div className="brand-logo" id="title">.clean</div>
                        <ul className="right hide-on-small-and-down" id="nav-links">
                            <NavItem index={true} to="/">Downloads</NavItem>
                            <NavItem to="/stats">Stats</NavItem>
                            <NavItem to="/watch">Watch</NavItem>
                            <NavItem to="/settings">Settings</NavItem>
                            <li><a onClick={this.quitClicked.bind(this)}>Quit</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            {this.props.children}
        </div>;
    }
}

export default Navbar;
