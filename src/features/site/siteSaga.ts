import { PayloadAction } from '@reduxjs/toolkit';
import { siteApi } from 'api';
import { ListParam, Site } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { siteActions } from './siteSlice';

function* handleGet(payload: PayloadAction<ListParam>) {
  try {
    const rs: Site[] = yield call(siteApi.get, payload.payload);
    yield put(siteActions.getSuccess(rs));
  } catch (error: any) {
    yield put(siteActions.getFail(error));
  }
}

export function* siteSaga() {
  yield takeLatest(siteActions.get, handleGet);
}
