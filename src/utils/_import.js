 export function _import(file){
    return () => import('@/views' + file + '.vue')
}

