import React, {Component, useState} from 'react'
import {Modal, Button, Table, message, Space, Input} from 'antd'
import {adminApi, systemApi} from './../../../api'
import CustomModal from './components/Modal'
import {returnColumns} from './const'
import AddForm from "../../Admin/addForm";
import Search from "antd/es/input/Search";
const {changeUserStatus} = systemApi
const rowHeight = 90
let username = ''
class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      visible: false
    }
    this.columns = returnColumns(this)
  }

  handlerClick = (text, recode, index) => {
    console.log(text, recode, index)
  }
  deleteDate = (text) => {
    console.log(text)
    const {deleteUser} = systemApi
    if (text && text.uid) {
      deleteUser(text.uid).then(res => {
        if (res.code == 2000){
          this.componentDidMount()
        }
      })
    }
  }
  changeDate = (field,userId,value) => {
    console.log(field,userId,value,'field,userId,value')
    systemApi.changeDates({field,userId,value}).then(res => {
      console.log(res)
    })
  }
  toggleModalVisiable = (record) => {
    console.log(record,'aaaaaaaaa')
    const {visible} = this.state
    const data = this.data
    const {getUserInfo} = systemApi
    this.setState({
      visible: !visible,
      data: data
    })
    if (record && record.uid) {
      getUserInfo(record.uid).then(res => {
        if (res.code == '200'){
          console.log(res)
        }
      })
    }
  }
  handleChangeStatus = (record, index) => {
    const {userList} = this.state
    const newUserList = JSON.parse(JSON.stringify(userList))
    const originStatus = userList[index].status
    const nowStatus = originStatus === 0 ? 1 : 0
    newUserList[index].status = nowStatus
    const params = {
      uid: record.uid,
      status: nowStatus
    }
    changeUserStatus(params).then(res => {
      const {code} = res.data
      if (res.status < 400 && code === 2000) {
        message.success('修改成功！')
        this.setState({
          userList: newUserList
        })
      }
    })
  }

  render() {
    const {visible, userList} = this.state
    const layouContent = document.querySelector('.ant-layout-content')
    const layouContentHeight = layouContent ? layouContent.offsetHeight : '600'
    const pageSize = Math.round(layouContentHeight / rowHeight)
    const onSearch = value => console.log(value);
    const pagination = {
      pageSize,
      total: userList.length,
      showTotal: total => `共 ${total} 条数据`
    }
    this.getData = e => {
      const {value} = e.target;
      console.log(value,'输入的值')
      username = value
    }
    this.searchData = e => {
      if (username == null || username == ''){
        this.componentDidMount()
      } else {
        const {getUserByName} = systemApi
        getUserByName(username).then(res => {
          const {data, code} = res.data
          if (res.status < 400 && code === 2000) {
            data.userList.forEach(item => {
              item.address = item.province.name + item.city.name
              item.loginSetting = item.loginSetting ? item.loginSetting : {}
            })
            this.setState({
              userList: data.userList
            })
          }
        })
      }
    }
    return (
        <div className="user-edit-page">
          <Space direction="vertical">
            <div>
              <Space>
                <Input onPressEnter={this.searchData} onChange={this.getData} placeholder="请输入账号" style={{ width: 400 }}/>
                <Button type="primary" onClick={this.searchData}>搜索</Button>
              </Space>
            </div>
            <Table pagination={pagination} rowKey={i => i.uid} columns={this.columns} dataSource={userList}
            />
            <CustomModal visible={visible} toggle={this.toggleModalVisiable}/>
          </Space>
        </div>
    )
  }
  componentDidMount() {
    const {getAllUser} = systemApi
    getAllUser().then(res => {
      const {data, code} = res.data
      if (res.status < 400 && code === 2000) {
        data.userList.forEach(item => {
          item.address = item.province.name + item.city.name
          item.loginSetting = item.loginSetting ? item.loginSetting : {}
        })
        this.setState({
          userList: data.userList
        })
      }
    })
  }
}

export default EditUser
