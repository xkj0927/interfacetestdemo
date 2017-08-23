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

export function listtestcases(interfaceId) {
  debugger;
  return request(`api/v1/interfacecase/interface/${interfaceId}`, {
    method: 'GET'
  });
}