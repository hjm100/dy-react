import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import hjm100 from '../assets/hjm100.png'
import hjm from '../assets/hjm.png'
// 使用外部css文件表
import '../styles/views/Home.css'
import Qrcode from '../components/Qrcode'
import ImgShear from '../components/ImgShear'
class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  // 该方法在首次渲染之前调用
  componentWillMount (){}

  getImgUrl=(imgurl)=>{
    //再此处执行一个修改图片的ajax请求
    console.log(imgurl)
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
      </div>
    );
  }
}

export default Home;
