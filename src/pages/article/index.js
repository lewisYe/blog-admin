import React from 'react'
import { Button, Input, Table, Divider, Tag, message } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less'
import { REQUEST_LIST, DELETE_ARTICLE } from '../../reducers/article'
import moment from 'moment'
import { promiseBindDispatch } from '../../util'

const Search = Input.Search;
@connect(({ article }) => ({ article }))
export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 15
    }
    this.Dispatch = promiseBindDispatch(props.dispatch)
  }
  componentDidMount() {
    this.getList(1,15)
  }
  getList = (pageNo,pageSize) => {
    this.props.dispatch({
      type: REQUEST_LIST,
      payload:{
        name:'1',
        pageNo:pageNo,
        pageSize:pageSize
      }
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
        render: (val) => {
          return <Tag>{val}</Tag>
        }
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
        render: (val) => {
         if(val){
           return '已发布'
         }else{
           return '未发布'
         }
        }
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
            <a href="javascript:;" onClick={()=>this.handleDelete(record._id)}>删除</a>
          </span>
        ),
      }]
    )
  }
  onPageNoChange = (page, pageSize) => {
    this.setState({
      pageNo:page
    })
    this.getList(page,pageSize)
  }
  onPageSizeChange = (current, size) => {
    this.setState({
      pageSize:size
    })
    this.getList(current,size)
  }
  onAdd = () => {
    this.props.history.push('/article/new/0')
  }
  handleDelete = (id) => {
    this.Dispatch({
      type:DELETE_ARTICLE,
      payload:{
        id:id
      }
    }).then(res=>{
      message.destroy();
      message.success('删除成功');
      this.setState({
        pageNo:1
      })
      this.getList(1,this.state.pageSize)
    })
  }
  render() {
    const { list, total } = this.props.article;
    return (
      <div>
        <div className={styles.search}>
          <Search
            placeholder="请输入文章名称"
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