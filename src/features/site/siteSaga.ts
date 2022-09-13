import { PublishTwoTone } from '@mui/icons-material';
import { PayloadAction } from '@reduxjs/toolkit';
import { siteApi } from 'api';
import { authActions } from 'features/auth/authSlice';
import { FromToParam, ListParam, ListResponse, ResponseMessage, Site, SurveyPayload } from 'models';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
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
