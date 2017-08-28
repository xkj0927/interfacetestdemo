import React from "react";
import {Form, Input, InputNumber, Select, Button, message, Switch} from "antd";
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

export default injectIntl(({form, intl, dispatch, currentTestCase, interfaceId}) => {
  const {getFieldDecorator, validateFields} = form;
  const {interfaceTestCaseId, testCaseName, paramCase, expectResult,expectStatus,run} = currentTestCase;
  const type = interfaceTestCaseId ? "update" : "add";

  const submitHandle = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if("update" == type){
          dispatch({type: "interfaces/editTestCase", testCase: {...currentTestCase, ...values}});
        }else{
          dispatch({type: "interfaces/addTestCase", testCase: {...values, ...{interfaceId:interfaceId}}});
        }
      } else {
        message.warn(JSON.stringify(err));
      }
    });
  };

  return (
    <div style={{width: "400px"}}>
      <Form onSubmit={submitHandle}>
        <FormItem label={intl.formatMessage({id: "testCase.testCaseName"}) + ":"} {...formLayout}>
          {getFieldDecorator("testCaseName", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: "testCase.testCaseName.emptyTestCase"})
              }
            ],
            initialValue: testCaseName
          })(
            <Input type="text"/>
          )}
        </FormItem>

        <FormItem label={intl.formatMessage({id: "testCase.paramCase"}) + ":"} {...formLayout}>
          {getFieldDecorator("paramCase", {
            initialValue: paramCase
          })(
            <TextArea rows={4} />
          )}
        </FormItem>

        <FormItem label={intl.formatMessage({id: "testCase.expectResult"}) + ":"} {...formLayout}>
          {getFieldDecorator("moduleName", {
            initialValue: expectResult
          })(
            <TextArea rows={4} />
          )}
        </FormItem>

        <FormItem label={intl.formatMessage({id: "testCase.expectStatus"}) + ":"} {...formLayout}>
          {getFieldDecorator("expectStatus", {
            initialValue: expectStatus
          })(
            <Select style={{ width: 120 }} >
              <Select.Option value="200">200</Select.Option>
              <Select.Option value="204">204</Select.Option>
              <Select.Option value="404">404</Select.Option>
              <Select.Option value="500">500</Select.Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formLayout}
          label={intl.formatMessage({id: "testCase.running"}) + ":"}
        >
          {getFieldDecorator('run', {
            valuePropName: 'checked',
            initialValue : run
          })(
            <Switch/>
          )}
        </FormItem>

        <br/>
        <FormItem wrapperCol={{...formLayout.wrapperCol, offset: 21}}>
          <Button type="primary" htmlType="submit"><FormattedMessage id="module.save"/></Button>
        </FormItem>
      </Form>
    </div>
  );
});
