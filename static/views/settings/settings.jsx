'use babel';

import React from 'react';
import SettingsComponents from './settingsComponents.jsx';

class Settings extends React.Component {
    //this is set up so that potentially we can add a side nav later in the future
    render() {
        return <div className="container">
            <p className="flow-text">Settings</p>
            <SettingsComponents/>
        </div>;
    }
}

export default Settings;
