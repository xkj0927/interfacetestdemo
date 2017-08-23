import React from 'react';
import {connect} from 'dva';
import {Table, Button, Popconfirm, Spin, Icon, Form, Modal, Popover} from 'antd';
import {routerRedux} from 'dva/router';
import {FormattedMessage, injectIntl} from 'react-intl';
import style from './project-list-page.less';

const ProjectComponent = ({dispatch, projectInfo}) => {
  const content = (
    <div>
      <Button className={style.marginRight5}><Icon type="edit" /></Button>
      <Button className={style.marginLeft5}><Icon type="delete" /></Button>
    </div>
  );
  return (
    <div className={style.project}>
      <Popover content={content}>
        <div className={style.info}>
          <div className={style.title}>{projectInfo.projectName}</div>
        </div>
      </Popover>
      <div className={style.status}>
        <span className={style.creator}>{"@" + projectInfo.createUserName}</span>
      </div>
    </div>
  );
};

const ProjectListPage = ({dispatch, projects, intl, loading, handleType, modalKey, visible, deptName}) => {
  let projectComponents = projects.map(function(project){
      return (
        <ProjectComponent
            key = {project.projectId}
            dispatch={dispatch}
            projectInfo={project}
            handleType={handleType}
            modalKey={modalKey}/>
          );
      });
   return (
    <div>
      <Spin spinning={loading} tip={intl.formatMessage({id: 'loading'})}>
        <h3><span className={style.deptName}>{deptName}</span></h3>
        <div className={style.projectContainer}>
          {projectComponents}
          <div className={style.boxToAdd}></div>
        </div>
      </Spin>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const projects = state.projects;
  const {deptName} = state.common;
  return {
    projects: projects.projects,
    projectInfo: projects.projectInfo,
    visible: projects.showDialog,
    modalKey: projects.modalKey,
    handleType: projects.type,
    i18n: state.i18n,
    deptName:deptName,
    loading: state.loading.effects['projects/reload']
  };
};

export default connect(mapStateToProps)(injectIntl(ProjectListPage));
