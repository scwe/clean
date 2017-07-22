import settings, { actions as settingsActions } from './settings.duck'
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

export const actions = {
  ...settingsActions
}

const reducers = combineReducers({
  settings,
  routing: routerReducer
})

export default reducers
