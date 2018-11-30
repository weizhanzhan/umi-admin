import React, { Component} from 'react'
import { Layout, Menu, Icon } from 'antd';
import './index.css'
import Redirect from 'umi/redirect';
import Link from 'umi/link';
import routes from '../utils/routes'
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class layoutComponent extends Component {
    state = {
        collapsed: false,
      };
    
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.getRouteKey()]} defaultOpenKeys={[this.getOpenKeys()]}>
                        <Menu.Item key="/dashboard">
                            <Link to='/dashboard' replace>
                                <Icon type="user" />
                                <span>dashBoard</span>
                            </Link>
                            
                        </Menu.Item>
                        <Menu.Item key="/users">
                            <Link to='/users' replace>
                                <Icon type="video-camera" />
                                <span>User</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="/setting" title={<span><Icon type="appstore" /><span>Setting</span></span>}>
                            <Menu.Item key="/setting/user">
                                <Link to='/setting/user' replace>
                                    <span>user-setting</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/setting/theme">
                                <Link to='/setting/theme' replace>
                                    <span>theme-setting</span>
                                </Link>
                            </Menu.Item>
                            {/* <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu> */}
                        </SubMenu>
                        <SubMenu key="/blog" title={<span><Icon type="appstore" /><span>Blog</span></span>}>
                            <Menu.Item key="/blog/admin">
                                <Link to='/blog/admin' replace>
                                    <span>blog-admin</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/blog/classify">
                                <Link to='/blog/classify' replace>
                                    <span>blog-classify</span>
                                </Link>
                            </Menu.Item>
                            {/* <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu> */}
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} className="home-header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        { this.auth() }
                    </Content>
                </Layout>
            </Layout>
        )
    }
    auth(){
        const state = window.g_app._store.getState().user
        if(state.token||localStorage.token){
            return this.props.children
        }else {
            return <Redirect to="/login" />
        }
    }
    getRouteKey(){
        return this.props.location.pathname
    }
    getOpenKeys(){
        console.log(routes)
        return this.getKeys(routes)[0]?this.getKeys(routes)[0].fatherKey:''

    }
    getKeys(arr){
        let path = this.props.location.pathname
        let name=[]
        arr.forEach(a=>{
           if(a.path==path){
                name.push(a)
           }
           if(a.routes){
                name.push(...this.getKeys(a.routes))
           }
        })
        return name
    }
}

export default layoutComponent