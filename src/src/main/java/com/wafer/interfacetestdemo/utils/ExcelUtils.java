package com.wafer.interfacetestdemo.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelUtils {

  public static List<List<Map<String, String>>> parseExcel(InputStream is, String fileName) {

    Workbook workbook = getWorkBook(is, fileName);
    
    List<List<Map<String, String>>> dataValue = new ArrayList<>();
    
    for(int sheetNum = 0; sheetNum < workbook.getNumberOfSheets(); sheetNum++){
      Sheet sheet = workbook.getSheetAt(sheetNum);
      int firstRow = sheet.getFirstRowNum();
      int lastRow = sheet.getLastRowNum();
      for(int i = firstRow + 1; i < lastRow; i++){
        Row row = sheet.getRow(i);
        List<Map<String, String>> rowValue = new ArrayList<>();
        for(int j = row.getFirstCellNum(); j < row.getLastCellNum(); j++){
          Map<String, String> cellValue = new HashMap<>();
          Cell cell = row.getCell(j);
          
          int columnIndex = cell.getColumnIndex();
          
          String value = getCellValue(cell);
          
          cellValue.put("column-"+columnIndex, value);
          
          rowValue.add(cellValue);
        }
        dataValue.add(rowValue);
      }
    }
    
    return dataValue;
  }


  private static String getCellValue(Cell cell) {
    String cellValue = "";
    if(null == cell){
      return cellValue;
    }
    // 将数字当作string读取
    if(Cell.CELL_TYPE_NUMERIC == cell.getCellType()){
      cell.setCellType(Cell.CELL_TYPE_STRING);
    }
    // 判断数据类型
    switch(cell.getCellType()){
      case Cell.CELL_TYPE_BOOLEAN:
        cellValue = String.valueOf(cell.getBooleanCellValue());
        break;
      case Cell.CELL_TYPE_STRING:
        cellValue = cell.getStringCellValue();
        break;
      case Cell.CELL_TYPE_NUMERIC:
        cellValue = String.valueOf(cell.getNumericCellValue());
        break;
      case Cell.CELL_TYPE_FORMULA: // 公式
        cellValue = String.valueOf(cell.getCellFormula());
        break;
      default:
        break;
    }
    return cellValue;
  }


  private static Workbook getWorkBook(InputStream is, String fileName) {
    Workbook workbood = null;

    try {
      if (fileName.endsWith(".xlsx")) {
        workbood = new XSSFWorkbook(is);
      } else if (fileName.endsWith(".xls")) {
        workbood = new HSSFWorkbook(is);
      }
    } catch (IOException e) {
      
    }
    return workbood;
  }
}
