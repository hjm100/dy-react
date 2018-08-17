import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import todoApp from './store/reducers'
import './styles/public/reset.css';                      // 重置标签样式
import './styles/public/common.css';                     // 公共样式表
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApiService from "./services/http";
// 将axios服务挂在到 react下
React.http = new ApiService();

//将存储挂载到React下以至于在任何地方都能访问到
React.store = (() => {
    //调用变量
    return createStore(
        todoApp
    )
})() 

//获取属性
// React.store.getState().routecss
//设置属性
// React.store.dispatch(action.pageGo())

ReactDOM.render(<App store={React.store}/>, document.getElementById('app'));
registerServiceWorker();
