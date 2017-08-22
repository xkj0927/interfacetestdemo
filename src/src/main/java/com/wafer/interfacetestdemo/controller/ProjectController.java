package com.wafer.interfacetestdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wafer.interfacetestdemo.config.Constant;
import com.wafer.interfacetestdemo.domain.Project;
import com.wafer.interfacetestdemo.service.ProjectService;
import com.wafer.interfacetestdemo.vo.ResponseResult;

@RestController
@RequestMapping(Constant.CONTROLLER_PATH)
@Transactional
public class ProjectController {
  @Autowired
  ProjectService projectService;
  
  /**
   * 查询project信息
   * @return 封装的project list信息
   */
  @RequestMapping(value = Constant.PROJECTS, method = RequestMethod.GET)
  @Transactional(readOnly = true)
  public ResponseResult projectList(){
    
    List<Project> projectList = projectService.getProjectList();
    return ResponseResult.success(projectList);
  }
  
}
