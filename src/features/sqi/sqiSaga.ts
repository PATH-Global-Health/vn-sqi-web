import { PayloadAction } from '@reduxjs/toolkit';
import { sqiApi } from 'api';
import { FromToParam, ListParam, ListResponse, ResponseMessage, SurveyPayload } from 'models';
import { all, call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { sqiActions } from './sqiSlice';

function* handleSendFrorm(payload: PayloadAction<SurveyPayload>) {
  try {
    const rs: ResponseMessage<SurveyPayload> = yield call(sqiApi.sendForm, payload.payload);
    yield put(sqiActions.sendFormSuccess(rs.data));
  } catch (error: any) {
    yield put(sqiActions.sendFormFailed(error));
  }
}

function* handleGetSurvey(payload: PayloadAction<ListParam>) {
  try {
    const rs: ListResponse<SurveyPayload> = yield call(sqiApi.get, payload.payload);
    yield put(sqiActions.getSuccess(rs));
  } catch (error: any) {
    yield put(sqiActions.getFail(error));
  }
}

function* handleGetStatistics(payload: PayloadAction<FromToParam>) {
  try {
    const { data } = yield call(sqiApi.getStatistics, payload.payload);
    yield put(sqiActions.getStatisticsSuccess(data));
  } catch (error: any) {
    yield put(sqiActions.getStatisticsFail(error));
  }
}

function* handleGet(payload: PayloadAction<ListParam>) {
  yield all([call(handleGetStatistics, payload), call(handleGetSurvey, payload)]);
}

export function* sqiSaga() {
  yield takeLeading(sqiActions.sendForm, handleSendFrorm);
  yield takeLatest(sqiActions.get, handleGet);
  yield takeLatest(sqiActions.getStatistics, handleGetStatistics);
}
