/**
 * Created by admin on 2017/7/26.
 */
import request from '../utils/request';
import * as constants from '../utils/constants';

const JSON = window.JSON;

export function listProject({userAuthority, deptId}) {
  if(userAuthority === constants.USER_AUTHORITY_ADMIN) {
    return request(`api/v1/projects`, {
      method: 'GET'
    });
  }else{
    return request(`api/v1/projects/${deptId}`, {
      method: 'GET'
    });
  }
}

