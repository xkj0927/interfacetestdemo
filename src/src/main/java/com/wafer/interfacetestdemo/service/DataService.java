package com.wafer.interfacetestdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wafer.interfacetestdemo.repository.DeptRepository;

@Service
public class DataService {
  
  @Autowired
  private DeptRepository deptRepository; 
  
  @SuppressWarnings("unchecked")
  public List<Object[]> getTestCaseData(long projectId){
    StringBuffer sql = new StringBuffer();
    sql.append("SELECT pit.test_case_name caseName, pin.interface_url url, pin.interface_type type,")
    .append("           pit.param_case paramters, pit.expect_result expectResult, pit.expect_status expectStatus")
    .append("   FROM ps_interface_testcase pit ")
    .append("   LEFT JOIN ps_interface pin ")
    .append("       ON pit.interface_id = pin.interface_id")
    .append("   LEFT JOIN ps_module pm")
    .append("       ON pin.module_id = pm.module_id")
    .append("   LEFT JOIN ps_project pjt")
    .append("       ON pm.project_id = pjt.project_id")
    .append("   WHERE pit.is_run = 1 AND pin.is_run = 1 AND pm.is_run = 1 ")
    .append("       AND pjt.project_id = ").append(projectId)
    .append("   ORDER BY pm.module_id,pin.interface_id ASC");
    return deptRepository.createQuery(sql.toString()).getResultList();
  }

  @SuppressWarnings("unchecked")
  public List<Object[]> getSimpleTestCaseData(long projectId, String moduleName, String interfaceName) {
    StringBuffer sql = new StringBuffer();
    sql.append("SELECT pit.test_case_name caseName, pin.interface_url url, pin.interface_type type,")
    .append("           pit.param_case paramters, pit.expect_result expectResult, pit.expect_status expectStatus")
    .append("   FROM ps_interface_testcase pit ")
    .append("   LEFT JOIN ps_interface pin ")
    .append("       ON pit.interface_id = pin.interface_id")
    .append("   LEFT JOIN ps_module pm")
    .append("       ON pin.module_id = pm.module_id")
    .append("   LEFT JOIN ps_project pjt")
    .append("       ON pm.project_id = pjt.project_id")
    .append("   WHERE pit.is_run = 1 AND pin.is_run = 1 AND pm.is_run = 1 ")
    .append("       AND pjt.project_id = ").append(projectId)
    .append("       AND pm.module_name = '").append(moduleName).append("' ")
    .append("       AND pin.interface_name = '").append(interfaceName).append("' ")
    .append("   ORDER BY pm.module_id,pin.interface_id ASC");
    return deptRepository.createQuery(sql.toString()).getResultList();
  }
}