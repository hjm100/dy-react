import React, { Component } from 'react';
import { InputItem } from 'antd-mobile';
import PhoneAreaCode from '../../components/PhoneAreaCode'
// 使用外部css文件表
import '../../styles/views/authority/Login.css'
import checkCode from '../../assets/check_code.png'
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
  render() {
    return (
      <div id="Login">
        <div className="code_box">
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
          <div className="input_box verificaCode">
            <InputItem className="input_self" 
              placeholder="请输入验证码" 
              extra={<img src={checkCode}/>}>
              <div className="checkImg input_icon"/>
            </InputItem>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
