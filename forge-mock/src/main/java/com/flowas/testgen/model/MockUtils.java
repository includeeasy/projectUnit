package com.flowas.testgen.model;

import java.lang.reflect.Method;
import java.util.List;

public class MockUtils {
	public static List<String> addTo(List<String> list, String imports) {
		if (null != imports && imports.contains("\n")) {
			String[] pairs = imports.split("\n");
			for (String imp : pairs) {
				imp = imp.replace("import", "").replace(";", "").trim();
				if (!list.contains(imp)) {
					list.add(imp);
				}
			}
		}
		return list;
	}

	public static Method getInstanceMethod(Class clasz) {
		for (Method m : clasz.getDeclaredMethods()) {
			if (m.getReturnType().equals(clasz)) {
				return m;
			}
		}
		return null;
	}
}
