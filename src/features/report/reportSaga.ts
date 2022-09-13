import { PayloadAction } from '@reduxjs/toolkit';
import { reportApi } from 'api';
import { ListParam, ListResponse } from 'models';
import { Report } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { reportActions } from './reportSlice';

function* handleGet(payload: PayloadAction<ListParam>) {
  try {
    const rs: ListResponse<Report> = yield call(reportApi.get, payload.payload);
    yield put(reportActions.getSuccess(rs));
  } catch (error) {
    yield put(reportActions.getFail(error));
  }
}

export function* reportSaga() {
  yield takeLatest(reportActions.get, handleGet);
}
