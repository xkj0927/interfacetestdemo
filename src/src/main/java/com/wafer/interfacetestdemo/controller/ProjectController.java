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
import com.wafer.interfacetestdemo.vo.ResponseEntity;

@RestController
@RequestMapping(Constant.DEMO_PATH)
@Transactional
public class ProjectController {
  @Autowired
  ProjectService projectService;
  
  /**
   * 查询course信息
   * @return 封装的course list信息
   */
  @RequestMapping(value = Constant.PROJECTS, method = RequestMethod.GET)
  @Transactional(readOnly = true)
  public ResponseEntity projectList(){
    
    List<Project> projectList = projectService.getProjectList();
    return ResponseEntity.success(projectList);
  }
  
}
