import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.xpath.XPathExpressionException;

import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import net.flowas.projectunit.gwt.server.OperationUtils;
import net.flowas.projectunit.gwt.server.TreeData;
import net.flowas.projectunit.sitespec.AlignHelper;
import net.flowas.projectunit.sitespec.SiteManager;


public class Hello {

	/**
	 * @param args
	 */
	public static void main(String[] args) {		
        System.out.println("=="+valu(OperationUtils.subTree("root")));
        
	}	
	
	static String valu(String text){		 
		String rsl="";
		if (text.contains(",")) {
			String[] menus = text.split(",");
			for (String value : menus) {
				if(value.contains(":")){
					String[] pairs=value.split(":");					
					for(String pairText:pairs){
						System.out.println(pairText);
						if(pairText.contains("=")){
							String[] pair=pairText.split("=");
							if(pair[0].equals("id")){
								rsl+="---"+pair[1];
							}else if(pair[0].equals("name")){
								//dataProvider.getList().add(pair[1]);
							}else{
								//
							}
						}
					}
				}
				//dataProvider.getList().add(value);
			}
		}
		return rsl;
	}
}
