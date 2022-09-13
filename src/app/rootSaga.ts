import { authSaga } from 'features/auth/authSaga';
import { reportSaga } from 'features/report/reportSaga';
import { siteSaga } from 'features/site/siteSaga';
import { sqiSaga } from 'features/sqi/sqiSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), sqiSaga(), siteSaga(), reportSaga()]);
}
