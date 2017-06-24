'use babel'
import React from 'react'
import {Link, IndexLink} from 'react-router'

class NavItem extends React.Component {
  render () {
    const r = this.context.router
    const { index, onlyActiveOnIndex, to, children, ...props } = this.props

    const isActive = r.isActive(to, onlyActiveOnIndex || index)
    const LinkComponent = index ? IndexLink : Link

    return (
      <li className={isActive ? 'active' : ''}>
        <LinkComponent to={to} {...props}>{children}</LinkComponent>
      </li>
    )
  }
}

NavItem.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default NavItem
