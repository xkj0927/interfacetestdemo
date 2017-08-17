/**
 * Created by admin on 2017/8/11.
 */
import React from 'react';
import {Link} from 'dva/router';
import {USER_AUTHORITY_NORMAL, USER_AUTHORITY_ADMIN} from '../../utils/constants';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const Left = ({userAuthority}) => {

  let subMenu = [];
    subMenu.push((
        <SubMenu key="user" title={<span><Icon type="user"/>User Manage</span>}>
        </SubMenu>
    ));
    subMenu.push((
        <SubMenu key="project" title={<span><Icon type="team"/>Team Manage</span>}>
        </SubMenu>
    ));
  // if (userAuthority === USER_AUTHORITY_NORMAL) {
  //   subMenu.push((
  //     <SubMenu key="user" title={<span><Icon type="user"/></span>}>
  //     </SubMenu>
  //   ));
  // } else if (userAuthority === USER_AUTHORITY_ADMIN) {
  //   subMenu.push((
  //     <SubMenu key="user" title={<span><Icon type="user"/>user Manage</span>}>
  //     </SubMenu>
  //   ));
  // }

  return (
    <Menu mode="inline" theme="dark" style={{width: '240px'}}>
      {subMenu}
    </Menu>
  );
};

export default Left;
