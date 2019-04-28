import { all, fork } from 'redux-saga/effects'
import ArticleSaga from './articleSaga';
import tagSaga from './tagSaga';

export default function* rootSaga() {
  yield all([
    fork(ArticleSaga),
    fork(tagSaga),
  ])
}