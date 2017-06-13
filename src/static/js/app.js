'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router, 
  Route,
  hashHistory as history,
  IndexRoute
} from 'react-router';
import Navbar from '../views/navbar.jsx';
import Downloads from '../views/downloads.jsx';
import Watch from "../views/watch.jsx";
import Stats from "../views/stats.jsx";
import Settings from "../views/settings/settings.jsx";


window.onload = function(){
  ReactDOM.render(
    <Router history={history}>
      <Route path='/' component={Navbar}>
        <IndexRoute component={Downloads}/>
        <Route path='/watch' component={Watch}/>
        <Route path='/stats' component={Stats}/>
        <Route path='/settings' component={Settings}/>
      </Route>
    </Router>
    , document.getElementById('app'));
}
