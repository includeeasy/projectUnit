package net.flowas.generic;

import com.flowas.generic.model.Payload;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.flowas.generic.utils.XMLHelper;

import java.util.Iterator;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import org.mvel2.templates.TemplateRuntime;
@ApplicationScoped
public class TemplateHelper {

    public static final String FILE_NAME = "META-INF/config.xml";
    @Inject
    Event<Payload> event;  
    public static void main(String[] args) {
        TemplateHelper sc = new TemplateHelper();
//        List<Element> items = sc.findAllElements("//web/page/link");
//        String text = "";
//        for (Iterator<Element> it = items.iterator(); it.hasNext();) {
//            Element element = it.next();
//            text += "<a href=\"" + element.getAttribute("uri") + "\">" + element.getTextContent() + "</a><br/>\n";
//        }
        System.out.println(sc.getLogon());
    }

    public String getLogon() {
        //return getRegion("menu-item");
        String id="logon";
        String menu=getRegion(id);
        //filter
        List<Element> filters = findAllElements("//filter[@for='"+id+"']");
        if(!filters.isEmpty()){            
            Payload source = new Payload("/index",menu,"faces/index.xhtml");
            event.fire(source);
            menu= (String) source.getValue();
        }
        return menu;
    }

    public String getRegion(String id) {
        List<Element> templates = findAllElements("//region[@id='" + id + "']");
        String menu = "";
        if (!templates.isEmpty()) {
            String xpath = templates.get(0).getAttribute("variable-xpath");
            String template = templates.get(0).getTextContent();
            if (xpath == null || xpath.isEmpty()) {
                if (template != null && !template.isEmpty()) {
                    return (String) TemplateRuntime.eval(template, null);
                }
                return menu;
            }
            //template=template.trim();
            List<Element> items = findAllElements(xpath);
            for (Iterator<Element> it = items.iterator(); it.hasNext();) {
                Element element = it.next();
                element.getTextContent();
                menu += TemplateRuntime.eval(template, element);
            }
        }        
        return menu;
    }

    private List<Element> findAllElements(String xpath) {
        List<Element> items = new ArrayList<Element>();
        Map<String, InputStream> map;
        try {
            map = findAllProviders();
            for (InputStream in : map.values()) {
                Document doc = XMLHelper.getDocumentBuilder().parse(in);
                List<Element> elements = XMLHelper.findElements(
                        xpath, doc.getDocumentElement());
                items.addAll(elements);
            }
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return items;
    }

    private Map<String, InputStream> findAllProviders() throws IOException {
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        Enumeration<URL> resources = loader.getResources(FILE_NAME);
        Map<String, InputStream> resourceMap = new HashMap<String, InputStream>();
        while (resources.hasMoreElements()) {
            URL url = resources.nextElement();
            InputStream is = url.openStream();
            resourceMap.put(url.getPath(), is);
        }
        return resourceMap;
    }
}
