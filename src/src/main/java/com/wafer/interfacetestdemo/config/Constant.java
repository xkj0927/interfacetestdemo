package com.wafer.interfacetestdemo.config;


public interface Constant {

  /** 用户角色  admin */
  String USER_ROLE_ADMIN = "ADMIN";
  
  /** 用户角色  user */
  String USER_ROLE_USER = "USER";

  String DEMO_PATH = "/api/v1/";
  
  String LOGIN = "login";
  
  String LOGOUT = "logout";
  
  String REGISTER = "register";
  
  String USERS = "users";
  
  String USER = "user";
  
  String USER_DELETE = "user/{userId}";
  
  String EMAIL_DUPLICATE = "100004";
  
  String APPLICATION_JSON = "json";
  
}

