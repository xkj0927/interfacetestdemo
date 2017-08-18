package com.wafer.interfacetestdemo.config;

public interface Constants {

  String CONTROLLER_PATH = "/api/v1/";
  /**
   * user controller 
   */
  String USER_CONTROLLER = "/api/v1/";
  /**
   * module controller
   */
  String MODULE_CONTROLLER = "/module/api/v1/";
  /**
   * interface controller
   */
  String INTERFACE_CONTROLLER = "/interface/api/v1/";
  /**
   * interface test case controller
   */
  String INTERFACE_CASE_CONTROLLER = "/interfacecase/api/v1/";
  
  /**
   * 运行
   */
  int RUNNING = 0;
  
  /**
   * 不运行
   */
  int NOT_RUNNING = 1;
}
