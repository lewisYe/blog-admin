export const CREATE_ARTICLE = Symbol('CREATE_ARTICLE')
export const REQUEST_LIST = Symbol('REQUEST_LIST')
export const RECEIVE_LIST = Symbol('RECEIVE_LIST')

const article = (state = {
  list: [],
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
        list:action.list
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