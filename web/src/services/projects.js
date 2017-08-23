/**
 * Created by admin on 2017/7/26.
 */
import request from '../utils/request';
import * as constants from '../utils/constants';

const JSON = window.JSON;

export function listProject({userAuthority, deptId}) {
  return request(`api/v1/projects`, {
    method: 'GET'
  });
}

