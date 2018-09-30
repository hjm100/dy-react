import React, { Component } from 'react';
import { } from '../../utils/utils'
import { InputItem } from 'antd-mobile';
import phoneAreaCode from "../../config/phoneAreaCode";
// 使用外部css文件表
import '../../styles/views/authority/Login.css'
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
        checkedCode:'' //选中的地区码
    };
  }
  // 该方法在首次渲染之前调用(数据初始化)
  componentWillMount (){}
  //已经生成对应的dom结构
  componentDidMount=()=> {}
  //在组件从 DOM 中移除的时候立刻被调用。
  componentWillUnmount=()=> {}
  showOption=()=>{
    let eleStyle = this.refs.pac_list.style.display === 'none'?'block':'none';
    this.refs.pac_list.style.display = eleStyle
  }
  setPACListEle = (datas)=>{
      return(
        <li className="pac_item" key={datas.name}>
            <span className="pac_item__area">{datas.name}</span>
            <span className="pac_item__code">{datas.code}</span>
        </li>
    )
  }
  render() {
    return (
      <div id="Login">
        <div className="code_box">
            <div className="pac_input" onClick={this.showOption}>
                <InputItem className="phone_area_code" disabled extra="中国">国家与地区</InputItem>
            </div>
            <ul className="pac_list" ref="pac_list" style={{display: 'none'}}>
                 {phoneAreaCode.map(this.setPACListEle)}
            </ul>
        </div>
      </div>
    );
  }
}

export default Login;
