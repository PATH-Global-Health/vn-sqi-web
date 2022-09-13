import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('access_token') ?? ''}${
      localStorage.getItem('access_token') ?? ''
    }`,
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token') ?? ''}${
        localStorage.getItem('access_token') ?? ''
      }`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object') return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === 'object') handleDates(value);
  }
}

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    handleDates(response.data);
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
