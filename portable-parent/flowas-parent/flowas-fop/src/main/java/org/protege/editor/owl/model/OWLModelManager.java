package org.protege.editor.owl.model;

import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.protege.editor.owl.model.find.OWLEntityFinder;
import org.protege.editor.owl.model.hierarchy.OWLHierarchyManager;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLObject;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.reasoner.OWLReasoner;

public class OWLModelManager {	
	public static String PERFIX = "http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#";
    static OWLOntologyManager manager;
    static OWLReasoner reasoner;
    public static OWLOntologyManager getManager() {
		return manager;
	}

	static OWLModelManager instance=new OWLModelManager();
    OWLOntology ontology;
	public OWLOntology getActiveOntology() {		
		if(ontology==null){
			InputStream in=this.getClass().getResourceAsStream("soa_ontology_3_1.owl");
			init(in);
		}
		return ontology;
	}

	public String getRendering(OWLObject owlObject) {
		if(owlObject instanceof OWLClass){
			return ((OWLClass) owlObject).getIRI().getFragment();
		}
		return owlObject.toString();
	}

	public OWLEntityFinder getOWLEntityFinder() {		
		return OWLEntityFinder.get();
	}
	private  void init(InputStream in) {
        try {
            manager = OWLManager.createOWLOntologyManager();
            ontology = manager.loadOntologyFromOntologyDocument(in);
        } catch (OWLOntologyCreationException ex) {
            Logger.getLogger(OWLModelManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

	public static OWLModelManager instance() {		
		return instance;
	}

	public OWLHierarchyManager getOWLHierarchyManager() {		
		return new OWLHierarchyManager();
	}
}
