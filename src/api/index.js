import request from '@/request.js'
export function getmenu(){
    return request({
        url: '/API/api/User/PowerData/GetInitInfo',
        method: 'get',
        params:null
    })
}
let params={
    UserName:"xrjt-jsb",PWD:"jsb1xrjt",CheckCode:""
}
export function checkLogin(){
    return request({
        url: '/API/api/User/Login/CheckLogin',
        method: 'post',
        data:params
    })
}