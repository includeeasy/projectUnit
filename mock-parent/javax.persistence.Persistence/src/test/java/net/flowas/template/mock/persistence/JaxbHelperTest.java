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
package net.flowas.template.mock.persistence;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.bind.JAXBException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import net.flowas.template.mock.persistence.JaxbHelper.DataJaxb;

/**
 * @author Administrator
 *
 */
public class JaxbHelperTest {

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
	 * Test method for {@link com.flowas.generic.function.JaxbHelper#unmarshal(java.lang.Class, java.io.InputStream)}.
	 * @throws IOException 
	 */
	@Test
	public void testUnmarshal() throws IOException {
		try {
			JaxbHelper dp = new JaxbHelper();
			DataJaxb jxb = dp.unmarshal(DataJaxb.class, JaxbHelper.class
					.getResourceAsStream("/data.xml"));
			List provinceList = jxb.getData();
			for (Iterator it = provinceList.iterator(); it.hasNext();) {
				Object method = it.next();
				System.out.println(method);
			}
		} catch (JAXBException ex) {
			Logger.getLogger(JaxbHelper.class.getName()).log(Level.SEVERE,
					null, ex);
		}		
	}

	/**
	 * Test method for {@link com.flowas.generic.function.JaxbHelper#marshal(java.lang.Object)}.
	 */
	@Test
	public void testMarshal() {
        JaxbHelper dp = new JaxbHelper();
        DataJaxb jxb = new DataJaxb();
        User m = new User();
        m.setLoginName("aha");
        jxb.getData().add(m);
        try {
            String xml = dp.marshal(jxb);
            System.out.println(xml);
        } catch (JAXBException ex) {
            Logger.getLogger(JaxbHelper.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(JaxbHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
	}

}
