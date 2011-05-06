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

import net.flowas.codegen.model.ExcuteEngine;
import net.flowas.codegen.model.OperationUtils;

import org.jboss.forge.shell.Shell;
import org.jboss.forge.shell.plugins.Alias;
import org.jboss.forge.shell.plugins.Command;
import org.jboss.forge.shell.plugins.DefaultCommand;
import org.jboss.forge.shell.plugins.Help;
import org.jboss.forge.shell.plugins.Option;
import org.jboss.forge.shell.plugins.Plugin;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.flowas.generic.utils.XmlUtils;

@Alias("unit")
@Help("Manage project's archive and some configuration")
public class ProjectUnitPlugin implements Plugin {
	@Inject
	Shell shell;
	@Inject
	OperationUtils operation;
	@Inject
	ExcuteEngine engine;

	@DefaultCommand
	public void run(
			@Option(description = "ui") String useUI,
			@Option(description = "file") String file) {		

	}
	/**
	 * According to XML to generate code	 
	 * @param useUI
	 * @param file
	 */
	@Command
	public void fromXML(
			@Option(description = "ui") String useUI,
			@Option(description = "file") String file) {
		File testFile = operation.getFile(useUI, file);
		if (null != testFile) {
			try {
				Document doc = XmlUtils.getDocumentBuilder()
						.parse(testFile);
				engine.project(doc.getDocumentElement());
			} catch (SAXException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return;
	}
	@Command
	public void config(){}
	/**
	 * remove an unit or an future in project
	 */
	@Command
	public void remove(){}
	
	@Command
	public void script(@Option(description = "script file,use ';' in the end of line",name="file") String file){
		try {
			shell.execute(new File(file));
		} catch (IOException e) {	
			shell.println(e.getLocalizedMessage());
			e.printStackTrace();
		}
	}
}
