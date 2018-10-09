import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { InputItem,Button } from 'antd-mobile';
import PhoneAreaCode from '../../components/PhoneAreaCode'
import VerificaCode from '../../components/VerificaCode'
// 使用外部css文件表
import '../../styles/views/authority/Login.css'
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
        loginType:0, // 0 手机快捷登录 1 手机密码登录  2 昵称登录
        checkedCodeData:{
          name:'中国',
          code:'+86'
        } //选中的地区码(默认为中国)
    };
  }
  // 该方法在首次渲染之前调用(数据初始化)
  componentWillMount (){}
  //已经生成对应的dom结构
  componentDidMount=()=> {}
  //在组件从 DOM 中移除的时候立刻被调用。
  componentWillUnmount=()=> {}
  getCodeData=(codeData)=>{
    this.setState({ 
      checkedCodeData:codeData
    })
  }
  switchLoginType=(type)=>{
    this.setState({ 
      loginType:type
    })
  }
  login=()=>{
    console.log('登录')
    //登录失败的时候调用获取验证码接口
    this.refs.verifica_code.getImgCode()
  }
  render() {
    return (
      <div id="Login">
        <div className="from_box">
          <PhoneAreaCode getCodeData={this.getCodeData.bind(this)}></PhoneAreaCode>
          <div className="input_box">
            <InputItem className="input_self" placeholder="请输入手机号">{this.state.checkedCodeData.code}</InputItem>
          </div>
          <div className="input_box">
            <InputItem className="input_self" placeholder="请输入密码">
              <div className="lockImg input_icon"/>
            </InputItem>
          </div>
          {/* 此处先用常用验证码方式代替 */}
          <VerificaCode codeType="IMG" ref="verifica_code"></VerificaCode>
          <VerificaCode codeType="SMS" codePhone={18612908099}></VerificaCode>
          <div className="input_box">
            <Button className="btn_self" onClick={this.login}>立即登录</Button>
          </div>
        </div>
        <div className="link_box flex-center">
          <Link className="link" to="">忘记密码？</Link>
          <span className="link" style={{color:this.state.loginType===0?'#f70':'#a4a4a4'}} onClick={this.switchLoginType.bind(this,0)}>手机快捷登陆</span>
          <span className="link" style={{color:this.state.loginType===1?'#f70':'#a4a4a4'}} onClick={this.switchLoginType.bind(this,1)}>昵称登录</span>
        </div>
        <Link className="fastReg" to="">快速注册</Link>
      </div>
    );
  }
}

export default Login;
