//判断路由是否和角色属性匹配
const role = window.g_app._store.getState().user.role
function hasPermission (router){
    if(router&&router.role){ 
           
        return router.role.some(r=>{
            return r ==role
        })
    }
        
    return true
}

export default hasPermission