import axios from "axios";
import qs from "qs";                    // form格式数据转换 【如果你的后台支持使用josin数据这个地方将不需要】
import errorcode from "./errcode.js";   // 错误码
import {Toast} from 'antd-mobile';      // 引入加载组件
import user from "./user.js";           // uesr模块下的接口数据结构

const hostname = "/api/";                // api路径
const reqAndUrl = Object.assign(user);   // 合并数据
class ApiService {
  getSessionData(sessionItem) { // 获取sessionStorage（会话级别的本地保存）
    let sessionValue = sessionStorage.getItem(sessionItem);
    if (!sessionValue) this.setSessionData(sessionItem, JSON.stringify({}));
    sessionValue = sessionStorage.getItem(sessionItem);
    return JSON.parse(sessionValue);
  }
  setSessionData(sessionItem, sessionValue) { // 设置sessionStorage
    if (sessionValue instanceof Object) return sessionStorage.setItem(sessionItem, JSON.stringify(sessionValue));
    sessionStorage.setItem(sessionItem, sessionValue);
  }
  removeSessionData(sessionItem) { // 删除sessionStorage
    sessionStorage.removeItem(sessionItem);
  }
  getLocalData(localItem) { // 获取localStorage （持久化本地存储）
    let localValue = localStorage.getItem(localItem);
    if (!localValue) this.setLocalData(localItem, JSON.stringify({}));
    localValue = localStorage.getItem(localItem);
    return JSON.parse(localValue);
  }
  setLocalData(localItem, localValue) { // 设置localStorage （持久化本地存储）
    if (localValue instanceof Object) return localStorage.setItem(localItem, JSON.stringify(localValue));
    localStorage.setItem(localItem, localValue);
  }
  removeLocalData(localItem) { // 设置删除 （持久化本地存储）
    localStorage.removeItem(localItem);
  }
}

// 执行特殊错误信息
let errorCatch = (code, msg) => {
  switch (code) {
    case 100001:
      window.location.href = "/err"
      break;
    case code: // 如果存在错误码则抛出错误信息或者 "接口404"
      Toast.fail(msg || "接口404");
      break;
    default:
      return false;
  }
};

//添加一个请求拦截器(这里可以进行token验证以及执行加载loading操作)
axios.interceptors.request.use(
  function (config) { // 发送请求之前做一些事情 【一般定义加载提示】
    Toast.loading('加载中...', 0); // 执行加载动画
    return config;
  },
  function (error) { // 挂掉之后怎么处理
    return Promise.reject(error);
  }
);

//添加一个响应拦截器
axios.interceptors.response.use(
  function (res) { // 返回的数据成功时做一些事
    Toast.hide(); // 关闭加载动画
    if (res.data.code !== 0) { // 处理错误码（错误码为0时表示成功）
      return Promise.reject({ // 抛出错误信息
        code: res.data.code,
        msg: errorcode[res.data.code] || res.data.msg // 先在errcode中寻找，没有的话直接抛出后端错误信息
      });
    }
    return res;
  },
  function (error) { // 处理错误的内容
    Toast.hide();
    Toast.fail("请稍后再试");
  }
);
// 数据结构 (对象key值对应接口的模块名,value值对应此模块下的接口名)
// let reqAndUrl = {
//   '模块名'：["接口名1","接口名2"]
//   'user':["getUserInfo", "list"]
//    ...
// }
for (let key in reqAndUrl) { // 方法挂载
  ApiService.prototype[key] = {}; // 将模块名当做对象挂载到ApiService中
  for (let reqURL of reqAndUrl[key]) { // 将数组中的每一项传递进来为请求的url
    // 创建请求方法
    // method   设置请求方法   （默认为get形式）
    // data     请求携带数据  
    // config   自定义请求配置 （ 如文件中上传时需要使用 headers: { "Content-Type": "multipart/form-data" }）
    ApiService.prototype[key][reqURL] = function (method = 'get', data, config = {}) { // 基于请求名创建方法
      let queryData = data;
      // 判断请求方式与是否有配置
      if (method === "post" && Object.keys(config).length === 0) queryData = qs.stringify(data);
      if (method === "get") { // get携带数据
        queryData = {
          params: data
        };
      }
      return axios[method](hostname + key + "/" + reqURL, queryData, config) // 发送axios请求
        .then(res => { // 抛出数据                                           
          return res.data;
        })
        .catch(data => { // 如果错误码0则抛出错误信息
          errorCatch(data.code, data.msg); // 执行错误方法
          return Promise.reject(data);
        });
    };
  }
}
export default ApiService;


/** 使用：
 * 一、 使用前准备
 *  1. 接口录入，错误码录入   格式见           user.js errcode.js
 *  2. http.js 文件引入接口合并请求链接        const reqAndUrl = Object.assign(user);
 *  3. 设置请求前置链接                       const hostname = "/api/";
 *  4. 将其new ApiService()挂在到 react下     【在index.js中挂载】 
 *     如果你用的是vue没关系用法相同，只不过是要将其挂载到vue全局下
 *     import ApiService from "./services/http";
 *     React.http = new ApiService();
 * 二、使用
 *  1. 请求接口（默认为get方法）
 *    1) post请求   请求路径为  http://localhost:5100/api/user/getUserInfo
 *       React.http.user.list('post'{
 *         name:'hjm100',
 *         age:'24'
 *       }).then(res => {
 *         console.log(res)
 *       }).catch((err)=>{       // 错误后执行的方法
 *         console.log(err)      // 这里为请求成功时的错误信息
 *       })
 *    2) get请求
 *       React.http.user.list().then(res => {
 *         console.log(res)
 *       })
 *    3) get 带数据（不常用） -- 数据格式  ?name='hjm100'&age='24' （可能用到支付）
 *       React.http.user.list('get'{
 *         name:'hjm100',
 *         age:'24'
 *       }).then(res => {
 *         console.log(res)
 *       })
 *    4) 上传图片使用
 *       let uploadImg = (data, name, callBack) => {
 *         let config = {
 *           headers: { "Content-Type": "multipart/form-data" }
 *         };
 *         let formData = new FormData();
 *         formData.append("file", data, name);
 *         React.http.resource.uploadImg(formData, "post", config).then(res => {
 *           let data = res.data;
 *           callBack(data.src[0]);
 *         });
 *       };
 *****  对图片进行压缩，如果图片小于200kb直接上传，如果大于等于200则压缩后再上传     
 *      React.upload = (file, callBack) => {
 *       let maxSize = 300 * 1024;
 *       let dataURI = file.content;
 *       let imgSize = dataURI.length;
 *       if (imgSize > maxSize) {
 *         let radio = maxSize / imgSize;
 *         new ImageCompressor(file.file, {
 *           quality: radio,
 *           convertSize: 1000000,
 *           success(newFile) {
 *             uploadImg(newFile, newFile.name, callBack);
 *           }
 *         });
 *         return;
 *       }
 *       let data = file.file;
 *       uploadImg(data, data.name, callBack);
 *     };
 */