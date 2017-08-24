import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Spin, Icon, Modal, Form, Collapse } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import * as constants from '../utils/constants';

console.log("AAAAAAAAAA");
debugger;
const InterfaceInfoPage = ({dispatch, interfaceInfo, intl, userRole, userAuthority, loading}) => {


};

const mapStateToProps = (state, ownProps) => {
    debugger;
    const {userRole = constants.USER_ROLE_STUDENT} = ownProps.location.query;
    const {userAuthority = constants.USER_AUTHORITY_NORMAL} = state.common;
    const loading = state.loading.effects['interfaces/reload'];
    const interfaceinfo = state.interfaceInfo;
    return ({...state, interfaceInfo: interfaceInfo, userRole: parseInt(userRole), userAuthority: parseInt(userAuthority), loading});
};

export default connect(mapStateToProps)(injectIntl(InterfaceInfoPage));
