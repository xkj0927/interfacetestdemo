CREATE DATABASE interfacetestdemo;

CREATE TABLE `ps_user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` VARCHAR(255) NOT NULL COMMENT '用户名',
  `password` VARCHAR(255) NOT NULL COMMENT '密码',
  `email` VARCHAR(64) NOT NULL COMMENT '邮箱',
  `status` INT(2) NOT NULL COMMENT '用户的状态，0为可用，1为不可用',
  `user_authority` INT(2) NOT NULL COMMENT '用户权限',
  `latest_login_time` DATETIME DEFAULT NULL COMMENT '最近一次登录时间',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`user_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `ps_project` (
  `project_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `project_name` VARCHAR(255) NOT NULL COMMENT '项目名',
  `start_time` DATETIME NOT NULL COMMENT '项目开始时间',
  `end_time` DATETIME NOT NULL COMMENT '项目结束时间',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`project_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE `ps_project_user` (
  `project_user_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `project_id` INT(11) NOT NULL COMMENT '项目id',
  `user_id` INT(11) NOT NULL COMMENT '用户id',
  `user_role` INT(2) NOT NULL COMMENT '用户角色',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`project_user_id`),
  KEY `fk_pu_pid` (`project_id`),
  KEY `fk_pu_uid` (`user_id`),
  CONSTRAINT `fk_pu_pid` FOREIGN KEY (`project_id`) REFERENCES `ps_project` (`project_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pu_uid` FOREIGN KEY (`user_id`) REFERENCES `ps_user` (`user_id`) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `ps_module`;
CREATE TABLE `ps_module` (
  `module_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `module_name` VARCHAR(255) NOT NULL COMMENT '模块名',
  `project_id` INT(11) NOT NULL COMMENT '项目id',
  `is_run` INT(2) NOT NULL DEFAULT 0 COMMENT '是否执行，0 表示执行，1表示不执行',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`module_id`),
  KEY `fk_md_pid` (`project_id`),
  CONSTRAINT `fk_md_pid` FOREIGN KEY (`project_id`) REFERENCES `ps_project` (`project_id`) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- 接口
DROP TABLE IF EXISTS `ps_interface`;
CREATE TABLE `ps_interface` (
  `interface_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `module_id` INT(11) NOT NULL COMMENT '模块id',
  `interface_name` VARCHAR(255) NOT NULL COMMENT '接口名',
  `request_url` VARCHAR(255) NOT NULL COMMENT '接口url',
  `interface_type` VARCHAR(64) NOT NULL COMMENT '接口类型',
  `request_param` TEXT COMMENT '接口参数',
  `response_result` TEXT COMMENT '接口返回结果',
  `is_run` INT(2) NOT NULL COMMENT '是否执行该用例，0表示执行，1表示不执行',  
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`interface_id`),
  KEY `fk_interface_mid` (`module_id`),
  CONSTRAINT `fk_interface_mid` FOREIGN KEY (`module_id`) REFERENCES `ps_module` (`module_id`) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- 接口用例
DROP TABLE IF EXISTS `ps_interface_testcase`;
CREATE TABLE `ps_interface_testcase` (
  `interface_testcase_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `interface_id` INT(11) NOT NULL COMMENT '接口id',
  `param_case` TEXT COMMENT '接口入参',
  `expect_result` TEXT COMMENT '期望结果',
  `expect_status` INT(11) NOT NULL COMMENT '期望状态',
  `is_run` INT(2) NOT NULL COMMENT '是否执行该用例，0表示执行，1表示不执行',  
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`interface_testcase_id`),
  KEY `fk_interface_id` (`interface_id`),
  CONSTRAINT `fk_interface_id` FOREIGN KEY (`interface_id`) REFERENCES `ps_interface` (`interface_id`) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;