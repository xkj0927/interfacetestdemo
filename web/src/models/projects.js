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
    }
  },
  effects: {
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
