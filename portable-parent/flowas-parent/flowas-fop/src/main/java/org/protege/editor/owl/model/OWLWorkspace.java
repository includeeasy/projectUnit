package org.protege.editor.owl.model;

import org.protege.editor.owl.ui.renderer.OWLIconProvider;

public class OWLWorkspace {
	 static OWLWorkspace instance=new OWLWorkspace();
	public OWLIconProvider getOWLIconProvider() {		
		return new OWLIconProvider();
	}

	public static OWLWorkspace instance() {
				return instance;
	}

}
