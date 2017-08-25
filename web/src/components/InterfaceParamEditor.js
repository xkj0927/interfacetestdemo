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
    const paramSubmit=(e)=> {
        e.preventDefault();
        validateFields((err, values) => {
            debugger;
            console.log("values:", values);
            interfaceInfo.requestParam = values.interfaceRequestParam;
            dispatch({type:"interfaces/add", interfaceInfo});
        });
    };
    var index = 0;
    var paramTable = [];
    var requestParam = [];
    if(null != interfaceInfo.requestParam){
        requestParam = JSON.parse(interfaceInfo.requestParam);
    }
    for(index; index<requestParam.length; index++){
        var tdId = requestParam[index].paramName +"-"+index;
        // paramTable.push(<tr id={tdId}><td><input type="text" value={requestParam[index].paramName}/></td><td><input type="text" value={requestParam[index].paramType}/></td></tr>)
        paramTable.push(
            <tr><FormItem lable="aaa"> <input type="text" name="name" defaultValue={requestParam[index].paramName}/><input type="text" defaultValue={requestParam[index].paramType}/></FormItem> </tr>
        );
        // paramTable.push(
        //         <input type="text" defaultValue={requestParam[index].paramType}/>
        // );
    }
    return (
        <div>
            {/*<div>*/}
                {/*<Form>*/}
                    {/*{paramTable}*/}
                {/*</Form>*/}
                {/*<input type="textarea" defaultValue={interfaceInfo.requestParam} rows="3"></input>*/}
            {/*</div>*/}
            <FormItem  label={"interfaceRequestParam:"}>
                {getFieldDecorator("interfaceRequestParam", {
                    initialValue: interfaceInfo.requestParam
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
