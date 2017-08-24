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
    let tabledata = [{"paramName": "name","paramType": "String"},{"paramName": "age","paramType": "int"},{"paramName": "gender","paramType": "String"}];
    console.log(modules);
    const columns = [
    {
    title: "ParamName",
    dataIndex: 'paramName'
    },
    {
    title: "ParamType",
    dataIndex: 'paramType'
    },
    {
    title: "operation",
    render: (text, record) => {
    return (
    <Button.Group type="ghost">
    <Button title={intl.formatMessage({id: "user.editUser"})}  size="small" onClick={
        () => {
            dispatch({type: "users/show", payload: "mod", userInfo: record});
        }
    }><Icon type="edit" /></Button>
    <Popconfirm title={intl.formatMessage({id: "user.delConfirm"})}
    onConfirm={
        () => {
            dispatch({type: "users/delete", payload: record.userId});
        }
    }>
    <Button title={intl.formatMessage({id: "user.delUser"})} size="small"><Icon type="delete" /></Button>
    </Popconfirm>
    </Button.Group>
    );
    }
    }
    ];

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
      dispatch({type: "interfaces/list", payload: moduleId});
      resolve();
    });
  };
  const getInterfacesByModule = moduleId => interfaces.filter((face) => {
    return (face.moduleId == moduleId);
  });
  // module
  const moduleNode = data => data.map((item) => {
    // interface node
    const interfaceNode = data => data.map((item) => {
      return <TreeNode title={item.interfaceName} key={item.moduleId +"-"+ item.interfaceId} ></TreeNode>;
    });
    const interFaceNodes = interfaceNode(getInterfacesByModule(item.moduleId));

    return <TreeNode title={item.moduleName} key={item.moduleId} isLeaf={false}>
      {interFaceNodes}
      <TreeNode isLeaf={true} title={<div className={style.addInterfaceBtn}><Icon type="plus-circle-o" /> Add Interface</div>} />
    </TreeNode>;
  });

  const moduleNodes = moduleNode(modules);
  const moduleTree = <Tree  loadData={onLoadData}>
    {moduleNodes}
  </Tree>;

  return (
    <div className={style.moduleContainer}>
      <div className={style.ModuleCollapseLeft}>
        {moduleTree}
        <Button className={style.addModuleBtn}><Icon type="plus-circle-o"/>Add Module</Button>
      </div>
      <div className={style.ModuleCollapseRight}>
        <div>
            <div>
                <Table columns={columns} dataSource={tabledata}/>
            </div>
        </div>
        <Table dataSource={tabledata} columns={columns}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
  const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
  const loading = state.loading.effects['modules/reload'];
  const {modules, flag, currentInterfaceId} = state.modules;
  const {interfaces} = state.interfaces;
  return {
    currentInterfaceId,
    flag,
    modules: modules,
    interfaces: interfaces,
    userRole: parseInt(userRole),
    userAuthority: parseInt(userAuthority),
    loading
  };
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
