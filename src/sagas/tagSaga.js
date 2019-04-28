import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import request from '../services/request';
import { CREATE_TAG,REQUEST_LIST,RECEIVE_LIST,DELETE_TAG } from '../reducers/tags';

function* create(){
  yield takeEvery(CREATE_TAG, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, '/tag/create', payload)
      resolve && resolve(response)
    } catch (error) {
      reject && reject(error)
    }
  })
}
function* getList() {
  yield takeEvery(REQUEST_LIST, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.get, '/tag/list', payload)
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
function* deleteTag(){
  yield takeEvery(DELETE_TAG, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, '/tag/delete', payload)
      resolve && resolve(response)
    } catch (error) {
      reject && reject(error)
    }
  })
}

export default function* tagFolw() {
  yield all([
    fork(create),
    fork(getList),
    fork(deleteTag),
  ])
}