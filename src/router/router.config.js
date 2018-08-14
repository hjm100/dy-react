
// 路由模块
import Home from '../views/Home'
import ErrorPage from '../views/ErrorPage'
import Public from './public'
import User from './user'
// 默认首页路由
const route =[
    /* exact用于精准匹配路径 */
    {path: "/",exact: true,title: "首页", component: Home},
    ...Public,
    ...User,
    //如果页面找不到则统一找到错误页
    {component: ErrorPage},
]

export default route;