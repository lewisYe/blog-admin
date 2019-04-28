import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { CREATE_ARTICLE, REQUEST_LIST, RECEIVE_LIST,DELETE_ARTICLE } from '../reducers/article';
import request from '../services/request'

function* getList() {
  yield takeEvery(REQUEST_LIST, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.get, '/article/list', payload)
      yield put({
        type: RECEIVE_LIST,
        data: response.data.list,
        total:response.data.total,
      })
      resolve && resolve(response)
    } catch (error) {
      reject && reject(error)
    }
  })
}

function* create(){
  yield takeEvery(CREATE_ARTICLE, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, '/article/create', payload)
      resolve && resolve(response)
    } catch (error) {
      reject && reject(error)
    }
  })
}

function* deleteArticle(){
  yield takeEvery(DELETE_ARTICLE, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, '/article/delete', payload)
      resolve && resolve(response)
    } catch (error) {
      reject && reject(error)
    }
  })
}

export default function* ArticleFolw() {
  yield all([
    fork(create),
    fork(getList),
    fork(deleteArticle),
  ])
}