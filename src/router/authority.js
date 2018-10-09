/**
 * 用户基础权限模块
 * User: hjm100
 * Date: 18-09-28 15:00
 */
import Register from '../views/authority/Register'
import Login from '../views/authority/Login'
import FindPwd from '../views/authority/FindPwd'
import RegisterTips from '../views/authority/RegisterTips'
 // 路由配置
const AUTHORITY_ROUTER = [
    {path: "/authority/register",exact: true,title: "注册",component: Register},
    {path: "/authority/login",exact: true,title: "登录",component: Login},
    {path: "/authority/findPwd",exact: true,title: "忘记密码",component: FindPwd},
    {path: "/authority/registerTips",exact: true,title: "注册协议以及版权声明",component: RegisterTips},
];

export default AUTHORITY_ROUTER;