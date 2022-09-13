import { ListParam, Site } from 'models';
import axiosClient from './axiosClient';

export const siteApi = {
  get(params: ListParam): Promise<Site[]> {
    let url = '';
    if (params.province_code == '79') {
      url = '';
    }
    if (params.province_code == '82') {
      url = 'https://pctg.bakco.vn/api/Categories';
    }
    if (params.province_code == '75') {
      url = 'https://pcdn.bakco.vn/api/Categories';
    }
    if (params.province_code == '72') {
      url = 'https://pctn.bakco.vn/api/Categories';
    }
    return axiosClient.get(url, { params });
  },
};
