import test, { actions as testActions } from './test.duck'
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

export const actions = {
  ...testActions
}

const reducers = combineReducers({
  test,
  routing: routerReducer
})

export default reducers
