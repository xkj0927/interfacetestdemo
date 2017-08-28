/**
 * Created by Administrator on 2017/8/25 0025.
 */
import React from "react";
import {Form, Input, InputNumber, Select, Button, message, Switch, Icon, Table, Row, Col} from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"

const FormItem = Form.Item;

export default injectIntl(({form, intl, dispatch, interfaceInfo, fromWhere}) => {
    const {getFieldDecorator, validateFields} = form;
    console.log(interfaceInfo);
    const paramSubmit=(e)=> {
        e.preventDefault();
        validateFields((err, values) => {
            debugger;
            console.log("values:", values);
            if("requestParam" == fromWhere){
                interfaceInfo.requestParam = values.interfaceRequestParam;
            }else if("responseParam" == fromWhere){
                interfaceInfo.responseResult = values.interfaceResponseParam;
            }
            dispatch({type:"interfaces/add", payload:interfaceInfo});
        });
    };
    var requestParam = [];
    let title = "";
    let textValue = "";
    let fieldName = "";
    if("requestParam" == fromWhere){
        title = "interface Request Param:";
        textValue = interfaceInfo.requestParam;
        fieldName = "interfaceRequestParam";
    }else if("responseParam" == fromWhere){
        title = "interface Response Param:";
        textValue = interfaceInfo.responseResult;
        fieldName = "interfaceResponseParam";
    }
    if(null != interfaceInfo.requestParam){
        requestParam = JSON.parse(interfaceInfo.requestParam);
    }
    return (
        <div>
            <FormItem  label={title}>
                {getFieldDecorator(fieldName, {
                    initialValue: textValue
                })(
                    <Input type="textarea"/>
                )}
            </FormItem>
            <FormItem>
                <Button className={style.editInterfaceBtn} onClick={paramSubmit.bind(this)}><Icon type="save"/>Save</Button>
            </FormItem>
        </div>
    );
});
