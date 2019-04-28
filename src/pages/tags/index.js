import React from 'react'
import { Tag, Input, Tooltip, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { promiseBindDispatch } from '../../util';
import { CREATE_TAG, REQUEST_LIST,DELETE_TAG } from '../../reducers/tags';

@connect(({ tag }) => ({ tag }))
export default class Tags extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
    };
    this.Dispatch = promiseBindDispatch(props.dispatch)
  }

  componentDidMount() {
    this.getTagList()
  }

  getTagList = () => {
    this.props.dispatch({
      type: REQUEST_LIST
    })
  }

  handleClose = (id) => {
    this.Dispatch({
      type: DELETE_TAG,
      payload:{
        id:id
      }
    }).then(res=>{
      message.success('删除成功')
      this.getTagList();
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { tags } = this.props.tag;
    const { inputValue } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      this.Dispatch({
        type: CREATE_TAG,
        payload: {
          name: inputValue
        }
      }).then(res=>{
        message.success('新增成功');
        this.getTagList()
      })
    }
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { inputVisible, inputValue } = this.state;
    const { tags } = this.props.tag;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.name.length > 20;
          const tagElem = (
            <Tag key={tag._id} closable={index !== 0} onClose={() => this.handleClose(tag._id)}>
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag.name} key={tag._id}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}