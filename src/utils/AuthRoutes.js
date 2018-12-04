export const getCurrentRoute = (arr,path) =>{//获取当前路由地址下的对应路由表的信息
    let name=[]
    arr.forEach(a=>{
        if(a.path==path){
            name.push(a)
        }
        if(a.routes){
            name.push(...getCurrentRoute(a.routes,path))
        }
    })
    return name
}