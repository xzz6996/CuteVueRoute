# cute_dynamic_router

## 实现思路
```
1 路由跳转,先判断是否登录,未登录只能访问白名单页面,访问其他页面重定向到登录页面。
2 登录行为触发,获取动态路由，递归解析动态路由信息,然后router.addRouter(核心),
同时保存到vuex中(或者本地存储),并且记录获取路由的状态。
3 跳转页面不会获取动态路由,刷新页面重新获取路由。
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
## 解析数据-utils/dysRouter.js
```
    处理后端原始路由数据
    import { _import } from "./_import";// 获取组件的方法

/*
    处理后端数据,处理成我们需要的路由对象
*/
export function handleAsyncRouter(routerlist){
    const router=[];
    routerlist.forEach(item=>{
        let e_new={
            path: item.url,
            name: item.name,
            component: _import(item.tabId)
        }
        if(item.children){
            e_new=Object.assign({},e_new,{children:handleAsyncRouter(item.children)})
        }
        if(item.redirect){
            e_new=Object.assign({},e_new,{redirect:item.redirect})
        }
        if (item.title !== '' && item.icon === '') {
            e_new = Object.assign({}, e_new, { meta: { title: item.title }})
        }
        if (item.title === '' && item.icon !== '') {
            e_new = Object.assign({}, e_new, { meta: { icon: item.icon }})
        }
        router.push(e_new)
    })    
    return router;
}
```
## main.js
```
const whiteList =['login']; //白名单
router.beforeEach((to, from, next) => {
  if(getToken('token')){   //判断token是否存在
    if(to.path!=='/login'){
      if(store.state.routerState){ //判断路由状态,存在的话就不用发起请求
        next();
      }else{
        gotoRouter(to,next); //发起请求
      }
    }else{
      alert('您已登录');
      next('/');
    }
  }else{ //token不存在
    store.commit('changeRouterState', false); //改变路由状态
    if(whiteList.indexOf(to.path)!==-1){   // 免登陆白名单 直接进入
      next(); 
    }else{
      if(to.path!=='/login'){
        next('/login');
      }else{
        next(); 
      }
    }
  }
})

function gotoRouter(to,next){
  GetData('https://www.easy-mock.com/mock/5d33d4a2d378d9045f559bb0/example/getAsyncRouter',null,getToken()).then(res=>{
    console.log('解析后端动态路由',res.data.data);
    const asyncRouter =  handleAsyncRouter(res.data.data);
    // 一定不能写在静态路由里面，否则会出现，访问动态路由404的情况.所以在这列添加
    asyncRouter.push({ path: '*',redirect: '/404', hidden: true });
    return asyncRouter;
  }).then(asyncRouter=>{
    asyncRouter.forEach(item=>{ router.options.routes[1].children.push(item)});
    //asyncRouter.forEach(item=>{ router.options.routes.push(item)});
    router.addRoutes(asyncRouter);
    console.log('addRoutes',router)
    store.dispatch('setRouterList',asyncRouter) // 存储到vuex
    store.commit('changeRouterState', true); //改变路由状态
    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 
  })
  .catch(err=>{
    removeToken();
  })
}

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
