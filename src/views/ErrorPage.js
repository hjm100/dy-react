import React, { Component } from 'react'
// 使用外部css文件表
import '../styles/views/ErrorPage.css'
class ErrorPage extends Component {
  goHome(){
    window.location.href = '/';
  }
  render() {
    // 获取 store数据的方法
    // let user =  React.store.getState().user
    return (
      <div id="Error">
        <div className="Error-img"></div>
        <div className="Error-txt">房间信息找不到~</div>
        <div className="Error-btn" onClick={this.goHome}>返回首页</div>
      </div>
    )
  }
}

export default ErrorPage