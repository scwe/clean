'use babel';

import React from 'react';

class Settings extends React.Component {
    getDownloadLocations(){
        return [{extensions: [".txt",".mp4"], path: "/home", id:1}, {extensions: [".mp3"], path:"/home/scott", id:2}];
    }
    addFileClicked(id){
        console.log("Add file clicked of key: "+id);
    }

    componentDidMount(){
        $('select').material_select();
    }


    render() {
        /*var extensions = this.props.location.extensions.map((loc) => {
            return <option value= key={loc.id}
        });*/
        var downloadLocations = this.getDownloadLocations().map((dlLocation) => {
            return <div className="row file-field input-field" key={dlLocation.key}>
                <div className="col s12">
                    <div className="btn blue-grey waves-effect" onClick={this.addFileClicked.bind(this, dlLocation.key)}>
                        <i className="material-icons">folder</i>
                    </div>
                </div>
                <div className="col s12">
                    <div className="input-field">
                        <select multiple>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                    </div>
                </div>
                <div className="col s12">
                    <div className="file-path-wrapper col s8">
                        <input className="file-path" type="text" defaultValue={dlLocation.location}></input>
                    </div>
                </div>
            </div>;
        });
        return <div className="container">
            <p className="flow-text">Download Locations</p>
            {downloadLocations}
            <div className="divider"></div>
        </div>;
    }
}

export default Settings;
