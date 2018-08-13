import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './styles/public/reset.css';                      // 重置标签样式
import './styles/public/common.css';                     // 公共样式表
import './styles/index.scss'                             // 使用scss编译
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApiService from "./services/http";
// 将axios服务挂在到 react下
React.http = new ApiService();
ReactDOM.render(
    <BrowserRouter>
       <App />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
