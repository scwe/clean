### Clean ###

The new torrent client built on top of electron with React and torrent-stream.

#### Install Instructions ####

```bash
git clone https://github.com/scwe/clean.git
```

Install Electron using
```bash
npm install -g electron
```

Install dependencies using
```bash
npm install
```

And then run using (this will not work at the moment, you will )
```bash
electron .
```


#### TODO ####

* Watch tab, to watch currently downloading tabs
* Rewrite torrentStream to use rarest piece first when downloading
* Make some settings 
* Priority downloads
* Limit upload and download on a per torrent and global basis
* Implement filters for active, paused, finished etc.
* Search feature for torrents