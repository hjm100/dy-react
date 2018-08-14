import React, { Component } from 'react';
import GetLocation from '../../../components/GetLocation'
// 使用外部css文件表
import '../../../styles/views/user/edit.scss'
class EditAddress extends Component {
  constructor (props) {
    super(props);
    this.state = {
      locationMsg:{},
      style:{'display': 'none'}
    };
  }
  // 该方法在首次渲染之前调用(数据初始化)
  componentWillMount (){}
  //已经生成对应的dom结构
  componentDidMount=()=> {}
  //在组件从 DOM 中移除的时候立刻被调用。
  componentWillUnmount=()=> {}
  getLocationMsg=(locationMsg)=>{
    //如果不为空的话显示提示
    if(Object.keys(locationMsg).length !== 0){
      this.setState({ 
        locationMsg:locationMsg,
        style:{'display': 'block'}
      })
    }
  }
  submitLocation=()=>{
    // 我要提交数据了
    console.log(this.state.locationMsg)
  }
  render() {
    return (
      <div id="EditAddress">
         <GetLocation getLocationMsg={this.getLocationMsg.bind(this)}/>
         <div style={this.state.style} className="address_box">
            <p><i>经纬度：</i><span>{this.state.locationMsg.lng},{this.state.locationMsg.lat}</span></p>
            <p><i>详细地址:</i><span>{this.state.locationMsg.address}</span></p>
            <p><i>最近的路口:</i><span>{this.state.locationMsg.nearestJunction}</span></p>
            <p><i>最近的路:</i><span>{this.state.locationMsg.nearestRoad}</span></p>
            <p><i>最近的POI:</i><span>{this.state.locationMsg.nearestPOI}</span></p>
            <button className="subBtn" onClick={this.submitLocation}>提交</button>
         </div>
      </div>
    );
  }
}

export default EditAddress;
