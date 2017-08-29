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

export default injectIntl(({form, intl, dispatch, interfaceInfo, fromWhere}) => {
  const {getFieldDecorator, validateFields} = form;
  const {requestParam, responseResult, interfaceId} = interfaceInfo;
  let reqOrResp = "response";
  if(fromWhere == "requestParam"){
    reqOrResp = "request";
  }
  const paramSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      debugger
      if (!err) {
        if(reqOrResp == "request"){
          dispatch({type: "interfaces/addRequestParam", testCase: {interfaceId: interfaceId, requestParam:values}});
        }else{
          dispatch({type: "interfaces/addResponseParam", testCase: {interfaceId: interfaceId, responseParam:values}});
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
        <FormItem label={intl.formatMessage({id: `interface.${reqOrResp}.paramName`}) + ":"} {...formLayout}>
          {getFieldDecorator("paramName", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: `interface.${reqOrResp}.paramName.empty`})
              }
            ],
            initialValue: ""
          })(
            <Input type="text"/>
          )}
        </FormItem>
        {/*参数类型*/}
        <FormItem label={intl.formatMessage({id: `interface.${reqOrResp}.paramType`}) + ":"} {...formLayout}>
          {getFieldDecorator("paramType", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: `interface.${reqOrResp}.paramType.empty`})
              }
            ],
            initialValue: ""
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
        <FormItem label={intl.formatMessage({id: `interface.${reqOrResp}.paramDesc`}) + ":"} {...formLayout}>
          {getFieldDecorator("paramDesc", {
            initialValue: ""
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
