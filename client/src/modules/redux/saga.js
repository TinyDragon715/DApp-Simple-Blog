import { call, put, takeEvery, takeLatest, select, all } from "redux-saga/effects";

function* setNotifications(data) {
  let { payload } = data;

  yield put({ 
    type: "SET_NOTIFICATION_COUNTS",
    payload: payload
  });
}

function* rootSaga() {
  yield all([
    yield call(setNotifications)
    // yield takeLatest("SET_NOTIFICATION_COUNTS", setNotifications)
  ]);
}

export default rootSaga;