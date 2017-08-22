import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse} from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import * as constants from '../utils/constants';
import style from './ModulePage.less';

const Panel = Collapse.Panel;
const ModuleListPage = ({dispatch, modules = [], intl, userRole, userAuthority, loading, flag}) => {
    debugger;
    let modulePanel = [];
    // let interfaceList = modules.interfaces;
    console.log(modules);
    modules.map(function(module){
        console.log(module);
        const {interfaces = []} = module;
        let interfaceArr = [];
        for(let i=0; i<interfaces.length; i++){
            interfaceArr.push(<Collapse onChange={
                (keys) => {
                    console.log(keys);
                    dispatch({type: "modules/testcaselist", payload: keys});
                }
            }><Panel header={interfaces[i].interfaceName} key={interfaces[i].interfaceId}></Panel></Collapse>);
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
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    debugger;
    const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
    const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
    const loading = state.loading.effects['modules/reload'];
    const {modules, flag} = state.modules;
    return {flag, modules: modules, userRole: parseInt(userRole), userAuthority: parseInt(userAuthority), loading};
};

export default connect(mapStateToProps)(injectIntl(ModuleListPage));
