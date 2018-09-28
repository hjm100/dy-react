/**
 * 用户基础权限模块
 * User: hjm100
 * Date: 18-09-28 15:00
 */
import Register from '../views/authority/Register'
 // 路由配置
const AUTHORITY_ROUTER = [
    {path: "/authority/register",exact: true,title: "注册",component: Register},
];

export default AUTHORITY_ROUTER;