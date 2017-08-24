import React from 'react';
import {connect} from 'dva';
import {Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse, Tree} from 'antd';
import {FormattedMessage, injectIntl} from 'react-intl';
import {routerRedux} from 'dva/router';
import * as constants from '../utils/constants';
import style from './ModulePage.less';
import InterfaceEditor from '../components/InterfaceEditor'

const TreeNode = Tree.TreeNode;
const ModuleListPage = ({dispatch, modules = [], interfaces =[], intl, userRole, userAuthority, loading, flag, currentInterfaceId}) => {
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
              dispatch({type:"interfaces/show", key:selectModuleKey, operatorType: "add", interfaceInfo: {}});
          }else{
              dispatch({type:"interfaces/info", key:selectInterfaceKey, operatorType: "info"});
          }
      }
  };
  let InterfaceInfoView = Form.create()(
      (props) => {
          return <InterfaceEditor
              form={props.form}
              dispatch={dispatch}
              operatorType={interfaces.operatorType}
              interfaceInfo={interfaces.interfaceInfo}/>
      }
  );
  // module
  const moduleNode = data => data.map((item) => {

    const interfaceNode = data => data.map((item) => {
      return <TreeNode title={item.interfaceName} key={item.moduleId +"-"+ item.interfaceId} isLeaf={true}></TreeNode>;
    });
    const interFaceNodes = (item.interfaceViews && item.interfaceViews.length > 0)? interfaceNode(item.interfaceViews) : [];

    return <TreeNode title={item.moduleName} key={item.moduleId} isLeaf={false}>
      {interFaceNodes}
      <TreeNode isLeaf={true} key={item.moduleId+"-0"} title={<div className={style.addInterfaceBtn}><Icon type="plus-circle-o" /> Add Interface</div>} />
    </TreeNode>;
  });

  const moduleNodes = moduleNode(modules);
  const moduleTree = <Tree  loadData={onLoadData} onSelect={onSelect}>
    {moduleNodes}
  </Tree>;

  return (
    <div className={style.moduleContainer}>
      <div className={style.ModuleCollapseLeft}>
        {moduleTree}
        <Button className={style.addModuleBtn}><Icon type="plus-circle-o"/>Add Module</Button>
      </div>
      <div className={style.ModuleCollapseRight}>
        <InterfaceInfoView />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
  const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
  const loading = state.loading.effects['modules/reload'];
  const {modules, flag, currentInterfaceId} = state.modules;
  const interfaces = state.interfaces;
  return {
    currentInterfaceId,
    flag,
    modules: modules,
    interfaces:interfaces,
    userRole: parseInt(userRole),
    userAuthority: parseInt(userAuthority),
    loading
  };
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
