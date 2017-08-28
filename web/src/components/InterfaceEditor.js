/**
 * Created by admin on 2017/8/23.
 */
import React from "react";
import {Input, Form, Button, DatePicker, Select, message, Table, Icon, Popconfirm, Modal} from "antd";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"
import InterfaceParamEditor from "./InterfaceParamEditor";
import TestCaseDetailInfo from "./TestCaseDetailInfo";

const FormItem = Form.Item;
export default injectIntl(({dispatch, operatorType, interfaceInfo, moduleKey, displayInterParamDia, displayTestCaseDia, form, intl}) => {
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
    ];
    const testCaseOperatorColumns = [
        {
            title: "InterfaceTestCaseId",
            dataIndex: 'interfaceTestCaseId'
        },
        {
            title: "TestCaseName",
            dataIndex: 'testCaseName'
        },
        {
            title: intl.formatMessage({id: "user.operation"}),
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button title="detail info"  size="small" onClick={showTestCaseDetailInfoDialog.bind(this, record)}><Icon type="info" /></Button>
                        <Button title="edit"  size="small" ><Icon type="edit" /></Button>
                        <Popconfirm title="delete"
                                    onConfirm={
                                        () => {
                                            dispatch({type: "interfaces/deleteTestCase", payload: record.testCaseId});
                                        }
                                    }>
                            <Button title="delete" size="small"><Icon type="delete" /></Button>
                        </Popconfirm>
                    </Button.Group>
                );
            }
        }
    ];
    const testCaseColumns = [
        {
            title: "InterfaceTestCaseId",
            dataIndex: 'interfaceTestCaseId'
        },
        {
            title: "TestCaseName",
            dataIndex: 'testCaseName'
        },
    ];
    const handleSubmit=(e)=> {
        e.preventDefault();
        validateFields((err, values) => {
            console.log("values:", values);
            values.moduleId = moduleKey;
            values.requestParam = interfaceInfo.requestParam;
            values.responseResult = interfaceInfo.responseResult;
            if(undefined != interfaceInfo.interfaceId){
                values.interfaceId = interfaceInfo.interfaceId;
            }
            dispatch({type:"interfaces/add", values});
        });
        dispatch({type:"interfaces/info", selectModuleKey:moduleKey, selectInterfaceKey:interfaceInfo.interfaceId, operatorType: "info"});

    };
    const showInterfaceParamDialog =()=>{
        debugger;
         console.log(interfaceInfo);
        dispatch({type:"interfaces/showParam", interfaceInfo: interfaceInfo});
    };
    let ParamEditor = Form.create()(
        (props) => {
            return <InterfaceParamEditor
                form={props.form}
                dispatch={dispatch}
                interfaceInfo = {interfaceInfo}/>
        }
    );
    const showTestCaseDetailInfoDialog =(testCase)=>{
        debugger;
        console.log(testCase);
        dispatch({type:"interfaces/showTestCase", record: testCase});
    };
    const addParamEditorModal = <Modal
        title="Edit Interface Request Param"
        visible={displayInterParamDia}
        onCancel={showInterfaceParamDialog}
        footer={null}>
        <ParamEditor />
    </Modal>;

    let TcDetailInfo = Form.create()(
        (props) => {
            return <TestCaseDetailInfo
                form={props.form}
                dispatch={dispatch}
                interfaceInfo = {interfaceInfo}/>
        }
    );
    const TestCaseDetailInfoModal = <Modal
        title="TestCase Detail Info"
        visible={displayTestCaseDia}
        onCancel={showTestCaseDetailInfoDialog}
        footer={null}>
        <TcDetailInfo />
    </Modal>;
    debugger;
    if("info" == operatorType){
        debugger;
        requestTabledata = JSON.parse(interfaceInfo.requestParam);
        responseTabledata = JSON.parse(interfaceInfo.responseResult);
        let run = "0";
        if(interfaceInfo.run){
            run = "yes";
        }else{
            run = "no";
        }

        const {interfaceName,interfaceType, interfaceUrl, interfaceId} = interfaceInfo;
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
               <div><b>isRun:</b>{run}</div>
               <div>
                   <b>Request Param: </b>
               </div>
               <div>
                   <Table columns={columns} dataSource={requestTabledata} pagination={false}/>
               </div>
               <div>
                   <b>Response Param: </b>
               </div>
               <div>
                   <Table columns={columns} dataSource={responseTabledata} pagination={false}/>
               </div>
               <div>
                   <b>Interface TestCase List: </b>
               </div>
               <div>
                   <Table columns={testCaseColumns} dataSource={interfaceInfo.testCaseViews} pagination={false}/>
               </div>
           </div>
        );
    }else if("edit" == operatorType){
        requestTabledata = JSON.parse(interfaceInfo.requestParam);
        responseTabledata = JSON.parse(interfaceInfo.responseResult);
        let run = "0";
        if(!interfaceInfo.run){
            run = "1";
        }
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
                                },
                            ],
                            initialValue: interfaceType
                        })(
                            <Select defaultValue={interfaceType}>
                                <Option value="POST">POST</Option>
                                <Option value="GET">GET</Option>
                                <Option value="DELETE">DELETE</Option>
                                <Option value="PUT">PUT</Option>
                            </Select>
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
                        {getFieldDecorator("run", {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                            initialValue: run
                        })(
                            <Select defaultValue={run}>
                                <Option value="0">yes</Option>
                                <Option value="1">no</Option>
                            </Select>
                        )}
                    </FormItem>
                    <div>
                        <b>Request Param: </b>
                        <Button className={style.editInterfaceBtn} onClick={showInterfaceParamDialog.bind(this)}><Icon type="save"/>Add Request Param</Button>
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
                    <div>
                        <b>Interface TestCase List: </b>
                    </div>
                    <div>
                        <Table columns={testCaseOperatorColumns} dataSource={interfaceInfo.testCaseViews} pagination={false}/>
                    </div>
                </Form>
                {addParamEditorModal}
                {TestCaseDetailInfoModal}
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
                            <Option value="true">yes</Option>
                            <Option value="false">no</Option>
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
