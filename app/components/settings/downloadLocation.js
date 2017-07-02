import React from 'react'

class DownloadLocation extends React.Component {
  addFileClicked (id) {
  }

  onSelectionChange (event) {
    const newExtension = event.target.value
  }

  componentDidMount () {
    $('select').material_select()
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

    return <div className='row file-field input-field'>
      <div className='col s12'>
        <div className='btn blue-grey waves-effect' onClick={this.addFileClicked.bind(this, id)}>
          <i className='material-icons'>folder</i>
        </div>
      </div>
      <div className='col s12'>
        <div className='input-field'>
          {this.renderExtensionSelector(extensions, id)}
        </div>
      </div>
      <div className='col s12'>
        <div className='file-path-wrapper col s8'>
          <input className='file-path' type='text' defaultValue={path} />
        </div>
      </div>
    </div>
  }
}

export default DownloadLocation
