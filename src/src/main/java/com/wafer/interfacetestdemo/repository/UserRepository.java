package com.wafer.interfacetestdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wafer.interfacetestdemo.domain.User;
import com.wafer.interfacetestdemo.repository.base.BaseRepository;
import com.wafer.interfacetestdemo.vo.UserVo;

public interface UserRepository extends BaseRepository<User, Long> {
  
  User findByUserName(String userName);

  @Modifying
  @Query(value = "Update User u set u.status = 1 where u.userId = :userId")
  void updateUserStatusByUserId(@Param("userId") long userId);

  @Query(value = "Select new com.wafer.interfacetestdemo.vo.UserVo (u.userId, u.userName, u.email, u.latestLoginTime) from User u where u.status = 0 and u.email != 'admin'")
  List<UserVo> getUserVoList();

  @Query(value = "from User u where u.email = :email")
  User getUserbyEmail(@Param("email") String email);
}
