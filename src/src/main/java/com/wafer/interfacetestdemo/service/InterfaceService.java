package com.wafer.interfacetestdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wafer.interfacetestdemo.domain.Interface;
import com.wafer.interfacetestdemo.repository.InterfaceRepository;

@Service
public class InterfaceService {

  @Autowired
  InterfaceRepository interfaceRepository;
  
  /**
   * 添加一个Interface
   * @param interf
   * @return
   */
  public Interface saveInterface(Interface face){
    return interfaceRepository.save(face);
  }
  
  /**
   * 删除一个接口
   * @param interfaceId
   */
  public void deleteInterface(long interfaceId){
    interfaceRepository.delete(interfaceId);
  }
  
  /**
   * 获取所有的接口
   * @return
   */
  public List<Interface> findAllInterface(){
    return interfaceRepository.findAll();
  }
  
  /**
   * 获取指定的接口
   * @param interfaceId
   * @return
   */
  public Interface findInterfaceById(long interfaceId){
    return interfaceRepository.findOne(interfaceId);
  }
  
  /**
   * 获取一个module下的所有接口
   * @param moduleId
   * @return
   */
  public List<Interface> findInterfaceByModule(long moduleId){
    return interfaceRepository.findByModuleId(moduleId);
  }
  
  /**
   * 获取多个module下的所有接口
   * @param moduleId
   * @return
   */
  public List<Interface> findInterfaceByModules(List<Long> moduleIds){
    return interfaceRepository.findByModuleIdIn(moduleIds);
  }
  
  /**
   * 通过接口名称模糊匹配 一个module下
   * @param interfaceName
   * @return
   */
  public List<Interface> findInterfaceByName(long moduleId, String interfaceName){
    return interfaceRepository.findByModuleIdAndInterfaceNameLike(moduleId, interfaceName);
  }
  
  /**
   * 通过接口类型查询所有接口 一个module下
   * @param interfaceName
   * @return
   */
  public List<Interface> findInterfaceByInterfType(long moduleId, String interfaceType){
    return interfaceRepository.findByModuleIdAndInterfaceType(moduleId, interfaceType);
  }
}
