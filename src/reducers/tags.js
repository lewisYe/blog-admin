export const CREATE_TAG = Symbol('CREATE_TAG')
export const REQUEST_LIST = Symbol('REQUEST_LIST')
export const RECEIVE_LIST = Symbol('RECEIVE_LIST')
export const DELETE_TAG = Symbol('DELETE_TAG')

const tag = (state = {
  tags: [],
  total:0
}, action) => {
  switch (action.type) {
    case REQUEST_LIST:
      return {
        ...state
      }
      break;
    case RECEIVE_LIST:
      return {
        ...state,
        tags:action.data,
        total:action.total
      }
      break;
    default:
      return state
      break;
  }
}
export default tag;