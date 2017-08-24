import React from "react";
import {Form, Input, InputNumber, Select, Button, message, Switch} from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';

const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
  }
};

export default injectIntl(({form, intl, type, dispatch, moduleInfo, projectInfo}) => {
  const {getFieldDecorator, validateFields} = form;
  const {moduleName, projectId, isRun} = moduleInfo;
  // const {projectName} = projectInfo;

  const submitHandle = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      debugger
      if (!err) {
        dispatch({type: "modules/add", payload: values});
      } else {
        message.warn(JSON.stringify(err));
      }
    });
  };

  return (
    <div style={{width: "400px"}}>
      <Form onSubmit={submitHandle}>
        <FormItem label={intl.formatMessage({id: "module.moduleName"}) + ":"} {...formLayout}>
          {getFieldDecorator("moduleName", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: "module.moduleName.emptyUserName"})
              }
            ],
            initialValue: moduleName
          })(
            <Input type="text"/>
          )}
        </FormItem>

        <FormItem label={intl.formatMessage({id: "project.projectName"}) + ":"} {...formLayout}>
          {getFieldDecorator("projectId", {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: "project.warn.emptyProject"})
              }
            ],
            initialValue: "1"
          })( <Select>
              <Select.Option value={projectId}>{projectId}</Select.Option>
          </Select>)}
        </FormItem>

        <FormItem
          {...formLayout}
          label={intl.formatMessage({id: "module.running"}) + ":"}
        >
          {getFieldDecorator('isRun', {
            valuePropName: 'checked',
            initialValue : true
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
