package com.flowas.testgen.model.framework;

import java.io.ByteArrayInputStream;
import java.util.Map;

import javax.enterprise.inject.Default;

import org.jboss.seam.forge.parser.JavaParser;
import org.jboss.seam.forge.parser.java.JavaClass;
import org.jboss.seam.forge.parser.java.JavaSource;

import net.flowas.codegen.resource.GenEnum;

import com.flowas.testgen.model.ResourceRepository;
@Default
public class JUnitImpl implements TestFramework{
	public String getSample(String testname) {
		Map<GenEnum, Object> template = ResourceRepository
				.getTemplate("SimpleTest");
		String body = (String) template.get(GenEnum.BODY);
		String newName = testname;
		if (testname.contains(".")) {
			String[] array = newName.split("\\.");
			newName = array[array.length - 1];
		}
		if (body != null) {
			body = body.replace("%Template%", newName);
			return body;
		} else {
			return null;
		}
	}
}
