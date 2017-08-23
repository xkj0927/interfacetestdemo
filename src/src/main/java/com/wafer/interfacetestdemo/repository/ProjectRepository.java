package com.wafer.interfacetestdemo.repository;

import java.util.List;

import com.wafer.interfacetestdemo.domain.Project;
import com.wafer.interfacetestdemo.repository.base.BaseRepository;

public interface ProjectRepository extends BaseRepository<Project, Long> {

  List<Project> getProjectByDeptId(long deptId);
}
