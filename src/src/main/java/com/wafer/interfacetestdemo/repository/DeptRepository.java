package com.wafer.interfacetestdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.wafer.interfacetestdemo.domain.Dept;
import com.wafer.interfacetestdemo.repository.base.BaseRepository;
import com.wafer.interfacetestdemo.vo.DeptVo;

public interface DeptRepository extends BaseRepository<Dept, Long> {
  
  @Query(value = "Select new com.wafer.interfacetestdemo.vo.DeptVo (d.deptId, d.deptName, d.deptCode, d.createTime) from Dept d")
  List<DeptVo> getDeptVoList();
}
