package org.protege.editor.owl.model.hierarchy;

import java.util.HashSet;
import java.util.Set;

import org.protege.editor.owl.model.OWLModelManager;
import org.semanticweb.owlapi.model.OWLClass;

public class OWLObjectHierarchyProvider<N extends org.semanticweb.owlapi.model.OWLObject> {

	public Set<N> getParents(OWLClass clsOfInterest) {
		// OWLModelManager.instance().getActiveOntology().get
		Set<N> classes = new HashSet<N>();
		Set<N> origin = (Set<N>) clsOfInterest.getSuperClasses(OWLModelManager
				.instance().getActiveOntology());
		for (N n : origin) {
			if (n instanceof OWLClass) {
				classes.add(n);
				//System.out.println("---"+n+"---");
			} else {
				//System.out.println(n);
			}
		}
		return classes;
	}

	public Set<N> getChildren(OWLClass clsOfInterest) {
		// TODO Auto-generated method stub
		Set<N> classes = new HashSet<N>();
		Set<N> origin = (Set<N>) clsOfInterest.getSubClasses(OWLModelManager.instance()
				.getActiveOntology());
		for (N n : origin) {
			if (n instanceof OWLClass) {
				classes.add(n);
				//System.out.println("---"+n+"---");
			} else {
				//System.out.println(n);
			}
		}
		return classes;
	}

}
