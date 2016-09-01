'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from '../views/app.jsx';
import Downloads from '../views/downloads.jsx';
import Watch from "../views/watch.jsx";
import Stats from "../views/stats.jsx";
import Settings from "../views/settings.jsx";

/*const {app} = require('electron').remote;

function quit(){
    app.quit();
}*/

window.onload = function(){
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute components={Downloads}/>
                <Route path='/watch' component={Watch}/>
                <Route path='/stats' component={Stats}/>
                <Route path='/settings' component={Settings}/>
            </Route>
        </Router>
        , document.getElementById('app'));
}
