/**
 * 公共模块文件
 * User: hjm100
 * Date: 18-08-14 10:10
 */
import Home from '../views/Home'
 // 路由配置
const PUBLIC_ROUTER = [
    {path: "/",exact: true,title: "首页",component: Home},
];

export default PUBLIC_ROUTER;