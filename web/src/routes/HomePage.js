/**
 * Created by admin on 2017/5/17.
 */
import React from 'react';
import {connect} from 'dva';

const HomePage = ({common}) => {
    debugger;
  const userName = (<b>{common.userName}</b>);
  return (
    <div>
        <b>{userName}</b>
    </div>
  )
} ;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(HomePage);
