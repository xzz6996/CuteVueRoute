import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/request' 
import {GetData} from './api/index'
import {handleAsyncRouter} from './utils/dysRouter'
import {getToken,removeToken} from './utils/token'
Vue.config.productionTip = false

const whiteList =['login']; //白名单
router.beforeEach((to, from, next) => {
  if(getToken()){   //判断token是否存在
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
    console.log('解析后端动态路由',res.data);
    const asyncRouter =  handleAsyncRouter(res.data);
    // 一定不能写在静态路由里面，否则会出现，访问动态路由404的情况.所以在这列添加
    asyncRouter.push({ path: '*',redirect: '/404', hidden: true });
    return asyncRouter
  }).then(res=>{
    router.addRoutes(res);//核心
    store.commit('changeRouterState', true); //改变路由状态
    store.dispatch('setRouterList',asyncRouter) // 存储到vuex
    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
  }).catch(err=>{
    removeToken();
  })
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
