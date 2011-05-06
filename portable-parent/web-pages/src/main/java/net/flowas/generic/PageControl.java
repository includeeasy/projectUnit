/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.flowas.generic;

import javax.inject.Named;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import com.flowas.generic.model.Payload;

/**
 *
 * @author Administrator
 */
@Named(value="pageControl")
@ApplicationScoped
public class PageControl {
    private String text="<p> top context ,here is login</p>";
    
    
    
    @Inject
    TemplateHelper template;
    /**
     * @return the text
     */
    public String getText() {
        return template.getLogon();
    }

    public String getRegion(String id) {
        return template.getRegion(id);
    }
    
}
