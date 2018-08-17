import React, { Component } from 'react'
import { Button } from 'antd-mobile';
// 使用外部css文件表
import '../styles/views/ErrorPage.css'
class ErrorPage extends Component {
  goHome(){
    window.location.href = '/';
  }
  render() {
    let user =  React.store.getState().user
    return (
      <div id="Error">
        <div className="Error-box">
          <h3 className="Error-title">404错误！</h3>
          <p className="Error-dec">抱歉你要找的页面不存在</p>
          <p>管理员名字：{user.name}</p>
          <p>管理员电话：{user.phone}</p>
          <div className="Error-btnbox">
            <Button className="Error-btn" size="small" type="default" inline onClick={this.goHome}>返回首页</Button>
            <Button className="Error-btn" size="small" type="default" inline>保证不打死管理员</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorPage
