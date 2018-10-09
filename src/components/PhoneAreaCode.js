import React, {Component} from 'react';
import { InputItem } from 'antd-mobile';
import phoneAreaCodeConfig from "../config/phoneAreaCode";
import '../styles/components/PhoneAreaCode.css';
class PhoneAreaCode extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            checkedCodeData:{
                name:'中国',
                code:'+86'
            } //选中的地区码(默认为中国)
        };
    }
    componentDidMount=()=> {}
    componentWillUnmount=()=> {}
    showOption=()=>{
        let eleStyle = this.refs.pac_list.style.display === 'none'?'block':'none';
        this.refs.pac_list.style.display = eleStyle;
      }
      setPhoneAreaCode=(codeData)=>{
        this.setState({ 
          checkedCodeData:codeData
        })
        this.props.getCodeData(codeData)
      }
      setPACListEle = (datas)=>{
          let checkedColor;
          if(datas.code === this.state.checkedCodeData.code) checkedColor = {color: '#f70'};
          return(
            <li className="pac_item" style={checkedColor} onClick={(e) => this.setPhoneAreaCode(datas,e)} key={datas.name}>
                <span className="pac_item__area">{datas.name}</span>
                <span className="pac_item__code">{datas.code}</span>
            </li>
        )
      }
    render() {
        return (
            <div id="PhoneAreaCode" style={this.props.style} className={this.props.className}>
                <div className="input_box" onClick={this.showOption}>
                    <InputItem className="phone_area_code input_self" disabled extra={this.state.checkedCodeData.name}>国家与地区</InputItem>
                    <ul className="pac_list" ref="pac_list" style={{display: 'none'}}>
                        {phoneAreaCodeConfig.map(this.setPACListEle)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default PhoneAreaCode;
