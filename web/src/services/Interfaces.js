/**
 * Created by wafer on 2017/7/25.
 */
import request from '../utils/request';

const JSON = window.JSON;

export function interfaceinfo(interfaceId) {
  debugger;
  return request(`api/v1/interface/testcase/${interfaceId}`, {
    method: 'GET'
  });
}

export function listinterfaces(moduleId) {
  return request(`api/v1/interface/module/${moduleId}`, {
    method: 'GET'
  });
}

export function addinterfaces(interfacevalues) {
  return request(`api/v1/interface`, {
    method: 'POST',
    body: JSON.stringify(interfacevalues)
  });
}


export function editinterfaces(interfacevalues) {
  return request(`api/v1/interface`, {
    method: 'PUT',
    body: JSON.stringify(interfacevalues)
  });
}
