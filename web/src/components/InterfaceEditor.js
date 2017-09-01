/**
 * Created by admin on 2017/8/23.
 */
import React from "react";
import {Input, Form, Button, DatePicker, Select, message, Table, Icon, Popconfirm, Modal} from "antd";
import {FormattedMessage, injectIntl} from 'react-intl';
import style from "./InterfaceEditor.less"
import InterfaceParamEditor from "./InterfaceParamEditor";
import TestCaseDetailInfo from "./TestCaseDetailInfo";
import TestCaseEditor from './TestCaseEditor'
import InterfaceInfoEdit from './InterfaceInfoEdit'

const FormItem = Form.Item;
export default injectIntl(({dispatch, operatorType, interfaceInfo, moduleKey, displayInterParamDia, displayTestCaseDia,
  displayEditTestCaseModal, currentTestCase, currentReqParam, currentRespParam, testCaseDetailInfo, jsonEditModal, displayInterfaceInfoDia, testCaseParamFrom, interfaceEditFrom, reqOrResp, form, intl}) => {
    const {getFieldDecorator, validateFields} = form;
    let requestTableData = [];
    let responseTableData = [];

    // requestParam的列定义
    const columns = [
        {
            title: intl.formatMessage({id: "interface.request.paramName"}),
            dataIndex: 'requestParamName',
            width:"30%"
        },
        {
            title: intl.formatMessage({id: "interface.request.paramType"}),
            dataIndex: 'requestParamType',
            width:"20%"
        },
        {
            title: intl.formatMessage({id: "interface.request.paramDesc"}),
            dataIndex: 'requestParamDescription',
            width:"42%"
        },
      {
        title: intl.formatMessage({id: "testCase.operation"}),
          width:"8%",
        render: (text, record) => {
          return (
            <Button.Group type="ghost">
              <Button title="edit"  size="small" onClick={showEditRequestParamModal.bind(this, record)}><Icon type="edit"/></Button>
              <Popconfirm title={intl.formatMessage({id: "interface.request.deleteConfirm"})}
                          onConfirm={
                            () => {
                              const {interfaceId} = interfaceInfo;
                              dispatch({type: "interfaces/deleteRequestParam", interfaceId: interfaceId, requestParam: record});
                            }
                          }>
                <Button title="delete" size="small"><Icon type="delete" /></Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];

  // responseParam 的列定义
  const responseResultColumns = [
    {
      title: intl.formatMessage({id: "interface.request.paramName"}),
      dataIndex: 'responseParamName',
      width:"30%"
    },
    {
      title: intl.formatMessage({id: "interface.request.paramType"}),
      dataIndex: 'responseParamType',
      width:"20%"
    },
    {
      title: intl.formatMessage({id: "interface.request.paramDesc"}),
      dataIndex: 'responseParamDescription',
      width:"42%"
    },
    {
      title: intl.formatMessage({id: "testCase.operation"}),
      width:"8%",
      render: (text, record) => {
        return (
          <Button.Group type="ghost">
            <Button title="edit"  size="small" onClick={showEditResponseParamModal.bind(this, record)}><Icon type="edit"/></Button>
            <Popconfirm title={intl.formatMessage({id: "interface.request.deleteConfirm"})}
                        onConfirm={
                          () => {
                            const {interfaceId} = interfaceInfo;
                            dispatch({type: "interfaces/deleteResponseParam", interfaceId: interfaceId, responseParam: record});
                          }
                        }>
              <Button title="delete" size="small"><Icon type="delete" /></Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    }
  ];

    const showEditRequestParamModal = (record) =>{
      const {interfaceId} = interfaceInfo;
      dispatch({type:"interfaces/showParam", interfaceId: interfaceId, currentParam: record, reqOrResp: "requestParam"});
    };

  const showEditResponseParamModal = (record) =>{
    const {interfaceId} = interfaceInfo;
    dispatch({type:"interfaces/showParam", interfaceId: interfaceId, currentParam: record, reqOrResp: "responseParam"});
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
    const testCaseColumns = [
        {
            title: intl.formatMessage({id: "testCase.testCaseName"}),
            dataIndex: 'testCaseName',
            width: '16%',
        },
        {
            title: intl.formatMessage({id: "testCase.expectStatus"}),
            dataIndex: 'expectStatus',
            width: '8%',
        },
        {
            title: "",
            width: '4%',
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button title="Edit Param Case"  size="small" onClick={showTestCaseDetailInfoDialog.bind(this, record,"paramCase")}><Icon type="edit" /></Button>
                    </Button.Group>
                );
            }
        },
        {
            title: "Param Case",
            dataIndex: 'paramCase',
            width: '30%',
        },
        {
            title: "",
            width: '4%',
            render: (text, record) => {
                return (
                    <Button.Group type="ghost">
                        <Button title="Edit Expect Result"  size="small" onClick={showTestCaseDetailInfoDialog.bind(this, record, "expectResult")}><Icon type="edit" /></Button>
                    </Button.Group>
                );
            }
        },
        {
            title: "Expect Result",
            dataIndex: 'expectResult',
            width: '30%',
        },
        {
            title: intl.formatMessage({id: "testCase.operation"}),
            width: '8%',
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
        dispatch({type:"interfaces/info", selectModuleKey:interfaceInfo.moduleId, selectInterfaceKey:interfaceInfo.interfaceId, operatorType: "info"});
    };

    const showInterfaceParamDialog =(param)=>{
      dispatch({type:"interfaces/showParam", interfaceInfo: interfaceInfo, reqOrResp: param});
    };
    const showTestCaseDetailInfoDialog =(testCase, testCaseParamFrom)=>{
        dispatch({type:"interfaces/showTestCase", record: testCase, testCaseParamFrom: testCaseParamFrom});
    };
    const showEditInterfaceInfoModal =()=>{
        dispatch({type:"interfaces/showInterfaceInfo", from:"interfaceEdit"});
    };
    let ParamEditor = Form.create()(
        (props) => {
            return <InterfaceParamEditor
                form={props.form}
                dispatch={dispatch}
                interfaceInfo = {interfaceInfo}
                reqOrResp={reqOrResp}
                currentReqParam= {currentReqParam}
                currentRespParam={currentRespParam}/>
        }
    );
    let title = "";
    if("requestParam" == reqOrResp){
        title=intl.formatMessage({id: "interface.request.title"})
    }else if("responseParam" == reqOrResp){
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
                testCaseDetailInfo = {testCaseDetailInfo}
                jsonEditModal = {jsonEditModal}
                testCaseParamFrom = {testCaseParamFrom}/>
        }
    );
    const TestCaseDetailInfoModal = <Modal
        style={{width: "800px"}}
        title="Edit Param"
        visible={displayTestCaseDia}
        onCancel={showTestCaseDetailInfoDialog}
        footer={null}>
        <TcDetailInfo />
    </Modal>;

    let InterfaceEditInfo = Form.create()(
        (props) => {
            return <InterfaceInfoEdit
                form={props.form}
                dispatch={dispatch}
                interfaceInfo = {interfaceInfo}
                moduleId ={interfaceInfo.moduleId}
                from={interfaceEditFrom}/>
        }
    );
    const InterfaceInfoEditModal = <Modal
        title="Edit Interface Info"
        visible={displayInterfaceInfoDia}
        onCancel={showEditInterfaceInfoModal}
        footer={null}>
        <InterfaceEditInfo />
    </Modal>;
    if("info" == operatorType){
        requestTableData = interfaceInfo.requestParams;
        responseTableData = interfaceInfo.responseParams;

        const {interfaceName,interfaceType, interfaceUrl, interfaceId, run} = interfaceInfo;
        return (
           <div>
               <Button onClick={showEditInterfaceInfoModal.bind(this,"")} className={style.editInterfaceBtn}><Icon type="edit"/>{intl.formatMessage({id: "interface.editInterface"})}</Button>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceName"})}</b>{interfaceName}</div>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceType"})}</b>{interfaceType}</div>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceURL"})}</b>{interfaceUrl}</div>
               <div className={style.interfaceInfoDiv}><b>{intl.formatMessage({id: "interface.interfaceRun"})}</b>{run?"YES":"NO"}</div>
               <div>
                   <b>{intl.formatMessage({id: "interface.requestParam"})}</b>
                   <Button className={style.editInterfaceBtn} onClick={showInterfaceParamDialog.bind(this, "requestParam")}><Icon type="save"/>{intl.formatMessage({id: "interface.addRequestParam"})}</Button>
               </div>
               <div className={style.interfaceInfoDiv}>
                   <Table columns={columns} dataSource={requestTableData} pagination={false} bordered/>
               </div>
               <div>
                   <b>{intl.formatMessage({id: "interface.responseParam"})}</b>
                   <Button className={style.editInterfaceBtn} onClick={showInterfaceParamDialog.bind(this, "responseParam")}><Icon type="save"/>{intl.formatMessage({id: "interface.addResponseParam"})}</Button>
               </div>
               <div className={style.interfaceInfoDiv}>
                   <Table columns={responseResultColumns} dataSource={responseTableData} pagination={false} bordered/>
               </div>
               <div>
                   <b>{intl.formatMessage({id: "interface.testCaseList"})}<Button onClick={showEditTestCaseModal.bind(this,"")} className={style.editInterfaceBtn}><Icon type="save"/>{intl.formatMessage({id: "testCase.addModalTitle"})}</Button></b>
               </div>
               <div className={style.interfaceInfoDiv}>
                   <Table columns={testCaseColumns} dataSource={interfaceInfo.testCaseViews} pagination={false} bordered/>
               </div>
               {TestCaseDetailInfoModal}
               {addParamEditorModal}
               {editTestCaseModal}
               {InterfaceInfoEditModal}
           </div>
        );
    }
    else{
        return (<div></div>);
    }
});
