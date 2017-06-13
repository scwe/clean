var window = null;

var ElectronWindow = function() {
  function getWindow() {
    return window;
  }

  function setWindow(_window) {
    window = _window;
  }

  return {
    getWindow: getWindow,
    setWindow: setWindow
  }
}

module.exports = new ElectronWindow;
