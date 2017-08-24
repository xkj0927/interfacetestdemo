/**
 * Created by wafer on 2017/7/25.
 */
import request from '../utils/request';

const JSON = window.JSON;

export function listmodules(projectId) {
  return request(`api/v1/module/project/${projectId}`, {
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

export function addModule(module) {
  return request(`api/v1/module`, {
    method: 'POST',
    body: JSON.stringify(module)
  });
}

export function editModule(module) {
  return request(`api/v1/module`, {
    method: 'PUT',
    body: JSON.stringify(module)
  });
}
