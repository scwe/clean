'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Navbar from '../views/navbar.jsx';
import Downloads from '../views/downloads.jsx';
import Watch from "../views/watch.jsx";
import Stats from "../views/stats.jsx";
import Settings from "../views/settings.jsx";

window.onload = function(){
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={Navbar}>
                <IndexRoute components={Downloads}/>
                <Route path='/watch' component={Watch}/>
                <Route path='/stats' component={Stats}/>
                <Route path='/settings' component={Settings}/>
            </Route>
        </Router>
        , document.getElementById('app'));
}
