/**
 * Created by Administrator on 2017/8/25 0025.
 */
import React from "react";
import {Form, Input, InputNumber, Select, Button, message, Switch, Icon, Table, Row, Col} from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 16
    }
};

export default injectIntl(({form, intl, dispatch, interfaceInfo}) => {
    const {getFieldDecorator, validateFields} = form;
    console.log(interfaceInfo);
    return (
        <div>
           hhjhhyhhh
        </div>
    );
});
