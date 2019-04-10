import React from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux';
import { REQUEST_TEST } from '../../reducers/test';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        欢迎来到首页
      </div>
    )
  }
}