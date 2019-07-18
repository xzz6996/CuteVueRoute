const mutations={
    SET_ROUTERS(state, routers){
        state.asyncRouters = routers;
    },
    SET_LoginKey(state, LoginKey){
        state.LoginKey = LoginKey;       
    }
}
export default mutations;