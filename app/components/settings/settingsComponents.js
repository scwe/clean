import React from 'react'
import DownloadLocationListContainer from '../../containers/downloadLocations.container'

class SettingsComponents extends React.Component {
  renderComponent (SettingsComponent, name) {
    console.log('Name is: ', name)
    return <div key={`settings-${name}`}>
      <div className='flow-text'>
        <div className='small-flow'>
          {name}
        </div>
      </div>
      <DownloadLocationListContainer />
      <div className='divider' />
    </div>
  }

  render () {
    const components = [[DownloadLocationListContainer, 'Download Settings']]
    const renderedComponents = components.map((component) => {
      return this.renderComponent(component[0], component[1])
    })

    return <div>
      {renderedComponents}
    </div>
  }
}

export default SettingsComponents
