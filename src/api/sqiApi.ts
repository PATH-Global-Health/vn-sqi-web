import { Axios, AxiosResponse } from 'axios';
import {
  FromToParam,
  ListParam,
  ListResponse,
  LoginPayload,
  ResponseMessage,
  SurveyPayload,
  SurveyStatistic,
} from 'models';
import { User } from 'models/user';
import { apiLinks } from 'utils';
import axiosClient from './axiosClient';

export const sqiApi = {
  sendForm(payload: SurveyPayload): Promise<ResponseMessage<SurveyPayload>> {
    return axiosClient.post(apiLinks.sqi.sendform, payload);
  },
  get(params: ListParam): Promise<ListResponse<SurveyPayload>> {
    return axiosClient.get(apiLinks.sqi.get, {
      params,
    });
  },
  getStatistics(params: FromToParam): Promise<ResponseMessage<SurveyStatistic[]>> {
    return axiosClient.get(apiLinks.sqi.getStatistics, {
      params,
    });
  },
  delete(id: string): Promise<ResponseMessage<any>> {
    return axiosClient.delete(`${apiLinks.sqi.delete}?id=${id}`);
  },
  export(params: FromToParam): Promise<Blob> {
    return axiosClient.get(apiLinks.sqi.exportExcel, {
      params,
      responseType: 'blob',
    });
  },
};
