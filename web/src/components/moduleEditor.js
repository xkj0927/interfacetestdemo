/**
 * Created by Administrator on 2017/8/24 0024.
 */
import React from "react";
import {Input, Form, Button, DatePicker, Select, message, Table} from "antd";
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
export default injectIntl(({dispatch, interfaceInfo, form, intl}) => {
    debugger;
    console.log("interfaceInfo:",interfaceInfo);
    const {getFieldDecorator, validateFields} = form;
    const columns = [
        {
            title: "ParamName",
            dataIndex: 'paramName'
        },
        {
            title: "ParamType",
            dataIndex: 'paramType'
        },
        {
            title: intl.formatMessage({id: "user.operation"}),
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button title={intl.formatMessage({id: "user.editUser"})}  size="small" onClick={
                            () => {
                                dispatch({type: "users/show", payload: "mod", userInfo: record});
                            }
                        }><Icon type="edit" /></Button>
                        <Popconfirm title={intl.formatMessage({id: "user.delConfirm"})}
                                    onConfirm={
                                        () => {
                                            dispatch({type: "users/delete", payload: record.userId});
                                        }
                                    }>
                            <Button title={intl.formatMessage({id: "user.delUser"})} size="small"><Icon type="delete" /></Button>
                        </Popconfirm>
                    </Button.Group>
                );
            }
        }
    ];
    return (
        <div>
            <Form>
                <FormItem  label={"interfaceName:"} {...formLayout}>
                    {getFieldDecorator("interfaceName", {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({id: "user.warn.emptyUserName"})
                            },
                            {
                                pattern: /^.{1,20}$/,
                                message: intl.formatMessage({id: "user.warn.tooManyChar20"})
                            }
                        ],
                        initialValue: "aaa"
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem  label={"interfaceUrl:"} {...formLayout}>
                    {getFieldDecorator("interfaceType", {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({id: "user.warn.emptyUserName"})
                            },
                            {
                                pattern: /^.{1,20}$/,
                                message: intl.formatMessage({id: "user.warn.tooManyChar20"})
                            }
                        ],
                        initialValue: "aaa"
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem  label={"interfaceUrl:"} {...formLayout}>
                    {getFieldDecorator("interfaceType", {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({id: "user.warn.emptyUserName"})
                            },
                            {
                                pattern: /^.{1,20}$/,
                                message: intl.formatMessage({id: "user.warn.tooManyChar20"})
                            }
                        ],
                        initialValue: "aaa"
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem  label={"interfaceUrl:"} {...formLayout}>
                    {getFieldDecorator("interfaceType", {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({id: "user.warn.emptyUserName"})
                            },
                            {
                                pattern: /^.{1,20}$/,
                                message: intl.formatMessage({id: "user.warn.tooManyChar20"})
                            }
                        ],
                        initialValue: "aaa"
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <div>
                    <Table columns={columns} dataSource={interfaceInfo}/>
                </div>
            </Form>
        </div>
    );
});
