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
package net.flowas.codegen.forge;

import java.io.File;
import java.io.IOException;

import javax.inject.Inject;
import javax.inject.Named;

import org.jboss.seam.forge.shell.Shell;
import org.jboss.seam.forge.shell.plugins.DefaultCommand;
import org.jboss.seam.forge.shell.plugins.Help;
import org.jboss.seam.forge.shell.plugins.Option;
import org.jboss.seam.forge.shell.plugins.Plugin;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.flowas.codegen.project.model.ExcuteEngine;
import com.flowas.codegen.project.model.OperationUtils;
import com.flowas.generic.utils.XmlUtils;


@Named("project")
@Help("Manage project's archive and some cinfigureration")
public class ProjectPlugin  implements Plugin {
	@Inject
	Shell shell;	
	@Inject	
	OperationUtils operation;
	@Inject
	ExcuteEngine engine;
	@DefaultCommand
	public void run(
			@Option final String command,
			@Option(description = "ui") String useUI,
			@Option(description = "file") String file){
		if ("fromXML".equals(command)) {			
			File testFile = operation.getFile(useUI, file);
			if (null != testFile) {				
				try {
					Document doc = XmlUtils.getDocumentBuilder().parse(testFile);
					engine.project(doc.getDocumentElement());
				} catch (SAXException e) {					
					e.printStackTrace();
				} catch (IOException e) {					
					e.printStackTrace();
				}				
			}
			return;
		}else if ("config".equals(command)) {			
			//generator.config(key, value);			
			return;
		}else if ("remove".equals(command)) {			
			//id		
			return;
		}
		
	}			
}
