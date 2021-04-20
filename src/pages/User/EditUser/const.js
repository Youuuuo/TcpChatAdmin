import React from 'react'
import Icon from '@ant-design/icons';
import {Button, Switch, Popover, Tag, Tooltip, Space, Input} from 'antd'
import {formatDate, formatSex, msToDay} from './../../../utils'

export const returnColumns = that => (
    [
      {
        title: 'code',
        width: 150,
        dataIndex: 'code',
        key: 'code',
          render: (text, record, index) => {
            return(
                <Input placeholder={text} allowClear onBlur={(event=>that.changeDate('code',record.uid,event.target.value))}/>
            )
          }
      },
      {
        title: '账号',
        width: 150,
        dataIndex: 'username',
        key: 'username',
          render: (text, record, index) => {
              return(
                  <Input placeholder={text} allowClear onBlur={(event=>that.changeDate('username',record.uid,event.target.value))}/>
              )
          }
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 180,
        ellipsis: true,
          render: (text, record, index) => {
              return(
                  <Input placeholder={text} allowClear onBlur={(event=>that.changeDate('nickname',record.uid,event.target.value))}/>
              )
          }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        ellipsis: true,
          render: (text, record, index) => {
              return(
                  <Input placeholder={text} allowClear onBlur={(event=>that.changeDate('age',record.uid,event.target.value))}/>
              )
          }
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: 100,
        render: (text) => (
            <span>{formatSex(text)}</span>
        )
      },
      {
        title: '所在地',
        dataIndex: 'address',
        key: 'address',
        width: 200,
        ellipsis: true,
      },
      {
        title: '注册时间',
        dataIndex: 'signUpTime',
        key: 'signUpTime',
        width: 200,
        render: (text) => (
            <span><Icon type="clock-circle"/> {formatDate(new Date(text), "YYYY-MM-DD")}</span>
        )
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
        width: 200,
        render: (text) => (
            <span><Icon type="clock-circle"/> {formatDate(new Date(text), "YYYY-MM-DD")}</span>
        )
      },
      {
        title: '上次登录已过去',
        dataIndex: 'lastLoginTimeToNow',
        key: 'lastLoginTimeToNow',
        width: 200,
        render: (text, record) => {
          const date = msToDay(new Date() - new Date(record.lastLoginTime), "DD-HH")
          return (
              <span style={parseInt(date) > 30 ? {'color': 'red'} : {}}>
            <Icon type="clock-circle"/> <span>{date}</span>
            <span style={{'marginLeft': '4px'}}>
              {
                parseInt(date) > 30 ? <Popover content="邮箱召回" title="召回">
                  <Icon type="phone"/>
                </Popover> : ''
              }
            </span>
          </span>
          )
        }
      },
      {
        title: '签名',
        dataIndex: 'signature',
        key: 'signature',
        width: 180,
        render: (text,record) => {
          const res = text ? text.slice(0, 7) + '...' : '暂无数据'
          return (

              <Tooltip placement="top" title={res}>
                  <Input placeholder={text} allowClear onBlur={(event=>that.changeDate('signature',record.uid,event.target.value))}/>
              </Tooltip>
          )
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (text, record, index) => {
          return (
              <span style={{'display': 'flex'}}>
            <Switch style={{'marginRight': '4px'}} onChange={() => {
              that.handleChangeStatus(record, index)
            }} checked={text === 0}/>
                {text === 0 ? <Tag color="green">正常</Tag> : <Tag color="magenta">冻结</Tag>}
          </span>
          )
        }
      },
      {
        title: '登录日志',
        dataIndex: 'loginSetting',
        key: 'loginsetting',
        width: 120,
        render: (text, record, index) => {
          const content = (
              <div>
                <p>登录系统：{text.os || '暂无此信息'}</p>
                <p>登录浏览器：{text.browser || '暂无此信息'}</p>
                <p>登录IP：{text.ip || '暂无此信息'}</p>
                <p>登录地区：{text.country || '暂无此信息'}</p>
              </div>
          )
          return (
              <Popover content={content} title="登录日志">
                <Tag color="volcano">查看登录信息</Tag>
              </Popover>
          )
        }
      },
      {
        title: '',
        key: 'operation',
        width: 100,
        render: (text, record, index) => {
              return (
                  <Button danger onClick={()=> that.deleteDate(text)}>
                      <a href="#" >删除</a>
                  </Button>
              )
        }
        //   const content = (
        //       <Space>
        //           <Button  onClick={()=> that.toggleModalVisiable(text)}>
        //             <a href="#" >编辑</a>
        //           </Button>
        //           <Button danger onClick={()=> that.deleteDate(text)}>
        //             <a href="#" >删除</a>
        //           </Button>
        //       </Space>
        //   )
        //   return (
        //       <Popover
        //           content={content}
        //           title="操作"
        //           trigger="click">
        //         <Button type="primary">编辑用户</Button>
        //       </Popover>
        //   )
        // }
      },
    ]
)
