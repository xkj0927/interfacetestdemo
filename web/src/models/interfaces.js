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
    fromWhere:"" ,
    displayEditTestCaseModal: false,
    currentTestCase:"",
    reqOrResp:"",
    currentReqParam:"",
    currentRespParam:"",
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
    // 是否展示requestPram ResponseParam
    changeParamModalState(state, { interfaceId: interfaceId, currentReqParam: currentReqParam, reqOrResp: reqOrResp}) {
      state.currentReqParam = currentReqParam;
      state.displayInterParamDia = !state.displayInterParamDia;
      state.reqOrResp =  reqOrResp;
      state.moduleKey = Math.random();
      let newState = state;
      return newState;
    },
    changetestcasestate(state, {testCaseDetailInfo}) {
      state.displayTestCaseDia = !state.displayTestCaseDia;
      state.testCaseDetailInfo = testCaseDetailInfo;
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
    },

    // 增加一条新的参数列
    addParam(state, {paramValue:paramValue}){
      if(state.interfaceInfo.paramValues){
        state.interfaceInfo.paramValues.push(paramValue);
      }else {
        state.interfaceInfo.paramValues = [];
        state.interfaceInfo.paramValues.push(paramValue);
      }
      state.moduleKey = Math.random();
      state.displayInterParamDia = !state.displayInterParamDia;
      return state;
    },

    updateInterfaceInfo(state,{interfaceInfo}){
      state.interfaceInfo = interfaceInfo;
      state.moduleKey = Math.random();
      state.displayInterParamDia = !state.displayInterParamDia;
      return state;
    }
  },
  effects: {
    *info({selectModuleKey, selectInterfaceKey, operatorType}, {call, put}){
      debugger;
      const result = yield call(interfaceService.interfaceinfo, selectInterfaceKey);
      const interfaceInfo = result.data;
      if(interfaceInfo && interfaceInfo.testCaseViews && interfaceInfo.testCaseViews.length > 0){
        interfaceInfo.testCaseViews.map(testCase => {
          testCase.key = testCase.interfaceTestCaseId;
        })
      }
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
    *showParam({interfaceId: interfaceId, currentParam: currentParam, reqOrResp: reqOrResp}, {put}){
      if("requestParam" == reqOrResp){
        yield put({type: 'changeParamModalState',currentReqParam: currentParam, currentRespParam: "", interfaceId: interfaceId, reqOrResp: reqOrResp});
      }else{
        yield put({type: 'changeParamModalState',currentReqParam: "", currentRespParam: currentParam, interfaceId: interfaceId, reqOrResp: reqOrResp});
      }
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
    *addInterfaceParam({paramValue:paramValue}, {put}){
      yield put({type:"addParam",paramValue:paramValue});
    },
    // 新增一个参数
    *addRequestParam({requestParam:requestParam}, {call, put}){
      const {data} = yield call(interfaceService.addInterfaceRequestParam, requestParam);
      yield put({type:"addParam",requestParam:data});
    },

    *editRequestParam({requestParam:requestParam}, {call, put}){
      const {data} = yield call(interfaceService.editInterfaceRequestParam, requestParam);
      yield put({type:"addParam",requestParam:data});
    },

    *deleteRequestParam({interfaceId: interfaceId, requestParam:requestParam}, {call, put}){
      const {data} = yield call(interfaceService.deleteRequestParam, interfaceId, requestParam);
      yield put({type:"addParam",requestParam:data});
    },


    *addResponseParam({interfaceView:interfaceView}, {call, put}){
      const face = {"interfaceId":interfaceView.interfaceId,"interfaceName":interfaceView.interfaceName,"interfaceType":interfaceView.interfaceType,
        "interfaceUrl":interfaceView.interfaceUrl,"moduleId":interfaceView.moduleId,"requestParam":interfaceView.requestParam,
        "responseResult":"["+JSON.stringify(interfaceView.responseResult)+"]","run":interfaceView.run};
      yield call(interfaceService.editinterfaces, face);
      yield put({type:"updateInterfaceInfo",interfaceView});
    },

    *deleteResponseParam({interfaceId: interfaceId, responseParam:responseParam}, {call, put}){
      const {data} = yield call(interfaceService.deleteRequestParam, interfaceId, responseParam);
      yield put({type:"addParam",requestParam:data});
    },
  },
};
