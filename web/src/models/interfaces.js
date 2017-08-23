import { message } from 'antd';
import * as interfaceService from '../services/Interfaces';

export default {
  namespace: 'interfaces',
  state: {
    interfaceInfo: null,
    iflag: false,
  },
  reducers: {
    update(state, { payload: interfaceInfo }) {
      debugger;
      state.interfaceInfo = interfaceInfo;
      state.iflag = ! state.iflag;
      let newState = state;
      return newState;
    },
  },
  effects: {
    // *reload({userRole, interfaceId}, { select, call, put }) {
    //   debugger;
    //   const {userAuthority, userId} = yield select(state => state.common);
    //   const result = yield call(interfaceService.interfaceinfo(interfaceId), {userAuthority, userId, userRole});
    //   const newInterfaces = {interfaces: result.data, showDialog: false, type: "", modalKey: Math.random(), interfaceInfo: {}};
    //   yield put({
    //     type: 'update',
    //     payload: newInterfaces
    //   });
    // },
    *info({payload: interfaceId}, {call, put}){
      debugger;
      const result = yield call(interfaceService.interfaceinfo, interfaceId);
      const interfaceInfo = result.data;
      yield put({
        type: 'update',
        payload: interfaceInfo
      });
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({pathname, query}) => {
  //       if(pathname === '/interface/list'){
  //         const {userRole} = query;
  //         dispatch({ type: 'reload' , userRole, interfaceId});
  //       }
  //     });
  //   },
  // }
};
