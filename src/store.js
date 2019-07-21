import Vue from 'vue'
import Vuex from 'vuex'
import {PostData,GetData} from './api/index'
import {getToken,setToken,reomoveToken} from './utils/token'
import {staticRouters} from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerState:false ,//路由状态,
    RouterList:[] //动态路由
  },
  mutations: { 
    changeRouterState(state,data){  //改变路由状态
      state.routerState=data;
    },
    set_Router(state,data){  //存储路由
      state.RouterList=data;
      console.log('vuex存储路由',state.RouterList);
    }
  },
  actions: {
    Login({commit},userParams){  //登录
      return new Promise((resolve,reject)=>{
        PostData('https://www.easy-mock.com/mock/5d33d4a2d378d9045f559bb0/example/login',null,userParams).then(res=>{
            console.log('登录成功',res.data.data)
            resolve(res);
            setToken('token',res.data.data.token);
        }).catch(error => {
          reject(error)
        })
      })
    },
    setRouterList({ commit }, routerList){ //进行路由拼接并存储
      commit('set_Router',staticRouters.concat(routerList));
    }
  }
})
