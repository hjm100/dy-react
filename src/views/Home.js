import React, { Component } from 'react';
import {timestamp_switch_time} from '../utils/utils'
import { NoticeBar } from 'antd-mobile';
import hjm100 from '../assets/hjm100.png'
import hjm from '../assets/hjm.png'
// 使用外部css文件表
import '../styles/views/Home.css'
import Qrcode from '../components/Qrcode'
import Modalbox from '../components/Modalbox'
import Editor from '../components/Editor'
import ImgShear from '../components/ImgShear'
class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date:'',
      name:'',
      sum:0,
      data:[],
      inhtml:''
    };
    this.add = this.add.bind(this) //改变this的指向
  }
  // 该方法在首次渲染之前调用
  componentWillMount (){
    let that = this
    React.http.user.list().then(res => {
      let names = ''
      res.list.forEach((l) => {
        names+= l.name + ' '
      });
      that.setState({
        name:names
      })
    })

    React.http.user.getUserInfo().then(res => {
      that.setState({
        data:res.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    //执行获取时间函数
    // that.getNowTime();
  }
  listItemsEle=(datas)=> {
    return(
      <li className="Home-cell" key={datas.id}>
        <a target="_blank" href={datas.url}>{datas.title}</a>
      </li>
    )
  }
  getNowTime=()=>{
    setInterval(()=>{
      this.setState({
        date:timestamp_switch_time(new Date().getTime())
      })
    },1000)
  }
  //可以直接写方法函数
  add(){
    this.refs.modal.openBox()
    let sum = this.state.sum + 1;
    this.setState({ 
      sum:sum
    })
  }
  minus=()=>{
    this.updata()
    let sum = this.state.sum;
    if(sum > 0) sum--
    else return false
    this.setState({ 
      sum:sum
    })
  }
  showAlert=()=>{
    this.refs.modalbox.openBox('confirm','我是confirm','哈哈哈哈哈哈')
  }
  ok=()=>{
    console.log('我点击了确定')
    this.refs.modal.close()
    this.refs.modalbox.openBox('alert','我是alert','hahahahahahh')
  }
  cancel=()=>{
    console.log('我点击了取消')
    this.refs.modal.close()
    this.refs.modalbox.close()
  }
  updata=()=>{
    this.setState({ 
      inhtml:this.refs.editor.getData()
    })
  }
  getImgUrl=(imgurl)=>{
    //再此处执行一个修改图片的ajax请求
    React.http.user.upload("post",{
      imgurl:imgurl
    }).then(res => {
      console.log(res.msg)
    });
  }
  goAddress=()=>{
    this.props.history.push({
      pathname: '/set/edit/address',
      state: { fromDashboard: true }
    })
  }
  // 该方法会创建一个虚拟DOM，用来表示组件的输出。
  render() {
    return (
      <div id="Home">
        <a className="go_location" onClick={this.goAddress}>前往定位</a>
        <header className="Home-header">
          <div className="home-img flex-center">
            <ImgShear defImg={hjm} imgWidth={200} imgHeight={200} getImgUrl={this.getImgUrl.bind(this)}/>
          </div>
          <h1 className="Home-title" onClick={this.showAlert}>Welcome to React</h1>
          <p className="Home-time">{this.state.date}</p>
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          {this.state.name}
          </NoticeBar>
          <div className="Home-btn flex-align">
            <button onClick={this.minus}>减</button>
            <span>{this.state.sum}</span>
            <button onClick={this.add}>加</button>
          </div>
          <ul className="Home-group">
          {this.state.data.map(this.listItemsEle)}
          </ul>
        </header>
        <div className="Home-qrbox flex-align">
          <div className="qr-text">
             <Qrcode qrUrl={'https://hjm100.cn'} qrText={'HJM100'}/>
          </div>
          <div className="qr-img">
             <Qrcode qrUrl={'https://www.npmjs.com/package/hjm-web-staging'} qrLogo={hjm100} qrLogoSize={48}/>
          </div>
        </div>
        <Modalbox ref="modal"
          className="Home-modalbox" 
          cancelText="取消"
          okText="确定"
          okClick={this.ok}
          cancelClick={this.cancel}>
          <div key="hd" className="title_name">哈哈哈哈</div>
          <div key= "bd" className="dody_name">你是一个大好人</div>
        </Modalbox>
        <Modalbox ref="modalbox" okClick={this.ok} cancelClick={this.cancel}></Modalbox>
        <Editor ref='editor' />
        <div dangerouslySetInnerHTML={{__html: this.state.inhtml}}></div>
      </div>
    );
  }
}

export default Home;
