import storage from '@/config/storage'
const state={
    asyncRouters :storage.get('asyncRouters')||[],
    LoginKey:storage.get('LoginKey')
}
export default state