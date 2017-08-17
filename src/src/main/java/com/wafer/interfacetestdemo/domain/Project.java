package com.wafer.interfacetestdemo.domain;

import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name  =  "ps_project")
public class Project { 
  @Id
  @GeneratedValue(generator = "generator")
  @GenericGenerator(name = "generator", strategy = "native")
  @Column(name = "project_id", unique = true, nullable = false)
  private long projectId;
  
  @Column(name = "project_name")
  private String projectName;
  
  @Column(name = "start_time")
  private Date startTime;
  
  @Column(name = "end_time")
  private Date endTime;
  
  @Column(name = "create_time")
  private Date createTime;
  
  @Column(name = "update_time")
  private Date updateTime;
  
  public long getProjectId() {
	return projectId;
  }

  public void setProjectId(long projectId) {
	this.projectId = projectId;
  }

  public String getProjectName() {
	return projectName;
  }

  public void setProjectName(String projectName) {
	this.projectName = projectName;
  }

  public Date getStartTime() {
    return startTime;
  }
  
  public void setStartTime(Date startTime) {
    this.startTime  =  startTime;
  }
  
  public Date getEndTime() {
    return endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime  =  endTime;
  }

  public Date getCreateTime() {
    return createTime;
  }
  
  public void setCreateTime(Date createTime) {
    this.createTime  =  createTime;
  }
  
  public Date getUpdateTime() {
    return updateTime;
  }
  
  public void setUpdateTime(Date updateTime) {
    this.updateTime  =  updateTime;
  }

  public Project(){
    super();
  }

  public Project(long projectId, String projectName, Date startTime, Date endTime, Date createTime, Date updateTime) {
	super();
	this.projectId = projectId;
	this.projectName = projectName;
	this.startTime = startTime;
	this.endTime = endTime;
	this.createTime = createTime;
	this.updateTime = updateTime;
  }  
}
