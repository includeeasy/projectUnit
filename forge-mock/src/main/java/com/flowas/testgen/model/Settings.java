package com.flowas.testgen.model;

import java.util.List;

public class Settings {		
	public static List<String> addTo(List<String> list,String imports){
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
}
