/**
 * Created by Administrator on 2017/8/25 0025.
 */
import React from "react";
import {Form, Table} from "antd";
import {routerRedux} from "dva/router";
import {FormattedMessage, injectIntl} from 'react-intl';

export default injectIntl(({form, intl, dispatch, interfaceInfo, testCaseDetailInfo}) => {
    var testCaseparamCase = JSON.parse(testCaseDetailInfo.paramCase);
    var paramCase = [];
    const columns = [
        {
            title: "paramCaseName",
            dataIndex: 'paramCaseName'
        },
        {
            title: "paramCaseValue",
            dataIndex: 'paramCaseValue'
        },
    ];
    for(var obj in testCaseparamCase){
        debugger;
        console.log(obj);
        console.log(testCaseparamCase[obj]);
        var newJson={"paramCaseName": obj, "paramCaseValue": testCaseparamCase[obj]};
        paramCase.push(newJson);
        console.log(paramCase);
    }
    return (
        <div>
            <div><b>TestCase Name:</b>{testCaseDetailInfo.testCaseName}</div>
            <div><b>Expect Status:</b>{testCaseDetailInfo.expectStatus}</div>
            <div><b>Is Run:</b>{(testCaseDetailInfo.run)?"yes":"no"}</div>
            <div><b>Create Time:</b>{testCaseDetailInfo.createTime}</div>
            <div><b>Update Time:</b>{testCaseDetailInfo.updateTime}</div>
            <div>
                <b>Param Case:</b>
            </div>
            <div>
                <Table columns={columns} dataSource={paramCase} pagination={false}/>
            </div>
        </div>
    );
});
