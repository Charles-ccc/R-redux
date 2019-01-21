import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (wrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      return <wrappedComponent {...stateProps}/>
    }
  }
  return Connect
}