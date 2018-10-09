import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { InputItem,Button,Toast,Checkbox } from 'antd-mobile';
import PhoneAreaCode from '../../components/PhoneAreaCode'
import VerificaCode from '../../components/VerificaCode'
import {isPhone,isPassword} from '../../utils/validate'
// 使用外部css文件表
import '../../styles/views/authority/Register.css'
const AgreeItem = Checkbox.AgreeItem;
class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      phoneNumber:'', //用户输入手机号
      checkedCodeData:{
        name:'中国',
        code:'+86'
      }, //选中的地区码(默认为中国)
      agreeTips:true, //默认同意协议
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
  register=()=>{
    //获取表单数据
    let phoneNumber   = this.refs.phoneNumber.state.value,
        phoneAreaCode = this.state.checkedCodeData,
        password      = this.refs.password.state.value,
        IMG_code      = this.refs.IMG_code.getInputValue(),
        SMS_code      = this.refs.SMS_code.getInputValue();
    if(!this.state.agreeTips)  return Toast.fail('请先同意注册协议');    
    if(!isPhone(phoneNumber))  return Toast.fail('手机号不正确');
    if(!isPassword(password))  return Toast.fail('密码不正确');
    if(IMG_code.length!==4)    return Toast.fail('验证码不正确');
    if(SMS_code.length!==4)    return Toast.fail('短信验证码不正确');
    console.log('请求登录接口吧'+ phoneNumber + password + IMG_code + SMS_code + phoneAreaCode)
    //登录失败的时候调用获取验证码接口
    this.refs.IMG_code.getImgCode()
  }
  setAgreeTips=()=>{
    let agree = this.state.agreeTips?false:true;
    this.setState({ 
      agreeTips:agree
    })
  }
  render() {
    return (
      <div id="Register">
        <div className="from_box">
          <PhoneAreaCode getCodeData={this.getCodeData.bind(this)}></PhoneAreaCode>
          <div className="input_box">
            <InputItem ref="phoneNumber" onBlur={this.setInputPhone} className="input_self" placeholder="请输入手机号" >{this.state.checkedCodeData.code}</InputItem>
          </div>
          <div className="input_box">
            <InputItem ref="password" className="input_self" placeholder="请输入密码" type="password">
              <div className="lockImg input_icon"/>
            </InputItem>
          </div>
          <VerificaCode codeType="IMG" ref="IMG_code"></VerificaCode>
          <VerificaCode codeType="SMS" ref="SMS_code" codePhone={this.state.phoneNumber}></VerificaCode>
          <div className="input_box">
            <Button className="btn_self" onClick={this.register}>注册</Button>
          </div>
        </div>
        <Link className="goLogin" to="/authority/login">马上登录</Link>
        <AgreeItem checked={this.state.agreeTips} className="tips_box" onChange={this.setAgreeTips.bind(this)}>
          同意
          <Link className="tips_text" to="/authority/registerTips">《注册协议以及版权声明》</Link>
        </AgreeItem>
      </div>
    );
  }
}

export default Register;
