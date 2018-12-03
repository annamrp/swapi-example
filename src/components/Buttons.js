import React, { Component } from 'react'

export default class Buttons extends Component {

  render() {
    const {onClick, children} = this.props
    return (
      <div>
        <p className="button" onClick={onClick}>{children}</p>
      </div>
    )
  }
}
