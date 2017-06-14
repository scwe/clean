'use babel'
import React from 'react'

class Sidebar extends React.Component {
    // All
    // Active
    // Downloading
    // Completed
    // Queued
    // Paused
    // Seeding

  render () {
    return <ul id='custom-side-nav' className='side-li z-depth-1'>
      <li><a className='waves-effect'>All</a></li>
      <li><a className='waves-effect'>Active</a></li>
      <li><a className='waves-effect'>Downloading</a></li>
      <li><a className='waves-effect'>Completed</a></li>
      <li><a className='waves-effect'>Queued</a></li>
      <li><a className='waves-effect'>Paused</a></li>
      <li><a className='waves-effect'>Seeding</a></li>
    </ul>
  }
}

export default Sidebar
