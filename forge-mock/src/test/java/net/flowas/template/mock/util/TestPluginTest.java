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
/**
 * 
 */
package net.flowas.template.mock.util;

import static org.junit.Assert.*;

import net.flowas.LocateAt;
import net.flowas.codegen.forge.MockPlugin;

import org.jboss.arquillian.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.seam.forge.BasePackageMarker;
import org.jboss.seam.forge.test.SingletonAbstractShellTest;
import org.jboss.shrinkwrap.api.ArchivePaths;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.ByteArrayAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.flowas.Old;

/**
 * @author Administrator
 *
 */
@RunWith(Arquillian.class)
public class TestPluginTest  extends SingletonAbstractShellTest{
	   @Deployment
	   public static JavaArchive getMyDeployment()
	   {

	      JavaArchive archive = ShrinkWrap.create(JavaArchive.class, "newtest.jar")
	            .addPackages(true,LocateAt.class.getPackage(),Old.class.getPackage(),BasePackageMarker.class.getPackage())
	            .addManifestResource(new ByteArrayAsset("<beans/>".getBytes()), ArchivePaths.create("beans.xml"));

	      return archive;
	   }
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
	}

	/**
	 * @throws java.lang.Exception
	 */
	@After
	public void tearDown() throws Exception {
	}

	/**
	 * Test method for {@link com.flowas.testgen.TestPlugin#run(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)}.
	 */
	@Test
	public void testRun() {
		//getShell().execute("mkdir hello/first");
		//getShell().execute("cd hello/first");
		//getShell().execute("set VERBOSE true");
		//getShell().execute("mock fromXML --file demo.xml");		
	}

}
