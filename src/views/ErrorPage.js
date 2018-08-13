import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import Countdown from '../components/Countdown'
import Copy from '../components/Copy'
// 使用外部css文件表
import '../styles/views/ErrorPage.css'
class ErrorPage extends Component {
  goHome(){
    window.location.href = '/';
  }
  render() {
    return (
      <div id="Error">
        <div className="Error-box">
          <Countdown className='Error-time' startTime={1531891577} endTime={1531891587} msg="哈哈哈哈哈哈"></Countdown>
          <h3 className="Error-title">404错误！</h3>
          <p className="Error-dec">抱歉你要找的页面不存在</p>
          <div className="Error-btnbox">
            <Button className="Error-btn" size="small" type="default" inline onClick={this.goHome}>返回首页</Button>
            <Button className="Error-btn" size="small" type="default" inline>保证不打死管理员</Button>
          </div>
        </div>
        <div className="scss-test">
           <p>我的字号是24颜色为红色
             <span>我的字号是18颜色是绿色</span>
           </p>
           <span>我的字号是24颜色为蓝色</span>
        </div>
        <Copy className="Error-copy" copyBtnId="copy1" copymessage="https://hjm100.cn" copyBtnTxt="拷贝"/>
      </div>
    )
  }
}

export default ErrorPage
