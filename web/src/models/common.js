/**
 * Created by Administrator on 2017/8/16 0016.
 */
import {message} from 'antd';
import * as commonService from '../services/common';
import {routerRedux} from 'dva/router';
export default {
    namespace:'common',
    state:{
        userId: 0,
        userName: 0,
        email: '',
        status: '',
        contextPath: ''
    },
    reducers:{
        set(state, {common}){
            return {...state, ...common};
        }
    },
   effects: {
      *login({payload: values}, {put, call, select}){
          const {data, result, message: msgkey} = yield call(commonService.login, values);
          const {common, messages} = yield select(state => state);
          if(result){
              const {user, token}  = data;
              sessionStorage.setItem("access_token", token);
              for(let property in common){
                  if(user.hasOwnProperty(property)){
                        common[property] = user[property];
                  }
              }

              let contextPath = "";
              let pathName = document.location.pathname;
              if (pathName == "/" || pathName == "/index.html") {
                  contextPath = "/";
              } else {
                  let index = pathName.substr(1).indexOf("/");
                  contextPath = pathName.substr(0, index + 1) + "/";
              }

              common.contextPath = contextPath;

              yield put({type: 'set', common});
              yield localStorage.setItem("common", JSON.stringify(common));//登录后把common信息存储到localstorage中
              yield put(routerRedux.push('/home'));
              // message.success(messages["Login Success"]);
          } else {
              // message.error(messages[`msgKey.${msgkey}`]);
          }

      },
     *logout(_, {call, put, select}){
       const {userId} = yield select(state => state.common);
       yield call(commonService.logout, userId);

       yield localStorage.removeItem("common");
       yield put(routerRedux.push('/'));
     }
   },
  subscriptions: {
    reset({dispatch}){//页面刷新后，将localstorage中的common重新赋值给state
      if(localStorage.getItem("common")){
        dispatch({type: "set", common: JSON.parse(localStorage.getItem("common"))});
      }
    },
  }
}
