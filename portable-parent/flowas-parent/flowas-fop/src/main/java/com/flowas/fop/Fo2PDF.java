package com.flowas.fop;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.FormattingResults;
import org.apache.fop.apps.MimeConstants;
import org.apache.fop.apps.PageSequenceResults;

public class Fo2PDF {

	
	/**
	 * @param args
	 * @throws TransformerException 
	 * @throws IOException 
	 * @throws FOPException 
	 */
	public static void main(String[] args) throws IOException, TransformerException, FOPException {
		Fo2PDF app=new Fo2PDF();
		app.generateDoc();
	}
	
	

    // configure fopFactory as desired
    private FopFactory fopFactory = FopFactory.newInstance();

    public void transDoc() throws IOException, TransformerException, FOPException {
    	System.out.println("FOP ExampleXML2FO\n");
        System.out.println("Preparing...");

        //Setup directories
        File baseDir = new File(".");
        File outDir = new File(baseDir, "out");
        outDir.mkdirs();

        //Setup input and output files            
        File xmlfile = new File(baseDir, "xml/xml/game.xml");//personDesign.xml
        File xsltfile = new File(baseDir, "xml/xslt/fo/docbook.xsl");
        File fofile = new File(outDir, "docs/mathml.fo");

        System.out.println("Input: XML (" + xmlfile + ")");
        System.out.println("Stylesheet: " + xsltfile);
        System.out.println("Output: XSL-FO (" + fofile + ")");
        System.out.println();
        System.out.println("Transforming...");
        
        
       // app.convertXML2FO(xmlfile, xsltfile, fofile);
        File distinctfile = new File(outDir, "ResultXML2PDF.pdf");
        convertFO2RealDoc(fofile, distinctfile, MimeConstants.MIME_PDF);
        System.out.println("Success!");
    }
    
    public void generateDoc() throws IOException, TransformerException, FOPException {
    	System.out.println("FOP ExampleXML2FO\n");
        System.out.println("Preparing...");

        //Setup directories
        File baseDir = new File(".");
        File outDir = new File(baseDir, "out");
        outDir.mkdirs();

        //Setup input and output files            
        File xmlfile = new File(baseDir, "xml/xml/kexue.xml");//personDesign.xml
        File xsltfile = new File(baseDir, "xml/xslt/mydoc.xsl");
        File fofile = new File(outDir, "ResultXML2FO.fo");

        System.out.println("Input: XML (" + xmlfile + ")");
        System.out.println("Stylesheet: " + xsltfile);
        System.out.println("Output: XSL-FO (" + fofile + ")");
        System.out.println();
        System.out.println("Transforming...");
        
        convertXML2FO(xmlfile, xsltfile, fofile);
        File distinctfile = new File(outDir, "ResultXML2PDF.pdf");
        convertFO2RealDoc(fofile, distinctfile, MimeConstants.MIME_PDF);
        System.out.println("Success!");
    }
    
    
    /**
     * Converts an FO file to a PDF file using FOP
     * @param fo the FO file
     * @param pdf the target PDF file
     * @throws IOException In case of an I/O problem
     * @throws FOPException In case of a FOP problem
     */
    public void convertFO2RealDoc(File fo, File pdf,String mimeConstants) throws IOException, FOPException {
        
        OutputStream out = null;
        
        try {
        	fopFactory.setUserConfig(new File("fop.xml"));
            FOUserAgent foUserAgent = fopFactory.newFOUserAgent();
            // configure foUserAgent as desired
    
            // Setup output stream.  Note: Using BufferedOutputStream
            // for performance reasons (helpful with FileOutputStreams).
            out = new FileOutputStream(pdf);
            out = new BufferedOutputStream(out);

            // Construct fop with desired output format
            Fop fop = fopFactory.newFop(mimeConstants, foUserAgent, out);

            // Setup JAXP using identity transformer
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(); // identity transformer
            
            // Setup input stream
            Source src = new StreamSource(fo);

            // Resulting SAX events (the generated FO) must be piped through to FOP
            Result res = new SAXResult(fop.getDefaultHandler());
            
            // Start XSLT transformation and FOP processing
            transformer.transform(src, res);
            
            // Result processing
            FormattingResults foResults = fop.getResults();
            java.util.List pageSequences = foResults.getPageSequences();
            for (java.util.Iterator it = pageSequences.iterator(); it.hasNext();) {
                PageSequenceResults pageSequenceResults = (PageSequenceResults)it.next();
                System.out.println("PageSequence " 
                        + (String.valueOf(pageSequenceResults.getID()).length() > 0 
                                ? pageSequenceResults.getID() : "<no id>") 
                        + " generated " + pageSequenceResults.getPageCount() + " pages.");
            }
            System.out.println("Generated " + foResults.getPageCount() + " pages in total.");

        } catch (Exception e) {
            e.printStackTrace(System.err);
            System.exit(-1);
        } finally {
            out.close();
        }
    }
	
	/**
     * Converts an XML file to an XSL-FO file using JAXP (XSLT).
     * @param xml the XML file
     * @param xslt the stylesheet file
     * @param fo the target XSL-FO file
     * @throws IOException In case of an I/O problem
     * @throws TransformerException In case of a XSL transformation problem
     */
    public void convertXML2FO(File xml, File xslt, File fo) 
                throws IOException, TransformerException {
       
        //Setup output
        OutputStream out = new java.io.FileOutputStream(fo);
        try {
            //Setup XSLT
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(new StreamSource(xslt));
        
            //Setup input for XSLT transformation
            Source src = new StreamSource(xml);
        
            //Resulting SAX events (the generated FO) must be piped through to FOP
            Result res = new StreamResult(out);

            //Start XSLT transformation and FOP processing
            transformer.transform(src, res);
        } finally {
            out.close();
        }
    }
}
