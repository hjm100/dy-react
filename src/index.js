import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todoApp from './store/reducers'
import './styles/public/reset.css';                      // 重置标签样式
import './styles/public/common.css';                     // 公共样式表
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApiService from "./services/http";
// 将axios服务挂在到 react下
React.http = new ApiService();

window.store = ((preloadedState) => {
    return createStore(
        todoApp,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
})() 

ReactDOM.render(<App store={window.store}/>, document.getElementById('app'));
registerServiceWorker();
