/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.flowas.projectunit.sitespec;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Enumeration;

import javax.inject.Named;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * 
 * @author Administrator
 */
public class AlignHelper {
	public static final String SITE_FILE = "META-INF/site/site.xml";
	public static final String HEADER = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	public Element loadContext(String xpath) throws IOException, SAXException,
			ParserConfigurationException, XPathExpressionException, TransformerConfigurationException, TransformerException, TransformerFactoryConfigurationError {
		DocumentBuilder builder = DocumentBuilderFactory.newInstance()
				.newDocumentBuilder();
		Document base = builder.newDocument();
		Element root = base.createElement("root");
		Enumeration<URL> res = Thread.currentThread().getContextClassLoader()
				.getResources(SITE_FILE);
		while (res.hasMoreElements()) {
			InputStream in = res.nextElement().openStream();
			Document doc = builder.parse(in);
			XPathExpression expr = XPathFactory.newInstance().newXPath()
					.compile(xpath);			
			NodeList list = (NodeList) expr.evaluate(doc,XPathConstants.NODESET);
			for(int i=0;i<list.getLength();i++){				
				root.appendChild(base.importNode(list.item(i),true));				
			}			
		}
		return root;
	}
}
