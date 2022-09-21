import { UserInfo } from 'models';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const authUtils = {
  checkPermission: (access_token: string | null, permissionCode: string) => {
    if (access_token) {
      const decoded = jwtDecode<any>(access_token);
      if (decoded.Role === 'sqi_admin') {
        return true;
      }
      if (decoded.Role === 'sqi_project' && permissionCode == 'SQI_LIST_FORM') {
        return true;
      }
    }
    return false;
  },
};
