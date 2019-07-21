 const _import=require('./_import') // 获取组件的方法
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