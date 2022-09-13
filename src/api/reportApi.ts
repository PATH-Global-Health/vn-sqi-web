import { ListParam, ListResponse, ResponseMessage } from 'models';
import { Report, ReportCreateModel, ReportSyncModel } from 'models/report';
import { apiLinks } from 'utils';
import axiosClient from './axiosClient';

export const reportApi = {
  get(params: ListParam): Promise<ListResponse<Report>> {
    return axiosClient.get(apiLinks.report.get, {
      params,
    });
  },

  create(payload: ReportCreateModel): Promise<ResponseMessage<any>> {
    return axiosClient.post(apiLinks.report.create, null, {
      params: payload,
    });
  },

  sync(payload: ReportSyncModel): Promise<ResponseMessage<any>> {
    return axiosClient.post(apiLinks.report.sync, null, {
      params: payload,
    });
  },
};
