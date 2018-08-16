
//为了区分开每个模块
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

const routecss = (state="left", action) => {
    switch (action.type) {
        case 'left':
            return "left"
        case 'right':
            return "right"
        default :
            return state
    }
}

//把一个由多个不同 reducer 函数作为 value 的 object，
//合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
const todoApp = combineReducers({
    routecss,
    user
})  

export default todoApp;