import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题

import storage from '@/config/storage'
import '../static/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import store from './store';

const _import = require('./router/_import_')//获取组件的方法


Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

function initMenu(router, menu){
    let menus = formatRoutes(menu);
    let unfound = { path: '*', component(resolve){require(['@/components/page/404.vue'], resolve)} }
    menus.push(unfound)
    menus.forEach(item=>{router.options.routes[2].children.push(item)})
    router.addRoutes(router.options.routes);   
    console.log(router)
}

 

function formatRoutes(menu){
    const aRouter = [];
    let arr=[];
    arr.push(menu[0]);  // 测试只拿一个
    arr.push(menu[1]);

    arr.forEach(oMenu=>{
        console.log(oMenu)
            const oRouter = {
                path: '/'+oMenu.RightCode,
                component: _import(oMenu.RightUrl),
                meta: { title:`${oMenu.RightName}`},          
                // children: validatenull(childrens) ? [] : formatRoutes(childrens)
            }      
        aRouter.push(oRouter)
    })
    return aRouter
}
//使用钩子函数对路由进行权限跳转
const whiteRiuterList = ['/login']
router.beforeEach((to, from, next) => {
    const role = storage.get('LoginKey');

    if(!role && to.path !== '/login'){
        next('/login');
    } 
    else if(role){
        store.dispatch('getMenu').then(res=>{
            
            initMenu(router,store.state.asyncRouters) }
        ).catch(()=>{})
        next();
    } 
    else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        //role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{         
            next();
        }
    }

})



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');