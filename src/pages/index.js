import React, { Component} from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd';
import './index.css'
import Link from 'umi/link';
import routes from '../utils/routes'
import Authorized from '../utils/Authorized'
import hasPermission from '../utils/hasPermission'
import { getCurrentRoute } from '../utils/AuthRoutes'
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class layoutComponent extends Component {
    state = {
        collapsed: false,
        openKeys:'',
        openDoubleKeys:'',
      };  
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
        //折叠的时候清空选中菜单  展开回到刚才选中的
        if(this.state.collapsed){   
            this.setState({
                openKeys: this.state.openDoubleKeys?this.state.openDoubleKeys:this.getOpenKeys(),
            });
        }else
            this.clearSubMenu()
    }
    render(){
      
        return(
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className="home-sider"
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.getRouteKey()]} openKeys={[this.state.openKeys?this.state.openKeys:this.getOpenKeys()]} onSelect={this.nowSelect}>
                        {this.getMenu()}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} className="home-header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        {this.getUserMenu()}
                    </Header>
                    
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }} className={this.state.class}>                          
                        <Authorized authPath={this.props.location.pathname}>{this.props.children}</Authorized>
                    </Content>
                    
                </Layout>
            </Layout>
        )
    }
    nowSelect=({ item, key, selectedKeys })=>{   //当选择的是一级菜单的时候 关闭其他打开的submenu
        if(key.split('/').length>2)
            return
        this.clearSubMenu()   
    }
    //路由菜单-----------------------------------------------------------------------------
    getRouteKey(){//根据路径名称得到选中的菜单
        return this.props.location.pathname
    }
    getOpenKeys(){//第一次进来 根据地址栏 获取默认选中菜单
        let route = getCurrentRoute(routes,this.props.location.pathname)[0]//获取当前路由地址下的对应路由表的信息
        return route?route.fatherKey:''
    }
    openSubMenu=({ key, domEvent })=>{//当前打开的submenu 关闭其他展开的
        let openkey = this.state.openKeys
        if(key!==(openkey?openkey:this.getOpenKeys())){
            this.setState({
                openKeys:key,
                openDoubleKeys:key
            })
            return
        }
        this.clearSubMenu()
    }
    clearSubMenu=()=>{
        this.setState({
            openKeys:'null',
        }) 
    }
    //动态菜单--------------------------------------------------------------------
    getMenu(){
        let r = routes[1].routes
        return this.getMenuList(r)
    }
    getMenuList(menus){
        let vnode=[]
        menus.forEach(menu=>{
            if(hasPermission(menu)){
                if(!menu.routes&&menu.path&&menu.name){
                    vnode.push (
                        <Menu.Item key={menu.path}>
                            <Link to={menu.path} replace>
                                <Icon type={menu.icon} />
                                <span>{menu.name}</span>
                            </Link>         
                        </Menu.Item>
                    )         
                }
                else if(menu.routes){   
                    vnode.push(
                        <SubMenu key={menu.path} onTitleClick={this.openSubMenu} title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}>
                            {this.getMenuList(menu.routes)}
                        </SubMenu>
                    )
                }
            }   
        })
        return vnode
    }
    getUserMenu = () =>{
        const state = window.g_app._store.getState()
        console.log(state)
        return (
            <span className='user-info-menu'>
                <Avatar size={32} src={state.user.avatar} />
                <span className=''>weizhan</span>
            </span>
        )
    }
}

export default layoutComponent