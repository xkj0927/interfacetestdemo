package com.wafer.interfacetestdemo.vo;

import java.util.Date;

public class UserVo {
  
  private long userId;
  private String userName;
  private String email;
  private Date latestLoginTime;
  
  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }

  public String getUserName() {
    return userName;
  }
  
  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Date getLatestLoginTime() {
    return latestLoginTime;
  }
  
  public void setLatestLoginTime(Date latestLoginTime) {
    this.latestLoginTime = latestLoginTime;
  }
  
  public UserVo(){
    super();
  }

  public UserVo(long userId, String userName, String email, Date latestLoginTime) {
	super();
	this.userId = userId;
	this.userName = userName;
	this.email = email;
	this.latestLoginTime = latestLoginTime;
  }

}
