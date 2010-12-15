package com.flowas.testgen.model.event;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;

import org.jboss.seam.forge.parser.java.JavaClass;

import com.flowas.testgen.model.GeneEnum;
import com.flowas.testgen.model.ResourceRepository;
import com.flowas.testgen.model.Settings;

@ApplicationScoped
public class EventHandler {
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
			List<String> importList = new ArrayList<String>();
			for (Method m : clasz.getDeclaredMethods()) {
				m.getName();
				for (String mn : event.getMethodList()) {
					if (mn.contains("(")) {
						mn = mn.split("\\(")[0];
					}
					if (!mn.equals(m.getName())) {
						continue;
					}
					String templateName = "PrivateNew";
					if (Modifier.isStatic(m.getModifiers())) {
						templateName = "StaticMethod";
					} else {
						templateName = "PrivateNew";
					}
					// %DOC%/%method%/%ReturnType%
					Map<GeneEnum, Object> privatenew = ResourceRepository
							.getTemplate(templateName);
					String pbody = (String) privatenew.get(GeneEnum.BODY);
					pbody = pbody
							.replaceAll("%DOC%", clasz.getSimpleName())
							.replace("%method%", mn)
							.replace("%ReturnType%",
									m.getReturnType().getSimpleName());
					mbody += pbody;
					Settings.addTo(importList,
							(String) privatenew.get(GeneEnum.IMPORTS));
					// importList.addAll(privatenew.getImportList());
				}
			}
			for (String imp : importList) {
				cl.addImports(imp);
			}
			//List<Import> ims = Op.on(cl.getImports()).distinct().get();			
			//cl.getImports().addAll(ims);
			// cl.applyChanges();
			for (org.jboss.seam.forge.parser.java.Method<JavaClass> m : cl.getMethods()) {
				if (m.getName().equals("setUp")) {
					m.setBody(mbody);
				}
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	/**
	 * Add data on demand code which is required by Depend on component
	 * 
	 * @param event
	 */
	public void onDocDependent(@Observes DocEvent event) {
		System.out.printf(event.getClassName());		
	}	
}
