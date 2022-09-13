import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { push } from 'connected-react-router';
import { LoginPayload, ResponseMessage } from 'models';
import { User, UserInfo } from 'models/user';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    const rs: User = yield call(authApi.login, payload);
    if (payload.rememberMe) {
      yield localStorage.setItem('access_token', rs.access_token);
    } else {
      yield sessionStorage.setItem('access_token', rs.access_token);
    }
    yield put(authActions.loginSuccess(rs));
    yield put(push('/'));
  } catch (error: any) {
    console.log(error);
    yield put(authActions.logout());
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn =
      Boolean(localStorage.getItem('access_token')) ||
      Boolean(sessionStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

function* handleGetUserInfo() {
  try {
    const rs: ResponseMessage<UserInfo> = yield call(authApi.getUserInfo);
    yield put(authActions.getUserInfoSuccess(rs.data));
  } catch (error) {}
}

export function* authSaga() {
  yield fork(watchLoginFlow);
  yield takeLatest(authActions.getUserInfo, handleGetUserInfo);
}
