'use babel';

import React from 'react';
import DownloadSettings from './downloadSettings.jsx';

class SettingsComponents extends React.Component {


    render() {
        var components = [(DownloadSettings, "Download Settings")].map((component) => {
            var Comp = component[0];
            return <div>
                <div className="flow-text">
                    <div className="small-flow">
                        {component[1]}
                    </div>
                </div>
                <Comp/>
                <div className="divider"></div>
            </div>;
        });

        return <div>
            {components}
        </div>;
    }
}

export default SettingsComponents;
