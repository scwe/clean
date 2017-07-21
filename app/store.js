import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import { electronEnhancer } from 'redux-electron-store'

import test, { actions } from './ducks/test.duck'

const router = routerMiddleware(hashHistory)


const reducers = {
  routing,
  test
}

const middlewares = [ thunk, router ]


const initialState = {
  test: {
    syncTest: 'This should be synced'
  }
}

// These two stores should technically be in sync with redux-electron-store
let appStore
let viewStore

export function configureAppStore() {
  // For the app store we only need the default compose, as there is 
  // no dev tools extension necessary
  const enhancer = compose(
    applyMiddleware(...middlewares), 
    electronEnhancer({
      dispatchProxy: a => appStore.dispatch(a)
    })
  )
  const rootReducer = combineReducers(reducers)
  
  appStore = createStore(rootReducer, initialState, enhancer)
  return appStore
}

export function configureViewStore () {
  const actionCreators = {
    push,
    ...actions
  }
  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators })
    }
    return compose;
  })()

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares), 
    persistState(),
    electronEnhancer({
      dispatchProxy: a => viewStore.dispatch(a)
    })
  )
  const rootReducer = combineReducers(reducers)

  viewStore = createStore(rootReducer, initialState, enhancer)
  return viewStore
}
