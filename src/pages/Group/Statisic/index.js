import React, {useState, useEffect} from 'react'
import {Button, Input, Select, Space, Table} from 'antd'
import {groupApi, systemApi} from './../../../api'
import Icon from '@ant-design/icons';
import {formatDateToZH} from "../../../utils";
const { Option } = Select;
let inputData = ''
let selectData = 'code'
const columns = [
  {
    title: '群号',
    dataIndex: 'code',
    key: 'code',
    width: 100,
    fixed: 'left',
  },
  {
    title: '群名称',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    fixed: 'left',
    ellipsis: true,
  },
  {
    title: '群人数',
    dataIndex: 'userNum',
    key: 'userNum',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width: 200,
    render: (text) => (
        <span><Icon type="clock-circle"/> {formatDateToZH(text)}</span>
    )
  },
  {
    title: '群主账号',
    dataIndex: 'holderName',
    key: 'holderName',
    width: 200,
  },
  {
    title: '群描述',
    dataIndex: 'desc',
    key: 'desc',
    width: 300,
    ellipsis: true,
  },
];

export default function GroupStatics(props) {
  const [groupList, setGroupList] = useState([])
  let values = ''
  useEffect(() => {
    ;(async () => {
      const {data = {}} = await groupApi.getAllGroup()
      console.log(data)
      if (data.code === 2000) {
        setGroupList(data.data.allGroup)
      }
    })()
  }, [])
  const getData = e => {
    const {value} = e.target;
    console.log(value,'输入的值')
    values = value
  }
  const getSelectData = e =>{
    selectData = e
  }
  const SearchData  = e => {
    if (values == null || values == ''){
      ;(async () => {
        const {data = {}} = await groupApi.getAllGroup()
        console.log(data)
        if (data.code === 2000) {
          setGroupList(data.data.allGroup)
        }
      })()
    } else {
      ;(async () => {
        const {data = {}} =  await groupApi.getAllGroup()
        console.log(data)
        if (data.code === 2000) {
          let datas = []
          if (selectData == 'code'){
            data.data.allGroup.forEach(item => {
            if (item.code == values){
              datas.push(item)
            }
            })
          }
          if (selectData == 'title'){
            data.data.allGroup.forEach(item => {
              if (item.title == values){
                datas.push(item)
              }
            })
          }
          if (selectData == 'holderName'){
            data.data.allGroup.forEach(item => {
              if (item.holderName == values){
                datas.push(item)
              }
            })
          }
          setGroupList(datas)
        }
      })()
    }
  }
  return (
      <div>
        <p>当前管理员</p>
        <Space direction="vertical">
        <div>
          <Space>
            <Select defaultValue="code" style={{ width: 120 }} onChange={getSelectData}>
              <Option value="code">群号</Option>
              <Option value="title">群名称</Option>
              <Option value="holderName">群主账号</Option>
            </Select>
          <Input onPressEnter={SearchData} onChange={getData} placeholder="请输入群号" style={{ width: 400 }}/>
          <Button type="primary" onClick={SearchData}>搜索</Button>
          </Space>
        </div>
        <Table rowKey={record => record.id} dataSource={groupList} columns={columns}/>
        </Space>
      </div>
  )
}
