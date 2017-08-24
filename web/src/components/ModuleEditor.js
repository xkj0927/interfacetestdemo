import React from "react";
import {Form, Input, InputNumber, Select, Button, message, Switch} from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from './module-editor.less';

const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
  }
};

export default injectIntl(({form, intl, dispatch, moduleInfo, projectId}) => {
  const {getFieldDecorator, validateFields} = form;
  debugger
  const {moduleName, run, moduleId} = moduleInfo;
  const type = moduleId ? "update" : "add";
  let deleteForm = null;
  if("update" == type){
    const deleteModuleHandle = (e) => {
      dispatch({type: "modules/delete", payload: moduleId});
    };
    deleteForm = <Button type="button" className={style.deleteModuleBtn} onClick={deleteModuleHandle}><FormattedMessage id="module.delete"/></Button>;
  }

  const submitHandle = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if("update" == type){
          dispatch({type: "modules/edit", payload: {...moduleInfo, ...values}});
        }else{
          dispatch({type: "modules/add", payload: {...values, ...{projectId:projectId}}});
        }
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

        <FormItem
          {...formLayout}
          label={intl.formatMessage({id: "module.running"}) + ":"}
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
          {deleteForm}
          <Button type="primary" htmlType="submit"><FormattedMessage id="module.save"/></Button>
        </FormItem>
      </Form>
    </div>
  );
});
