import React from 'react'
import { Input, Button, Table, Divider } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less'

const Search = Input.Search;

export default class Account extends React.Component {
  constructor(props) {
    super(props)
  }
  renderColumns = () => {
    return (
      [{
        title: '账号名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '手机号',
        dataIndex: 'tel',
        key: 'tel',
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">禁用</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        ),
      }]      
    )
  }
  render() {
    const data = [{
      name:'叶斌',
      tel:18368493612,
      createTime:'2019-4-10 11:30:31',
    }]
    return (
      <div>
        <div className={styles.search}>
          <Search
            placeholder="请输入账号名称"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <Button type="primary">新增账号</Button>
        </div>
        <Table
          columns={this.renderColumns()}
          dataSource={data}
        />
      </div>
    )
  }
}