package com.wafer.wtp.base;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;

import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.http.MediaType;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wafer.wtp.util.FileReader;

public class AbstractTestNGTest extends AbstractTransactionalTestNGSpringContextTests {

  public static final String DP_API_DATA = "api_data";

  public static final String DP_WORKBOOK = "workbook";

  public static final String DP_JSON = "json";

  public static final String INIT_DATA = "init";

  public static final String INIT_FILE_PATH = "filePath";

  public static final String ALREADY_INIT = "alreadyINit";

  @Autowired
  private WebApplicationContext context;

  private MockMvc mockMvc;

  @BeforeClass(alwaysRun = true)
  public void setup() {
    mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    MockitoAnnotations.initMocks(this);
    // 执行测试数据初始化(如果执行过初始化就跳过)
    if (null == System.getProperty(ALREADY_INIT)
        && Boolean.valueOf(System.getProperty(INIT_DATA))) {
      String sqlResourcePath = System.getProperty(INIT_FILE_PATH);
      this.executeSqlScript(sqlResourcePath, false);
      System.setProperty(ALREADY_INIT, String.valueOf(true));
    }
  }

  public WebApplicationContext getContext() {
    return context;
  }

  /**
   * 返回MockMvc实例
   * 
   * @return
   */
  public MockMvc getMockMvc() {
    return mockMvc;
  }

  /**
   * 返回RequestBuilder实例
   * 
   * @param requestUrl
   * @param requestType
   * @return
   */
  public MockHttpServletRequestBuilder getRequestBuilder(String requestUrl, String requestType) {
    MockHttpServletRequestBuilder requestBuilder = null;
    if ("POST".equalsIgnoreCase(requestType)) {
      requestBuilder = MockMvcRequestBuilders.post(requestUrl);
    } else if ("PUT".equalsIgnoreCase(requestType)) {
      requestBuilder = MockMvcRequestBuilders.put(requestUrl);
    } else if ("DELETE".equalsIgnoreCase(requestType)) {
      requestBuilder = MockMvcRequestBuilders.delete(requestUrl);
    } else {
      requestBuilder = MockMvcRequestBuilders.get(requestUrl);
    }
    return requestBuilder.contentType(MediaType.APPLICATION_JSON_UTF8);
  }

  /**
   * 添加请求参数
   * 
   * @param requestBuilder
   * @param paramters
   * @return
   * @throws JsonProcessingException
   */
  public MockHttpServletRequestBuilder addParamters(MockHttpServletRequestBuilder requestBuilder,
      Object paramters) throws JsonProcessingException {
    if (null == paramters || String.valueOf(paramters).isEmpty()) {
      return requestBuilder;
    } else if (paramters instanceof String) {
      return requestBuilder.content(String.valueOf(paramters));
    } else {
      ObjectMapper mapper = new ObjectMapper();
      return requestBuilder.content(mapper.writeValueAsString(paramters));
    }
  }

  /**
   * 提供Excel数据
   * 
   * @param targetMethod
   * @return
   * @throws IOException
   */
  @DataProvider(name = DP_WORKBOOK)
  public Object[][] getExcelDataContent(Method targetMethod) throws IOException {
    StringBuffer buffer = new StringBuffer();
    buffer.append(this.getClass().getSimpleName());
    buffer.append(".xls");
    URL resource = this.getClass().getResource(buffer.toString());
    return FileReader.readDataObject(resource, targetMethod, targetMethod.getName());

  }

  /**
   * 提供JSON数据
   * 
   * @param targetMethod
   * @return
   * @throws IOException
   */
  @DataProvider(name = DP_JSON)
  public Object[][] getJSONDataContent(Method targetMethod) throws IOException {
    StringBuffer buffer = new StringBuffer();
    buffer.append(this.getClass().getSimpleName());
    buffer.append("-");
    buffer.append(targetMethod.getName());
    buffer.append(".json");
    URL resource = this.getClass().getResource(buffer.toString());
    return FileReader.readDataObject(resource, targetMethod, null);

  }

  /**
   * 提供数据
   * 
   * @param targetMethod
   * @return
   * @throws IOException
   */
  @DataProvider(name = DP_API_DATA)
  public Object[][] getAPICommonData(Method targetMethod) throws IOException {
    StringBuffer xlsBuffer = new StringBuffer("classpath*:");
    xlsBuffer.append(this.getClass().getSimpleName());
    xlsBuffer.append("*.xls");

    StringBuffer jsonBuffer = new StringBuffer("classpath*:");
    jsonBuffer.append(this.getClass().getSimpleName());
    jsonBuffer.append("*.json");

    PathMatchingResourcePatternResolver loader = new PathMatchingResourcePatternResolver();

    Resource[] resources = loader.getResources(xlsBuffer.toString());

    if (null == resources || resources.length == 0) {
      resources = loader.getResources(jsonBuffer.toString());
    }

    if (null == resources || resources.length == 0) {
      throw new FileNotFoundException();
    }

    return FileReader.readAllDataObject(resources, targetMethod, null);
  }
}
