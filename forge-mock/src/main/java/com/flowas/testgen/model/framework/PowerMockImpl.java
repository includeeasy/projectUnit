package com.flowas.testgen.model.framework;

import java.io.ByteArrayInputStream;
import java.util.Map;
import java.util.Set;

import javax.enterprise.event.Event;
import javax.enterprise.inject.Default;
import javax.inject.Inject;

import org.jboss.seam.forge.parser.JavaParser;
import org.jboss.seam.forge.parser.java.JavaClass;
import org.jboss.seam.forge.parser.java.JavaSource;
import org.jboss.seam.forge.project.Project;

import com.flowas.testgen.model.GeneEnum;
import com.flowas.testgen.model.event.DocEvent;
@Default
public class PowerMockImpl implements Technology{

	@Inject
	Project project;
	
	@Inject
	Event<DocEvent> docEvent;
	
	@Override
	public void isolate(String testname, Map<String, Set<String>> docList,
			Map<GeneEnum, Object> template) {
		String body = (String) template.get(GeneEnum.BODY);
		body = body.replace("%Template%", testname);
		JavaSource<JavaClass> clo = JavaParser.parse(JavaClass.class,new ByteArrayInputStream(
				body.getBytes()));
		JavaClass cl = clo.getOrigin();
		String classname=(String) docList.keySet().toArray()[0];
		DocEvent event=new DocEvent();
		event.setClassName(classname);
		event.setMethodList(docList.get(classname));
		event.setUnderOperation(cl);
		docEvent.fire(event);
		cl.setPackage("com.flowas");
	    //project.createJavaFile(cl);
	}
}
