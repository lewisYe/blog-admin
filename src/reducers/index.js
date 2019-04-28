import { combineReducers } from 'redux'
import article from './article'
import tag from './tags'

const rootReducer = combineReducers({
  article,
  tag
})
export default rootReducer