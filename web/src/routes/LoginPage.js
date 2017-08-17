/**
 * Created by Administrator on 2017/8/14 0014.
 */
import React from 'react';
import {Icon, Form, Input, Button, message} from 'antd';
import style from './login-page.less';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';

const FormItem = Form.Item;
debugger;
const LoginPage = ({form, dispatch}) => {
    const {getFieldDecorator, validateFields} = form;
    return (
        <div className={style.loginbg}>
            <div className={style.wrapper}>
                <div className={style.body}>
                    <header className={style.header}> Login
                    </header>
                    <section className={style.form}>
                        <Form onSubmit={(e)=>{
                            e.preventDefault();
                            validateFields((err, values)=>{
                                debugger;
                                dispatch({type:'common/login', payload:values});
                            });
                        }}>
                        <FormItem label="account" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                            {getFieldDecorator('account', {
                                rules: [
                                    {
                                        required: true,
                                        message: "emptyAccount",
                                        type: 'string',
                                    },
                                ],
                            })(
                                <Input type="text" placeholder="account" addonBefore={<Icon type="user"/>}/>,
                            )}
                        </FormItem>
                        <FormItem label="password" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: "emptyPassword",
                                        type: 'string',
                                    },
                                ],
                            })(
                                <Input type="password" placeholder="password" addonBefore={<Icon type="lock"/>}/>,
                            )}
                        </FormItem>
                        <button  className={style.btn} type="primary" htmlType="submit">Sign In</button>
                    </Form>
                    </section>
                </div>
            </div>
        </div>
    );

};
// const mapStateToProps = state => ({i18n: state.i18n});

export default connect(state => state)(Form.create()(LoginPage));