package net.flowas.projectunit.sitespec;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

@Named
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

	public List<Element> getChildren() throws ParserConfigurationException,
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
}
