import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './Connect'
class Header extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor () {
    super()
    this.state = { themeColor: '' }
  }
  // 将冗余代码去掉，用connect代替，抽取高度复用组件
  // componentWillMount () {
  //   const { store } = this.context
  //   this._updateThemeColor()
  //   store.subscribe(() => this._updateThemeColor())
  // }
  // _updateThemeColor () {
  //   // 从context中取store
  //   const { store } = this.context
  //   const state = store.getState()
  //   this.setState(() => ({
  //     themeColor: state.themeColor
  //   }))
  // }
  render () {
    return (
      <h1 style={{ color: this.state.themeColor }}>React.js 小书</h1>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
Header = connect(mapStateToProps)(Header)

export default Header