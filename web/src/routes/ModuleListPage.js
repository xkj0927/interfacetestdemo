import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse} from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import * as constants from '../utils/constants';
import style from './ModulePage.less';

const Panel = Collapse.Panel;
const ModuleListPage = ({dispatch, modules = [], intl, userRole, userAuthority, loading, flag, currentInterfaceId}) => {
    debugger;
    let modulePanel = [];
    let interfaceInfo = [];
    // let interfaceList = modules.interfaces;
    console.log(modules);
    modules.map(function(module){
        console.log(module);
        const {interfaces = []} = module;
        let interfaceArr = [];
        debugger;
        for(let i=0; i<interfaces.length; i++){
            let testcasesArr = [];
            if(currentInterfaceId != 0 && currentInterfaceId == interfaces[i].interfaceId){
                interfaceInfo= (
                    <div>
                        <div><b>interface name: </b>{interfaces[i].interfaceName}</div>
                        <div><b>request type: </b>{interfaces[i].interfaceType}</div>
                        <div><b>request url: </b>{interfaces[i].interfaceUrl}</div>
                        <div><b>is run: </b>{interfaces[i].isRun}</div>
                    </div>);
            }
            if(null != interfaces[i].testcases && interfaces[i].testcases.length>0){
                for(let j=0; j<interfaces[i].testcases.length; j++){
                    testcasesArr.push(<p>{interfaces[i].testcases[j].interfaceTestCaseId}</p>);
                }
            }
            interfaceArr.push(<Collapse onChange={
                (keys) => {
                    console.log(keys);
                    dispatch({type: "modules/testcaselist", payload: keys});
                }
            }><Panel header={interfaces[i].interfaceName} key={interfaces[i].interfaceId}>{testcasesArr}</Panel></Collapse>);
        }

        modulePanel.push(<Panel header={module.moduleName} key={module.moduleId}>{interfaceArr}</Panel>);
    });
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
    return (
        <div>
            <div className={style.ModuleCollapseLeft}>
                <Collapse onChange={
                    (keys) => {
                        console.log(keys);
                        dispatch({type: "modules/interfacelist", payload: keys});
                    }
                }>
                    {modulePanel}
                </Collapse>
            </div>
            <div className={style.ModuleCollapseRight}>
                <div>
                    {interfaceInfo}
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    debugger;
    const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
    const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
    const loading = state.loading.effects['modules/reload'];
    const {modules, flag, currentInterfaceId} = state.modules;
    return {currentInterfaceId, flag, modules: modules, userRole: parseInt(userRole), userAuthority: parseInt(userAuthority), loading};
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
