import { message } from 'antd';
import * as projectService from '../services/projects';

export default {
  namespace: 'projects',
  state: {
    deptName:"",
    modalKey: 0,
    showDialog: false,
    type: "",
    projects: [],
    projectInfo: {}
  },
  reducers: {
    update(state, { payload: newProjects }) {
      return newProjects;
    },
    changeShow(state, { payload: type, projectInfo: projectInfo }){
      let newState = state;
      newState.showDialog = !newState.showDialog;
      if(!newState.showDialog){
        // 关闭对话框时，重置操作类型
        newState.type = "";
        newState.projectInfo = {};
        // 同时更新对话框的key，下次打开重新渲染
        newState.modalKey = Math.random();
      }else {
        newState.type = type;
        newState.projectInfo = projectInfo;
      }
      return newState;
    }
  },
  effects: {
    *show({ payload, projectInfo }, {put}){
      yield put({ type: 'changeShow' , payload: payload, projectInfo: projectInfo});
    },
    *reload(action, { select, call, put }) {
      const {userAuthority, deptId} = yield select(state => state.common);
      const result = yield call(projectService.listProject, {userAuthority, deptId});
      const newProjects = {projects: result.data, showDialog: false, type: "", modalKey: Math.random(), projectInfo: {}};
      yield put({
        type: 'update',
        payload: newProjects
      });
    }
  },
  subscriptions: {
    setup({history, dispatch}){
      return history.listen(({ pathname, query }) => {
        if (pathname === '/project/list') {
          dispatch({ type: 'reload'});
        }
      });
    }
  }
};
