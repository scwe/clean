import { connect } from 'react-redux'
import { addDownloadLocation } from '../ducks/settings.duck'
import DownloadLocationList from '../components/settings/downloadLocationList'

function mapStateToProps(state, ownProps) {
  return {
    downloadLocations: state.settings.downloadLocations
  }
}

function mapDispatchToProps(dispatch){
  return {
    addDownloadLocation(){
      dispatch(addDownloadLocation())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadLocationList)
