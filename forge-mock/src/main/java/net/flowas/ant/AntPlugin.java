package net.flowas.ant;
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


import java.io.File;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.maven.model.License;
import org.jboss.seam.forge.project.Project;
import org.jboss.seam.forge.project.facets.MavenCoreFacet;
import org.jboss.seam.forge.shell.Shell;
import org.jboss.seam.forge.shell.plugins.DefaultCommand;
import org.jboss.seam.forge.shell.plugins.Help;
import org.jboss.seam.forge.shell.plugins.Option;
import org.jboss.seam.forge.shell.plugins.Plugin;



/**
 * @author <a href="mailto:lincolnbaxter@gmail.com">Lincoln Baxter, III</a>
 * 
 */
@Named("ant")
@Help("A plugin to manage simple @Entity and View creation; a basic MVC framework plugin.")
public class AntPlugin implements Plugin
{
   private final Project project;
   private final Shell shell;
   @Inject
   InvolkeAnt ant;
   
   @Inject
   public AntPlugin(final Project project, final Shell shell)
   {
      this.project = project;
      this.shell = shell;
   }

   @DefaultCommand(help = "Create a JPA @Entity")
   public void newEntity( @Option(description="file") String fileName)
   {      
      File file=new File( project.getProjectRoot().getFullyQualifiedName(),fileName);
      ant.excute(file);
      MavenCoreFacet maven = project.getFacet(MavenCoreFacet.class);
      License license=new License();
      license.setComments("comments");      
	  //maven.getPOM().addLicense(license);
	  maven.getMavenProject().addLicense(license);
      shell.println("Ant task successfully excuted!");
   }
}
