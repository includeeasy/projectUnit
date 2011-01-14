/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package loganalyzer.lingpipe;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import loganalyzer.LogAnalyzer;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 *
 * @author Administrator
 */
public class ModelUtil {

    public static String[][] getTableModel() {
        String[][] matric = null;
        String[] rows = null;
        String alias;
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setIgnoringComments(true);
            factory.setIgnoringElementContentWhitespace(true);
            Document doc = factory.newDocumentBuilder().parse(LogAnalyzer.class.getResourceAsStream("/rule.xml"));
            doc.normalizeDocument();
            Element display = (Element) doc.getDocumentElement().getElementsByTagName("display").item(0);
            Element column = (Element) display.getElementsByTagName("row").item(0);
            NodeList types = column.getElementsByTagName("phrase");
            rows = new String[types.getLength()];
            matric = new String[getTableTitle().length][rows.length];
            for (int i = 0; i < types.getLength(); i++) {
                Element typeElement = (Element) types.item(i);
                alias = typeElement.getAttribute("alias");
                alias = typeElement.getAttribute("alias");              
                rows[i] = (alias == null || "".equals(alias))?typeElement.getTextContent().trim():alias;
                matric[i][0] = rows[i];
            }
        } catch (SAXException ex) {
            Logger.getLogger(ModelUtil.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(ModelUtil.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(ModelUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return matric;
    }

    public static String[] getTableTitle() {
        return getTableTitle(true);
    }

    /**
     * The lenth muust eques the column lenth.
     * @return 
     */
    public static String[] getTableTitle(boolean useAlias) {
        String[] titles = null;
        String alias;
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setIgnoringComments(true);
            factory.setIgnoringElementContentWhitespace(true);
            Document doc = factory.newDocumentBuilder().parse(LogAnalyzer.class.getResourceAsStream("/rule.xml"));
            doc.normalizeDocument();
            Element display = (Element) doc.getDocumentElement().getElementsByTagName("display").item(0);
            Element column = (Element) display.getElementsByTagName("column").item(0);
            NodeList types = column.getElementsByTagName("type");
            titles = new String[types.getLength()];
            for (int i = 0; i < types.getLength(); i++) {
                Element typeElement = (Element) types.item(i);
                alias = typeElement.getAttribute("alias");
                if (useAlias) {
                    titles[i] = (alias == null || "".equals(alias)) ? typeElement.getTextContent().trim() : alias;
                } else {
                    titles[i] = typeElement.getTextContent().trim();
                }

            }
        } catch (SAXException ex) {
            Logger.getLogger(ModelUtil.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(ModelUtil.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(ModelUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return titles;
    }
}
