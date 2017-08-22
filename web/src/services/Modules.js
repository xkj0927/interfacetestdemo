/**
 * Created by wafer on 2017/7/25.
 */
import request from '../utils/request';

const JSON = window.JSON;

export function listmodules() {
  debugger;
  return request(`api/v1/modules`, {
    method: 'GET'
  });
}

export function listinterfaces(moduleId) {
  debugger;
  return request(`api/v1/interface/module/${moduleId}`, {
    method: 'GET'
  });
}

export function listtestcases(testcaseId) {
  debugger;
  return request(`api/v1/interface/module/${testcaseId}`, {
    method: 'GET'
  });
}