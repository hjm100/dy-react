import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router/router.config'
import './styles/App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Route path="/" component={Layout}></Route>
    );
  }
}

export default App;
class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      transitionName:'transitionWrapperPush'
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    //通过监听组件变化来给根目录加样式
    if(nextProps.history.action==="PUSH"){  //进入
      console.log('进入')
      // document.getElementById('root').classList.remove("slide-left-enter");
    }else if(nextProps.history.action === "POP"){ //走出
      console.log('出来')
      // document.getElementById('root').classList.add("slide-left-enter")
    }
 }
  render() {
      return (
        renderRoutes(routes)
      );
  }
}