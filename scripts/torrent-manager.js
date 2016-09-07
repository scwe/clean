var parse = require('parse-torrent');
var Torrent = require('./torrent');
var fs = require('fs');

var torrents = {};

var Manager = function(){

    function loadTorrent(filename){
        var tFile = parse(fs.readFileSync(filename));
        var magnet = parse.toMagnetURI(tFile);

        return addFromMagnet(magnet);
    }

    function addFromMagnet(magnet){
        if(_hasTorrent(magnet)){
            return null;
        }else{
            return _addTorrent(magnet);
        }
    }

    function _hasTorrent(magnetLink){
        return magnetLink in torrents;
    }

    function _addTorrent(magnetLink){
        var torrent = new Torrent(magnetLink, "saved-torrents/");
        torrents.magnetLink = torrent;
        torrent.setup();
        return torrent;
    }
    function cancelTorrents(){
        console.log("Cancelling torrents length: "+torrents.length);
        /*for(var t in torrents){
            //true for delete files, this is just a temporary measure
            console.log("Canceling torrent: "+torrents[t]);
            torrents[t].delete(true);
        }*/
    }

    function stopTorrent(id){

    }
    function cancelTorrent(id){

    }

    return {
        loadTorrent : loadTorrent,
        stopTorrent: stopTorrent,
        cancelTorrent: cancelTorrent,
        addFromMagnet: addFromMagnet
    }
}



module.exports = new Manager;
/* Python code taken from deluge torrent to
def associate_magnet_links(overwrite=False):
    """
    Associates magnet links to Deluge.

    Params:
        overwrite (bool): if this is True, the current setting will be overwritten

    Returns:
        bool: True if association was set
    """

    if deluge.common.windows_check():
        import _winreg

        try:
            hkey = _winreg.OpenKey(_winreg.HKEY_CLASSES_ROOT, "Magnet")
        except WindowsError:  # pylint: disable=undefined-variable
            overwrite = True
        else:
            _winreg.CloseKey(hkey)

        if overwrite:
            deluge_exe = os.path.join(os.path.dirname(sys.executable), "deluge.exe")
            try:
                magnet_key = _winreg.CreateKey(_winreg.HKEY_CLASSES_ROOT, "Magnet")
            except WindowsError:  # pylint: disable=undefined-variable
                # Could not create for all users, falling back to current user
                magnet_key = _winreg.CreateKey(_winreg.HKEY_CURRENT_USER, "Software\\Classes\\Magnet")

            _winreg.SetValue(magnet_key, "", _winreg.REG_SZ, "URL:Magnet Protocol")
            _winreg.SetValueEx(magnet_key, "URL Protocol", 0, _winreg.REG_SZ, "")
            _winreg.SetValueEx(magnet_key, "BrowserFlags", 0, _winreg.REG_DWORD, 0x8)
            _winreg.SetValue(magnet_key, "DefaultIcon", _winreg.REG_SZ, "{},0".format(deluge_exe))
            _winreg.SetValue(magnet_key, r"shell\open\command", _winreg.REG_SZ, '"{}" "%1"'.format(deluge_exe))
            _winreg.CloseKey(magnet_key)

    # Don't try associate magnet on OSX see: #2420
    elif not deluge.common.osx_check():
        # gconf method is only available in a GNOME environment
        try:
            import gconf
        except ImportError:
            log.debug("gconf not available, so will not attempt to register magnet uri handler")
            return False
        else:
            key = "/desktop/gnome/url-handlers/magnet/command"
            gconf_client = gconf.client_get_default()
            if (gconf_client.get(key) and overwrite) or not gconf_client.get(key):
                # We are either going to overwrite the key, or do it if it hasn't been set yet
                if gconf_client.set_string(key, "deluge '%s'"):
                    gconf_client.set_bool("/desktop/gnome/url-handlers/magnet/needs_terminal", False)
                    gconf_client.set_bool("/desktop/gnome/url-handlers/magnet/enabled", True)
                    log.info("Deluge registered as default magnet uri handler!")
                    return True
                else:
                    log.error("Unable to register Deluge as default magnet uri handler.")
                    return False
    return False*/
