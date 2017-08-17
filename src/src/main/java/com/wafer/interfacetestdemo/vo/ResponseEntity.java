package com.wafer.interfacetestdemo.vo;

public class ResponseEntity {

  private boolean result;

  private String message;

  private Object data;

  private ResponseEntity(boolean result) {
    this.result = result;
  }

  private ResponseEntity(boolean result, String message) {
    this.result = result;
    this.message = message;
  }

  private ResponseEntity(boolean result, Object data) {
    this.result = result;
    this.data = data;
  }

  private ResponseEntity(boolean result, String message, Object data) {
    this.result = result;
    this.message = message;
    this.data = data;
  }

  public static ResponseEntity success() {
    return new ResponseEntity(true);
  }

  public static ResponseEntity success(Object data) {
    return new ResponseEntity(true, data);
  }

  public static ResponseEntity success(String message, Object data) {
    return new ResponseEntity(true, message, data);
  }


  public static ResponseEntity failure() {
    return new ResponseEntity(false);
  }

  public static ResponseEntity failure(String message) {
    return new ResponseEntity(false, message);
  }

  public static ResponseEntity failure(String message, Object data) {
    return new ResponseEntity(false, message, data);
  }



  public boolean isResult() {
    return result;
  }

  public void setResult(boolean result) {
    this.result = result;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }



}
