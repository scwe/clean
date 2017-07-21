import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  Router,
  Route,
  hashHistory as history,
  IndexRoute
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import { configureViewStore } from './store'

const store = configureViewStore();
const routerHistory = syncHistoryWithStore(history, store);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

if(process.env.BROWSER_SYNC_SERVER){
  const server = process.env.BROWSER_SYNC_SERVER
  console.log('server is: ', typeof (server))
  server.emitter.on('reload', () => {
    console.log('Browser sync server is being reloaded')
  })
}else{
  console.log('The module is not hot')
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
  rootElement
);
