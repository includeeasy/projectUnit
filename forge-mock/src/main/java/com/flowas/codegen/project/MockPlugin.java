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

import javax.inject.Inject;
import javax.inject.Named;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.jboss.seam.forge.shell.Shell;
import org.jboss.seam.forge.shell.plugins.DefaultCommand;
import org.jboss.seam.forge.shell.plugins.Help;
import org.jboss.seam.forge.shell.plugins.Option;
import org.jboss.seam.forge.shell.plugins.Plugin;
import org.w3c.dom.Element;

import com.flowas.codegen.project.model.ExcuteEngine;

@Named("mock")
@Help("Manage project's archive and some cinfigureration")
public class MockPlugin implements Plugin {
	@Inject
	Shell shell;
	@Inject
	ExcuteEngine engine;

	@DefaultCommand
	public void run(@Option(name="class", description = "clasz") String clasz,
			@Option(description = "file") String file) {
		if (clasz != null) {
			DocumentBuilder bu;
			try {
				bu = DocumentBuilderFactory.newInstance().newDocumentBuilder();
				Element ma = bu.newDocument().createElement("maven");
				ma.setAttribute("zip", "/META-INF/resources/achieve/" + clasz
						+ ".zip");
				engine.maven(ma);
			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			}

		}

	}
}
