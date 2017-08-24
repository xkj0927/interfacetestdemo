package com.wafer.interfacetestdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wafer.interfacetestdemo.repository.ProjectRepository;
import com.wafer.interfacetestdemo.vo.ProjectVo;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;

  public List<ProjectVo> getProjectList(){
    return projectRepository.getProjectList();
  }

  public List<ProjectVo> getProjectByDeptId(long deptId) {
    return projectRepository.getProjectByDeptId(deptId);
  }

}
