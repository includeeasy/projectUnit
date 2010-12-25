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
package net.flowas.template.mock.runtime;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public class ProcessMock extends Process {
	static Document document;
	InputStream standStrean;
	InputStream errorStrean;

	public ProcessMock(String command, CommandFilter filter) {
         init(command, filter);
	}
	public ProcessMock(String command) {
        init(command, null);
	}
	@Override
	public OutputStream getOutputStream() {
		// TODO Auto-generated method stub
		return null;
	}

	private void init(String command, CommandFilter filter) {
		if(null!=filter){
			String[] result= filter.exec(command);
			if(null!=result && result.length>0 ){
				if(result.length==1){
					result=new String[]{result[0],""};
				}
				if(result[0]== null){
					result[0]="";
				}
				if(result[1]== null){
					result[1]="";
				}
				errorStrean = new ByteArrayInputStream(result[1].getBytes());
				standStrean = new ByteArrayInputStream(result[0].getBytes());
			    return;
			}
		}
		try {
			if (document == null) {
				document = DocumentBuilderFactory
						.newInstance()
						.newDocumentBuilder()
						.parse(this.getClass().getResourceAsStream(
								"/commandAndReturn.xml"));
			}
			XPath xpath = XPathFactory.newInstance().newXPath();
			XPathExpression standExp = xpath.compile("//command[@name=\""
					+ command + "\"]/standInfo/text()");
			XPathExpression errorExp = xpath.compile("//command[@name=\""
					+ command + "\"]/errorInfo/text()");
			String standinfo = (String) standExp.evaluate(document,
					XPathConstants.STRING);
			String errorinfo = (String) errorExp.evaluate(document,
					XPathConstants.STRING);
			errorStrean = new ByteArrayInputStream(errorinfo.getBytes());
			standStrean = new ByteArrayInputStream(standinfo.getBytes());
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (XPathExpressionException e) {
			e.printStackTrace();
		}

	}

	@Override
	public InputStream getInputStream() {
		return standStrean;
	}

	@Override
	public InputStream getErrorStream() {
		return errorStrean;
	}

	@Override
	public int waitFor() throws InterruptedException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int exitValue() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
