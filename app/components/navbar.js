import React from 'react'
import NavItem from './navitem'
import TorrentButtons from './torrentButtons'
import { ipcRenderer } from 'electron'

class Navbar extends React.Component {
  quitClicked () {
    ipcRenderer.send('window-closed')
  }
  render () {
    return <div>
      <div className='navbar-fixed'>
        <nav className='drag'>
          <div className='nav-wrapper blue-grey'>
            <div className='brand-logo' id='title'>.clean</div>
            <a href='#' data-activates='mobile-demo' className='button-collapse'><i className='material-icons no-drag'>menu</i></a>
            <ul className='right hide-on-med-and-down no-drag'>
              <NavItem index to='/'><i className='material-icons left'>file_download</i>Downloads</NavItem>
              <NavItem to='/stats'><i className='material-icons left'>show_chart</i>Stats</NavItem>
              <NavItem to='/watch'><i className='material-icons left'>tv</i>Watch</NavItem>
              <NavItem to='/settings'><i className='material-icons left'>settings</i>Settings</NavItem>
              <li><a onClick={this.quitClicked.bind(this)}><i className='material-icons left'>close</i>Quit</a></li>
            </ul>
            <ul className='side-nav no-drag' id='mobile-demo'>
              <NavItem className='waves-effect' index to='/'><i className='material-icons'>file_download</i>Downloads</NavItem>
              <NavItem className='waves-effect' to='/stats'><i className='material-icons'>show_chart</i>Stats</NavItem>
              <NavItem className='waves-effect' to='/watch'><i className='material-icons'>tv</i>Watch</NavItem>
              <NavItem className='waves-effect' to='/settings'><i className='material-icons'>settings</i>Settings</NavItem>
              <li><a onClick={this.quitClicked.bind(this)}><i className='material-icons'>close</i>Quit</a></li>
            </ul>
          </div>
        </nav>

      </div>
      <TorrentButtons />
      {this.props.children}
    </div>
  }
}

export default Navbar
