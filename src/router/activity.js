/**
 * 活动模块文件
 * User: hjm100
 * Date: 18-08-14 10:10
 */
import BagWheel from '../views/activity/BagWheel'
 // 路由配置
const ACTIVITY_ROUTER = [
    {path: "/activity/bagWheel",exact: true,title: "大转盘",component: BagWheel},
];

export default ACTIVITY_ROUTER;