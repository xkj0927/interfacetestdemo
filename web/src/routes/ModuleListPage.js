import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse} from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import * as constants from '../utils/constants';
import style from './ModulePage.less';
import InterfaceEditor from '../components/InterfaceEditor'

const Panel = Collapse.Panel;
const ModuleListPage = ({dispatch, modules = [], intl, userRole, userAuthority, loading, flag, currentInterfaceId, interfaceInfo, iflag}) => {
    debugger;
    let modulePanel = [];
    let interfaceInfos = [];
    // let iInfo = modules.interfaceInfo;
    let InInfo = [];
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
    modules.map(function(module){
        console.log(module);
        const {interfaces = []} = module;
        let interfaceArr = [];
        debugger;
        for(let i=0; i<interfaces.length; i++){
            let testcasesArr = [];
            if(currentInterfaceId != 0 && currentInterfaceId == interfaces[i].interfaceId){
                interfaceInfos= (
                    <div>
                        <div><b>interface name: </b>{interfaces[i].interfaceName}</div>
                        <div><b>request type: </b>{interfaces[i].interfaceType}</div>
                        <div><b>request url: </b>{interfaces[i].interfaceUrl}</div>
                        <div><b>is run: </b>{interfaces[i].isRun}</div>
                    </div>);
                // inInfo = ( <InterfaceEditor
                //         dispatch={dispatch}
                //         interfaceInfo={iInfo}/>
                // );
            }
            if(null != interfaceInfo){
                InInfo = Form.create()(
                    (props) => {
                        return <InterfaceEditor
                        form={props.form}
                        dispatch={dispatch}
                        interfaceInfo={interfaceInfo}/>
                    }
                );
            }
            if(null != interfaces[i].testcases && interfaces[i].testcases.length>0){
                for(let j=0; j<interfaces[i].testcases.length; j++){
                    testcasesArr.push(<p>{interfaces[i].testcases[j].interfaceTestCaseId}</p>);
                }
            }
            interfaceArr.push(<Collapse onChange={
                (keys) => {
                    console.log(keys);
                    {/*dispatch({type: "modules/testcaselist", payload: keys});*/}
                    dispatch({type: "interfaces/info", payload: keys});
                }
            }><Panel header={interfaces[i].interfaceName} key={interfaces[i].interfaceId}>{testcasesArr}</Panel></Collapse>);
        }

        modulePanel.push(<Panel header={module.moduleName} key={module.moduleId}>{interfaceArr}</Panel>);
    });
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
            {/*<div className={style.ModuleCollapseRight}>*/}
                {/*<div>*/}
                    {/*{interfaceInfos}*/}
                {/*</div>*/}
                {/*<Table dataSource={dataSource} columns={columns} />*/}
            {/*</div>*/}
            {/*<InInfo/>*/}
            <div>
                <Table columns={columns} dataSource={tabledata}/>
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
    const {interfaceInfo, iflag} = state.interfaces;
    return {interfaceInfo, currentInterfaceId, flag, iflag, modules: modules, userRole: parseInt(userRole), userAuthority: parseInt(userAuthority), loading};
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
