import React, { Component } from 'react'
import { Modal, Input, Form } from 'antd'

class CustomModal extends Component {
  render() {
      console.log(this.props,'this.props')
    const { visible } = this.props
    const { toggle } = this.props
    return (
      <Modal
          title="编辑用户"
          visible={visible}
          onCancel={() => {toggle()}}
        >
        <Form
            name='date'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <Form.Item label="code" name='code'>
                <Input />
            </Form.Item>
            <Form.Item label="账号" name='nickname'>
                <Input />
            </Form.Item>
            <Form.Item label="昵称" name='username'>
                <Input />
            </Form.Item>
            <Form.Item label="年龄" name='age'>
                <Input />
            </Form.Item>
            <Form.Item label="签名" name='signature'>
                <Input />
            </Form.Item>
        </Form>
        </Modal>
    )
  }
  // componentDidMount() {
  //   const { visible } = this.props
  //   if (visible) {
  //     getUserInfo()
  //   }
  // }
}

export default CustomModal
