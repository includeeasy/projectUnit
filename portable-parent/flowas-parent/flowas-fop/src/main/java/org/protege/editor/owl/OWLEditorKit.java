package org.protege.editor.owl;

import org.protege.editor.owl.model.OWLModelManager;
import org.protege.editor.owl.model.OWLWorkspace;

public class OWLEditorKit {

	public OWLModelManager getModelManager() {		
		return OWLModelManager.instance();
	}

	public OWLWorkspace getOWLWorkspace() {		
		return OWLWorkspace.instance();
	}

	public OWLModelManager getOWLModelManager() {		
		return OWLModelManager.instance();
	}

}
