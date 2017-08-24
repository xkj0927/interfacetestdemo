import React from 'react';
import {connect} from 'dva';
import {Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse, Tree, Select, Input, Radio} from 'antd';
import {FormattedMessage, injectIntl} from 'react-intl';
import {routerRedux} from 'dva/router';
import * as constants from '../utils/constants';
import style from './ModulePage.less';
import ModuleEditor from '../components/ModuleEditor';

const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const ModuleListPage = ({dispatch, modules = [], addModuleModalVisible = false, modalKey = '', projectInfo, intl, userRole, userAuthority, loading, flag, currentInterfaceId}) => {
  let interfaceInfo = [];
  console.log(modules);
  const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }];

  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }];

  // 左边module的树结构
  // 异步加载数据
  const onLoadData = (treeNode) => {
    // 获取后台数据，刷新state
    console.log("treeNode = "+treeNode.props.eventKey);
    return new Promise((resolve) => {
      let keys = treeNode.props.eventKey.split('-');
      let moduleId = '0';
      if(keys.length > 1){
        moduleId = keys[1];
      }else{
        moduleId = keys[0];
      }
      console.log("moduleId = "+moduleId);
      dispatch({type: "modules/list", payload: moduleId});
      resolve();
    });
  }

  // module
  const moduleNode = data => data.map((item) => {

    const interfaceNode = data => data.map((item) => {
      return <TreeNode title={item.interfaceName} key={item.moduleId +"-"+ item.interfaceId} isLeaf={true}></TreeNode>;
    });
    const interFaceNodes = (item.interfaceViews && item.interfaceViews.length > 0)? interfaceNode(item.interfaceViews) : [];

    return <TreeNode title={item.moduleName} key={item.moduleId} isLeaf={false}>
      {interFaceNodes}
      <TreeNode isLeaf={true} title={<div className={style.addInterfaceBtn}><Icon type="plus-circle-o" /> Add Interface</div>} />
    </TreeNode>;
  });

  const onRightClickHandle = (event) => {
    const selectId = event.node.props.eventKey;
    if(selectId && selectId.split('-').length == 1){
      dispatch({type: "modules/show", payload: ""});
    }
  };
  const moduleNodes = moduleNode(modules);
  const moduleTree = <Tree  loadData={onLoadData} onRightClick={onRightClickHandle}>
    {moduleNodes}
  </Tree>;

  // Add Module
  const addModuleShow = () => {
    dispatch({type: "modules/show", payload: ""});
  };
  let ModuleForm = Form.create()(
    (props) => {
      return <ModuleEditor
        form={props.form}
        dispatch={dispatch}
        moduleInfo = {{}}
        addModuleShow={{}}/>
    }
  );
  const addModuleModal = <Modal
    title="Add Module"
    visible={addModuleModalVisible}
    onCancel={addModuleShow}
    footer={null}
    key={modalKey}>

    <ModuleForm />
  </Modal>;

  return (
    <div className={style.moduleContainer}>
      <div className={style.ModuleCollapseLeft}>
        {moduleTree}
        <Button className={style.addModuleBtn} onClick={addModuleShow}><Icon type="plus-circle-o"/>Add Module</Button>
      </div>
      <div className={style.ModuleCollapseRight}>
        <div>
          {interfaceInfo}
        </div>
        <Table dataSource={dataSource} columns={columns}/>
      </div>
      {addModuleModal}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {userRole = constants.USER_ROLE_STUDENT,projectId = 0} = ownProps.location.query;
  const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
  const loading = state.loading.effects['modules/reload', projectId];
  const {modules, flag, currentInterfaceId, addModuleModalVisible, modalKey, projectInfo} = state.modules;
  return {
    currentInterfaceId,
    flag,
    modules: modules,
    addModuleModalVisible: addModuleModalVisible,
    modalKey:modalKey,
    projectInfo : projectInfo,
    userRole: parseInt(userRole),
    userAuthority: parseInt(userAuthority),
    loading
  };
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
