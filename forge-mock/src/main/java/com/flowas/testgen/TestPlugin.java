/*
 * JBoss, Home of Professional Open Source
 * Copyright 2010, Red Hat, Inc., and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package com.flowas.testgen;

import java.io.File;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.swing.JFileChooser;
import javax.swing.filechooser.FileFilter;

import org.jboss.seam.forge.project.Project;
import org.jboss.seam.forge.shell.Shell;
import org.jboss.seam.forge.shell.command.PluginRegistry;
import org.jboss.seam.forge.shell.plugins.DefaultCommand;
import org.jboss.seam.forge.shell.plugins.Help;
import org.jboss.seam.forge.shell.plugins.Option;
import org.jboss.seam.forge.shell.plugins.Plugin;

import com.flowas.testgen.model.ResourceRepository;
import com.flowas.testgen.model.TestGen;

/**
 * Implements a demonstration {@link Plugin}
 * 
 * @author <a href="mailto:lincolnbaxter@gmail.com">Lincoln Baxter, III</a>
 * 
 */
@Named("test")
@Help("Writes input to output.")
public class TestPlugin implements Plugin {
	@Inject
	Shell shell;
	@Inject
	TestGen codeGen;

	@Inject
	PluginRegistry registry;
	
	@Inject 
	Project project;
	
	@DefaultCommand
	public void run(
			@Option final String command,
			@Option(name = "ui") String useUI,
			@Option(name = "file") String file,
			@Option(name = "name") String name,
			@Option(name = "value") String value) {
		shell.prompt("");
		if ("config".equals(command)) {
			//Settings.config(name, value);
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
		}else if ("fromXML".equals(command)) {
			project.getProjectRoot().getFullyQualifiedName();
			File testFile = getFile(useUI, file);
			if (null != testFile) {
				codeGen.fromXML(testFile);
			}
			return;
		} else {
			File testFile = getFile(useUI, file);
			if(null==testFile){
				shell.print("您取消了操作");
			}else if(testFile.getPath().endsWith("xml")){
				codeGen.fromXML(testFile);
			}else{
				shell.print("您选择了文件：");
				Map<String, String> commands = ResourceRepository.getCommand();
			    for(String mycommand:commands.keySet()){
			    	shell.print(mycommand.replace("_", " ")+" ："+commands.get(mycommand));
			    }			    
			}		
		}
	}
	public File getFile(String ui, String fileName) {
		if (fileName == null || null !=ui) {
          return openFile();
		}
		File file = new File(project.getProjectRoot().getFullyQualifiedName(),fileName);
		return file;
	}
	private File openFile() {
		JFileChooser jfChooser = new JFileChooser(project.getProjectRoot().getFullyQualifiedName());
		jfChooser.setDialogTitle("打开文件");
		jfChooser.setFileFilter(new FileFilter() {
			@Override
			public boolean accept(File f) {
				if (f.getName().endsWith("java")||f.getName().endsWith("xml") || f.isDirectory())
					return true;
				return false;
			}

			@Override
			public String getDescription() {
				// TODO Auto-generated method stub
				return "数值型数据(*.java,*.xml)";
			}
		});
		int result = jfChooser.showOpenDialog(null);
		if (result == JFileChooser.APPROVE_OPTION) { // 确认打开
			File fileIn = jfChooser.getSelectedFile();
		    return fileIn;
		} else  {
			return null;
		}
	}
}
