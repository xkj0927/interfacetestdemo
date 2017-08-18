import { message } from 'antd';
import * as projectService from '../services/projects';

export default {
  namespace: 'projects',
  state: {
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
    *reload({userRole}, { select, call, put }) {
      const {userAuthority, userId} = yield select(state => state.common);
      const result = yield call(projectService.listProject, {userAuthority, userId, userRole});
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
          const {userRole} = query;
          dispatch({ type: 'reload', userRole});
        }
      });
    }
  }
};
