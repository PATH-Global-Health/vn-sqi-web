import { UserInfo } from 'models';

export const authUtils = {
  checkPermission: (user: UserInfo | undefined, permissionCode: string) => {
    if (user) {
      const username = user.userInfo.username;
      if (['longhdt', 'admin', 'sqi_admin'].includes(username)) {
        return true;
      }
      if (['ladders', 'epic'].includes(username) && permissionCode == 'SQI_LIST_FORM') {
        return true;
      }
    }
    return false;
  },
};
