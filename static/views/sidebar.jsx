'use babel';
import React from 'react';

class Sidebar extends React.Component {
    render() {
        return <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <li className="active"><a href="">All <span className="sr-only">(current)</span></a></li>
                    <li><a href="">Active</a></li>
                    <li><a href="">Downloading</a></li>
                    <li><a href="">Completed</a></li>
                    <li><a href="">Queued</a></li>
                    <li><a href="">Paused</a></li>
                    <li><a href="">Seeding</a></li>
                </ul>
            </div>
        </div>;
    }
}

export default Sidebar;
