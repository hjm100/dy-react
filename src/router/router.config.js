
// 路由模块
import ErrorPage from '../views/ErrorPage'
import Public from './public'
import User from './user'
import Activity from './activity'
// 默认首页路由
const routeConfig ={
    routes: [
    /* exact用于精准匹配路径 */
    ...Public,
    ...User,
    ...Activity
    ],
    //如果页面找不到则统一找到错误页
    ErrorPage: ErrorPage
}

export default routeConfig;