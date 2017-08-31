/**
 * Created by Administrator on 2017/8/25 0025.
 */
import React from "react";
import {Form, Table, Input, Popconfirm, Button } from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"
import {format} from '../utils/JSONFormat';

const FormItem = Form.Item;
const {TextArea} = Input;
const formLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 16
    }
};
export default injectIntl(({form, intl, dispatch, interfaceInfo, testCaseDetailInfo, jsonEditModal, testCaseParamFrom}) => {
    var testCaseParamCase = JSON.parse(testCaseDetailInfo.paramCase);
    var testCaseExpectResult = JSON.parse(testCaseDetailInfo.expectResult);
    const {paramCase, expectResult} = testCaseDetailInfo;
    const {getFieldDecorator, validateFields} = form;
    var paramCaseObj = [];
    var ParamDiv = [];

    const columns = [
        {
            title: "paramName",
            dataIndex: 'paramName'
        },
        {
            title: "paramType",
            dataIndex: 'paramType'
        },
        {
            title: "paramValue",
            dataIndex: 'paramValue',
        },
    ];
    if("paramCase" == testCaseParamFrom){
        if(null != interfaceInfo.requestParams && ""!= interfaceInfo.requestParams){
            var requestParamObject = interfaceInfo.requestParams;
            var paramNameObj;
            var paramTypeObj;
            for(var i=0; i< requestParamObject.length;i++){
                paramNameObj =  requestParamObject[i].requestParamName;
                paramTypeObj =  requestParamObject[i].requestParamType;
                var newJson={"paramName": paramNameObj, "paramType": paramTypeObj,  "paramValue": (<FormItem>
                    {getFieldDecorator(paramNameObj, {
                        initialValue: testCaseParamCase[paramNameObj]
                    })(
                        <textarea rows={2} autosize={true} minRows={2} />
                    )}
                </FormItem>)};
                paramCaseObj.push(newJson);
            }
        }
    }else if("expectResult" == testCaseParamFrom){
        if(null != interfaceInfo.responseParams && ""!= interfaceInfo.responseParams){
            var responseParamObject = interfaceInfo.responseParams;
            var paramNameObj;
            var paramTypeObj;
            for(var i=0; i< responseParamObject.length;i++){
                paramNameObj =  responseParamObject[i].responseParamName;
                paramTypeObj =  responseParamObject[i].responseParamType;
                var newJson={"paramName": paramNameObj, "paramType": paramTypeObj,  "paramValue": (<FormItem>
                    {getFieldDecorator(paramNameObj, {
                        initialValue: testCaseExpectResult[paramNameObj]
                    })(
                        <textarea rows={2} autosize={true} minRows={2} />
                    )}
                </FormItem>)};
                paramCaseObj.push(newJson);
            }
        }
    }

    const handleSubmit=(e)=> {
        e.preventDefault();
        validateFields((err, values) => {
            console.log("values:", values);
            if(null != values){
                if(jsonEditModal){
                    if("paramCase" == testCaseParamFrom){
                        testCaseDetailInfo.paramCase = values.testCaseParam;
                    }else if("expectResult" == testCaseParamFrom){
                        testCaseDetailInfo.expectResult = values.testCaseParam;
                    }
                }else{
                    if("paramCase" == testCaseParamFrom){
                        testCaseDetailInfo.paramCase = JSON.stringify(values);
                    }else if("expectResult" == testCaseParamFrom){
                        testCaseDetailInfo.expectResult = JSON.stringify(values);
                    }
                }
            }
            dispatch({type: "interfaces/editTestCase", testCase: testCaseDetailInfo});
        });
    };

    const changeEditDiv=()=> {
        dispatch({type: "interfaces/changeEditWay", interfaceInfo: interfaceInfo});
    };

    if(jsonEditModal){
        var jsonValue = "";
        if("paramCase" == testCaseParamFrom){
            jsonValue = paramCase
        }else if("expectResult" == testCaseParamFrom){
            jsonValue = expectResult;
        }

        ParamDiv =  (<FormItem label={intl.formatMessage({id: "testCase.paramCase"}) + ":"} {...formLayout}>
            {getFieldDecorator("testCaseParam", {
                initialValue: jsonValue?format(jsonValue, false):""
            })(
                <TextArea rows={4} autosize={true} minRows={4}/>
            )}
        </FormItem>);
    }else{
        ParamDiv =  (<Table columns={columns} dataSource={paramCaseObj} pagination={false}/>);
    }

    return (
        <div>
            <Form>
                <div>
                    {ParamDiv}
                </div>
                <FormItem>
                    <Button  className={style.testCaseParamEditButton} onClick={changeEditDiv.bind(this)}>Change Edit Mode</Button>
                    <Button className={style.testCaseParamButton} onClick={handleSubmit.bind(this)}>Save</Button>
                </FormItem>
            </Form>
        </div>
    );
});
