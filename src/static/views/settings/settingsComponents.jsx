import React from 'react'
import DownloadSettings from './downloadSettings.jsx'

class SettingsComponents extends React.Component {
  renderComponent (SettingsComponent, name) {
    console.log('Name is: ', name)
    return <div key={`settings-${name}`}>
      <div className='flow-text'>
        <div className='small-flow'>
          {name}
        </div>
      </div>
      <DownloadSettings />
      <div className='divider' />
    </div>
  }

  render () {
    const components = [[DownloadSettings, 'Download Settings']]
    const renderedComponents = components.map((component) => {
      console.log('This is: ', component)
      return this.renderComponent(component[0], component[1])
    })
    console.log('Components are: ', renderedComponents)

    return <div>
      {renderedComponents}
    </div>
  }
}

export default SettingsComponents
