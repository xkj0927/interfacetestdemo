package com.wafer.interfacetestdemo.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wafer.interfacetestdemo.config.Constants;
import com.wafer.interfacetestdemo.domain.Interface;
import com.wafer.interfacetestdemo.service.InterfaceService;
import com.wafer.interfacetestdemo.vo.ResponseResult;

@RestController
@Transactional
@RequestMapping(Constants.INTERFACE_CONTROLLER)
public class InterfaceController {

  Logger logger = LoggerFactory.getLogger(InterfaceController.class);
 
  @Autowired
  InterfaceService interfaceService;
  
  /**
   * 查询一个module下的所有接口
   * @param moduleId
   * @return
   */
  @RequestMapping(value = "interface/module/{moduleId}", method = RequestMethod.GET)
  public ResponseResult getInterfaceByModule(@PathVariable long moduleId){
    List<Interface> interfaces = interfaceService.findInterfaceByModule(moduleId);
    return ResponseResult.success(interfaces);
  }
}
