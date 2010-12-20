/**
 * Copyright (C) 2010 http://flowas.net/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * You can write to flowas@gmial.com for more customer requirement.
 */
package com.flowas.testgen.model.event;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import net.flowas.codegen.resource.GenEnum;
import net.flowas.codegen.resource.Settings;

import org.jboss.seam.forge.parser.java.JavaClass;
import org.jboss.seam.forge.project.Project;
import org.jboss.seam.forge.project.dependencies.Dependency;
import org.jboss.seam.forge.project.dependencies.DependencyBuilder;
import org.jboss.seam.forge.project.facets.DependencyFacet;
import org.w3c.dom.Element;

import com.flowas.codegen.project.model.ExcuteEngine;
import com.flowas.testgen.model.ResourceRepository;

@ApplicationScoped
public class EventHandler {
	@Inject
	ExcuteEngine engine;
	@Inject
	Project project;

	/**
	 * Add Mock code when matched a Depend on component
	 * 
	 * @param event
	 */
	public void onMatchedDoc(@Observes DocEvent event) {
		JavaClass cl = event.getUnderOperation();
		Class<?> clasz;
		try {
			clasz = Class.forName(event.getClassName());
			String mbody = "";
			String methodName = "none";
			List<String> importList = new ArrayList<String>();
			for (Method m : clasz.getDeclaredMethods()) {
				for (String mn : event.getMethodList()) {					
					if (mn.contains("(")) {
						methodName = mn.split("\\(")[0];
					}
					if (!methodName.equals(m.getName())) {
						continue;
					}
					Class[] paraTypes = m.getParameterTypes();
					String[] paras = methodParam(mn);
					if (paraTypes.length != paras.length) {
						continue;
					}
					boolean flag = false;
					for (int i = 0; i < paras.length; i++) {
						if (!paraTypes[i].getName().equals(paras[i].trim())) {
							flag = true;
						}
					}
					if (flag) {
						continue;
					}
					String templateName = "PrivateNew";
					if (Modifier.isStatic(m.getModifiers())) {
						templateName = "StaticMethod";
					} else if(clasz.getDeclaredConstructor().getModifiers()!=Modifier.PRIVATE){
						templateName = "PrivateNew";
					}else{
						templateName = "Singleton";
					}
					// %DOC%/%method%/%ReturnType%
					Map<GenEnum, Object> privatenew = ResourceRepository
							.getTemplate(templateName);
					String pbody = (String) privatenew.get(GenEnum.BODY);
					pbody = pbody
							.replaceAll("%DOC%", clasz.getSimpleName())
							.replace("%method%", methodName)
							.replace("%ReturnType%",
									m.getReturnType().getSimpleName());
					mbody += pbody;
					Settings.addTo(importList,
							(String) privatenew.get(GenEnum.IMPORTS));
					// importList.addAll(privatenew.getImportList());
				}
			}
			for (String imp : importList) {
				cl.addImports(imp);
			}
			for (org.jboss.seam.forge.parser.java.Method<JavaClass> m : cl
					.getMethods()) {
				if (m.hasAnnotation("org.junit.Before")) {
					if(!m.getBody().contains(clasz.getSimpleName())
							&& !m.getBody().contains(methodName)){
						mbody=m.getBody()+mbody;
					}
					m.setBody(mbody);
				}
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SecurityException e) {		
			e.printStackTrace();
		} catch (NoSuchMethodException e) {			
			e.printStackTrace();
		}

	}

	/**
	 * Add data on demand code which is required by Depend on component
	 * 
	 * @param event
	 */
	public void onDocDependent(@Observes DocEvent event) {
		if ("java.lang.Runtime".equals(event.getClassName())) {
			DocumentBuilder bu;
			try {
				bu = DocumentBuilderFactory.newInstance().newDocumentBuilder();
				Element ma = bu.newDocument().createElement("maven");
				ma.setAttribute("zip",
						"/META-INF/resources/achieve/" + event.getClassName()
								+ ".zip");
				engine.maven(ma);
			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			}
		}
	}

	public void onTechDependent(@Observes TechEvent event) {
		if (event.getName() == GenEnum.POWERMOCK) {
			JavaClass cl = event.getUnderOperation();
			cl.addImport("org.powermock.modules.junit4.PowerMockRunner");
			if (!cl.hasAnnotation("org.junit.runner.RunWith")) {
				cl.addAnnotation("org.junit.runner.RunWith").setLiteralValue(
						"PowerMockRunner.class");
			}
			DependencyFacet maven = project.getFacet(DependencyFacet.class);
			Dependency dependencyPJ = DependencyBuilder
					.create("org.powermock:powermock-module-junit4:1.4.6:test");
			if (!maven.hasDependency(dependencyPJ)) {
				maven.addDependency(dependencyPJ);
			}
			Dependency dependencyP = DependencyBuilder
					.create("org.powermock:powermock-api-easymock:1.4.6:test");
			if (!maven.hasDependency(dependencyP)) {
				maven.addDependency(dependencyP);
			}
			Dependency dependencyJ = DependencyBuilder
					.create("junit:junit:4.8.2:test");
			if (!maven.hasDependency(dependencyJ)) {
				maven.addDependency(dependencyJ);
			}
			Dependency dependencyE = DependencyBuilder
					.create("org.easymock:easymock:3.0:test");
			if (!maven.hasDependency(dependencyE)) {
				maven.addDependency(dependencyE);
			}
		}
	}

	private String[] methodParam(String mn) {
		String param = "";
		if (mn.contains("(")) {
			String[] pair = mn.split("\\(");
			mn = pair[0];
			param = pair[1];
			param = param.replace(")", "");
		}
		String[] paramArray;
		if (param.trim().equals("")) {
			paramArray = new String[] {};
		} else if (param.contains(",")) {
			paramArray = param.split(",");
		} else {
			paramArray = new String[] { param };
		}
		return paramArray;
	}
}
