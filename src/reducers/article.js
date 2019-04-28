export const CREATE_ARTICLE = Symbol('CREATE_ARTICLE')
export const REQUEST_LIST = Symbol('REQUEST_LIST')
export const RECEIVE_LIST = Symbol('RECEIVE_LIST')
export const DELETE_ARTICLE = Symbol('DELETE_ARTICLE')

const article = (state = {
  list: [],
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
        list:action.data,
        total:action.total
      }
      break;
    case CREATE_ARTICLE:
      return {
        ...state
      }
      break;
    default:
      return state
      break;
  }
}
export default article;