package com.wafer.interfacetestdemo.controller;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wafer.interfacetestdemo.domain.User;
import com.wafer.interfacetestdemo.service.UserService;
import com.wafer.interfacetestdemo.vo.AccountVo;
import com.wafer.interfacetestdemo.vo.ResponseEntity;
import com.wafer.interfacetestdemo.vo.UserVo;


@RestController
@RequestMapping("/api/v1/")
@Transactional
public class UserController {

  @Autowired
  UserService userService;  

  Logger logger = LoggerFactory.getLogger(UserController.class);

  /***
   * 用户登陆
   * @param vc 获取用户名和密码
   * @return Token，用户数据交互的凭证
   */
  @RequestMapping(value = "login", method = RequestMethod.POST)
  public ResponseEntity login(@RequestBody AccountVo vc) {

    String account = vc.getAccount();
    String password = vc.getPassword();
    
    // 登陆：验证密码，生成Token
//    String token  = authService.login(account, password);
//    
    
    User user = userService.findByUserName(account);
    user.setLatestLoginTime(new Date());
    userService.updateUserbyUserId(user);
//    
//    LoginUserVo loginUser = new LoginUserVo();
//    loginUser.setToken(token);
//    loginUser.setUser(user);    
    
    return ResponseEntity.success(user);
  }  
  
  /***
   * 用户登出
   * @return 登出成功 or 失败
   */
//  @RequestMapping(value = Constant.LOGOUT, method = RequestMethod.POST)
//  public ResponseEntity logout(@RequestBody AccountVo vc) {
//
//    // 登出，设置token不可用
//    boolean logout  = authService.logout(vc.getAccount());
//    
//    return ResponseEntity.success(String.valueOf(logout));
//  }

  /**
   * 查询user信息
   * @return 封装的user list信息
   */
  @RequestMapping(value = "users", method = RequestMethod.GET)
  @Transactional(readOnly = true)
  public ResponseEntity userList(){
    List<UserVo> userList = userService.getUserVoList();
    return ResponseEntity.success(userList);
  }
  
  /**
   * 新建user
   * @param user基本信息
   * @return 封装的user信息
   */
//  @RequestMapping(value = Constant.USER, method = RequestMethod.POST)
//  public ResponseEntity userCreate(@RequestBody User user){
//    
//    user.setCreateTime(new Date()); 
//    user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//    //暂定设置所有的角色为user
//    user.setUserAuthority(1);
//    userService.userSave(user);    
//    List<UserVo> userList = userService.getUserVoList();
//    return ResponseEntity.success(userList);
//  }
  
}