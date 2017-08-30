package com.wafer.interfacetestdemo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wafer.interfacetestdemo.config.Constant;
import com.wafer.interfacetestdemo.domain.Interface;
import com.wafer.interfacetestdemo.domain.InterfaceTestCase;
import com.wafer.interfacetestdemo.domain.RequestParam;
import com.wafer.interfacetestdemo.domain.ResponseParam;
import com.wafer.interfacetestdemo.service.InterfaceService;
import com.wafer.interfacetestdemo.service.InterfaceTestCaseService;
import com.wafer.interfacetestdemo.service.RequestParamService;
import com.wafer.interfacetestdemo.service.ResponseParamService;
import com.wafer.interfacetestdemo.vo.InterfaceView;
import com.wafer.interfacetestdemo.vo.ResponseResult;
import com.wafer.interfacetestdemo.vo.TestCaseView;

@RestController
@Transactional
@RequestMapping(Constant.CONTROLLER_PATH)
public class InterfaceController {

  Logger logger = LoggerFactory.getLogger(InterfaceController.class);
 
  @Autowired
  InterfaceService interfaceService;
  
  @Autowired
  InterfaceTestCaseService testCaseService;
  
  @Autowired
  RequestParamService requestParamService;
  
  @Autowired
  ResponseParamService responseParamService;
  
  /**
   * 新增一个【接口】
   * @param moduleId
   * @return
   */
  @RequestMapping(value = "interface", method = RequestMethod.POST)
  public ResponseResult saveInterface(@RequestBody InterfaceView faceView){
    Interface face = Interface.transformInterfaceToView(faceView);
    face.setCreateTime(new Date());
    face = interfaceService.saveInterface(face);
    return ResponseResult.success(InterfaceView.transformInterfaceToView(face));
  }
  
  /**
   * 删除一个【接口】
   * @param moduleId
   * @return
   */
  @RequestMapping(value = "interface/{interfaceId}", method = RequestMethod.DELETE)
  public ResponseResult deleteInterface(@PathVariable long interfaceId){
    if(0 == interfaceId){
      return ResponseResult.failure();
    }
    interfaceService.deleteInterface(interfaceId);
    return ResponseResult.success();
  }
  
  /**
   * 修改一个【接口】
   * @param moduleId
   * @return
   */
  @RequestMapping(value = "interface", method = RequestMethod.PUT)
  public ResponseResult updateInterface(@RequestBody InterfaceView faceView){
    Interface face = interfaceService.findInterfaceById(faceView.getInterfaceId());
    // 可以修改的字段
    face.setInterfaceName(faceView.getInterfaceName());
    face.setInterfaceType(faceView.getInterfaceType());
    face.setInterfaceUrl(faceView.getInterfaceUrl());
    face.setIsRun(faceView.isRun() ? Constant.RUNNING : Constant.NOT_RUNNING);
    face.setRequestParam(faceView.getRequestParam());
    face.setResponseResult(faceView.getResponseResult());
    
    face = interfaceService.saveInterface(face);
    return ResponseResult.success(InterfaceView.transformInterfaceToView(face));
  }
  
  /**
   * 查询一个module下的所有【接口】
   * @param moduleId
   * @return
   */
  @RequestMapping(value = "interface/module/{moduleId}", method = RequestMethod.GET)
  public ResponseResult getInterfaceByModule(@PathVariable long moduleId){
    List<Interface> interfaces = interfaceService.findInterfaceByModuleOrderBy(moduleId);
    List<InterfaceView> faceViews = new ArrayList<>();
    interfaces.parallelStream().forEach((face) -> faceViews.add(InterfaceView.transformInterfaceToView(face)));
    return ResponseResult.success(faceViews);
  }
  
  /**
   * 通过interfaceId查询一个【接口】的详情
   * @param interfaceId
   * @return
   */
  @RequestMapping(value = "interface/{interfaceId}", method = RequestMethod.GET)
  public ResponseResult getInterfaceById(@PathVariable long interfaceId){
    Interface face= interfaceService.findInterfaceById(interfaceId);
    return ResponseResult.success(InterfaceView.transformInterfaceToView(face));
  }
  
  /**
   * 通过interfaceId查询一个【接口】的详情
   * @param interfaceId
   * @return
   */
  @RequestMapping(value = "interface/testcase/{interfaceId}", method = RequestMethod.GET)
  public ResponseResult getInterfaceAndTestCasesById(@PathVariable long interfaceId){
    Interface face= interfaceService.findInterfaceById(interfaceId);
    InterfaceView faceView = InterfaceView.transformInterfaceToView(face);
    if(null != face){
      List<InterfaceTestCase> testCases = testCaseService.findInterfaceTestCaseByFace(face.getInterfaceId());
      List<RequestParam> requestParamList= requestParamService.getRequestParamByInterfaceId(interfaceId);
      List<ResponseParam> responseParamList= responseParamService.getResponseParamByInterfaceId(interfaceId);
      List<TestCaseView> testCaseViews = new ArrayList<>();
      testCases.parallelStream().forEach(testCase -> testCaseViews.add(TestCaseView.transformViewToTestCase(testCase)));
      faceView.setTestCaseViews(testCaseViews);
      faceView.setRequestParams(requestParamList);
      faceView.setResponseParams(responseParamList);
    }
    return ResponseResult.success(faceView);
  }
  
  /**
   * 通过interfaceId查询一个【接口】的详情
   * @param interfaceId
   * @return
   */
  @RequestMapping(value = "interface/{interfaceId}", method = RequestMethod.POST)
  public ResponseResult duplicateInterface(@PathVariable long interfaceId){
    Interface face= interfaceService.findInterfaceById(interfaceId);
    InterfaceView faceView = null;
    if(null != face){
      Interface newFace = new Interface();
      newFace.setInterfaceType(face.getInterfaceType());
      newFace.setInterfaceUrl(face.getInterfaceUrl());
      newFace.setIsRun(face.getIsRun());
      newFace.setModuleId(face.getModuleId());
      newFace.setRequestParam(face.getRequestParam());
      newFace.setResponseResult(face.getResponseResult());
      newFace.setInterfaceName("Copy of "+face.getInterfaceName());
      newFace.setCreateTime(new Date());
      newFace = interfaceService.saveInterface(newFace);
      
      final long newInterfaceId = newFace.getInterfaceId();
      // 复制TestCase
      List<InterfaceTestCase> testCases = testCaseService.findInterfaceTestCaseByFace(interfaceId);
      if(testCases.size() > 0){
        testCases.forEach(testCase -> {
          InterfaceTestCase fCase = new InterfaceTestCase();
          fCase.setExpectResult(testCase.getExpectResult());
          fCase.setExpectStatus(testCase.getExpectStatus());
          fCase.setInterfaceId(newInterfaceId);
          fCase.setIsRun(testCase.getIsRun());
          fCase.setParamCase(testCase.getParamCase());
          fCase.setTestCaseName("Copy Of "+testCase.getTestCaseName());
          fCase.setCreateTime(new Date());
          testCaseService.saveInterfaceCase(fCase);
        });
      }
      faceView = InterfaceView.transformInterfaceToView(newFace);
    }
    return ResponseResult.success(faceView);
  }
  
}
