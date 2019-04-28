import React from 'react'
import { Form, Input, Button, Select, Modal, message } from 'antd';
import marked from 'marked'
import styles from './index.less'
import { connect } from 'react-redux';
import { CREATE_ARTICLE } from '../../reducers/article'
import { REQUEST_LIST } from '../../reducers/tags';
import { promiseBindDispatch } from '../../util';

const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
@connect(({ article,tag }) => ({ article,tag }))
export default class NewEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      content: null
    }
    this.Dispatch = promiseBindDispatch(props.dispatch)
  }
  componentDidMount(){
    this.props.dispatch({
      type:REQUEST_LIST
    })
  }
  handleSave = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.Dispatch({
          type: CREATE_ARTICLE,
          payload: {
            name: values.name,
            content: values.content,
            tags: values.tags
          }
        }).then(res=>{
          message.success('新增成功')
          this.props.history.push('/article')
        })
      }
    });
  }
  onReview = () => {
    let value = this.props.form.getFieldValue('content')
    if (!value) {
      message.destroy();
      message.info('文章内容不能为空');
    } else {
      let content = value && marked(value);
      this.setState({
        visible: true,
        content: content
      })
    }
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { tags } = this.props.tag;
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="文章标题"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入文章标题'
              }]
            })(
              <Input placeholder='请输入文章标题' />
            )}
          </Form.Item>
          <Form.Item
            label="文章内容"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 16 },
            }}
          >
            {getFieldDecorator('content', {
              rules: [{
                required: true, message: '请输入文章内容'
              }]
            })(
              <TextArea rows={20} placeholder='请以Markdown格式填写文章内容' />
            )}
          </Form.Item>
          <Form.Item
            label="文章分类"
          >
            {getFieldDecorator('tags', {
              rules: [{
                required: true, message: '请选择文章分类'
              }]
            })(
              <Select
                mode="multiple"
                placeholder='请选择文章分类'
              >
              {
                tags&&tags.map((tag,index)=>{
                  return  <Option key={tag._id}>{tag.name}</Option>
                })
              }
              </Select>,
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 6, offset: 2 },
            }}
          >
            <Button type="primary" onClick={this.handleSave}>保存</Button> <Button type="primary" onClick={this.onReview}>预览</Button>
          </Form.Item>
        </Form>
        <Modal
          visible={this.state.visible}
          footer={null}
          wrapClassName={styles.modal}
          onCancel={this.onCancel}
        >
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
        </Modal>
      </div>
    )
  }
}
