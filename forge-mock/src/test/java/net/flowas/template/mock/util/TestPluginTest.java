/**
 * 
 */
package net.flowas.template.mock.util;

import static org.junit.Assert.*;

import org.jboss.arquillian.junit.Arquillian;
import org.jboss.seam.forge.test.SingletonAbstractShellTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * @author Administrator
 *
 */
@RunWith(Arquillian.class)
public class TestPluginTest  extends SingletonAbstractShellTest{

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
		getShell().execute("test fromXML");		
	}

}
