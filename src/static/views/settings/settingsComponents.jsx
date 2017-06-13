'use babel';

import React from 'react';
import DownloadSettings from './downloadSettings.jsx';

class SettingsComponents extends React.Component {

  renderComponent (Component, name) {
    return <div key={`settings-${name}`}>
      <div className="flow-text">
        <div className="small-flow">
          {name}
        </div>
      </div>
      <Component/>
      <div className="divider"></div>
    </div>
  }

  render() {
    const components = [(DownloadSettings, "Download Settings")]

    const renderedComponents = components.map((component) => this.renderComponent(component[0], component[1]))

    return <div>
      {renderedComponents}
    </div>;
  }
}

export default SettingsComponents;
