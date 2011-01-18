package com.flowas.fop;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamWriter;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.xerces.xinclude.XInclude11TextReader;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public class XIncludeTest {
	private static String inputxml = "xml/xslt/docsrc/reference.xml";
	/**
	 * @param args
	 * @throws ParserConfigurationException 
	 * @throws Exception 
	 * @throws SAXException 
	 */
	public static void main(String[] args) throws ParserConfigurationException, SAXException, Exception {
		File baseDir = new File(".");
		File originxmlfile = new File(baseDir, inputxml);
		DocumentBuilderFactory factory=DocumentBuilderFactory.newInstance(); 
		factory.setXIncludeAware(true);
		DocumentBuilder builder=factory.newDocumentBuilder();		
		Document doc = builder.parse(originxmlfile);
		saveDoc(doc);
	}
	public static void saveDoc(Document doc){		  
		   try {
		    TransformerFactory tfFac=TransformerFactory.newInstance();
		    Transformer tf=tfFac.newTransformer();
		   
		    //要使用 tf.transform(source, result)方法
		   
		    StreamResult result=new StreamResult(System.out);
		   
		    DOMSource source=new DOMSource(doc);
		   
		    //tf.setOutputProperty(OutputKeys.VERSION, "1.0");
		    //tf.setOutputProperty(OutputKeys.ENCODING, "gb2312");
		    //tf.setOutputProperty(OutputKeys.INDENT, "yes");
		   
		    tf.transform(source, result);
		   
		   
		   } catch (TransformerConfigurationException e) {
		    // TODO 自动生成 catch 块
		    e.printStackTrace();
		   } catch (TransformerException e) {
		    // TODO 自动生成 catch 块
		    e.printStackTrace();
		   }
		}
}
