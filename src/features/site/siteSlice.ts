import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  FromToParam,
  ListParam,
  ListResponse,
  PaginationParams,
  Site,
  SurveyPayload,
  SurveyStatistic,
} from 'models';

export interface SiteState {
  loading: boolean;
  error?: string;
  data?: Site[];
}

const initialState: SiteState = {
  loading: false,
  error: undefined,
  data: [],
};

const sitelice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    get(state, action: PayloadAction<ListParam | undefined>) {
      state.loading = true;
      state.error = undefined;
    },
    getSuccess(state, action: PayloadAction<Site[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    },
    getFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = 'Thất bại';
    },
  },
});

export const siteActions = sitelice.actions;

export const selectIsLoading = (state: RootState) => state.site.loading;

const siteReducer = sitelice.reducer;
export default siteReducer;
