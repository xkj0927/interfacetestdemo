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
    displayTestCaseDia: false,
    testCaseDetailInfo:null,
    fromWhere:""
  },
  reducers: {
    update(state, { payload: interfaceInfo, operatorType: operatorType, moduleKey: moduleKey}) {
      state.interfaceInfo = interfaceInfo;
      state.operatorType = operatorType;
      state.moduleKey = moduleKey;
      state.displayInterParamDia = false;
      let newState = state;
      return newState;
    },
    changestate(state, { interfaceInfo: interfaceInfo, fromWhere: fromWhere}) {
      debugger;
      state.interfaceInfo = interfaceInfo;
      state.displayInterParamDia = !state.displayInterParamDia;
      state.fromWhere =  fromWhere;
      let newState = state;
      return newState;
    },
    changetestcasestate(state, {testCaseDetailInfo}) {
      state.displayTestCaseDia = !state.displayTestCaseDia;
      state.testCaseDetailInfo = testCaseDetailInfo;
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
    *showParam({interfaceInfo, fromWhere}, {put}){
      yield put({
        type: 'changestate',
        interfaceInfo: interfaceInfo,
        fromWhere: fromWhere
      });
    },
    *showTestCase({record: testCase}, {put}){
      debugger;
      yield put({
        type: 'changetestcasestate',
        testCaseDetailInfo: testCase
      });
    },
    *deleteTestCase({payload: record}, {call, put}){
      debugger;
      yield call(testCaseService.deleteTestCase, record.interfaceTestCaseId);
      // yield put({
      //   type: 'changetestcasestate',
      // });
    },
    *add({payload}, {call, put}){
      debugger;
      const {data} = yield call(interfaceService.addinterfaces, payload);
      yield put({
        type: 'update',
        payload: data,
        operatorType: "info",
        moduleKey: data.moduleId
      });
    },
  },
};
