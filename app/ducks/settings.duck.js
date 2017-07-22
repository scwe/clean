import { handleActions, createAction } from 'redux-actions'

export const setDownloadLocation = createAction('SETTINGS/SET_DOWNLOAD_LOCATION')
export const setDownloadSpeed = createAction('SETTINGS/SET_DOWNLOAD_SPEED')
export const setUploadSpeedLimit = createAction('SETTINGS/SET_UPLOAD_SPEED')
export const setMaxConnections = createAction('SETTINGS/SET_MAX_CONNECTIONS')
export const setMaxSeeding = createAction('SETTINGS/SET_MAX_SEEDING')
export const addDownloadLocation = createAction('SETTINGS/ADD_DOWNLOAD_LOCATION')

export const actions = {
  setDownloadLocation,
  setDownloadSpeed,
  setUploadSpeedLimit,
  setMaxConnections,
  setMaxSeeding,
  addDownloadLocation
}

const initialState = {
  downloadLocations: [defaultDownloadLocation], // A location = {filePath: '', extensions: [], name: '', id: 0}
  downloadSpeedLimit: -1,
  uploadSpeedLimit: -1,
  maxConnections: -1,
  maxSeeding: -1
}

export const defaultDownloadLocation = {
  path: '~/',
  extensions: ['*'],
  name: 'Downloads',
  id: 1
}

function findLocationIndex(locations, id){
  return locations.findIndex(location => location.id === id)
}

export default handleActions({
  [setDownloadLocation().type]: (state, action) => {
    const locationIndex = findLocationIndex(state.downloadLocations, action.payload.id)
    const newLocations = state.downloadLocations.slice()
    newLocations[locationIndex] = action.payload.downloadLocation

    return Object.assign({}, state, {
      downloadLocations: newLocations
    })
  },
  [setDownloadSpeed().type]: (state, action) => {
    return Object.assign({}, state, {
      downloadSpeedLimit: action.payload
    })
  },
  [setUploadSpeedLimit().type]: (state, action) => {
    return Object.assign({}, state, {
      uploadSpeedLimit: action.payload
    })
  },
  [setMaxConnections().type]: (state, action) => {
    return Object.assign({}, state, {
      maxConnections: action.payload
    })
  },
  [setMaxSeeding().type]: (state, action) => {
    return Object.assign({}, state, {
      maxSeeding: action.payload
    })
  },
}, initialState)
