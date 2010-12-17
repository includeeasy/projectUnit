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
package com.flowas.testgen.model.framework;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.enterprise.event.Event;
import javax.enterprise.inject.Default;
import javax.inject.Inject;

import net.flowas.codegen.resource.GenEnum;

import org.jboss.seam.forge.parser.JavaParser;
import org.jboss.seam.forge.parser.java.JavaClass;
import org.jboss.seam.forge.parser.java.JavaSource;
import org.jboss.seam.forge.project.Project;
import org.jboss.seam.forge.project.facets.FacetNotFoundException;
import org.jboss.seam.forge.project.facets.JavaSourceFacet;
import org.jboss.seam.forge.project.resources.builtin.JavaResource;
import org.jboss.seam.forge.project.util.Packages;

import com.flowas.testgen.model.event.DocEvent;
import com.flowas.testgen.model.event.TechEvent;

@Default
public class PowerMockImpl implements Technology {

	@Inject
	Project project;

	@Inject
	Event<DocEvent> docEvent;

	@Inject
	Event<TechEvent> techEvent;
	
	@Override
	public void isolate(String testname, Map<String, Set<String>> docList,
			Map<GenEnum, Object> template) {
		String path = Packages.toFileSyntax(testname) + ".java";
		JavaClass cl = null;		
		try {
			JavaResource javaSource = project.getFacet(JavaSourceFacet.class)
					.getTestJavaResource(path);
			if (javaSource.exists()) {
				cl = (JavaClass) javaSource.getJavaSource();				
			} else {
				String body = (String) template.get(GenEnum.BODY);
				String newName = testname;
				if (testname.contains(".")) {
					String[] array = newName.split("\\.");
					newName = array[array.length - 1];					
				}		
				if (body != null) {
					body = body.replace("%Template%", newName);
					JavaSource<JavaClass> clo = JavaParser.parse(
							JavaClass.class,
							new ByteArrayInputStream(body.getBytes()));
					cl = clo.getOrigin();									
				} else {
					cl = JavaParser.create(JavaClass.class);
					cl.setPublic();
				}
				if (testname.contains(".")) {
					cl.setPackage(testname.replace("." + newName, ""));	
				}			
			}
		} catch (FacetNotFoundException e1) {
			e1.printStackTrace();
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}		
		// dependent of component
		String classname = (String) docList.keySet().toArray()[0];
		DocEvent event = new DocEvent();
		event.setClassName(classname);
		event.setMethodList(docList.get(classname));
		event.setUnderOperation(cl);
		docEvent.fire(event);
		// tech event
		TechEvent tech=new TechEvent();
		tech.setUnderOperation(cl);
		tech.setName(GenEnum.POWERMOCK);
		techEvent.fire(tech);
		JavaSourceFacet java = project.getFacet(JavaSourceFacet.class);
		try {
			java.saveTestJavaClass(cl);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}	
}
