import React, { Component } from 'react';
import { } from '../../utils/utils'
import { } from 'antd-mobile';
// 使用外部css文件表
// import '../../styles/views/authority/FindPwd.css'
class FindPwd extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  // 该方法在首次渲染之前调用(数据初始化)
  componentWillMount (){}
  //已经生成对应的dom结构
  componentDidMount=()=> {}
  //在组件从 DOM 中移除的时候立刻被调用。
  componentWillUnmount=()=> {}
  render() {
    return (
      <div id="FindPwd">
        忘记密码
      </div>
    );
  }
}

export default FindPwd;
