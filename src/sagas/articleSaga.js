import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { CREATE_ARTICLE, REQUEST_LIST, RECEIVE_LIST } from '../reducers/article';
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

function* create() {
  yield takeEvery(CREATE_ARTICLE, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, '/article/create', payload)
      yield put({
        type: RECEIVE_TEST,
        data: 'request success'
      })
      resolve && resolve(response)
    } catch (error) {
      yield put({
        type: RECEIVE_TEST,
        data: 'request fail'
      })
      reject && reject(error)
    }
  })
}

export default function* ArticleFolw() {
  yield all([
    fork(create),
    fork(getList)
  ])
}