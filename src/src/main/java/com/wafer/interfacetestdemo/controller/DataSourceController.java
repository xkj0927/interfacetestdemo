package com.wafer.interfacetestdemo.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.wafer.interfacetestdemo.config.Constants;
import com.wafer.interfacetestdemo.domain.InterfaceTestCase;
import com.wafer.interfacetestdemo.utils.ExcelUtils;
import com.wafer.interfacetestdemo.vo.ResponseResult;

@RestController
@Transactional
@RequestMapping(Constants.CONTROLLER_PATH)
public class DataSourceController {
  
  Logger logger = LoggerFactory.getLogger(DataSourceController.class);
  
  @PostMapping("/dataimport/excel")
  public ResponseResult importDataFromExcel(@RequestParam("excelFile") MultipartFile excelFile, HttpServletRequest request){
    if(null == excelFile){
      return ResponseResult.failure("模板文件不存在");
    }
    String fileName = excelFile.getOriginalFilename(); // report.xls
    System.out.println(fileName);
    try {
      InputStream fis = excelFile.getInputStream();
//      List<Map<String, String>> data = ExcelImportUtil.parseExcel(fis);
      List<List<Map<String, String>>> data = ExcelUtils.parseExcel(fis, fileName);
      System.out.println(data);
      for(int i = 0; i < data.size(); i++){
        
        List<Map<String, String>> row = data.get(i);
        // 对象
        InterfaceTestCase testCase = new InterfaceTestCase();
        for(int j = 0; j < row.size(); j++){
          Map<String, String> cell = row.get(j);
          testCase.setExpectResult(cell.get("expectResult"));
          testCase.setExpectStatus(Integer.valueOf(cell.get("expectStatus")));
        }
        
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    
    return null;
  }
}
