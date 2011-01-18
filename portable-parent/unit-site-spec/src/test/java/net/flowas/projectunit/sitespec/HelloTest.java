/**
 * 
 */
package net.flowas.projectunit.sitespec;


import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.xml.sax.SAXException;

/**
 * @author Administrator
 *
 */
public class HelloTest {

	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
	}
	AlignHelper alignHelper=new AlignHelper();
	@Test
	public void testLoadContext() throws Exception, IOException, SAXException, ParserConfigurationException {
		System.out.println(alignHelper.loadContext("//body/links/item"));
		Assert.assertNotNull(alignHelper.loadContext("//body/links/item"));
	}
}
