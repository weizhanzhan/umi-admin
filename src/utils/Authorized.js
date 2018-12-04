//权限校验
import react, { Component } from 'react'
import hasPermission from './hasPermission'
import { message } from 'antd';
import Redirect from 'umi/redirect';
import routes from './routes'
import { getCurrentRoute } from './AuthRoutes'
class Authorized extends Component{
    render(){
        return this.auth()  
    }
    auth(){//路由权限
        const state = window.g_app._store.getState().user//获取全局user信息
        if(state.token||localStorage.token){//判断有没有token
            if(hasPermission(getCurrentRoute(routes,this.props.authPath)[0]))//判断进入的路由是否有权限，其实只要是用来判断地址栏输入非该角色权限的地址非法进入，路由表是已经根据权限分配好的
                return this.props.children
            else{
                setTimeout(()=>{
                    message.error('你没有操作权限')
                },0)
                return <Redirect to="/" />
            }
        }else {
            return <Redirect to="/login" />
        }
    }
}
export default Authorized