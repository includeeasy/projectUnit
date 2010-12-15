package com.flowas.testgen.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.semanticweb.HermiT.Configuration;
import org.semanticweb.HermiT.Reasoner.ReasonerFactory;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLLiteral;
import org.semanticweb.owlapi.model.OWLNamedIndividual;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.reasoner.NodeSet;
import org.semanticweb.owlapi.reasoner.OWLReasoner;

import com.flowas.testgen.TestPlugin;

public class ResourceRepository {
	static OWLOntologyManager manager;
	static OWLReasoner reasoner;
	static String iri = "http://flowas.com/ontology/utdemo.owl#";
	//static String file = TestPlugin.class.getResource("utdemo.owl").toExternalForm();

	public static void main(String[] args) {
		System.out.println(getCommand());
	}
	public static Map<GeneEnum,Object> getTemplate(String name) {
		HashMap<GeneEnum,Object> map=new HashMap<GeneEnum,Object>();
		try {
			if(null==reasoner){
				init();
			}            
        } catch (OWLOntologyCreationException ex) {
            Logger.getLogger(ResourceRepository.class.getName()).log(Level.SEVERE, null, ex);
        }
        OWLDataFactory dFactory = manager.getOWLDataFactory();
        OWLNamedIndividual model = dFactory.getOWLNamedIndividual(IRI.create(iri + name));
        OWLDataProperty dataProperty = dFactory.getOWLDataProperty(IRI.create(iri + "body"));
        Set<OWLLiteral> bodyList = reasoner.getDataPropertyValues(model, dataProperty); 
		for(OWLLiteral text:bodyList){
			map.put(GeneEnum.BODY, text.getLiteral());
			//mod.setBody(text.getLiteral());
		}
		OWLDataProperty importProperty = dFactory.getOWLDataProperty(IRI.create(iri + "import"));
        Set<OWLLiteral> importList = reasoner.getDataPropertyValues(model, importProperty); 
		for(OWLLiteral text:importList){
			//mod.setImports(text.getLiteral());
			map.put(GeneEnum.IMPORTS, text.getLiteral());
		}        
        return map;
	}
	public static Map<String,String> getCommand() {
		HashMap<String,String> map=new HashMap<String,String>();
		try {
			if(null==reasoner){
				init();
			}            
        } catch (OWLOntologyCreationException ex) {
            Logger.getLogger(ResourceRepository.class.getName()).log(Level.SEVERE, null, ex);
        }
        OWLDataFactory dFactory = manager.getOWLDataFactory();
        OWLNamedIndividual model = dFactory.getOWLNamedIndividual(IRI.create(iri + "TestGen"));
        OWLObjectProperty objectProperty = dFactory.getOWLObjectProperty(IRI.create(iri + "include"));
        NodeSet<OWLNamedIndividual> bodyList = reasoner.getObjectPropertyValues(model, objectProperty); 
        OWLDataProperty helpProperty = dFactory.getOWLDataProperty(IRI.create(iri + "help"));
        for(OWLNamedIndividual individ:bodyList.getFlattened()){
        	Set<OWLLiteral> helpList=	reasoner.getDataPropertyValues(individ, helpProperty); 
        	String help="";
        	for(OWLLiteral text:helpList){
        		help+=text.getLiteral();    			
    		}
        	map.put(individ.getIRI().getFragment().replace(iri, ""), help);
		}
        return map;
	}
	public static void init() throws OWLOntologyCreationException {
		manager = OWLManager.createOWLOntologyManager();
//		SimpleIRIMapper novelMapper = new SimpleIRIMapper(IRI.create(iri),
//				IRI.create(file));
//		manager.addIRIMapper(novelMapper);
		OWLOntology ontology = manager.loadOntologyFromOntologyDocument(TestPlugin.class.getResourceAsStream("utdemo.owl"));//.loadOntology(IRI.create(file));
		ReasonerFactory factory = new ReasonerFactory();
		Configuration configuration = new Configuration();
		configuration.throwInconsistentOntologyException = true;
		reasoner = factory.createReasoner(ontology, configuration);
	}
}
