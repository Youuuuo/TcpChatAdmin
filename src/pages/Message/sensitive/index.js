import React, {useState, useEffect} from 'react'
import Icon from '@ant-design/icons';
import {Button, Table} from 'antd'
import {systemApi} from './../../../api'

import {formatDate} from "../../../utils";

const columns = [
  // {
  //   title: '消息编号Id',
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 230,
  // },
  // {
  //   title: '消息房间号',
  //   dataIndex: 'roomId',
  //   key: 'roomId',
  //   width: 430,
  // },
  // {
  //   title: '发送者Id',
  //   dataIndex: 'senderId',
  //   key: 'senderId',
  //   width: 230,
  // },
  {
    title: '发送者账号',
    dataIndex: 'senderName',
    key: 'senderName',
    render: text => <a href={'/home/user/edit?username='+ text}>{text}</a>,
    // render: text => <a onClick={changePath(text)}>{text}</a>,
  },
  {
    title: '消息发送时间',
    dataIndex: 'time',
    key: 'time',
    render: (text) => (
        <span><Icon type="clock-circle"/> {formatDate(new Date(text), "YYYY-MM-DD HH-MM-SS")}</span>
    )
  },
  {
    title: '消息类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '消息内容',
    dataIndex: 'message',
    key: 'message',
    ellipsis: true,
  },
];

export default function Sensitive(props) {
  const [sensitiveList, setSensitiveList] = useState([])

  useEffect(() => {
    ;(async () => {
      const {data = {}} = await systemApi.getSensitiveMessageList()
      console.log(data)
      if (data.code === 2000) {
        setSensitiveList(data.data.sensitiveMessageList)
      }
    })()
  }, [])

  return (
      <div className="admin-manage-page">
        <p>当前管理员</p>
        <Table rowKey={record => record.id} dataSource={sensitiveList} columns={columns}/>
      </div>
  )
}
