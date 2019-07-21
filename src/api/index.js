import request from '@/utils/request'

// PostData(Url,null||{},null||{})  
// 公共的post方法
export function PostData(Url,Params,Data){
    return request({
        url: Url,
        method: 'post',
        params: Params,
        data: Data
    })
}

// getData(Url,null,{})
// getData(null,GetPowerCarTreeByStep,{})

// 公共的get方法
export function GetData(Url,Name,Params){
    return request({
        url: Url?Url:match(Name),
        method: 'get',
        params: Params?Params:null
    })
}
 
