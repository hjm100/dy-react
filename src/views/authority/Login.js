import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { InputItem,Button,Toast } from 'antd-mobile';
import PhoneAreaCode from '../../components/PhoneAreaCode'
import VerificaCode from '../../components/VerificaCode'
import {isName,isPhone,isPassword} from '../../utils/validate'
// 使用外部css文件表
import '../../styles/views/authority/Login.css'
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
        loginType:0, // 0 手机快捷登录 1 手机密码登录  2 昵称登录
        phoneNumber:'', //用户输入手机号
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
  //输入手机号设置
  setInputPhone=()=>{
    let phone = this.refs.phoneNumber.state.value;
    this.setState({ 
      phoneNumber:phone
    })
  }
  switchLoginType=(type)=>{
    this.setState({ 
      loginType:type
    })
  }
  login=()=>{
    //获取表单数据
    let userName      = this.refs.userName.state.value,
        phoneNumber   = this.refs.phoneNumber.state.value,
        phoneAreaCode = this.state.checkedCodeData,
        password      = this.refs.password.state.value,
        IMG_code      = this.refs.IMG_code.getInputValue(),
        SMS_code      = this.refs.SMS_code.getInputValue();
    //登录验证
    if(this.state.loginType===0){       // 手机快捷登录
      if(!isPhone(phoneNumber)) return Toast.fail('手机号不正确');
      if(!isPassword(password)) return Toast.fail('密码不正确');
    }else if(this.state.loginType===1){ // 手机密码登录
      if(!isPhone(phoneNumber)) return Toast.fail('手机号不正确');
      if(SMS_code.length!==4) return Toast.fail('短信验证码不正确');
    }else{                              // 昵称登录     
      if(!isName(userName)) return Toast.fail('用户名不正确');
      if(!isPassword(password)) return Toast.fail('密码不正确');
    }
    if(IMG_code.length!==4) return Toast.fail('验证码不正确');
    console.log('请求登录接口吧'+ userName + phoneNumber + password + IMG_code + SMS_code + phoneAreaCode)
    //登录失败的时候调用获取验证码接口
    this.refs.IMG_code.getImgCode()
  }

  render() {
    return (
      <div id="Login">
        <div className="from_box">
          {/* 当为昵称登录的时候显示 */}
          <div className="input_box" style={{display:this.state.loginType===2?'block':'none'}}>
            <InputItem ref="userName" className="input_self" placeholder="请输入昵称">
              <div className="userImg input_icon"/>
            </InputItem>
          </div>
          {/* 当为手机登录的时候显示 */}
          <PhoneAreaCode getCodeData={this.getCodeData.bind(this)} style={{display:this.state.loginType!==2?'block':'none'}}></PhoneAreaCode>
          <div className="input_box" style={{display:this.state.loginType!==2?'block':'none'}}>
            <InputItem ref="phoneNumber" onBlur={this.setInputPhone} className="input_self" placeholder="请输入手机号" >{this.state.checkedCodeData.code}</InputItem>
          </div>
          {/* 当为手机密码的时候显示 */}
          <div className="input_box" style={{display:this.state.loginType!==1?'block':'none'}}>
            <InputItem ref="password" className="input_self" placeholder="请输入密码" type="password">
              <div className="lockImg input_icon"/>
            </InputItem>
          </div>
          {/* 此处先用常用验证码方式代替 */}
          <VerificaCode codeType="IMG" ref="IMG_code"></VerificaCode>
          {/* 当为快捷登录的时候显示 */}
          <VerificaCode codeType="SMS" ref="SMS_code" codePhone={this.state.phoneNumber} style={{display:this.state.loginType===1?'block':'none'}}></VerificaCode>
          <div className="input_box">
            <Button className="btn_self" onClick={this.login}>立即登录</Button>
          </div>
        </div>
        <div className="link_box flex-center">
          <Link className="link" to="/authority/findPwd">忘记密码？</Link>
          <span className="link"
            style={{display:this.state.loginType===2?'none':'block'}}
            onClick={this.switchLoginType.bind(this,this.state.loginType===0? 1 : 0)}>
            {this.state.loginType===0? '手机快捷登陆' : '手机密码登陆'}
          </span>
          <span className="link" onClick={this.switchLoginType.bind(this,this.state.loginType===2? 0 : 2)}>
            {this.state.loginType===2? '手机登录' : '昵称登录'}
          </span>
        </div>
        <Link className="fastReg" to="/authority/register">快速注册</Link>
      </div>
    );
  }
}

export default Login;
