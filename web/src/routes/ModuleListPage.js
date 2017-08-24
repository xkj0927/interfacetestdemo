import React from 'react';
import {connect} from 'dva';
import {Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse, Tree, Select, Input, Radio, Popover} from 'antd';
import {FormattedMessage, injectIntl} from 'react-intl';
import {routerRedux} from 'dva/router';
import * as constants from '../utils/constants';
import style from './ModulePage.less';
import InterfaceEditor from '../components/InterfaceEditor'
import ModuleEditor from '../components/ModuleEditor';

const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const ModuleListPage = ({dispatch, modules = [],interfaces =[], addModuleModalVisible = false, modalKey = '', projectId, currentModule, activeKey, intl, userRole, userAuthority, loading, flag, currentInterfaceId}) => {
  console.log(modules);
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
  };
  const getInterfacesByModule = moduleId => interfaces.filter((face) => {
    return (face.moduleId == moduleId);
  });
  const onSelect=(key)=> {
      debugger;
      console.log("key",key);
      if(key[0].length>0 && key[0].indexOf("-")>0){
          let selectInterfaceKey = key[0].split("-")[1];
          let selectModuleKey = key[0].split("-")[0];
          if(selectInterfaceKey == 0){
              dispatch({type:"interfaces/show", selectModuleKey:selectModuleKey, selectInterfaceKey:selectInterfaceKey, operatorType: "add", interfaceInfo: {}});
          }else{
              dispatch({type:"interfaces/info", selectModuleKey:selectModuleKey, selectInterfaceKey:selectInterfaceKey, operatorType: "info"});
          }
      }
  };
  let InterfaceInfoView = Form.create()(
      (props) => {
          return <InterfaceEditor
              form={props.form}
              dispatch={dispatch}
              operatorType={interfaces.operatorType}
              interfaceInfo={interfaces.interfaceInfo}
              moduleKey={interfaces.moduleKey}/>
      }
  );
  // module
  const moduleNode = data => data.map((item) => {

    const interfaceNode = data => data.map((item) => {
      return <TreeNode title={item.interfaceName} key={item.moduleId +"-"+ item.interfaceId} isLeaf={true}></TreeNode>;
    });
    const interFaceNodes = (item.interfaceViews && item.interfaceViews.length > 0)? interfaceNode(item.interfaceViews) : [];

    const deleteModuleHandle = () => {
      dispatch({type: "modules/delete", payload: activeKey});
    };

    const editDeleteBtn = <div className={style.popBtnSpan}>
        <Button onClick={onRightClickHandle}><FormattedMessage id="module.edit"/></Button>
        <Button onClick={deleteModuleHandle}><FormattedMessage id="module.delete"/></Button>
    </div>;
    const moduleHandle = <Popover content={editDeleteBtn} trigger="click" placement="rightTop">
      {item.moduleName}
    </Popover>;
    return <TreeNode title={moduleHandle} key={item.moduleId} isLeaf={false}>
      {interFaceNodes}
      <TreeNode isLeaf={true} key={item.moduleId+"-0"} title={<div className={style.addInterfaceBtn}><Icon type="plus-circle-o" /> Add Interface</div>} />
    </TreeNode>;
  });

  const onRightClickHandle = (event) => {
    const selectId = activeKey;
    if(selectId && selectId.split('-').length == 1){
      dispatch({type: "modules/showCurrentModule", payload: selectId});
    }
  };
  const onSelectHandle = (treeKey) => {
    const selectId = treeKey[0];
    if(selectId && selectId.split('-').length == 1){
      dispatch({type: "modules/updateActive", payload: selectId});
    }
  };
  const moduleNodes = moduleNode(modules);
  const moduleTree = <Tree  loadData={onLoadData} onSelect={onSelectHandle}>
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
        moduleInfo = {currentModule}
        projectId={projectId}/>
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
        <InterfaceInfoView />
      </div>
      {addModuleModal}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
  const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
  const loading = state.loading.effects['modules/reload'];
  const interfaces = state.interfaces;
  const {modules, flag, currentInterfaceId, addModuleModalVisible, modalKey, projectId, currentModule, activeKey} = state.modules;
  return {
    currentInterfaceId,
    flag,
    modules: modules,
    interfaces:interfaces,
    addModuleModalVisible: addModuleModalVisible,
    modalKey:modalKey,
    projectId: projectId,
    activeKey,
    currentModule : currentModule,
    userRole: parseInt(userRole),
    userAuthority: parseInt(userAuthority),
    loading
  };
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
