package com.flowas.testgen.model;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;

import org.jboss.seam.forge.shell.Shell;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.flowas.generic.utils.XmlUtils;
import com.flowas.testgen.model.framework.Technology;

//@Default
public class TestGenImpl implements TestGen {
	@Inject
	Shell shell;
	@Inject
	Instance<Technology> technology;	

	@Override
	public void generateFor(File sutClass) {
		shell.println(sutClass.getName());
	}

	@Override
	public void isolateDOC(File sutClass) {
		shell.println(sutClass.getName());
	}

	@Override
	public void sample(File sutClass, String name) {
		// TODO Auto-generated method stub
		shell.println("TODO Auto-generated method stub");
	}

	@Override
	public void fromXML(File xmlfile) {
		try {
			Document doc = XmlUtils.getDocumentBuilder().parse(xmlfile);
			Element testElemet = XmlUtils.findFirstElement("/root/test-class",
					doc.getDocumentElement());
			String testname = testElemet.getTextContent().trim();
			Map<GeneEnum, Object> template = ResourceRepository
					.getTemplate("SimpleTest");
			Element docElemet = XmlUtils
			.findFirstElement("/root/depend-on-component/class",
					doc.getDocumentElement());
	        String classname = docElemet.getAttribute("name");
	        NodeList ms = docElemet.getElementsByTagName("method");
			Map<String,Set<String>> docList=new HashMap<String,Set<String>>();
			Set<String> methods=new HashSet<String>();
	        for (int i = 0; i < ms.getLength(); i++) {
				Element meth = (Element) ms.item(i);
				methods.add(meth.getTextContent().trim());
			}
	        docList.put(classname, methods);
	        Technology tech =technology.get();	// new PowerMockImpl();//        
	        //String[] docList=new String[]{classname};
	        tech.isolate(testname, docList, template);
	        //System.out.print(result);	        
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
