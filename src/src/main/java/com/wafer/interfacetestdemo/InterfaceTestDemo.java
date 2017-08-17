package com.wafer.interfacetestdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wafer.interfacetestdemo.repository.base.BaseRepositoryFactoryBean;


//@RestController
//@EnableAutoConfiguration
@SpringBootApplication
@EnableTransactionManagement
@EnableJpaRepositories(repositoryFactoryBeanClass = BaseRepositoryFactoryBean.class)
public class InterfaceTestDemo extends SpringBootServletInitializer{
	
	@RequestMapping("/")
	String s(){
		return "hello demo";
	}
	
	public static void main(String[] args){
		SpringApplication.run(InterfaceTestDemo.class, args);
	}
	
}
