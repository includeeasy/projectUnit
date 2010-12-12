package net.flowas.ant;

import java.io.File;

import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.tools.ant.DefaultLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
@Named
public class InvolkeAnt {
	
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		File buildFile = new File("build.xml");
		Project p = new Project();
		p.setUserProperty("ant.file", buildFile.getAbsolutePath());
		DefaultLogger consoleLogger = new DefaultLogger();
		consoleLogger.setErrorPrintStream(System.err);
		consoleLogger.setOutputPrintStream(System.out);
		consoleLogger.setMessageOutputLevel(Project.MSG_INFO);
		p.addBuildListener(consoleLogger);
		p.init();
		ProjectHelper helper = ProjectHelper.getProjectHelper();
		p.addReference("ant.projectHelper", helper);
		p.setProperty("curentdir", "hello/zip");
		helper.parse(p, buildFile);
	    p.executeTarget(p.getDefaultTarget());	    
		System.out.println("ffff");
	}
	public void excute(File buildFile){
		Project project= new Project();
		project.setUserProperty("ant.file", buildFile.getAbsolutePath());
		DefaultLogger consoleLogger = new DefaultLogger();
		consoleLogger.setErrorPrintStream(System.err);
		consoleLogger.setOutputPrintStream(System.out);
		consoleLogger.setMessageOutputLevel(Project.MSG_INFO);
		project.addBuildListener(consoleLogger);
		project.init();
		ProjectHelper helper = ProjectHelper.getProjectHelper();
		project.addReference("ant.projectHelper", helper);
		helper.parse(project, buildFile);
	    project.executeTarget(project.getDefaultTarget());
	}

}
