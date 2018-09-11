const router = require('koa-router')();
const koaBody = require('koa-body');
let Mock = require('mockjs')
router.get('/api/user/list', async (ctx, next) => {
    ctx.body = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-1000': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'name': '鸿基梦',
        }],
        code: 0,
        msg: '请求成功'
    })
})

router.get('/api/user/getUserInfo', async (ctx, next) => {
    ctx.body = Mock.mock({
        data: [{
                "id": 1,
                "title": "鸿基梦",
                "url": 'http://hjm100.cn',
            },{
                "id": 2,
                "title": "About",
                "url": 'https://hjm100.cn/about/',
            },{
                "id": 3,
                "title": "Blog",
                "url": 'https://hjm100.cn/Blogs',
            },{
                "id": 4,
                "title": "Github",
                "url": 'https://github.com/hjm100',
            },
        ],
        code: 0,
        msg: '请求成功'  
    })
})

router.post('/api/user/upload',async (ctx, next) => {
    ctx.body = Mock.mock({
        code: 0,
        msg: '请求成功',
        "url": "http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg"
    })
})


router.get('/api/activity/bagWheelGoods', async (ctx, next) => {
    ctx.body = Mock.mock({
        'wheelGoods|12': [{
            'id|+1': 0,
            'name': '鸿基梦',
        }],
        code: 0,
        msg: '请求成功'
    })
})

router.get('/api/activity/getPrize', async (ctx, next) => {
    ctx.body = Mock.mock({
        'prize': {
            'id': Math.floor ( Math.random ()*12),
            'name': '鸿基梦',
        },
        code: 0,
        msg: '请求成功'
    })
})

module.exports = router