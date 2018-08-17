import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//获取方法(设置的时候需要引入，获取的时候直接获取即可)
import {Setuser} from '../store/action'
import hjm100 from '../assets/hjm100.png'
import hjm from '../assets/hjm.png'
// 使用外部css文件表
import '../styles/views/Home.css'
import Qrcode from '../components/Qrcode'
import ImgShear from '../components/ImgShear'
class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user:{}
    };
  }
  // 该方法在首次渲染之前调用
  componentWillMount (){
    //初始化信息
    this.getStoreUser()
  }

  getImgUrl=(imgurl)=>{
    //再此处执行一个修改图片的ajax请求
    console.log(imgurl)
  }
  //通过js跳转路由
  goAddress=()=>{
    this.props.history.push({
      pathname: '/set/edit/address',
    })
  }
  setStoreUser=()=>{
    let nameVal = this.refs.name_input.value
    let phoneVal = this.refs.phone_input.value
    React.store.dispatch(Setuser('name',nameVal))
    React.store.dispatch(Setuser('phone',phoneVal))
    this.getStoreUser()
  }
  getStoreUser=()=>{
    this.setState({ 
      user:React.store.getState().user
    })
  }
  // 该方法会创建一个虚拟DOM，用来表示组件的输出。
  render() {
    return (
      <div id="Home">
        <Link className="go_location" to="/set/edit/address">前往定位</Link>
        <header className="Home-header">
          <div className="home-img flex-center">
            <ImgShear defImg={hjm} imgWidth={200} imgHeight={200} getImgUrl={this.getImgUrl.bind(this)}/>
          </div>
          <h1 className="Home-title">Welcome to React</h1>
        </header>
        <div className="Home-qrbox flex-align">
          <div className="qr-text">
             <Qrcode qrUrl={'https://hjm100.cn'} qrText={'HJM100'}/>
          </div>
          <div className="qr-img">
             <Qrcode qrUrl={'https://www.npmjs.com/package/hjm-web-staging'} qrLogo={hjm100} qrLogoSize={48}/>
          </div>
        </div>
        <div className="storeDemo">
          <div className="inputBox flex-center">
            <input ref="name_input" type="text" name="name" placeholder="请输入姓名"/>
            <input ref="phone_input" type="text" name="phone" placeholder="请输入手机号"/>
            <button onClick={this.setStoreUser}>set store</button>
          </div>
           <p>开发者名字：{this.state.user.name}</p>
           <p>开发者电话：{this.state.user.phone}</p>
        </div>
      </div>
    );
  }
}

export default Home;
