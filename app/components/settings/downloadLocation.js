import React from 'react'
import { ipcRenderer } from 'electron'

class DownloadLocation extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      path: false
    }
  }
  addFileClicked (id) {
    ipcRenderer.send('download_location_set_location', id)
    ipcRenderer.once('download_location_confirm', (event, folder) => {
      this.setState({
        path: folder
      })
    })
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
    const { extensions, path, id } = this.props
    const { path: pathFromState } = this.state
    const realPath = pathFromState || path

    return <div className='row file-field input-field'>
      <div className='col s12'>
        <div className='col s2'>
          <div className='btn blue-grey waves-effect' onClick={this.addFileClicked.bind(this, id)}>
            <i className='material-icons'>folder</i>
          </div>
        </div>
        <div className='col s9 file-path' >{realPath} </div>
      </div>
      <div className='col s12'>
        <div className='input-field'>
          something or rather
          {this.renderExtensionSelector(extensions, id)}
        </div>
      </div>
    </div>
  }
}

export default DownloadLocation
