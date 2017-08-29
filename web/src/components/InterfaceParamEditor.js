/**
 * Created by Administrator on 2017/8/25 0025.
 */
import React from "react";
import {Form, Input, InputNumber, Select, Button, message, Switch, Icon, Table, Row, Col} from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';

const FormItem = Form.Item;
const {TextArea} = Input;

const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
  }
};

export default injectIntl(({form, intl, dispatch, interfaceInfo, currentReqParam, reqOrResp}) => {
  const {getFieldDecorator, validateFields} = form;
  const {requestParam, responseResult, interfaceId} = interfaceInfo;

  let InterfaceType = "response";
  let paramName,paramType,paramDesc,operateType = "create";
  if(reqOrResp == "requestParam"){
    InterfaceType = "request";
    if(currentReqParam && currentReqParam.interfaceId){
      operateType = "edit";
      paramName = currentReqParam.requestParamName;
      paramType = currentReqParam.requestParamType;
      paramDesc = currentReqParam.requestParamDescription;
    }
  }else{

  }

  const paramSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      debugger
      if (!err) {
        if(InterfaceType == "request"){
          // 针对requestParam 的处理
          if("edit" == operateType){
            // 编辑
            const requestParam = {"requestParamId":currentReqParam.requestParamId, "interfaceId": interfaceId, "requestParamName":values.paramName, "requestParamType":values.paramType, "requestParamDescription":values.paramDesc};
            dispatch({type: "interfaces/editRequestParam", requestParam:requestParam});
          }else{
            // 创建
            const requestParam = {"interfaceId": interfaceId, "requestParamName":values.paramName, "requestParamType":values.paramType, "requestParamDescription":values.paramDesc};
            dispatch({type: "interfaces/addRequestParam", requestParam:requestParam});
          }
        }else{
          // 针对responseParam 的处理， 一个interface只能有一个期望的返回值，所以此处只更新不累加
          const interfaceView = {...interfaceInfo, ...{"responseResult":values}};
          dispatch({type: "interfaces/addResponseParam", interfaceView:interfaceView});
        }
      } else {
        message.warn(JSON.stringify(err));
      }
    });
  };

  return (
    <div style={{width: "450px"}}>
      <Form onSubmit={paramSubmit}>
        {/* 参数名称 */}
        <FormItem label={intl.formatMessage({id: `interface.${InterfaceType}.paramName`}) + ":"} {...formLayout}>
          {getFieldDecorator("paramName", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: `interface.${InterfaceType}.paramName.empty`})
              }
            ],
            initialValue: paramName?paramName:""
          })(
            <Input type="text"/>
          )}
        </FormItem>
        {/*参数类型*/}
        <FormItem label={intl.formatMessage({id: `interface.${InterfaceType}.paramType`}) + ":"} {...formLayout}>
          {getFieldDecorator("paramType", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: `interface.${InterfaceType}.paramType.empty`})
              }
            ],
            initialValue: paramType?paramType:""
          })(
            <Select style={{ width: 120 }} >
              <Select.Option value="String">String</Select.Option>
              <Select.Option value="Integer">Integer</Select.Option>
              <Select.Option value="Long">Long</Select.Option>
              <Select.Option value="Boolean">Boolean</Select.Option>
              <Select.Option value="Object">Object</Select.Option>
            </Select>
          )}
        </FormItem>
        {/*描述信息*/}
        <FormItem label={intl.formatMessage({id: `interface.${InterfaceType}.paramDesc`}) + ":"} {...formLayout}>
          {getFieldDecorator("paramDesc", {
            initialValue: paramDesc?paramDesc:""
          })(
            <TextArea rows={4} autosize={true}/>
          )}
        </FormItem>
        <FormItem wrapperCol={{...formLayout.wrapperCol, offset: 21}}>
          <Button type="primary" htmlType="submit"><Icon type="save"/><FormattedMessage id="module.save"/></Button>
        </FormItem>
      </Form>
    </div>
  );
});
