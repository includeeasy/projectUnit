package org.protege.editor.owl.model.find;

import java.util.Set;

import org.protege.editor.owl.model.OWLModelManager;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLClassExpression;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;

public class OWLEntityFinder {
	static OWLEntityFinder instance= new OWLEntityFinder();
	public static OWLEntityFinder get() {
		return instance;
	}

	public Set<OWLEntity> getEntities(IRI create) {		
		OWLOntology onto = OWLModelManager.instance().getActiveOntology();		
		return onto.getEntitiesInSignature(create);
	}

	public OWLClassExpression getOWLClass(String string) {
		//OWLOntology onto = OWLModelManager.instance().getActiveOntology();
	    OWLOntologyManager man = OWLModelManager.getManager();
	    OWLClass cl = man.getOWLDataFactory().getOWLClass( IRI.create(OWLModelManager.PERFIX+string));	   
		return cl;
	}

	public Set<? extends OWLEntity> getMatchingOWLClasses(String searchString,
			boolean b, int caseInsensitive) {
		// TODO Auto-generated method stub
		return null;
	}

	public Set<? extends OWLEntity> getMatchingOWLIndividuals(
			String searchString, boolean b, int caseInsensitive) {
		// TODO Auto-generated method stub
		return null;
	}

}
