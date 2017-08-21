package com.wafer.wtp.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.wafer.wtp.annotation.Field;

/**
 * 读取JSON数据工具类
 * 
 * @author wafer
 *
 */
public class JSONUtil extends FileReader {

  /**
   * 转换为参数化需要的参数
   * 
   * @param resource
   * @param method
   * @return
   */
  @Override
  protected List<Object[]> getRunDataObject(URL resource, Method method, String methodName) {
    List<Object[]> results = new ArrayList<Object[]>();
    List<Class<?>> paramTypes = new ArrayList<Class<?>>();
    List<String> paramNames = new ArrayList<String>();
    for (Parameter parameter : method.getParameters()) {
      if (null != parameter.getAnnotation(Field.class)) {
        paramTypes.add(parameter.getType());
        paramNames.add(parameter.getAnnotation(Field.class).value());
      }
    }
    try {
      File file = new File(resource.getPath());
      String JsonContext = readJSONFile(file);

      JSONArray jsonArray = new JSONArray(JsonContext);
      for (int i = 0; i < jsonArray.length(); i++) {
        JSONObject jsonObject = jsonArray.getJSONObject(i);
        if (jsonObject.has("isSkip") && "y".equalsIgnoreCase(jsonObject.getString("isSkip"))) {
          continue;
        } else {
          String[] objects = new String[paramNames.size()];
          for (int j = 0; j < paramNames.size(); j++) {
            String paramName = paramNames.get(j);
            if (jsonObject.has(paramName)) {
              objects[j] = jsonObject.getString(paramName);
            } else {
              objects[j] = "";
            }
          }
          results.add(convertParam(objects, paramTypes));
        }

      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return results;
  }


  /**
   * 读取JSON文件
   * 
   * @param file
   * @return
   */
  private String readJSONFile(File file) {
    BufferedReader reader = null;
    String laststr = "";
    try {
      FileInputStream fileInputStream = new FileInputStream(file);
      InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "UTF-8");
      reader = new BufferedReader(inputStreamReader);
      String tempString = null;
      while ((tempString = reader.readLine()) != null) {
        laststr += tempString;
      }
      reader.close();
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      if (reader != null) {
        try {
          reader.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return laststr;
  }
}
