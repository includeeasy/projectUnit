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
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.flowas.template.mock.persistence;

import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.RunWith;
import org.powermock.api.easymock.PowerMock;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

/**
 * 
 * @author Administrator
 */
@RunWith(PowerMockRunner.class)
@PrepareForTest({ Persistence.class })
@PowerMockIgnore("javax.management.*")
public class EntityMockTest {

	@Before
	public void setUp() {		
		 Method method = PowerMock.method(Persistence.class,
		 "createEntityManagerFactory", String.class);
		 Method expectedMethod = PowerMock.method(DataInitializer.class,
		 "createEntityManagerFactory", String.class);
		 PowerMock.replace(method).with(expectedMethod);
		 PowerMock.replayAll();
		 InputStream in = this.getClass().getResourceAsStream("/data.xml");
		 DataInitializer.insert(in);		
	}

	@After
	public void tearDown() {
	}

	/**
	 * Test of insert method, of class DataInitializer.
	 */
	@Test
	public void testInsert() {
		System.out.println("insert");
		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("ggfortest");
		EntityManager em = emf.createEntityManager();
		List list = em.createQuery("select u from User as u").getResultList();
		System.out.println("==========" + list.size());		
	}

	public static void main(String[] args) {
		JUnitCore.runClasses(EntityMockTest.class);
	}
}