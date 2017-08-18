import React from 'react';
import {connect} from 'dva';
import {Table, Button, Popconfirm, Spin, Icon, Form, Modal} from 'antd';
import moment from 'moment'
import {routerRedux} from 'dva/router';
import {FormattedMessage, injectIntl} from 'react-intl';
import * as constants from '../utils/constants';

const ProjectListPage = ({dispatch, projects, intl, userRole, userAuthority, loading, projectInfo, handleType, modalKey, visible}) => {
  const columns = [
    {
      title: intl.formatMessage({id: "project.projectId"}),
      dataIndex: 'projectId'
    },
    {
      title: intl.formatMessage({id: "project.projectName"}),
      dataIndex: 'projectName'
    },
    {
      title: intl.formatMessage({id: "project.createTime"}),
      dataIndex: 'createTime',
      render: (text, record) => (moment(record.startTime).format("YYYY-MM-DD HH:mm:ss"))
    }
  ];


  return (
    <div>
      <Spin spinning={loading} tip={intl.formatMessage({id: 'loading'})}>
        <Table
          columns={columns}
          dataSource={projects}
          rowKey={row => row.projectId}
        />
      </Spin>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
  const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
  const projects = state.projects;
  return {
    projects: projects.projects,
    projectInfo: projects.projectInfo,
    visible: projects.showDialog,
    modalKey: projects.modalKey,
    handleType: projects.type,
    i18n: state.i18n,
    userRole: parseInt(userRole),
    userAuthority: parseInt(userAuthority),
    loading: state.loading.effects['projects/reload']
  };
};

export default connect(mapStateToProps)(injectIntl(ProjectListPage));
