/**
 * Created by Administrator on 2017/8/25 0025.
 */
import React from "react";
import {Form, Table, Input, Popconfirm, Button, message } from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./TestCaseParamForm.less";
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
    var testCaseParamCase = [];
    var testCaseExpectResult = [];
    if(null != testCaseDetailInfo.paramCase && ""!= testCaseDetailInfo.paramCase){
        testCaseParamCase = "";
          try{
            testCaseParamCase = JSON.parse(testCaseDetailInfo.paramCase);
          }catch (e){
            console.log(e);
            message.warn(intl.formatMessage({id: "testCase.params.formatWrong"}));
          }
    }
    if(null != testCaseDetailInfo.expectResult && ""!= testCaseDetailInfo.expectResult){
        testCaseExpectResult = "";
      try{
        JSON.parse(testCaseDetailInfo.expectResult);
      }catch (e){
        console.log(e);
        message.warn(intl.formatMessage({id: "testCase.params.formatWrong"}));
      }
    }
    const {paramCase, expectResult} = testCaseDetailInfo;
    const {getFieldDecorator, validateFields} = form;
    var paramCaseObj = [];
    var ParamDiv = [];

    const columns = [
        {
            title: "paramName",
            dataIndex: 'paramName',
            width:'20%'
        },
        {
            title: "paramType",
            dataIndex: 'paramType',
            width:'20%'
        },
        {
            title: "paramValue",
            dataIndex: 'paramValue',
            width:'60%'
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
                var newJson={"paramName": paramNameObj, "paramType": paramTypeObj,  "paramValue": (<div className={style.testCaseParamEditText}><FormItem>
                    {getFieldDecorator(paramNameObj, {
                        initialValue: testCaseParamCase[paramNameObj]
                    })(
                        <TextArea autosize={{ minRows: 3}} />
                    )}
                </FormItem></div>)};
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
                var newJson={"paramName": paramNameObj, "paramType": paramTypeObj,  "paramValue": (<div className={style.testCaseParamEditText}><FormItem>
                    {getFieldDecorator(paramNameObj, {
                        initialValue: testCaseExpectResult[paramNameObj]
                    })(
                        <TextArea autosize={{ minRows: 3}} />
                    )}
                </FormItem></div>)};
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
                      try{
                        JSON.parse(values.testCaseParam);
                      }catch (e){
                        console.log(e);
                        message.warn(intl.formatMessage({id: "testCase.params.formatWrong"}));
                        return;
                      }
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
                <TextArea autosize={{ minRows: 4}}/>
            )}
        </FormItem>);
    }else{
        ParamDiv =  (<Table columns={columns} dataSource={paramCaseObj} pagination={false} bordered/>);
    }
    return (
        <div className={style.showParamsContent}>
            <Form>
                {ParamDiv}
                <FormItem>
                    <Button className={style.testCaseParamEditButton} onClick={changeEditDiv.bind(this)}>{intl.formatMessage({id: "testCase.changeMode.btn"})}</Button>
                    <Button className={style.testCaseParamButton} onClick={handleSubmit.bind(this)}>{intl.formatMessage({id: "module.save"})}</Button>
                </FormItem>
            </Form>
        </div>
    );
});
