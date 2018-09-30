/**
 * 用户基础权限模块
 * User: hjm100
 * Date: 18-09-28 15:00
 */
import Register from '../views/authority/Register'
import Login from '../views/authority/Login'
 // 路由配置
const AUTHORITY_ROUTER = [
    {path: "/authority/register",exact: true,title: "注册",component: Register},
    {path: "/authority/login",exact: true,title: "登录",component: Login},
];

export default AUTHORITY_ROUTER;