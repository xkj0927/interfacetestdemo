/**
 * Created by Administrator on 2017/8/28 0028.
 */
import request from '../utils/request';

const JSON = window.JSON;

export function deleteTestCase(testCaseId) {
    return request(`api/v1/interfacecase/${testCaseId}`, {
        method: 'DELETE'
    });
}