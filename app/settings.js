// const {app} = require('electron')
// const path = require('path')

// const SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json')

var Settings = function () {
  function saveSettings () {
  }

  function loadSettings () {

  }
  return {
    saveSettings: saveSettings,
    loadSettings: loadSettings
  }
}

module.exports = new Settings()
