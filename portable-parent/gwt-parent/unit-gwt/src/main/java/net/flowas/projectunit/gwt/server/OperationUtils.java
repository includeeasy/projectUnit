package net.flowas.projectunit.gwt.server;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.xpath.XPathExpressionException;

import net.flowas.projectunit.sitespec.AlignHelper;
import net.flowas.projectunit.sitespec.SiteManager;

import org.w3c.dom.Element;
import org.xml.sax.SAXException;

public class OperationUtils {
	public static String subTree(String id) {
		SiteManager site = new SiteManager();
		AlignHelper align = new AlignHelper();
		StringBuffer sb = new StringBuffer();
		String ide;
		try {
			Element list = align.loadContext("//treeitem[@id='" + id + "']");
			site.setLinksElement(list);
			List<Element> items = site.getChildrenById();
			for (Element e : items) {
				ide = e.getAttribute("id");
				if (ide != null && !ide.trim().equals("")) {
					if (sb.length() > 0) {
						sb.append(",");
					}
					sb.append("id="+ide);
					ide = e.getAttribute("name");
					if( ide!= null && !ide.trim().equals("")){
						sb.append(":name="+ide);
					}					
					if( e.getElementsByTagName("treeitem").getLength()==0){
						sb.append(":isleaf=true");
					}
				}
			}
		} catch (XPathExpressionException e) {
			e.printStackTrace();
		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerException e) {
			e.printStackTrace();
		} catch (TransformerFactoryConfigurationError e) {
			e.printStackTrace();
		}
		return sb.toString();
	}
}
