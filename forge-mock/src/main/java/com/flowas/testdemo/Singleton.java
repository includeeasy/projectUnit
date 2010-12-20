package com.flowas.testdemo;

public class Singleton {
  private static Singleton instance =new Singleton();
  private Singleton(){}
  public static Singleton instance(){
	return instance;	  
  }
  public String method(String arg) {
		((String)null).getBytes();
		return "hello " + arg;
	}
	public static String staticmethod(String arg) {
		((String)null).getBytes();
		return "hello " + arg;
	}
	public String otherMethod(String arg) {		
		return "hello " + arg;
	}
}
