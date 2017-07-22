import { handleActions, createAction } from 'redux-actions'

export const testAction = createAction('TEST_ACTION')

export const actions = {
  testAction
}

const initialState = {
  somethingSync: 'wooooo'
}

export default handleActions({
  [testAction().type]: (state, action) => {
    console.log('state: ', state, ' action: ', action)
    return state
  }
}, initialState)
