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
    displayEditTestCaseModal: false,
    currentTestCase:"",
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

    displayEditModal(state,{currentTestCase}){
      state.displayEditTestCaseModal = !state.displayEditTestCaseModal;
      state.currentTestCase = currentTestCase;
      state.moduleKey = Math.random();
      return state;
    },

    modifyTestCase(state, {operateType, newTestCase}){
      if('add' == operateType){
        state.interfaceInfo.testCaseViews.push(newTestCase);
      }else{
        let cases = [];
        state.interfaceInfo.testCaseViews.map((testCase) => {
          if(testCase.interfaceTestCaseId == newTestCase.interfaceTestCaseId){
            cases.push(newTestCase);
          }else{
            cases.push(testCase);
          }
        });
        state.interfaceInfo.testCaseViews = cases;
      }
      state.displayEditTestCaseModal = false;
      state.currentTestCase = "";
      state.moduleKey = Math.random();
      return state;
    }
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
    *showEditTestCaseModal({currentTestCase:currentTestCase}, {put}){
      yield put({type:"displayEditModal",currentTestCase:currentTestCase});
    },
    *editTestCase({testCase:testCase}, {call, put}){
      debugger
      const result = yield call(interfaceService.editTestCase, testCase);
      yield put({type:"modifyTestCase",operateType:"edit", newTestCase:result.data});
    },

    *addTestCase({testCase:testCase}, {call, put}){
      const result = yield call(interfaceService.addTestCase, testCase);
      yield put({type:"modifyTestCase",operateType:"add", newTestCase:result.data});
    },

  },
};
