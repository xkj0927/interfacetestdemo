import { message } from 'antd';
import * as interfaceService from '../services/Interfaces';
import * as testCaseService from '../services/testcase';

export default {
  namespace: 'interfaces',
  state: {
    modalKey: 0,
    showDialog: false,
    type: "",
    interfaces: [],
    interfaceInfo: null,
    operatorType:"",
    moduleKey: 0,
    displayInterParamDia: false,
    displayTestCaseDia: false
  },
  reducers: {
    update(state, { payload: interfaceInfo, operatorType: operatorType, moduleKey: moduleKey}) {
      state.interfaceInfo = interfaceInfo;
      state.operatorType = operatorType;
      state.moduleKey = moduleKey;
      let newState = state;
      return newState;
    },
    changestate(state, { interfaceInfo: interfaceInfo}) {
      debugger;
      state.interfaceInfo = interfaceInfo;
      state.displayInterParamDia = !state.displayInterParamDia;
      let newState = state;
      return newState;
    },
    changetestcasestate(state, {}) {
      state.displayTestCaseDia = !state.displayTestCaseDia;
      let newState = state;
      return newState;
    },
  },
  effects: {
    *info({selectModuleKey, selectInterfaceKey, operatorType}, {call, put}){
      debugger;
      const result = yield call(interfaceService.interfaceinfo, selectInterfaceKey);
      const interfaceInfo = result.data;
      yield put({
        type: 'update',
        payload: interfaceInfo,
        operatorType: operatorType,
        moduleKey:selectModuleKey
      });
    },
    *show({selectModuleKey, selectInterfaceKey, operatorType, interfaceInfo}, {put}){
      yield put({
        type: 'update',
        payload: interfaceInfo,
        operatorType: operatorType,
        moduleKey: selectModuleKey
      });
    },
    *showParam({interfaceInfo}, {put}){
      yield put({
        type: 'changestate',
        interfaceInfo: interfaceInfo,
      });
    },
    *showTestCase({showTestCase}, {put}){
      yield put({
        type: 'changetestcasestate',
      });
    },
    *deleteTestCase({payload: id}, {call, put}){
      yield call(testCaseService.deleteTestCase, id);
      yield put({type: "reload"});
      const messages  = yield select(state => state.i18n.messages);
      message.info("success delete");
    },
    *add({values}, {call}){
      debugger;
      const result = yield call(interfaceService.addinterfaces, values);
    },
  },
};
