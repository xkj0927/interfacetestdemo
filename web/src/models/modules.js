import { message } from 'antd';
import * as moduleService from '../services/Modules';

export default {
  namespace: 'modules',
  state: {
    modules:[],
    moduleIds:[],
    interfaceIds:[],
    openedInterfaceId:[],
    closedInterfaceId:[],
    currentInterfaceId:"0",
    flag: false,
  },
  reducers: {
    update(state, {modules}) {
      debugger;
      state.modules = modules;
      state.moduleIds = [];
      state.interfaceIds = [];
      let newState = state;
      return newState;
    },
    change(state, { modules, moduleIds, interfaceIds, currentInterfaceId}) {
      state.moduleIds=moduleIds;
      state.modules = modules;
      state.interfaceIds = interfaceIds;
      state.flag = !state.flag;
      state.currentInterfaceId = currentInterfaceId;
      let newState = state;
      return newState;
    },
  },
  effects: {
    *reload({userRole}, { select, call, put}) {
      const {userAuthority, userId} = yield select(state => state.common);
      const result = yield call(moduleService.listmodules, {userAuthority, userId, userRole});
      const modules = result.data;
      yield put({
        type: 'update',
        modules: modules
      });
    },
    *interfacelist({payload: mIds}, {select, call, put}){
      debugger;
      const mods = yield select(state => state.modules);
      const modules = yield select(state => state.modules.modules);
      const moduleIds =  mods.moduleIds;
      const interfaceIds = mods.interfaceIds;
      let currentInterfaceId = mods.currentInterfaceId;
      let moduleId;
      let hasmoduleId = false;
      if(null != moduleIds && moduleIds.length>0){
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
          moduleIds.push(moduleId);
        }else{
          hasmoduleId = true;
        }
      }else{
        moduleId = mIds[0];
        moduleIds.push(moduleId);
      }
      if(!hasmoduleId){
        const {data: interfaces} = yield call(moduleService.listinterfaces, moduleId);

        for(let i=0;i<modules.length;i++){
             if(modules[i].moduleId == moduleId){
               modules[i].interfaces = interfaces;
             }
        }
        yield put({
          type: 'change',
          modules: modules,
          moduleIds: moduleIds,
          interfaceIds: interfaceIds,
          currentInterfaceId: currentInterfaceId,
        });
      }
    },
    *testcaselist({payload: iIds}, {select, call, put}){
      debugger;
      const mods = yield select(state => state.modules);
      const modules = yield select(state => state.modules.modules);
      const moduleIds =  mods.moduleIds;
      const interfaceIds =  mods.interfaceIds;
      let currentInterfaceId = mods.currentInterfaceId;
      let openedInterfaceId = mods.openedInterfaceId;
      let closedInterfaceId = mods.closedInterfaceId;
      let interfaceId;
      let hasinterfaceId = false;
      if(null != interfaceIds && interfaceIds.length>0){
        let tempArray1 = [];//临时数组1
        let tempArray2 = [];//临时数组2
        let tempCurrentArray1 =[];
        let tempCurrentArray2 =[];

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
          interfaceIds.push(interfaceId);
          openedInterfaceId.push(interfaceId);
        }else{
          for(var i=0;i<iIds.length;i++){
            tempCurrentArray1[iIds[i]] = true;
          }

          for(var i=0;i<openedInterfaceId.length;i++){
            if(!tempCurrentArray1[openedInterfaceId[i]]){
              tempCurrentArray2.push(openedInterfaceId[i]);
            }
          }
          hasinterfaceId = true;
          interfaceId = tempCurrentArray2[0];
          openedInterfaceId = iIds;
        }
      }else{
        interfaceId = iIds[0];
        interfaceIds.push(interfaceId);
        openedInterfaceId.push(interfaceId);
      }
      currentInterfaceId = interfaceId;
      if(!hasinterfaceId){
        const {data: testcases} = yield call(moduleService.listtestcases, interfaceId);

        for(let i=0;i<modules.length;i++){
          let tempModule = modules[i];
          if(null != tempModule.interfaces && tempModule.interfaces.length>0){
            for(let j=0;j<tempModule.interfaces.length;j++){
              let tempInterface = tempModule.interfaces[j];
                 if(null != tempInterface && tempInterface.interfaceId == interfaceId){
                   tempModule.interfaces[j].testcases = testcases;
                 }
            }
          }
        }
        yield put({
          type: 'change',
          modules: modules,
          moduleIds: moduleIds,
          interfaceIds: interfaceIds,
          currentInterfaceId: currentInterfaceId,
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