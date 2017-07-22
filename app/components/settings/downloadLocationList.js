import React from 'react'
import DownloadLocation from './downloadLocation'


class DownloadLocationList extends React.Component {
  addDownloadLocation () {
    ipcRenderer.send('add_download_location')
    this.props.addDownloadLocation
  }

  render () {
    const downloadLocations = this.props.downloadLocations.map((location) => {
      return <DownloadLocation location={location} key={location.id} />
    })
    return <div>
      <p className='small-flow'>Download Locations</p>
      <div className='btn blue-grey waves-effect' onClick={this.addDownloadLocation.bind(this)}><i className='material-icons'>add</i></div>
      {downloadLocations}
    </div>
  }
}

export default DownloadLocationList
