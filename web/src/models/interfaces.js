import { message } from 'antd';
import * as interfaceService from '../services/Interfaces';

export default {
  namespace: 'interfaces',
  state: {
    modalKey: 0,
    showDialog: false,
    type: "",
    interfaces: [],
    interfaceInfo: null
  },
  reducers: {
    update(state, { payload: newModules }) {
      return newModules;
    },

    updateInterfaces(state, {payload : newInterfaces, moduleId : moduleId}){
      let newState = state;
      let oldInterface = newState.interfaces;
      const changeRepeat = (data,id) => data.map((temp)=>{
        if(temp.interfaceId == id){
          return true;
        }
      });

      if(oldInterface.length == 0){
        oldInterface = oldInterface.concat(newInterfaces);
      }else{
        newInterfaces.map(face =>{
          if(!changeRepeat(oldInterface,face.interfaceId)){
            oldInterface.push(face);
          }
        });
      }
      newState.interfaces = oldInterface;
      return newState;
    }
  },
  effects: {
    *reload({userRole, moduleId}, { select, call, put }) {
      const {userAuthority, userId} = yield select(state => state.common);
      const result = yield call(interfaceService.listinterfaces(moduleId), {userAuthority, userId, userRole});
      const newInterfaces = {interfaces: result.data, showDialog: false, type: "", modalKey: Math.random(), interfaceInfo: {}};
      yield put({
        type: 'update',
        payload: newInterfaces
      });
    },
    *list({payload: moduleId}, {call, put}){
      const newInterfaces = yield call(interfaceService.listinterfaces, moduleId);
      yield put({
        type: 'updateInterfaces',
        payload: newInterfaces.data,
        moduleId: moduleId
      });
    },
  *info({payload: interfaceId}, {call, put}){
  const result = yield call(interfaceService.interfaceinfo, interfaceId);
  const interfaceInfo = result.data;
  yield put({
  type: 'update',
  payload: interfaceInfo
  });
  },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname, query}) => {
        if(pathname === '/interface/list'){
          const {userRole} = query;
          dispatch({ type: 'reload' , userRole, moduleId});
        }
      });
    },
  }
};
