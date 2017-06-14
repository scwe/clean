'use babel'

import React from 'react'
import DownloadLocation from './downloadLocation.jsx'

class DownloadSettings extends React.Component {
  getDownloadLocations () {
    return [{extensions: ['.txt', '.mp4'], path: '/home', id: 1}, {extensions: ['.mp3'], path: '/home/scott', id: 2}]
  }
  addFileClicked (id) {
    console.log('Add file clicked of key: ' + id)
  }

  componentDidMount () {
    $('select').material_select()
  }

  render () {
    var downloadLocations = this.getDownloadLocations().map((location) => {
      return <DownloadLocation location={location} key={location.id} />
    })
    return <div>
      {downloadLocations}
    </div>
  }
}

export default DownloadSettings
