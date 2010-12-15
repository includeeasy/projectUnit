package com.flowas.testgen.model.event;

import java.util.Set;

import org.jboss.seam.forge.parser.java.JavaClass;


public  class DocEvent {
	private String className;
	private Set<String> methodList;
	private JavaClass underOperation;
	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Set<String> getMethodList() {
		return methodList;
	}

	public void setMethodList(Set<String> methodList) {
		this.methodList = methodList;
	}

	public JavaClass getUnderOperation() {
		return underOperation;
	}

	public void setUnderOperation(JavaClass underOperation) {
		this.underOperation = underOperation;
	}

	
}
