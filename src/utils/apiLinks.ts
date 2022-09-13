const base_url = `https://sqi-api.quanlyhiv.vn/api`;
const userModule = 'https://auth.quanlyhiv.vn/api';

export const apiLinks = {
  auth: {
    login: `${userModule}/Users/Login`,
    getUserInfo: `${userModule}/Users/GetUserInfo`,
  },
  sqi: {
    sendform: `${base_url}/SQi`,
    get: `${base_url}/SQi`,
    getStatistics: `${base_url}/SQi/GetStatistics`,
    delete: `${base_url}/SQi`,
    exportExcel: `${base_url}/SQi/Export`,
  },
  report: {
    get: `${base_url}/Report`,
    create: `${base_url}/Report`,
    sync: `${base_url}/Report/SentToPQM`,
  },
};
