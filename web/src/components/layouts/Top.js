/**
 * Created by admin on 2017/8/10.
 */
import React from 'react';
import {Link} from 'dva/router';
import style from './top.less';
import {FormattedMessage} from 'react-intl';
import {Popover, Button, Menu, Icon} from 'antd';
import {CHINESE, ENGLISH} from '../../utils/constants';

const SubMenu = Menu.SubMenu;

const Top = ({dispatch, userName}) => {

  let content = (
    <Menu mode="inline" className={style.menu} onClick={
      ({item, key, keyPath}) => {
        switch(key){
          case "2.1":
            dispatch({type: 'i18n/setLocale', locale: CHINESE});
            break;
          case "2.2":
            dispatch({type: 'i18n/setLocale', locale: ENGLISH});
            break;
          case "3":
            dispatch({type: 'common/logout'});
            break;
          default:
            break;
        }
      }
    }>
      <Menu.Item key="1" className={style.menuItem}><FormattedMessage id="home.username" />: <b>{userName}</b></Menu.Item>
      <SubMenu key="2" title={<FormattedMessage id="home.language" />}>
        <Menu.Item key="2.1" className={style.menuItem}>中文</Menu.Item>
        <Menu.Item key="2.2" className={style.menuItem}>English</Menu.Item>
      </SubMenu>
      <Menu.Item key="3" className={style.menuItem}><FormattedMessage id="home.logout" /></Menu.Item>
    </Menu>
  );

  return (
    <header className={style.header}>
      <Link to="/"><FormattedMessage id="home.title"/></Link>
      <Popover content={content} trigger="click" >
        <Button type="primary" icon="setting" className={style.btn}>{userName}</Button>
      </Popover>
    </header>
  );
};

export default Top;
