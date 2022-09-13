import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  FromToParam,
  ListParam,
  ListResponse,
  PaginationParams,
  SurveyPayload,
  SurveyStatistic,
} from 'models';

export interface SQIState {
  loading: boolean;
  error?: string;
  data?: SurveyPayload[];
  statistic?: SurveyStatistic[];
  dataParams?: ListParam;
  pagination: PaginationParams;
  statisticParam?: FromToParam;
}

const initialState: SQIState = {
  loading: false,
  error: undefined,
  data: [],
  statistic: [],
  dataParams: {
    pageIndex: 0,
    pageSize: 10,
    from: undefined,
    to: undefined,
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  },
  statisticParam: {
    from: undefined,
    to: undefined,
  },
};

const sqilice = createSlice({
  name: 'sqi',
  initialState,
  reducers: {
    sendForm(state, action: PayloadAction<SurveyPayload>) {
      state.loading = true;
      state.error = undefined;
    },
    sendFormSuccess(state, action: PayloadAction<SurveyPayload>) {
      state.loading = false;
      state.error = '';
    },
    sendFormFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = 'Thất bại';
    },
    get(state, action: PayloadAction<ListParam | undefined>) {
      state.dataParams = action.payload;
      state.loading = true;
      state.error = undefined;
    },
    getSuccess(state, action: PayloadAction<ListResponse<SurveyPayload>>) {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = '';
    },
    getFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = 'Thất bại';
    },

    setFilter(state, action: PayloadAction<ListParam>) {
      state.dataParams = action.payload;
    },

    getStatistics(state, action: PayloadAction<FromToParam>) {
      state.statisticParam = action.payload;
      state.loading = true;
      state.error = undefined;
    },
    getStatisticsSuccess(state, action: PayloadAction<SurveyStatistic[]>) {
      state.statistic = action.payload;
      state.loading = false;
      state.error = '';
    },
    getStatisticsFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = 'Thất bại';
    },
  },
});

export const sqiActions = sqilice.actions;

export const selectIsLoading = (state: RootState) => state.sqi.loading;

const sqiReducer = sqilice.reducer;
export default sqiReducer;
