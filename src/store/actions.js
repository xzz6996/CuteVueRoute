import {getmenu,checkLogin} from '@/api'
import storage from '@/config/storage'

const actions={
    getMenu({ commit }, data) {
        return new Promise((resolve, reject) => {
            getmenu().then(res=>{
                commit('SET_ROUTERS', res.data.Data.FristMenuData)
                storage.set('asyncRouters',res.data.Data.FristMenuData)
                resolve(res)
            }).catch(()=>{})
        })
      },
      CheckLogin({ commit }, data) {
        return new Promise((resolve, reject) => {
            checkLogin().then(res=>{
                storage.set('LoginKey',res.data.Data.LoginKey)
                commit('SET_LoginKey', res.data.Data.LoginKey)
               resolve(res)
            }).catch(()=>{})
        })
      },
}
export default actions;