package com.wafer.interfacetestdemo.controller;

import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wafer.interfacetestdemo.config.Constants;

@RestController
@Transactional
@RequestMapping(Constants.MODULE_CONTROLLER)
public class ModuleController {

  @RequestMapping(value = "module", method = RequestMethod.GET)
  public void getAllModule(){
    
  }
}
