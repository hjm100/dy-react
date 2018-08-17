# redux在react中的使用

## 概括

1. 写过vue项目你一定会用到vuex做状态管理，状态管理的好处是，在一个地方设置数据

1. 所有地方都能访问到,但是状态管理有个缺陷就是刷新页面的时候，数据会丢失，

1. 所以你需要同本地存储结合起来使用，本文旨在分享redux使用中的重要代码，

1. 关于redux的API请自行查找了解

## 用法

1. action 发出做某件事的请求，本身不做任何逻辑处理，只是一个纯函数（在js中就是一个普通的对象）

1. action 内必须使用一个字符串类型的type字段来表示将要执行的动作

```js
//  action.js 
export const Setuser = (key,val) => {
    return {
        type:"user",
        key:key,
        value:val
    }
}

```

1. action发出了做某件事的请求，只是描述了要做某件事，并没有去改变state来更新界面

1. reducer就是根据action的type来处理不同的事件（type唯一，不要重复）。

1. reducer 也是一个普通的函数，传入的两个参数，state是当前的数据，action就是需要处理的事件。

1. 接收action和当前的state，返回新的state。

```js
// reducers.js
import { combineReducers } from 'redux'
//结合本地存储来解决刷新页面数据丢失的问题
//将字符串变为对象（获取数据如果没有就赋值为空对象）
let redux_data = JSON.parse(localStorage.getItem("redux_data")) || {}

//设置数据的方法
let setData = (name,data) => {
    let obj = localStorage.getItem("redux_data") ? JSON.parse(localStorage.getItem("redux_data")) : {}
    //添加新数据
    obj[name] = data
    localStorage.setItem("redux_data",JSON.stringify(obj))
}

const user = (state=redux_data.user || {},action) => {
    let userData;
    switch(action.type){
        case "user":
           userData = {
                ...state,
                [action.key]:action.value
            }
            setData("user",userData)
            return userData
        default :
           userData = state
            setData("user",userData)
            return userData
    }
}

//把一个由多个不同 reducer 函数作为 value 的 object，
//合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
const todoApp = combineReducers({
    user
})  

export default todoApp;

```

1. 在index.js下将Store挂载到React下

```js
import { createStore} from 'redux'
import todoApp from './store/reducers'

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

```

1. 使用和获取

```js
  setStoreUser=()=>{
    let nameVal = this.refs.name_input.value
    let phoneVal = this.refs.phone_input.value
    //设置用户信息
    React.store.dispatch(Setuser('name',nameVal))
    React.store.dispatch(Setuser('phone',phoneVal))
    this.getStoreUser()
  }
  getStoreUser=()=>{
    this.setState({ 
      //调用用户信息
      user:React.store.getState().user
    })
  }
```


## 总结

1. store：通过以上内容，我们知道了action来描述“发生了什么”，和使用reducers来根据 action 更新 state 的用法。

1. Store就是把它们联系到一起的对象，提供dispatch(action)方法更新 state，还有个getState方法获取state。