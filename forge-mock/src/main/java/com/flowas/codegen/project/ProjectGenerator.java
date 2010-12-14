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
package com.flowas.codegen.project;

import java.io.File;
import java.io.IOException;

import javax.inject.Inject;
import javax.inject.Named;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.flowas.codegen.project.model.ExcuteEngine;
import com.flowas.generic.utils.XmlUtils;
@Named
public class ProjectGenerator {	
	@Inject
	ExcuteEngine engine;	
	public void fromXML(File xmlfile) {		
		try {
			Document doc = XmlUtils.getDocumentBuilder().parse(xmlfile);
			engine.project(doc.getDocumentElement());
		} catch (IOException e) {			
			e.printStackTrace();
		} catch (SAXException e) {			
			e.printStackTrace();
		}		
	} 
	public static void config(String key, String value) {
		if("locatedAt".equals(key)){
			Settings.locatedAt=value;
			System.out.println("Value has seted!");
		}
	}
}
