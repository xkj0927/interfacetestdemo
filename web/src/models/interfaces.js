import { message } from 'antd';
import * as interfaceService from '../services/Interfaces';

export default {
  namespace: 'interfaces',
  state: {
    modalKey: 0,
    showDialog: false,
    type: "",
    interfaces: [],
    interfaceInfo: null,
    operatorType:"",
    moduleKey: 0
  },
  reducers: {
    update(state, { payload: interfaceInfo, operateType: operatorType, moduleKey: moduleKey}) {
      state.interfaceInfo = interfaceInfo;
      state.operatorType = operatorType;
      state.moduleKey = moduleKey;
      let newState = state;
      return newState;
    },
  },
  effects: {
    *info({key, operatorType}, {call, put}){
      debugger;
      const result = yield call(interfaceService.interfaceinfo, key);
      const interfaceInfo = result.data;
      yield put({
        type: 'update',
        payload: interfaceInfo,
        operateType: operatorType,
        moduleKey:0
      });
    },
    *show({key, operatorType, interfaceInfo}, {put}){
      yield put({
        type: 'update',
        payload: interfaceInfo,
        operateType: operatorType,
        moduleKey: key
      });
    },
  },
};
