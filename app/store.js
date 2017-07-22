import { createStore, applyMiddleware, compose } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk'
import { electronEnhancer } from 'redux-electron-store'
import rootReducer, { actions } from './ducks'

const router = routerMiddleware(hashHistory)

const middlewares = [ thunk, router ]

// These two stores should technically be in sync with redux-electron-store
let appStore
let viewStore

export function configureAppStore(initialState) {
  // For the app store we only need the default compose, as there is 
  // no dev tools extension necessary
  const enhancer = compose(
    applyMiddleware(...middlewares), 
    electronEnhancer({
      dispatchProxy: a => appStore.dispatch(a)
    })
  )
  
  appStore = createStore(rootReducer, initialState, enhancer)
  return appStore
}

export function configureViewStore (initialState) {
  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if(process.env.NODE_ENV === 'development' && compose_) {
      const actionCreators = {
        push,
        ...actions
      }
      return compose_({ actionCreators })
    }
    return compose;
  })()

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares), 
    electronEnhancer({
      dispatchProxy: a => viewStore.dispatch(a)
    })
  )

  viewStore = createStore(rootReducer, initialState, enhancer)
  return viewStore
}
