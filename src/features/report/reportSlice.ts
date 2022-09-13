import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParam, ListResponse, PaginationParams } from 'models';
import { Report } from 'models/report';

export interface ReportState {
  loading: boolean;
  error?: string;
  data?: Report[];
  params: ListParam;
  pagination: PaginationParams;
}

const initialState: ReportState = {
  loading: false,
  error: undefined,
  data: [],
  params: {
    pageIndex: 0,
    pageSize: 10,
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  },
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    get(state, action: PayloadAction<ListParam | undefined>) {
      state.loading = true;
      state.error = undefined;
    },
    getSuccess(state, action: PayloadAction<ListResponse<Report>>) {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = '';
    },
    getFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = 'Error';
    },
    setFilter(state, action: PayloadAction<ListParam>) {
      state.params = action.payload;
    },
  },
});

export const reportActions = reportSlice.actions;

const reportReducer = reportSlice.reducer;
export default reportReducer;
