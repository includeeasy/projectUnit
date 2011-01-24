package net.flowas.projectunit.gwt.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.xpath.XPathExpressionException;

import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import net.flowas.projectunit.sitespec.AlignHelper;
import net.flowas.projectunit.sitespec.SiteManager;

public class TreeData extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		PrintWriter out = resp.getWriter();

		String symbols = req.getParameter("q");
//		if (symbols.contains("ab")) {
//			out.println("cd,ef");
//		} else {
//			out.println("ab");
//		}
		out.println(OperationUtils.subTree(symbols));
	}	
}