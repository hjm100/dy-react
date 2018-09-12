import React, { Component } from 'react';
// 使用外部css文件表
import '../../styles/views/activity/BagWheel.css';
import {Toast} from 'antd-mobile';      // 引入加载组件
class BagWheel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      wheelGoods:[], //大转盘物品列表
      btnEnable:true //反之用户频繁点击
    };
  }
  // 该方法在首次渲染之前调用(数据初始化)
  componentWillMount=()=>{
    React.http.activity.bagWheelGoods().then(res => {
      this.setState({
        wheelGoods:res.wheelGoods
      })
    })
  }
/******************方法逻辑层*********************/
  getPrize = () =>{
    clearTimeout(this.timer);
    if(this.state.btnEnable){
      this.setState({btnEnable:false})
      //禁止用户连续点击
      React.http.activity.getPrize().then(res => {
        this.animation(res.prize.id*30);
        //动画结束后提示用户获取的奖励
        let goalSectorEle = this.refs[`sector${res.prize.id}`]
        setTimeout(() => {
          // 指定奖品的扇形添加动画
          goalSectorEle.style.backgroundColor = '#fffdb6'
          Toast.success(`恭喜您获得了${res.prize.id}:${res.prize.name}`);
        }, 6000);
        //删除样式
        setTimeout(() => {
          goalSectorEle.style.backgroundColor = 'inherit'
        },8000)
      })
    }
    this.timer = setTimeout(() => {
      this.setState({btnEnable:true})
    }, 3000);
  }
  // 获取到奖品后执行动画
  animation = (circle)=>{
    //周围小球交换显示
    let loopTime = setInterval(()=>{
      let loopEle = this.refs.loops.querySelectorAll('.loop');
      for (let i = 0; i < loopEle.length; i++) {
        if(/(dot1)/.test(loopEle[i].className)){
         setTimeout(() => {
            loopEle[i].className = 'loop dot2'
          }, 100);
        } else{
          loopEle[i].className = 'loop dot1'
        }
      }
    },300)
    setTimeout(()=>{
      clearInterval(loopTime)
    },6000)
    let wheel_btn = this.refs.wheel_btn,initDeg=0;  
    if(wheel_btn.style.transform)initDeg = wheel_btn.style.transform.replace(/[^0-9]/ig,"")*1
    // 缓冲为6圈
    wheel_btn.style.transform = `rotate(${3600+circle+initDeg-initDeg%360}deg)`

  }

/******************生成标签层*********************/

  // 初始化标签方法
  wheelItemsEle = (datas)=>{
    return(
      <div className="wheel-item" key={datas.id}>
        <div className="sector">
          <div className="sectorCss" ref={`sector${datas.id}`} style={{transform: `rotate(${datas.id*30-15}deg) skewY(-60deg)`}}></div>
        </div>
        <div className="wheel-goods" style={{transform: `rotate(${datas.id*30}deg)`}}>
          <h3 className="wg-text">{datas.name+datas.id}</h3>
          <div className="wg-icon">
            <img src={require('../../assets/hjm100.png')} alt={datas.name}></img>
          </div>
        </div>
      </div>
    )
  }

  setLoopEle = (datas,index)=>{
    if(index%2 === 0){
      return(<i className="loop dot2" key={index} style={{transform: `rotate(${index*7.5}deg)`}}></i>)
    }else{
      return(<i className="loop dot1" key={index} style={{transform: `rotate(${index*7.5}deg)`}}></i>)
    } 

  }
  //已经生成对应的dom结构
  componentDidMount=()=> {}
  //在组件从 DOM 中移除的时候立刻被调用。
  componentWillUnmount=()=> {}
  render() {
    return (
      <div id="BagWheel">
        <div className="title_bar"></div>
        <div className="wheel_box">
          {/*转盘闪环*/}
          <div className="wheel-loop" ref="loops">
            {[...Array(48)].map(this.setLoopEle)}
          </div>
          {/*转盘物品*/}
          <div className="wheel-goods_box">{this.state.wheelGoods.map(this.wheelItemsEle)}</div>
          {/*转盘按钮*/}
          <div className="wheel-btn_box flex-center">
            <div className="btn wheel_btnTop" onClick={this.getPrize}></div>
            <div className="btn wheel_btn" ref="wheel_btn"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BagWheel;
