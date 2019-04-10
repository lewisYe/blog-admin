import React from 'react'
import { Button, Input, Table, Divider } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less'

const Search = Input.Search;

export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 15
    }
  }
  renderColumns = () => {
    return (
      [{
        title: '文章名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">发布</a>
            <Divider type="vertical" />
            <a href="javascript:;">下线</a>
            <Divider type="vertical" />
            <a href="javascript:;">编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        ),
      }]
    )
  }
  onPageNoChange = (page, pageSize) => {

  }
  onPageSizeChange = (current, size) => {

  }
  render() {
    const data = [{
      name: '叶斌',
      tags: 18368493612,
      createTime: '2019-4-10 11:30:31',
      status: 0
    }]
    return (
      <div>
        <div className={styles.search}>
          <Search
            placeholder="请输入账号名称"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <Button type="primary">新增文章</Button>
        </div>
        <Table
          columns={this.renderColumns()}
          dataSource={data}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: true,
            total: 10,
            showTotal: (total) => `总共${total}条`,
            current: this.state.pageNo,
            pageSize: this.state.pageSize,
            onChange: (page, pageSize) => {
              this.onPageNoChange(page, pageSize)
            },
            onShowSizeChange: (current, size) => {
              this.onPageSizeChange(current, size)
            }
          }}
        />
      </div>
    )
  }
}