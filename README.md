# cute_dynamic_router

## 实现思路
```
1路由跳转,先判断是否登录,未登录只能访问白名单页面,访问其他页面重定向到登录页面。
2登录行为触发,获取动态路由，递归解析动态路由信息,然后router.addRouter(核心),
同时保存到vuex中(或者本地存储),并且记录获取路由的状态。
3跳转页面不会获取动态路由,刷新页面重新获取路由。
```
![image](https://github.com/xzz6996/xzz_dynamic_router/blob/master/jiejiantu.png)
## 配置基础路由-router.js 
```
const staticRouters=[
  {
    path: '/login',
    name: 'login',
    component: () => import( './views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/404',
    name: '404',
    component: () => import( './views/404.vue')
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: staticRouters
})
```
## 解析数据-utils/dysRputer.js
```
    处理后端原始路由数据,详情见 utils/dysRputer.js
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
