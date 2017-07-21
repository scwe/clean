import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Navbar from './components/navbar'
import Downloads from './components/downloads'
import Watch from './components/watch'
import Stats from './components/stats'
import Settings from './components/settings/settings'

export default (
  <Route path='/' component={Navbar}>
    <IndexRoute component={Downloads} />
    <Route path='/watch' component={Watch} />
    <Route path='/stats' component={Stats} />
    <Route path='/settings' component={Settings} />
  </Route>
);
