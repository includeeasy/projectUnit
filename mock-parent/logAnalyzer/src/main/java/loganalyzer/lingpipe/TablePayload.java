/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package loganalyzer.lingpipe;

import java.util.AbstractList;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 *
 * @author Administrator
 */
public class TablePayload {

    private int column;
    private int row;
    private Object value;

    /**
     * @return the column
     */
    public int getColumn() {
        return column;
    }

    /**
     * @param column the column to set
     */
    public void setColumn(int column) {
        this.column = column;
    }

    /**
     * @return the row
     */
    public int getRow() {
        return row;
    }

    /**
     * @param row the row to set
     */
    public void setRow(int row) {
        this.row = row;
    }

    /**
     * @return the value
     */
    public Object getValue() {
        return value;
    }

    /**
     * @param value the value to set
     */
    public void setValue(Object value) {
        this.value = value;
    }

    static List<TablePayload> parse(Map<String, String> get, Element display) {
        Map<String, TreeSet<String>> sorts = new HashMap<String, TreeSet<String>>();
        String name;
        TreeSet<String> set;
        for (String key : get.keySet()) {
            if (key.contains("_")) {
                name = key.split("_")[0];
                set = sorts.get(name);
                if (set == null) {
                    set = new TreeSet<String>();
                    sorts.put(name, set);
                }
                set.add(key);
            }
        }
        int row = 0;
        List<TablePayload> list = new ArrayList<TablePayload>();
        TablePayload payload;
        Element column = (Element) display.getElementsByTagName("column").item(0);
        NodeList types = column.getElementsByTagName("type");
        for (int i = 0; i < types.getLength(); i++) {
            Element typeElement = (Element) types.item(i);
            String type = typeElement.getTextContent().trim();
            for (String key : get.keySet()) {
                if (key.contains(type)) {                   
                    if (i == 0) {
                        row = parseRow(display, get.get(key));
                    }
                }
            }
        }
        String cellvalue;
        String position;
        String condition;
        //build      
        for (int i = 0; i < types.getLength(); i++) {
            Element typeElement = (Element) types.item(i);
            String type = typeElement.getTextContent().trim();
            for (String key : get.keySet()) {
                if (key.contains(type)) {
                    condition = typeElement.getAttribute("condition");                    
                    System.out.println("====="+condition);
                    if (condition!=null  && !"".equals(condition) && !condition(condition,get)) {                       
                        continue;
                    }
                    payload = new TablePayload();
                    payload.setRow(row);
                    payload.setColumn(i);
                    cellvalue = get.get(key);
                    position = typeElement.getAttribute("position");
                    if (position != null && !"".equals(position)) {
                        if (key.contains("_")) {
                            name = key.split("_")[0];
                            if (position.equals("last")) {
                                cellvalue = get.get(sorts.get(name).last());
                            } else if (position.equals("first")) {
                                cellvalue = get.get(sorts.get(name).first());
                            }
                        }
                    }
                    payload.setValue(cellvalue);
                    list.add(payload);
                }
            }
        }
        return list;
    }

    private static int parseRow(Element display, String get) {
        int rsl = 0;
        Element column = (Element) display.getElementsByTagName("row").item(0);
        NodeList types = column.getElementsByTagName("phrase");
        for (int i = 0; i < types.getLength(); i++) {
            Element typeElement = (Element) types.item(i);
            String phrase = typeElement.getTextContent().trim();
            if (get.trim().equals(phrase)) {
                rsl = i;
            }
        }
        return rsl;
    }
    //If matched the condition,then return true
    static boolean condition(String condition, Map<String, String> get) {
         if (condition.contains("=")) {
            String[] pair = condition.split("=");
            for (String key : get.keySet()) {                
                if (key.contains(pair[0]) && get.get(key).contains(pair[1])) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public String toString() {
        return column + "_" + row + "_" + value;
    }
}
