import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import reportReducer from 'features/report/reportSlice';
import siteReducer from 'features/site/siteSlice';
import sqiReducer from 'features/sqi/sqiSlice';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  sqi: sqiReducer,
  site: siteReducer,
  report: reportReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
