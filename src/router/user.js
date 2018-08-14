/**
 * 用户信息模块
 * User: hjm100
 * Date: 18-08-14 10:10
 */

import EditAddress from '../views/user/edit/Address'

// 路由配置
const USER_ROUTER = [
    {path: "/set/edit/address", exact: true, text: "404", component: EditAddress},
];

export default USER_ROUTER;