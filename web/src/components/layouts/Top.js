/**
 * Created by admin on 2017/8/10.
 */
import React from 'react';
import {Link} from 'dva/router';
import style from './top.less';
import {Popover, Button, Menu, Icon} from 'antd';

const Top = ({dispatch, userName}) => {

  let content = (
    <Menu mode="inline" className={style.menu} onClick={
      ({item, key, keyPath}) => {
        dispatch({type: 'common/logout'});
      }
    }>
      <Menu.Item key="1" className={style.menuItem}>userName: <b>{userName}</b></Menu.Item>
      <Menu.Item key="3" className={style.menuItem}>logOut</Menu.Item>
    </Menu>
  );

  return (
    <header className={style.header}>
      <Link to="/">title</Link>
      <Popover content={content} trigger="click" >
        <Button type="primary" icon="setting" className={style.btn}>{userName}</Button>
      </Popover>
    </header>
  );
};

export default Top;
