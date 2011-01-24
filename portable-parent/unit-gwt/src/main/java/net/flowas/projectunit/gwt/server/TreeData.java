package net.flowas.projectunit.gwt.server;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TreeData extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		PrintWriter out = resp.getWriter();

		String symbols = req.getParameter("q");
		if (symbols.contains("ab")) {
			out.println("cd,ef");
		} else {
			out.println("ab");
		}
	}

}