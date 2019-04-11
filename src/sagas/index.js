import { all, fork } from 'redux-saga/effects'
import ArticleSaga from './articleSaga';

export default function* rootSaga() {
  yield all([
    fork(ArticleSaga)
  ])
}