/**
 * Created by admin on 2017/5/17.
 */
import React from 'react';
import {connect} from "dva";
import style from './home-layout.less';
import Top from './Top';
import Left from './Left';

const HomeLayout = ({dispatch, children, userAuthority, userName}) => {
  return (
    <div>
      <Top
        dispatch={dispatch}
        userName={userName}
      />
      <main className={style.main}>
        <div className={style.menu}>
          <Left dispatch={dispatch} userAuthority={userAuthority}/>
        </div>
        <div className={style.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {userAuthority, userName} = state.common;
  return {userAuthority: parseInt(userAuthority), userName}
};

export default connect(mapStateToProps)(HomeLayout)
