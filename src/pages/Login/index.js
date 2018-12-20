import React, { Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css'
import router from 'umi/router'
const FormItem = Form.Item;
class Login extends Component {
    state={
        loading:false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading:true
        })
        this.props.form.validateFields((err, values) => {
          if (!err) {
            window.g_app._store.dispatch({
                type:'user/login',
                payload:'weizhan',
                callback: () => {
                    router.push('/')
                }
            
            })
          }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                {/* <div className="example">
                    <Spin />
                </div> */}
                <div style={{height:'500px',width:'350px',border:'1px solid #EEEEEE'}}>
                
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px',margin:'0 auto',marginTop:'100px'}}>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a style={{float:'right'}} href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}} loading={this.state.loading}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                    </FormItem>
                </Form>
 
                </div>
            </div>
        )
    }
}

export default Form.create()(Login);