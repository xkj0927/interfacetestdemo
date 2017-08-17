package com.wafer.interfacetestdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wafer.interfacetestdemo.domain.User;
import com.wafer.interfacetestdemo.repository.UserRepository;
import com.wafer.interfacetestdemo.vo.UserVo;

@Service
public class UserService {
  
  @Autowired
  private UserRepository userRepository;

  public User findByUserName(String account) {
    return userRepository.findByUserName(account);
  }
  
  public void updateUserbyUserId(User user){
	    userRepository.save(user);
  }

  public List<UserVo> getUserVoList() {
	return  userRepository.getUserVoList();
  }

}
