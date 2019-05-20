export const CREATE_ARTICLE = Symbol('CREATE_ARTICLE')
export const REQUEST_LIST = Symbol('REQUEST_LIST')
export const RECEIVE_LIST = Symbol('RECEIVE_LIST')
export const DELETE_ARTICLE = Symbol('DELETE_ARTICLE')
export const RELEASE_ARTICLE = Symbol('RELEASE_ARTICLE')
export const REQUEST_DETAIL = Symbol('REQUEST_DETAIL')
export const RECEIVE_DETAIL = Symbol('RECEIVE_DETAIL')
export const EDIT_ARTICLE = Symbol('EDIT_ARTICLE')


const article = (state = {
  list: [],
  total: 0,
  detail:{}
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
        list: action.data,
        total: action.total
      }
      break;
    case CREATE_ARTICLE:
      return {
        ...state
      }
      break;
    case RECEIVE_DETAIL:
      return {
        ...state,
        detail: action.data,
      }
      break;
    default:
      return state
      break;
  }
}
export default article;