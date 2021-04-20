import React, {Component} from 'react'
import Icon from '@ant-design/icons';
import {Input, Button,} from 'antd'

class RegisterForm extends Component {
  render() {
    return (
        <div className="login-form">
          <div className="form-item">
            <Input prefix={<Icon type="user"/>}></Input>
          </div>
          <div className="form-item">
            <Input.Password prefix={<Icon type="lock"/>}/>
          </div>
          <div className="form-item">
            <Input.Password prefix={<Icon type="lock"/>}/>
          </div>
          <div className="form-item cvcode">
            <Input prefix={<Icon type="lock"/>}/>
            <div>验证码</div>
          </div>
          <div className="form-item">
            <Button type="primary" block>注册</Button>
          </div>
        </div>
    )
  }
}

export default RegisterForm
