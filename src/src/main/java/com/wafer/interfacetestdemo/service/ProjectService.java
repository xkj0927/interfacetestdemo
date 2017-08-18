package com.wafer.interfacetestdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wafer.interfacetestdemo.domain.Project;
import com.wafer.interfacetestdemo.repository.ProjectRepository;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;

  public List<Project> getProjectList(){
    return projectRepository.findAll();
  }
}
