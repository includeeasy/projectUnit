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
import java.util.Map;
import java.util.ResourceBundle;

import javax.inject.Inject;
import javax.inject.Named;
import javax.swing.JFileChooser;
import javax.swing.filechooser.FileFilter;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import net.flowas.codegen.model.ExcuteEngine;
import net.flowas.codegen.model.TestGen;
import net.flowas.codegen.resource.ResourceRepository;

import org.jboss.seam.forge.project.Project;
import org.jboss.seam.forge.shell.Shell;
import org.jboss.seam.forge.shell.plugins.DefaultCommand;
import org.jboss.seam.forge.shell.plugins.Help;
import org.jboss.seam.forge.shell.plugins.Option;
import org.jboss.seam.forge.shell.plugins.Plugin;
import org.w3c.dom.Element;


@Named("mock")
@Help("Manage project's archive and some cinfigureration")
public class MockPlugin implements Plugin {
	ResourceBundle i18n = ResourceBundle
			.getBundle("net/flowas/codegen/resource/i18n");
	@Inject
	Shell shell;
	@Inject
	ExcuteEngine engine;
	@Inject
	TestGen codeGen;
	@Inject
	Project project;

	@DefaultCommand
	public void run(@Option final String command,
			@Option(name = "ui") String useUI,
			@Option(name = "file") String file,
			@Option(name = "name") String name,
			@Option(name = "value") String value,
			@Option(name = "class") String clasz) {

		if ("config".equals(command)) {
			// Settings.config(name, value);
		} else if ("generateFor".equals(command)) {
			File testFile = getFile(useUI, file);
			if (null != testFile) {
				codeGen.generateFor(testFile);
			}
			return;
		} else if ("isolateDOC".equals(command)) {
			File testFile = getFile(useUI, file);
			if (null != testFile) {
				codeGen.isolateDOC(testFile);
			}
			return;
		} else if ("fromXML".equals(command)) {			
			File testFile = getFile(useUI, file);
			if (null != testFile) {
				codeGen.fromXML(testFile);
			}
			return;
		} else if ("editXML".equals(command)) {			
			shell.println("Not implemented yet!");
			return;
		} else if (clasz != null) {
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
			return;
		} else {
			File testFile = getFile(useUI, file);
			if (null == testFile) {
				shell.print(i18n.getString("cancel"));
			} else if (testFile.getPath().endsWith("xml")) {
				codeGen.fromXML(testFile);
			} else {
				shell.print(i18n.getString("selectedFile"));
				Map<String, String> commands = ResourceRepository.getCommand();
				for (String mycommand : commands.keySet()) {
					shell.print(mycommand.replace("_", " ") + ":"
							+ commands.get(mycommand));
				}
			}
		}
	}

	public File getFile(String ui, String fileName) {
		if (fileName == null || null != ui) {
			return openFile();
		}
		File file = new File(project.getProjectRoot().getFullyQualifiedName(),
				fileName);
		return file;
	}

	private File openFile() {
		JFileChooser jfChooser = new JFileChooser(project.getProjectRoot()
				.getFullyQualifiedName());
		jfChooser.setDialogTitle(i18n.getString("openFile"));
		jfChooser.setFileFilter(new FileFilter() {

			@Override
			public boolean accept(File f) {
				if (f.getName().endsWith("java") || f.getName().endsWith("xml")
						|| f.isDirectory()) {
					return true;
				}
				return false;
			}
			@Override
			public String getDescription() {
				// TODO Auto-generated method stub
				return i18n.getString("fileExtention");
			}
		});
		int result = jfChooser.showOpenDialog(null);
		if (result == JFileChooser.APPROVE_OPTION) {
			File fileIn = jfChooser.getSelectedFile();
			return fileIn;
		} else {
			return null;
		}
	}
}
