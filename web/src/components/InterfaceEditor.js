/**
 * Created by admin on 2017/8/23.
 */
import React from "react";
import {Input, Form, Button, DatePicker, Select, message, Table, Icon, Popconfirm, Modal} from "antd";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"
import InterfaceParamEditor from "./InterfaceParamEditor";
import TestCaseDetailInfo from "./TestCaseDetailInfo";
import TestCaseEditor from '../components/TestCaseEditor'

const FormItem = Form.Item;
export default injectIntl(({dispatch, operatorType, interfaceInfo, moduleKey, displayInterParamDia, displayTestCaseDia, displayEditTestCaseModal, currentTestCase, testCaseDetailInfo, fromWhere, form, intl}) => {
    const {getFieldDecorator, validateFields} = form;
    let requestTableData = [];
    let responseTabledata = [];

    const columns = [
        {
            title: intl.formatMessage({id: "interface.request.paramName"}),
            dataIndex: 'requestParamName'
        },
        {
            title: intl.formatMessage({id: "interface.request.paramType"}),
            dataIndex: 'requestParamType'
        },
        {
            title: intl.formatMessage({id: "interface.request.paramDesc"}),
            dataIndex: 'requestParamDescrption'
        },
      {
        title: "",
        render: (text, record) => {
          return (
            <Button.Group type="ghost">
              <Button title="edit"  size="small" onClick={showEditInterfaceParamModal.bind(this, record)}><Icon type="edit"/></Button>
              <Popconfirm title={intl.formatMessage({id: "interface.request.deleteConfirm"})}
                          onConfirm={
                            () => {
                              const {interfaceId} = interfaceInfo;
                              dispatch({type: "interfaces/deleteRequestParam", interfaceId: interfaceId, payload: record});
                            }
                          }>
                <Button title="delete" size="small"><Icon type="delete" /></Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];

    const showEditInterfaceParamModal = (param) =>{
      const {interfaceId} = interfaceInfo;
      debugger
      dispatch({type:"interfaces/showParam", interfaceId: interfaceId, fromWhere: param});
    };

    const editTestCaseModalShow = () => {
      dispatch({type:"interfaces/showEditTestCaseModal", payload:""});
    };
    const showEditTestCaseModal = (testCase) =>{
      dispatch({type:"interfaces/showEditTestCaseModal", currentTestCase:testCase});
    };

    let TestCaseEditorForm = Form.create()(
      (props) => {
        return <TestCaseEditor form={props.form} dispatch={dispatch} currentTestCase={props.currentTestCase} interfaceId ={props.interfaceId}/>
      }
    );

    const moduleTitle = currentTestCase? intl.formatMessage({id: "testCase.editModalTitle"}):intl.formatMessage({id: "testCase.addModalTitle"});
    const editTestCaseModal = <Modal
          title={moduleTitle}
          visible={displayEditTestCaseModal}
          onCancel={editTestCaseModalShow}
          footer={null}
          key={moduleKey}>

      <TestCaseEditorForm currentTestCase={currentTestCase} interfaceId = {interfaceInfo?interfaceInfo.interfaceId:""}/>
    </Modal>;

    const testCaseOperatorColumns = [
        {
            title: "TestCase Name",
            dataIndex: 'testCaseName'
        },
        {
            title: "Expect Status",
            dataIndex: 'expectStatus'
        },
        {
            title: intl.formatMessage({id: "testCase.operation"}),
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button title="edit"  size="small" onClick={showEditTestCaseModal.bind(this, record)}><Icon type="edit"/></Button>
                        <Popconfirm title="delete"
                                    onConfirm={
                                        () => {
                                            dispatch({type: "interfaces/deleteTestCase", payload: record});
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
            title: "TestCase Name",
            dataIndex: 'testCaseName'
        },
        {
            title: "Expect Status",
            dataIndex: 'expectStatus'
        },
        {
            title: intl.formatMessage({id: "testCase.detailInfo"}),
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button title="detail info"  size="small" onClick={showTestCaseDetailInfoDialog.bind(this, record)}><Icon type="info" /></Button>
                    </Button.Group>
                );
            }
        }
    ];
    const handleSubmit=(e)=> {
        e.preventDefault();
        validateFields((err, values) => {
            debugger;
            console.log("values:", values);
            values.moduleId = moduleKey;
            values.requestParam = interfaceInfo.requestParam;
            values.responseResult = interfaceInfo.responseResult;
            if(undefined != interfaceInfo.interfaceId){
                values.interfaceId = interfaceInfo.interfaceId;
            }
            dispatch({type:"interfaces/add", payload:values});
        });
    };

    const showInterfaceParamDialog =(param)=>{
        dispatch({type:"interfaces/showParam", interfaceInfo: interfaceInfo, fromWhere: param});
    };
    let ParamEditor = Form.create()(
        (props) => {
            return <InterfaceParamEditor
                form={props.form}
                dispatch={dispatch}
                interfaceInfo = {interfaceInfo}
                fromWhere = {fromWhere}/>
        }
    );
    const showTestCaseDetailInfoDialog =(testCase)=>{
        dispatch({type:"interfaces/showTestCase", record: testCase});
    };
    let title = "";
    if("requestParam" == fromWhere){
        title=intl.formatMessage({id: "interface.request.title"})
    }else if("responseParam" == fromWhere){
        title=intl.formatMessage({id: "interface.response.title"})
    }
    const addParamEditorModal = <Modal
        title={title}
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
                interfaceInfo = {interfaceInfo}
                testCaseDetailInfo = {testCaseDetailInfo}/>
        }
    );
    const TestCaseDetailInfoModal = <Modal
        title="TestCase Detail Info"
        visible={displayTestCaseDia}
        onCancel={showTestCaseDetailInfoDialog}
        footer={null}>
        <TcDetailInfo />
    </Modal>;
    if("info" == operatorType){
        debugger;
        if(null != interfaceInfo.requestParam && "" != interfaceInfo.requestParam){
            requestTableData = interfaceInfo.requestParams;
        }
        if(null != interfaceInfo.responseResult && "" != interfaceInfo.responseResult){
            responseTabledata = JSON.parse(interfaceInfo.responseResult);
        }
        let run = "";
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
               }><Icon type="edit"/>{intl.formatMessage({id: "interface.editInterface"})}</Button>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceName"})}</b>{interfaceName}</div>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceType"})}</b>{interfaceType}</div>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceURL"})}</b>{interfaceUrl}</div>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceRun"})}</b>{run}</div>
               <div className={style.interfaceInfoDiv}>
                   <b>{intl.formatMessage({id: "interface.requestParam"})}</b>
               </div>
               <div>
                   <Table columns={columns} dataSource={requestTableData} pagination={false} bordered/>
               </div>
               <div className={style.interfaceInfoDiv}>
                   <b>{intl.formatMessage({id: "interface.responseParam"})}</b>
               </div>
               <div>
                   <Table columns={columns} dataSource={responseTabledata} pagination={false} bordered/>
               </div>
               <div className={style.interfaceInfoDiv}>
                   <b>{intl.formatMessage({id: "interface.testCaseList"})}</b>
               </div>
               <div>
                   <Table columns={testCaseColumns} dataSource={interfaceInfo.testCaseViews} pagination={false}/>
               </div>
               {TestCaseDetailInfoModal}
           </div>
        );
    }else if("edit" == operatorType){
        if(null != interfaceInfo.requestParam && "" != interfaceInfo.requestParam){
            requestTableData = JSON.parse(interfaceInfo.requestParam);
        }
        if(null != interfaceInfo.responseResult && "" != interfaceInfo.responseResult){
            responseTabledata = JSON.parse(interfaceInfo.responseResult);
        }
        let run = "true";
        if(!interfaceInfo.run){
            run = "false";
        }
        const {interfaceName = [],interfaceType = [], interfaceUrl =[], isRun=[]} = interfaceInfo;
        return (
            <div>
                <FormItem>
                    <Button className={style.editInterfaceBtn} onClick={handleSubmit.bind(this)}><Icon type="save"/>{intl.formatMessage({id: "interface.saveInterface"})}</Button>
                </FormItem>
                <Form>
                    <FormItem  label={intl.formatMessage({id: "interface.interfaceName"})}>
                        {getFieldDecorator("interfaceName", {
                            rules: [
                                {
                                    required: true,
                                    message: intl.formatMessage({id: "module.warn.emptyInterfaceName"})
                                }
                            ],
                            initialValue: interfaceName
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={intl.formatMessage({id: "interface.interfaceType"})}>
                        {getFieldDecorator("interfaceType", {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                            initialValue: interfaceType
                        })(
                            <Select>
                                <Option value="POST">POST</Option>
                                <Option value="GET">GET</Option>
                                <Option value="DELETE">DELETE</Option>
                                <Option value="PUT">PUT</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem  label={intl.formatMessage({id: "interface.interfaceURL"})}>
                        {getFieldDecorator("interfaceUrl", {
                            rules: [
                                {
                                    required: true,
                                    message: intl.formatMessage({id: "module.warn.emptyInterfaceURL"})
                                },

                            ],
                            initialValue: interfaceUrl
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem  label={intl.formatMessage({id: "interface.interfaceRun"})}>
                        {getFieldDecorator("run", {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                            initialValue: run
                        })(
                            <Select>
                                <Select.Option value="true">yes</Select.Option>
                                <Select.Option value="false">no</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <div>
                    <b>{intl.formatMessage({id: "interface.requestParam"})}</b>
                        <Button className={style.editInterfaceBtn} onClick={showInterfaceParamDialog.bind(this, "requestParam")}><Icon type="save"/>{intl.formatMessage({id: "interface.addRequestParam"})}</Button>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={requestTableData} pagination={false}/>
                    </div>
                    <div>
                        <b>{intl.formatMessage({id: "interface.responseParam"})}</b>
                        <Button className={style.editInterfaceBtn} onClick={showInterfaceParamDialog.bind(this, "responseParam")}><Icon type="save"/>{intl.formatMessage({id: "interface.addResponseParam"})}</Button>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={responseTabledata} pagination={false}/>
                    </div>
                    <div>
                        <b>{intl.formatMessage({id: "interface.testCaseList"})}<Button onClick={showEditTestCaseModal.bind(this,"")} className={style.editInterfaceBtn}><Icon type="save"/>{intl.formatMessage({id: "testCase.addModalTitle"})}</Button></b>
                    </div>

                    <div>
                        <Table columns={testCaseOperatorColumns} dataSource={interfaceInfo.testCaseViews} pagination={false}/>
                    </div>
                </Form>
                {addParamEditorModal}
              {editTestCaseModal}
            </div>
        );
    }else if("add" == operatorType){
        const {interfaceName = [],interfaceType = [], interfaceUrl =[], run=[]} = interfaceInfo;
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
                                    message: intl.formatMessage({id: "module.warn.emptyInterfaceName"})
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
                            initialValue: "POST"
                        })(
                            <Select>
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
                                    message: intl.formatMessage({id: "module.warn.emptyInterfaceURL"})
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
                            initialValue: "true"
                        })(
                            <Select>
                                <Select.Option value="true">yes</Select.Option>
                                <Select.Option value="false">no</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
    else{
        return (<div></div>);
    }
});
