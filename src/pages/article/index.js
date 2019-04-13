import React from 'react'
import { Button, Input, Table, Divider } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less'
import { REQUEST_LIST } from '../../reducers/article'
import moment from 'moment'

const Search = Input.Search;
@connect(({ article }) => ({ article }))
export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 15
    }
  }
  componentDidMount() {
    this.getList()
  }
  getList = () => {
    this.props.dispatch({
      type: REQUEST_LIST
    })
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
        render: (val) => {
          return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
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
  onAdd = () => {
    this.props.history.push('/article/new/0')
  }
  render() {
    const { list, total } = this.props.article;
    return (
      <div>
        <div className={styles.search}>
          <Search
            placeholder="请输入账号名称"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={this.onAdd}>新增文章</Button>
        </div>
        <Table
          columns={this.renderColumns()}
          dataSource={list}
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: true,
            total: total,
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