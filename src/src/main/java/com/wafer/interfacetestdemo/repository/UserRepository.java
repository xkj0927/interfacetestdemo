package com.wafer.interfacetestdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.wafer.interfacetestdemo.domain.User;
import com.wafer.interfacetestdemo.repository.base.BaseRepository;
import com.wafer.interfacetestdemo.vo.UserVo;

public interface UserRepository extends BaseRepository<User, Long> {
  
  User findByUserName(String userName);

  @Query(value = "Select new com.wafer.interfacetestdemo.vo.UserVo (u.userId, u.userName, u.email, u.latestLoginTime) from User u where u.email != 'admins'")
  List<UserVo> getUserVoList();
}
