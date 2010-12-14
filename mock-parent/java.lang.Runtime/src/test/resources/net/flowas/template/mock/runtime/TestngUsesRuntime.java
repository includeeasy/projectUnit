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
package net.flowas.template.mock.runtime;


import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
@PrepareForTest( { UsesRuntime.class,Runtime.class })
@PowerMockIgnore({"com.sun.org.apache.**","javax.xml.parsers.**"})
public class TestngUsesRuntime {

	/**
	 * @throws java.lang.Exception
	 */
	
	@BeforeMethod
	public void setUp() throws Exception {
		    PowerMockito.mockStatic(Runtime.class);		    
	        Runtime mockedRuntime = PowerMockito.mock(Runtime.class);	        
	        PowerMockito.when(Runtime.getRuntime()).thenReturn(mockedRuntime);
	        Answer<Process> answer=new Answer<Process>() {
				@Override
				public Process answer(InvocationOnMock invocation)
						throws Throwable {					
					return new ProcessMock((String) invocation.getArguments()[0]);
				}
			};			
	        PowerMockito.when(mockedRuntime.exec(Mockito.anyString())).thenAnswer(answer) ;	        
	}

	@Test
	public void testRun() {
		UsesRuntime sut = new UsesRuntime();
		UsesRuntime sut2 = new UsesRuntime();
        try {
			sut.run();			
			sut2.run();
			sut.run();			
			sut2.run();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}	
}
