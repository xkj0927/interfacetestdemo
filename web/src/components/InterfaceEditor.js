/**
 * Created by admin on 2017/8/23.
 */
import React from "react";
import {Input, Form, Button, DatePicker, Select, message, Table, Icon, Popconfirm} from "antd";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"

const FormItem = Form.Item;
export default injectIntl(({dispatch, operatorType, interfaceInfo, moduleKey, form, intl}) => {
    const {getFieldDecorator, validateFields} = form;
    let requestTabledata = [];
    let responseTabledata = [];
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
    const handleSubmit=(e)=> {
        e.preventDefault();
        validateFields((err, values) => {
            console.log('收到表单值：',values);
            values.moduleId = moduleKey;
            values.requestParam = interfaceInfo.requestParam;
            values.responseResult = interfaceInfo.responseResult;
            if(undefined != interfaceInfo.interfaceId){
                values.interfaceId = interfaceInfo.interfaceId;
            }
            dispatch({type:"interfaces/add", values});
        });
    };
    if("info" == operatorType){
        requestTabledata = JSON.parse(interfaceInfo.requestParam);
        responseTabledata = JSON.parse(interfaceInfo.responseResult);
        const {interfaceName,interfaceType, interfaceUrl, isRun, interfaceId} = interfaceInfo;
        return (
           <div>
               <Button className={style.editInterfaceBtn} onClick={
                   () => {
                       dispatch({type: "interfaces/show", key: interfaceId, operatorType: "edit", interfaceInfo: interfaceInfo, selectModuleKey:interfaceInfo.moduleId});
                   }
               }><Icon type="edit"/>Edit Interface</Button>
               <div><b>interfaceName:</b>{interfaceName}</div>
               <div><b>interfaceType:</b>{interfaceType}</div>
               <div><b>interfaceUrl:</b>{interfaceUrl}</div>
               <div><b>isRun:</b>{isRun}</div>
               <div>
                   <Table columns={columns} dataSource={requestTabledata} pagination={false}/>
               </div>
               <div>
                   <Table columns={columns} dataSource={responseTabledata} pagination={false}/>
               </div>
           </div>
        );
    }else if("edit" == operatorType){
        requestTabledata = JSON.parse(interfaceInfo.requestParam);
        responseTabledata = JSON.parse(interfaceInfo.responseResult);
        const {interfaceName = [],interfaceType = [], interfaceUrl =[], isRun=[]} = interfaceInfo;
        return (
            <div>
                <FormItem>
                    <Button className={style.editInterfaceBtn} onClick={handleSubmit.bind(this)}><Icon type="save"/>Save Interface</Button>
                </FormItem>
                <Form>
                    <FormItem  label={"interfaceName:"}>
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
                            initialValue: interfaceName
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={"interfaceType:"}>
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
                            initialValue: interfaceType
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={"interfaceUrl:"}>
                        {getFieldDecorator("interfaceUrl", {
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
                            initialValue: interfaceUrl
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={"isRun:"}>
                        <Select defaultValue={isRun}>
                            <Option value="0">yes</Option>
                            <Option value="1">no</Option>
                        </Select>
                    </FormItem>
                    <div>
                        <b>Request Param: </b>
                        <Button className={style.editInterfaceBtn} onClick={handleSubmit.bind(this)}><Icon type="save"/>Add Request Param</Button>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={requestTabledata} pagination={false}/>
                    </div>
                    <div>
                        <b>Response Param: </b>
                        <Button className={style.editInterfaceBtn} onClick={handleSubmit.bind(this)}><Icon type="save"/>Add Response Param</Button>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={responseTabledata} pagination={false}/>
                    </div>
                </Form>
            </div>
        );
    }else if("add" == operatorType){
        const {interfaceName = [],interfaceType = [], interfaceUrl =[], isRun=[]} = interfaceInfo;
        return (
            <div>
                <FormItem>
                    <Button className={style.editInterfaceBtn} onClick={handleSubmit.bind(this)}><Icon type="save"/>Save Interface</Button>
                </FormItem>
                <Form>
                    <FormItem  label={"interfaceName:"}>
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
                            initialValue: interfaceName
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={"interfaceType:"}>
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
                            initialValue: interfaceType
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={"interfaceUrl:"}>
                        {getFieldDecorator("interfaceUrl", {
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
                            initialValue: interfaceUrl
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={"isRun:"}>
                        <Select defaultValue={isRun}>
                            <Option value="0">yes</Option>
                            <Option value="1">no</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        );
    }
    else{
        return (<div></div>);
    }
});
