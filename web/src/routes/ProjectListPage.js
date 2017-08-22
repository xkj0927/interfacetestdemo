import React from 'react';
import {connect} from 'dva';
import {Table, Button, Popconfirm, Spin, Icon, Form, Modal, Popover} from 'antd';
import moment from 'moment'
import {routerRedux} from 'dva/router';
import {FormattedMessage, injectIntl} from 'react-intl';
import style from './project-list-page.less';

const ProjectListPage = ({dispatch, projects, intl, loading, projectInfo, handleType, modalKey, visible}) => {
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
  const content = (
    <div>
      <Button className={style.marginRight5}><Icon type="edit" /></Button>
      <Button className={style.marginLeft5}><Icon type="delete" /></Button>
    </div>
  );

  return (
    <div>
      <Spin spinning={loading} tip={intl.formatMessage({id: 'loading'})}>
        <div className={style.projectContainer}>
          <div className={style.project}>
            <Popover content={content}>
              <div className={style.info}>
                <div className={style.title}>DLP Demo</div>
              </div>
            </Popover>
            <div className={style.status}>
              <span className={style.creator}>@ssss</span>
            </div>
          </div>

          <div className={style.project}>
            <Popover content={content}>
              <div className={style.info}>
                <div className={style.title}>DLP Demo</div>
              </div>
            </Popover>
            <div className={style.status}>
              <span className={style.creator}>@ssss</span>
            </div>
          </div>

          <div className={style.project}>
            <Popover content={content}>
              <div className={style.info}>
                <div className={style.title}>DLP Demo</div>
              </div>
            </Popover>
            <div className={style.status}>
              <span className={style.creator}>@ssss</span>
            </div>
          </div>

          <div className={style.boxToAdd}>
          </div>

        </div>
      </Spin>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const projects = state.projects;
  return {
    projects: projects.projects,
    projectInfo: projects.projectInfo,
    visible: projects.showDialog,
    modalKey: projects.modalKey,
    handleType: projects.type,
    i18n: state.i18n,
    loading: state.loading.effects['projects/reload']
  };
};

export default connect(mapStateToProps)(injectIntl(ProjectListPage));
