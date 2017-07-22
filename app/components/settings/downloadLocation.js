import React from 'react'
import { ipcRenderer } from 'electron'

class DownloadLocation extends React.Component {

  addFileClicked (id) {
    ipcRenderer.send('download_location_set_location', id)
  }

  onSelectionChange (event) {
    const newExtension = event.target.value
  }

  renderExtensionSelector (extensions, id) {
    const options = extensions.map((ext) => <option key={`download-location-${id}-${ext}`} value={ext}>{ext}</option>)
    options.unshift(<option key={`download-location-${id}-all`} disabled value=''>All extensions</option>)
    return (
      <select multiple onChange={this.onSelectionChange.bind(this)} defaultValue={['']}>
        {options}
      </select>
    )
  }

  render () {
    const { extensions, path, id } = this.props.location

    return <div className='row file-field input-field'>
      <div className='col s12'>
        <div className='col s2'>
          <div className='btn blue-grey waves-effect' onClick={this.addFileClicked.bind(this, id)}>
            <i className='material-icons'>folder</i>
          </div>
        </div>
        <div className='col s9 file-path' >{path} </div>
      </div>
      <div className='col s12'>
        <div className='input-field'>
          {this.renderExtensionSelector(extensions, id)}
        </div>
      </div>
    </div>
  }
}

export default DownloadLocation
