
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import routeConfig from '../router/router.config'
import * as action from '../store/action'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../styles/components/Layout.css';
class Layout extends Component {
    constructor(props){
      super(props);
      this.state = {};
    }
    componentWillReceiveProps(nextProps) {
      //通过监听组件变化来给根目录加样式
      if(nextProps.history.action==="PUSH"){  //进入
        window.store.dispatch(action.pageGo())
      }else if(nextProps.history.action === "POP"){ //走出
        window.store.dispatch(action.pageBack())
      }
   }
    render() {
        return (
          <Route render={({ location }) => {
            let judge=[];
            let routerELE = routeConfig.routes.map((r,index)=>{ 
              judge.push(r.path)
              return <Route location={location} key={index} exact={r.exact} path={r.path} component={r.component}/>
            })
            //如果路由不存在跳转错误页
            if(judge.indexOf(location.pathname)===-1) return <Route component={routeConfig.ErrorPage}/> 
            return (
              <ReactCSSTransitionGroup
                transitionName={window.store.getState().routecss}
                component="div"
                className="root"
                transitionEnterTimeout={3000}
                transitionLeaveTimeout={3000}>
                  <div className="rootLayout" key={location.pathname} name={location.pathname}>
                      {routerELE}
                  </div>
              </ReactCSSTransitionGroup>  
            )
          }}/>
        );
    }
  }

  export default Layout;