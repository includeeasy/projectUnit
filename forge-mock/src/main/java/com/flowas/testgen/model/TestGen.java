/**
 * 
 */
package com.flowas.testgen.model;

import java.io.File;

/**
 * @author Administrator
 *
 */
public interface TestGen { 
  public void generateFor(File sutClass);
  public void isolateDOC(File sutClass);
  public void fromXML(File xmlfile);
  public void sample(File sutClass,String name);
}
