/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpack配置 demo ,苏南整理，QQ群: 912594095
 */
import React, { Component, PropTypes } from 'react'
import './NotFoundPage.scss'

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <div className="error-tips"></div>
        <p>故意不写，到404页来的，哈哈～</p>
      </div>
    );
  }
}

export default NotFoundPage