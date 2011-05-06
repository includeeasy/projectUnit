package net.flowas.ec2service;


import java.io.File;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
@PrepareForTest({ File.class })
public class FileMock {

	@Before
	public void setUp() throws Exception {
		Answer<File> answerFile = new Answer<File>() {
			@Override
			public File answer(InvocationOnMock invocation)
					throws Throwable {
				File mockFile = new File("");
				File spy = PowerMockito.spy(mockFile);
				PowerMockito.when(spy.exists())
						.thenReturn(false);				
				return spy;
			}
		};
		PowerMockito.whenNew(File.class).withArguments(".").thenAnswer(answerFile);
	}

	@Test
	public void tearDown() throws Exception {
		File file =new File(".");
		System.out.println(file.exists());
	}

}
