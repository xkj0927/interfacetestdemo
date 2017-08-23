import { message } from 'antd';
import * as moduleService from '../services/Modules';

export default {
  namespace: 'modules',
  state: {
    modules:[],
    moduleIds:[],
    interfaceIds:[],
    flag: false,
  },
  reducers: {
    update(state, {modules}) {
      debugger;
      let newState = state;
      state.modules = modules;
      return newState;
    },
    change(state, { modules, moduleId}) {
      state.moduleIds.push(moduleId);
      state.modules = modules;
      state.flag = !state.flag;
      let newState = state;
      // newState.moduleIds = moduleIds;
      return newState;
    },
  },
  effects: {
    *reload({userRole}, { select, call, put}) {
      const {userAuthority, userId} = yield select(state => state.common);
      const {data: modules = []} = yield call(moduleService.listmodules, {userAuthority, userId, userRole});

      for(let i=0; i<modules.length; i++){
        modules[i].interfaces = [];
      }
      yield put({
        type: 'update',
        modules: modules
      });
    },
    *interfacelist({payload: mIds}, {select, call, put}){
      debugger;
      const moduleIds = yield select(state => state.modules.moduleIds);
      const modules = yield select(state => state.modules.modules);
      let moduleId;
      let hasmoduleId = false;
      if(null != moduleIds && moduleIds.length>0){
        // moduleId = moduleIds[moduleIds.length-1];
        let tempArray1 = [];//临时数组1
        let tempArray2 = [];//临时数组2

        for(var i=0;i<moduleIds.length;i++){
          tempArray1[moduleIds[i]] = true;
        }

        for(var i=0;i<mIds.length;i++){
          if(!tempArray1[mIds[i]]){
            tempArray2.push(mIds[i]);
          }
        }
        if(null != tempArray2 && tempArray2.length>0){
          moduleId = tempArray2[0];
        }else{
          hasmoduleId = true;
        }
      }else{
        moduleId = mIds[0];
      }
      if(!hasmoduleId){
        const {data: interfaces} = yield call(moduleService.listinterfaces, moduleId);

        for(let i=0;i<modules.length;i++){
             if(modules[i].moduleId == moduleId){
               modules[i].interfaces = interfaces;
             }
        }
        // const modIds = moduleIds.push(moduleId);
        yield put({
          type: 'change',
          modules: modules,
          moduleId: moduleId,
        });
      }
    },
    *testcaselist({payload: iIds}, {select, call, put}){
      debugger;
      const interfaceIds = yield select(state => state.modules.interfaceIds);
      const modules = yield select(state => state.modules.modules);
      let interfaceId;
      let hasmoduleId = false;
      if(null != interfaceIds && interfaceIds.length>0){
        // moduleId = moduleIds[moduleIds.length-1];
        let tempArray1 = [];//临时数组1
        let tempArray2 = [];//临时数组2

        for(var i=0;i<interfaceIds.length;i++){
          tempArray1[interfaceIds[i]] = true;
        }

        for(var i=0;i<iIds.length;i++){
          if(!tempArray1[iIds[i]]){
            tempArray2.push(iIds[i]);
          }
        }
        if(null != tempArray2 && tempArray2.length>0){
          interfaceId = tempArray2[0];
        }else{
          hasmoduleId = true;
        }
      }else{
        interfaceId = iIds[0];
      }
      if(!hasmoduleId){
        const {data: interfaces} = yield call(moduleService.listtestcases, interfaceId);

        for(let i=0;i<modules.length;i++){
          if(modules[i].moduleId == interfaceId){
            modules[i].interfaces = interfaces;
          }
        }
        // const modIds = moduleIds.push(moduleId);
        yield put({
          type: 'change',
          modules: modules,
          moduleId: interfaceId,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname, query }) => {
        if(pathname === '/module/list'){
          const {userRole} = query;
          dispatch({ type: 'reload' , userRole});
        }
      });
    },
  }
};
