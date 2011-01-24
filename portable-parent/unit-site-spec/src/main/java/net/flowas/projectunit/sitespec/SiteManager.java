package net.flowas.projectunit.sitespec;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
public class SiteManager {
	public Element linksElement;

	public void setLinksElement(Element linksElement) {
		this.linksElement = linksElement;
	}

	public List<Element> getLinks() throws ParserConfigurationException,
			SAXException, IOException {
		List<Element> list = new ArrayList<Element>();
		NodeList nodes = linksElement.getChildNodes();
		for (int i = 0; i < nodes.getLength(); i++) {
			Node node = nodes.item(i);
			if (node instanceof Element) {
				list.add((Element) node);
			}
		}
		return list;
	}

	public List<Element> getChildrenById() throws ParserConfigurationException,
			SAXException, IOException {		
		NodeList nodes = linksElement.getChildNodes();		
		Map<String,Element> map=new HashMap<String,Element>();
		String id;
		for (int i = 0; i < nodes.getLength(); i++) {
			Node node = nodes.item(i);
			if (node instanceof Element) {				
				NodeList array = ((Element) node).getChildNodes();
				for (int j = 0; j < array.getLength(); j++) {
					Node item = array.item(j);
					if (item instanceof Element) {
					   id= ((Element) item).getAttribute("id");
					   if(id!=null && !id.trim().equals("") && !map.containsKey(id)){
						   map.put(id, (Element) item);
					   }
					}
				}
			}
		}
		List<Element> list = new ArrayList<Element>();
		for(Element e:map.values()){
			list.add(e);
		}
		return list;
	}
}
